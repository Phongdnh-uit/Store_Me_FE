import { UserListPage } from "@/pages/manage/user/UserListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/manage/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserListPage />;
}
