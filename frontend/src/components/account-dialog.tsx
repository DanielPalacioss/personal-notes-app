import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {AccountTab} from "./account-tab";
import {User} from "@/interfaces/api";

interface AccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User;
    isAdmin?: boolean
}

export function AccountDialog({open, onOpenChange, user, isAdmin}: AccountDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Account</DialogTitle>
                </DialogHeader>
                <AccountTab user={user} isAdmin={isAdmin || false}/>
            </DialogContent>
        </Dialog>
    );
}
