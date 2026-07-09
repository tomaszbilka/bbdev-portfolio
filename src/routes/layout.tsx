import { isRouteErrorResponse, Outlet, useNavigation } from "react-router";

import BlogPostSkeleton from "../components/Blog/BlogPostSkeleton";
import NotFound from "../components/NotFound";
import PageLayout from "../components/PageLayout";
import UnexpectedError from "../components/UnexpectedError";
import type { Route } from "./+types/layout";

function isBlogPostPath(pathname: string) {
  return /^\/blog\/[^/]+$/.test(pathname);
}

export default function AppLayout() {
  const navigation = useNavigation();
  const isBlogPostLoading =
    navigation.state === "loading" &&
    navigation.location != null &&
    isBlogPostPath(navigation.location.pathname);

  return (
    <PageLayout>
      {isBlogPostLoading ? <BlogPostSkeleton /> : <Outlet />}
    </PageLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <PageLayout>
      {isRouteErrorResponse(error) && error.status === 404 ? (
        <NotFound />
      ) : (
        <UnexpectedError />
      )}
    </PageLayout>
  );
}
