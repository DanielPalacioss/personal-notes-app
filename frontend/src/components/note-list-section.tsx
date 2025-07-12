'use client'

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation";

type ListItemProps = {
    title: string
    date: string
    subtitle: string
    href?: string
}

export function ListItem({ title, date, subtitle, href }: ListItemProps) {
    const router = useRouter()

    const handleClick = () => {
        if (href) router.push(href)
    }

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer hover:bg-muted/50 transition p-4 flex flex-col space-y-1 w-full"
        >
            <span className="font-bold text-base">{title}</span>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
                <span className="whitespace-nowrap">{date}</span>
                <span className="truncate flex-1">{subtitle}</span>
            </div>
        </div>
    )
}

type ListSectionProps = {
    sectionTitle: string
    items: ListItemProps[]
}

export function NoteListSection({ sectionTitle, items }: ListSectionProps) {
    return (
        <div className={cn("w-full")}>
            <h2 className="text-xl font-bold mb-2">{sectionTitle}</h2>
            <div className="border rounded-lg divide-y">
                {items.map((item, idx) => (
                    <ListItem key={idx} {...item} />
                ))}
            </div>
        </div>
    )
}
