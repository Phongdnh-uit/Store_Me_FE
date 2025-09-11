import { getGetAllRoleQueryOptions } from "@/gen/endpoints/role/role";
import { getGetUserByIdQueryOptions } from "@/gen/endpoints/user/user";
import { queryClient } from "@/lib/queryClient";
import { UpdateUserPage } from "@/pages/manage/user/UpdateUserPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/manage/user/update/$id")({
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(
      getGetUserByIdQueryOptions(Number(params.id)),
    );
    return await queryClient.ensureQueryData(
      getGetAllRoleQueryOptions({ size: undefined, page: 0, filter: "" }),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <UpdateUserPage />;
}
