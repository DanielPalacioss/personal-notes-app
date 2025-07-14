'use client'

import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {BackButton} from "@/components/back-button";
import {ReactNode, useEffect, useState} from "react";
import {User} from "@/interfaces/api";
import {showToast} from "@/components/show-toast";
import {parseAxiosError} from "@/utils/error";

export function ClientLayout({userId, jwt, children}: { userId: string, jwt: string, children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`, {
                    headers: {
                        Cookie: `jwt=${jwt}`,
                    },
                    credentials: "include",
                    cache: "no-store",
                });

                if (!response.ok) throw new Error("Failed to load user");
                const data = await response.json();
                setUser(data);
            } catch (err) {
                showToast({
                    title: "Error",
                    description: parseAxiosError(err),
                    type: "error",
                });
            }
        };
        fetchUser();
    }, [userId, jwt]);


    if (!user) return <div>Loading user...</div>;
    return (
        <SidebarProvider>
            <AppSidebar user={user} isAdmin={user.role === "ADMIN"}/>
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