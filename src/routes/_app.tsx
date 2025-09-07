import SideBar from "@/components/SideBar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <SideBar>
                <Outlet />
            </SideBar>
        </div>
    );
}
