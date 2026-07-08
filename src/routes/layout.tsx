import { isRouteErrorResponse, Outlet } from "react-router";

import NotFound from "../components/NotFound";
import PageLayout from "../components/PageLayout";
import UnexpectedError from "../components/UnexpectedError";
import type { Route } from "./+types/layout";

export default function AppLayout() {
  return (
    <PageLayout>
      <Outlet />
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
