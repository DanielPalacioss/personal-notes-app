import {DirectoryItem} from "./directory-item"
import {Directory} from "@/interfaces/api";

type Props = {
    directories: Directory[]
    onSelect?: (id: string) => void
}

export function DirectoryList({directories, onSelect}: Props) {
    return (
        <div className="w-full space-y-2">
            {directories.map((dir) => (
                <DirectoryItem
                    key={dir.id}
                    title={dir.directoryName}
                    onClick={() => onSelect?.(dir.id)}
                />
            ))}
        </div>
    )
}
