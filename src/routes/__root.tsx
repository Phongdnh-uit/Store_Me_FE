import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <Outlet />
            <TanStackRouterDevtools initialIsOpen={false}/>
            <ReactQueryDevtools initialIsOpen={false} />
        </React.Fragment>
    );
}
