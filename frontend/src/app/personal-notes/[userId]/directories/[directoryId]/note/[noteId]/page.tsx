"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import {showToast} from "@/components/show-toast";
import {parseAxiosError} from "@/utils/error";
import {Check, Loader2, Pencil} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";

export default function NotePage() {
    const params = useParams<{ directoryId: string, userId: string, noteId: string }>()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/note/${params.directoryId}/${params.noteId}`,
                    {withCredentials: true});
                const note = response.data;
                setTitle(note?.title);
                setContent(note?.content || '');
            } catch (err) {
                showToast({
                    title: "Error",
                    description: parseAxiosError(err),
                    type: "error",
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [params]);

    const handleUpdateNote = async () => {
        try {
            const responseUpdate = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/note/${params.noteId}/${params.userId}`,
                {title, content},
                {withCredentials: true}
            );
            const {message} = responseUpdate.data;
            showToast({
                title: "Success",
                description: message,
                type: "success",
            });
        } catch (err) {
            showToast({
                title: "Error",
                description: parseAxiosError(err),
                type: "error",
            });
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500"/>
            </div>
        );
    }

    return (
        <main className="w-full p-6 overflow-x-hidden max-w-4xl mx-auto">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Editar Nota</h1>
                    <Button
                        onClick={handleUpdateNote}

                        className="items-center gap-2 transition-colors hidden md:flex"
                    >

                        <Check className="w-4 h-4"/>
                        <span>Guardar cambios</span>
                    </Button>
                </div>

                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Título</label>
                    <div className="relative">
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Escribe un título atractivo..."
                            className="w-full px-4 py-3 text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <Pencil className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"/>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-600">Contenido</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Desarrolla tus ideas aquí..."
                        className="w-full min-h-[400px] px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
                    />
                </div>

                <div className="md:hidden fixed bottom-6 right-6">
                    <Button
                        onClick={handleUpdateNote}
                        size="icon"
                        className="rounded-full p-3 shadow-xl "
                    >

                        <Check className="w-5 h-5"/>
                    </Button>
                </div>
            </div>
        </main>
    );
}