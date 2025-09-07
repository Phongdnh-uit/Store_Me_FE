import AppHeader from "@/components/AppHeader";
import SideBar from "@/components/SideBar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="h-screen">
            <div className="px-2 pt-1.5">
                <AppHeader className="h-14 shrink-0 rounded-xl" />
            </div>

            <SideBar>
                <Outlet />
            </SideBar>
        </div>
    );
}
