import BlogPost from "../components/Blog/BlogPost";
import BlogPostSkeleton from "../components/Blog/BlogPostSkeleton";
import { getPost } from "../lib/posts.server";
import type { Route } from "./+types/blog.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug!);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return post;
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  return serverLoader();
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <BlogPostSkeleton />;
}

export default function BlogPostRoute({ loaderData }: Route.ComponentProps) {
  return <BlogPost post={loaderData} />;
}
