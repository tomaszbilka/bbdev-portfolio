import BlogPost from "../components/Blog/BlogPost";
import { getPost } from "../lib/posts.server";
import type { Route } from "./+types/blog.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug!);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return post;
}

export default function BlogPostRoute({ loaderData }: Route.ComponentProps) {
  return <BlogPost key={loaderData.meta.slug} post={loaderData} />;
}
