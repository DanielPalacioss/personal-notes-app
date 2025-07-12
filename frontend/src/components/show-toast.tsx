import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info" | "default";

interface ShowToastOptions {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
    actionLabel?: string;
    onAction?: () => void;
}

export function showToast({
                              title,
                              description,
                              type = "default",
                              duration = 4000,
                              actionLabel,
                              onAction,
                          }: ShowToastOptions) {
    const action =
        actionLabel && onAction
            ? {
                label: actionLabel,
                onClick: onAction,
            }
            : undefined;

    if (type === "success") {
        toast.success(title, { description, duration, action });
    } else if (type === "error") {
        toast.error(title, { description, duration, action });
    } else if (type === "warning") {
        toast.warning(title, { description, duration, action });
    } else if (type === "info") {
        toast.info(title, { description, duration, action });
    } else {
        toast(title, { description, duration, action });
    }
}
