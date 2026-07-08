import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { renderMarkdown } from "./markdown.server";
import type { Post, PostLocale, PostMeta, PostSummary } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

async function readLocaleFile(
  dir: string,
  locale: "en" | "pl"
): Promise<PostLocale> {
  const filePath = path.join(dir, `${locale}.md`);
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);
  const trimmed = content.trim();

  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    content: trimmed,
    html: await renderMarkdown(trimmed),
  };
}

async function readPostMeta(dir: string, slug: string): Promise<PostMeta> {
  const metaPath = path.join(dir, "meta.json");
  const raw = await fs.readFile(metaPath, "utf-8");
  const meta = JSON.parse(raw) as Partial<PostMeta>;

  return {
    slug: meta.slug ?? slug,
    date: meta.date ?? "",
    published: meta.published !== false,
    tags: meta.tags ?? [],
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const slugs: string[] = [];
  for (const entry of entries) {
    const dir = path.join(CONTENT_DIR, entry);
    const stat = await fs.stat(dir);
    if (!stat.isDirectory()) continue;

    try {
      const meta = await readPostMeta(dir, entry);
      if (meta.published) slugs.push(meta.slug);
    } catch {
      // skip invalid posts
    }
  }

  return slugs;
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPost(slug);
      if (!post) return null;
      return {
        meta: post.meta,
        en: {
          title: post.en.title,
          description: post.en.description,
        },
        pl: {
          title: post.pl.title,
          description: post.pl.description,
        },
      } satisfies PostSummary;
    })
  );

  return posts
    .filter((post): post is PostSummary => post !== null)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export async function getPost(slug: string): Promise<Post | null> {
  const dir = path.join(CONTENT_DIR, slug);

  try {
    const [meta, en, pl] = await Promise.all([
      readPostMeta(dir, slug),
      readLocaleFile(dir, "en"),
      readLocaleFile(dir, "pl"),
    ]);

    if (!meta.published) return null;

    return { meta, en, pl };
  } catch {
    return null;
  }
}
