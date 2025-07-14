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
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Pencil} from "lucide-react";

export function UpdateDirectoryDialog({directoryId, directoryN}: { directoryId: string, directoryN: string }) {

    const [directoryName, setDirectoryName] = useState('');
    const router = useRouter()

    useEffect(() => {
        if (directoryN !== undefined) {
            setDirectoryName(directoryN);
        }
    }, [directoryN]);

    const handleChangeDirectory = async () => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/directory/${directoryId}`,
                {directoryName},
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

    const handleDeleteDirectory = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/directory/${directoryId}`,
                {withCredentials: true},);
            const {message} = response.data
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
        } finally {
            router.back();
        }

    }

    return (

        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="fixed bottom-6 right-20 rounded-full p-3 shadow-lg"
                    >
                        <Pencil className="w-5 h-5"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit directory</DialogTitle>
                        <DialogDescription>
                            Make changes to your directory here. Click save changes when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="directory">Directory name</Label>
                            <Input id="directory" name="directory" value={directoryName}
                                   onChange={(e) => setDirectoryName(e.target.value)}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <CustomAlertDialog
                            trigger={<Button>Save changes</Button>}
                            title="Are you absolutely sure?"
                            description="This action modify your directory name."
                            actionText="Yes"
                            cancelText="Cancel"
                            onConfirm={handleChangeDirectory}
                        />
                        <CustomAlertDialog
                            trigger={<Button variant={'destructive'}>Delete</Button>}
                            title="Are you absolutely sure?"
                            description="This action delete your directory."
                            actionText="delete"
                            cancelText="Cancel"
                            onConfirm={handleDeleteDirectory}
                        />
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
