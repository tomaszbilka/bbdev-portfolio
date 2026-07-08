import BlogList from "../components/Blog/BlogList";
import { getAllPosts } from "../lib/posts.server";
import type { Route } from "./+types/blog._index";

export async function loader() {
  const posts = await getAllPosts();
  return { posts };
}

export default function BlogIndexRoute({ loaderData }: Route.ComponentProps) {
  return <BlogList posts={loaderData.posts} />;
}
