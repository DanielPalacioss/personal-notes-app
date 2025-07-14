'use client'

import {useEffect, useState} from "react";
import {Note, NoteSection} from "@/interfaces/api";
import axios from "axios";
import {showToast} from "@/components/show-toast";
import {parseAxiosError} from "@/utils/error";
import {filterNotesByDateRange} from "@/lib/notes";
import {NoteListSection} from "@/components/note-list-section";
import {UpdateDirectoryDialog} from "@/components/update-directory-dialog";
import {AddNoteDialog} from "@/components/add-note-dialog";
import {useParams} from "next/navigation";

export default function NotesPage() {
    const params = useParams<{ directoryId: string, userId: string }>()
    const [note, setNote] = useState<Note[]>([]);
    const [directoryName, setDirectoryName] = useState('');
    const [noteSection, setNoteSectionList] = useState<NoteSection>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseNameDirectory = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/directory/${params.directoryId}`,
                    {withCredentials: true},);
                const {directoryName} = responseNameDirectory.data;
                setDirectoryName(directoryName);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/note/${params.directoryId}`, {
                    withCredentials: true,
                });
                setNote(response.data);
            } catch (err) {
                showToast({
                    title: "Error",
                    description: parseAxiosError(err),
                    type: "error",
                });
            }
        }
        fetchData();
    }, [params.directoryId]);

    useEffect(() => {
        if (note.length === 0) return;
        setNoteSectionList(filterNotesByDateRange(note, params.userId, params.directoryId));
    }, [note, params]);


    return (
        <main className="w-full p-4 overflow-x-hidden">
            {directoryName && (
                <div className="border-b pb-2 mb-4">
                    <h1 className="text-2xl font-semibold">{directoryName}</h1>
                </div>
            )}

            {!noteSection && (
                <p className="text-muted-foreground">Directory is empty</p>
            )}

            {noteSection && (
                <NoteListSection noteSection={noteSection}/>
            )}

            <UpdateDirectoryDialog directoryId={params.directoryId} directoryN={directoryName}/>
            <AddNoteDialog directoryId={params.directoryId}/>
        </main>
    )
}