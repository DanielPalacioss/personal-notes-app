import { DirectoryItem } from "./directory-item"

type Directory = {
    id: string
    title: string
}

type Props = {
    directories: Directory[]
    onSelect?: (id: string) => void
}

export function DirectoryList({ directories, onSelect }: Props) {
    return (
        <div className="w-full space-y-2">
            {directories.map((dir) => (
                <DirectoryItem
                    key={dir.id}
                    title={dir.title}
                    onClick={() => onSelect?.(dir.id)}
                />
            ))}
        </div>
    )
}
