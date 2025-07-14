'use client'

import {useRouter} from "next/navigation";
import {Note, NoteSection} from "@/interfaces/api";

export function ListItem({title, updatedAt, content, href}: Note) {
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
                <span className="whitespace-nowrap">{updatedAt}</span>
                <span className="truncate flex-1">{content?.length > 30 ? content.slice(0, 30) : content}</span>
            </div>
        </div>
    )
}

export function NoteListSection({noteSection}: { noteSection: NoteSection }) {
    return (
        <div className="w-full space-y-4 pt-2">
            {Object.entries(noteSection).map(([sectionTitle, notes]) => (
                <div key={sectionTitle}>
                    <h2 className="text-xl font-bold mb-2">{sectionTitle}</h2>
                    <div className="border rounded-lg divide-y">
                        {notes.map((item, idx) => (
                            <ListItem key={idx} {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
