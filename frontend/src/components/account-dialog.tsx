import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AccountTab } from "./account-tab";
import { User } from "@/interfaces/api";

interface AccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User;
}

export function AccountDialog({ open, onOpenChange, user }: AccountDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage Account</DialogTitle>
                </DialogHeader>
                <AccountTab user={user} />
            </DialogContent>
        </Dialog>
    );
}
