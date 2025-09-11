import { CreateStoragePlanPage } from "@/pages/manage/storagePlan/CreateStoragePlanPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/manage/storage-plan/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <CreateStoragePlanPage />;
}
