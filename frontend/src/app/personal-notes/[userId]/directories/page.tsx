'use client'
import {DirectoryList} from "@/components/directory-list";
import { useRouter } from "next/navigation";

export default function Directories(){
    const router = useRouter();
    return (
        <main className="p-4 w-full">
            <DirectoryList
                directories={[
                    { id: "1", title: "Proyectos personales" },
                    { id: "2", title: "Notas del trabajo" },
                    { id: "3", title: "Universidad" },
                ]}
                onSelect={(id) => router.push(`directories/${id}`)}
            />
        </main>
    )
}