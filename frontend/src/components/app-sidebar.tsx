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
            url: "/",
            icon: BookOpen,
        },
    ],
}

export function AppSidebar({user}: { user: User }) {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
