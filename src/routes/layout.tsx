import { Outlet } from "react-router";

import PageLayout from "../components/PageLayout";

export default function AppLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
