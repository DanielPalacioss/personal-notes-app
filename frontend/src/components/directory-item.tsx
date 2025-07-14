import {cn} from "@/lib/utils"
import {ChevronRight, Folder} from "lucide-react"

type Props = {
    title: string
    onClick?: () => void
    className?: string
}

export function DirectoryItem({title, onClick}: Props) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "w-full flex items-center justify-between p-4 hover:bg-muted rounded-md cursor-pointer transition border-b-2 border-border",
            )}
        >
            <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary"/>
                <h2 className="text-xl font-bold truncate">{title}</h2>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground"/>
        </div>
    )
}
