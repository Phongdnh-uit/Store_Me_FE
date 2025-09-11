import { StoragePlanListPage } from "@/pages/manage/storagePlan/StoragePlanListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/manage/storage-plan/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <StoragePlanListPage />;
}
