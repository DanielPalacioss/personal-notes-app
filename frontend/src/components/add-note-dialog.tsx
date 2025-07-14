"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {CustomAlertDialog} from "@/components/custom-alert-dialog";
import axios from "axios";
import {showToast} from "@/components/show-toast";
import {parseAxiosError} from "@/utils/error";
import {useState} from "react";
import {Plus} from "lucide-react";

export function AddNoteDialog({directoryId}: { directoryId: string }) {

    const [title, setTitle] = useState('');

    const handleAddNote = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/note`,
                {title, directoryId},
                {withCredentials: true});
            const {message} = response.data
            showToast({
                title: "Success",
                description: message,
                type: "success",
            });
            window.location.reload();

        } catch (err) {
            showToast({
                title: "Error",
                description: parseAxiosError(err),
                type: "error",
            });
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="fixed bottom-6 right-6 rounded-full p-3 shadow-lg"
                    >
                        <Plus className="w-5 h-5"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create note</DialogTitle>
                        <DialogDescription>
                            Create your note here. Click create when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Title</Label>
                            <Input id="name-1" name="name" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <CustomAlertDialog
                            trigger={<Button>Create</Button>}
                            title="Are you absolutely sure?"
                            description="This action create your note."
                            actionText="Yes"
                            cancelText="Cancel"
                            onConfirm={handleAddNote}
                        />
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
