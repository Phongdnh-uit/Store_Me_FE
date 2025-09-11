import { CreateUserPage } from "@/pages/manage/user/CreateUserPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/manage/user/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <CreateUserPage />;
}
