"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavMain({
                          items,
                        }: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  return (
      <SidebarGroup>
        <SidebarGroupLabel>App</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
              <SidebarMenuButton asChild tooltip={item.title} key={item.title}>
                <a href={item.url} className="flex items-center gap-2 w-full">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroup>
  )
}