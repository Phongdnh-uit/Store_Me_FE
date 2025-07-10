import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <div>Hello "__root"!</div>
            <Link to={"/auth/login"}>Login</Link>
            <Link to={"/auth/Register"}>Register</Link>
            <Outlet />
            <TanStackRouterDevtools initialIsOpen={false} />
        </React.Fragment>
    );
}
