import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from "./ui/sidebar";

import Logo from "@/assets/logo.svg";

export default function SideBar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}

// This is sample data.
const data = {
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                {
                    title: "Installation",
                    url: "#",
                },
                {
                    title: "Project Structure",
                    url: "#",
                },
            ],
        },
        {
            title: "Building Your Application",
            url: "#",
            items: [
                {
                    title: "Users",
                    url: "/manage/user",
                },
                {
                    title: "Data Fetching",
                    url: "#",
                    isActive: true,
                },
                {
                    title: "Rendering",
                    url: "#",
                },
                {
                    title: "Caching",
                    url: "#",
                },
                {
                    title: "Styling",
                    url: "#",
                },
                {
                    title: "Optimizing",
                    url: "#",
                },
                {
                    title: "Configuring",
                    url: "#",
                },
                {
                    title: "Testing",
                    url: "#",
                },
                {
                    title: "Authentication",
                    url: "#",
                },
                {
                    title: "Deploying",
                    url: "#",
                },
                {
                    title: "Upgrading",
                    url: "#",
                },
                {
                    title: "Examples",
                    url: "#",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="floating" collapsible="icon" {...props}>
            <SidebarContent className="px-1 bg-white rounded-xl overflow-y-hidden">
                <SidebarHeader className="mt-2">
                    <div className="flex gap-1 items-center justify-between overflow-x-hidden">
                        <div className="group/icon-trigger size-6">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Logo}
                                    className="group-hover/icon-trigger:group-data-[collapsible=icon]:hidden"
                                />
                            </div>
                            <SidebarTrigger className="group-hover/icon-trigger:group-data-[collapsible=icon]:flex hidden group-hover/icon-trigger:group-data-[collapsible=icon]:cursor-e-resize size-full" />
                        </div>
                        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
                    </div>
                </SidebarHeader>
                <SidebarGroup className="overflow-y-scroll">
                    <SidebarMenu className="gap-2">
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url} className="font-medium">
                                        {item.title}
                                    </a>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild isActive={item.isActive}>
                                                    <a href={item.url}>{item.title}</a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-white mt-2 rounded-xl">
                <div className="px-4 flex flex-col gap-1 overflow-x-hidden">
                    <div>Metric</div>
                    <div>Billing</div>
                    <div>Support</div>
                    <div>Setting</div>
                    <div>Upgrade plan</div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
