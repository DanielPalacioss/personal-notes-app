'use client'
import {DirectoryList} from "@/components/directory-list";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {showToast} from "@/components/show-toast";
import {parseAxiosError} from "@/utils/error";
import {Directory} from "@/interfaces/api";
import {AddDirectoryDialog} from "@/components/add-directory-dialog";

export default function Directories() {

    const router = useRouter();
    const [directories, setDirectories] = useState<Directory[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/directory`, {
                    withCredentials: true,
                });
                setDirectories(response.data);
            } catch (err) {
                showToast({
                    title: "Error",
                    description: parseAxiosError(err),
                    type: "error",
                });
            }
        }
        fetchData();

    }, []);


    if (!directories) return <div>Cargando...</div>;
    return (
        <main className="p-4 w-full">
            <DirectoryList
                directories={directories}
                onSelect={(id) => router.push(`directories/${id}`)}
            />
            <AddDirectoryDialog/>
        </main>
    )
}