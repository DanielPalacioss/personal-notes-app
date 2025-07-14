"use client"

import * as React from "react"
import {BookOpen,} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {Sidebar, SidebarContent, SidebarFooter, SidebarRail,} from "@/components/ui/sidebar"
import {User} from "@/interfaces/api";

const data = {
    navMain: [
        {
            title: "Directories",
            url: "directories",
            icon: BookOpen,
            admin: false
        },
        {
            title: "Admin",
            url: "admin",
            icon: BookOpen,
            admin: true
        },
    ],
}

export function AppSidebar({user, isAdmin}: { user: User, isAdmin: boolean }) {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <NavMain items={data.navMain} isAdmin={isAdmin}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
