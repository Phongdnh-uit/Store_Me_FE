import { getGetStoragePlanByIdQueryOptions } from "@/gen/endpoints/storage-plan/storage-plan";
import { queryClient } from "@/lib/queryClient";
import { UpdateStoragePlanPage } from "@/pages/manage/storagePlan/UpdateStoragePlanPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/manage/storage-plan/update/$id")({
    loader: async ({ params }) => {
        return queryClient.ensureQueryData(
            getGetStoragePlanByIdQueryOptions(Number(params.id)),
        );
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <UpdateStoragePlanPage />;
}
