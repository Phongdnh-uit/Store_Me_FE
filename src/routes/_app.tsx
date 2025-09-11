import AppHeader from "@/components/AppHeader";
import { AppSideBar } from "@/components/AppSideBar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppSideBar>
      <div className="relative h-[100dvh] w-full">
        <div className="absolute inset-[2px] rounded-xl bg-white/5 backdrop-blur overflow-hidden flex flex-col">
          <div className="py-1 pr-2">
            <AppHeader className="h-14 shrink-0 rounded-xl mr-2" />
          </div>

          <div className="flex-1 min-h-0 overflow-auto">
            <div className="relative size-full py-2 pr-2">
              <main className="h-full w-full bg-white rounded-2xl shadow-md p-4 overflow-auto">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </AppSideBar>
  );
}
