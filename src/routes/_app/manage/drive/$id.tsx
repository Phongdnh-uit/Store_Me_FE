import { createFileRoute } from "@tanstack/react-router";
import { FSNodeListPage } from "@/pages/manage/drive/FSNodeListPage";

export const Route = createFileRoute("/_app/manage/drive/$id")({
  component: RouteComponent,
  beforeLoad: (context) => {
    const { id } = context.params;
    if (id !== "root" && !Number.isInteger(Number(id))) {
      throw new Error("Invalid id");
    }
  },
});

function RouteComponent() {
  return <FSNodeListPage />;
}
