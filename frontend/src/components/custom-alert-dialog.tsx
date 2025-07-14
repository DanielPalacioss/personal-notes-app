'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {ReactNode} from "react";

interface CustomAlertDialogProps {
    trigger: ReactNode;
    title: string;
    description: string;
    cancelText?: string;
    actionText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export function CustomAlertDialog({
                                      trigger,
                                      title,
                                      description,
                                      cancelText = "Cancel",
                                      actionText = "Confirm",
                                      onConfirm,
                                      onCancel,
                                  }: CustomAlertDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{actionText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
