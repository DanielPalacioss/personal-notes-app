import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger,} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {cookies} from "next/headers";
import React from "react";
import {BackButton} from "@/components/back-button";

export default async function Layout({
                                         children,
                                         params,
                                     }: {
    children: React.ReactNode;
    params: Promise<{ userId: string }>;
}) {

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const {userId} = await params;
    let user = null;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${(userId)}`, {
            headers: {
                Cookie: `jwt=${jwt}`,
            },
            cache: "no-store",
        });
        user = await response.json();
    } catch (err) {
        console.error(err);
    }
    if (!user) {
        return (
            <div className="p-4">
                <p>Loading user information...</p>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar user={user}/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <SidebarSeparator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        {user ? `Welcome back, ${user.firstName}` : "Loading..."}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{'Personal Notes'}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <BackButton/>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
