import axios from "axios";
import type {ErrorResponse} from "@/interfaces/api";

export function parseAxiosError(err: unknown): string {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data as ErrorResponse;
        if (typeof data?.message === "string") return data.message;
        if (Array.isArray(data.message?.message)) return data.message?.message.join(", ");
        if (typeof data?.message?.message === "string") return data.message.message;
        return "Unexpected error from server";
    }

    if (err instanceof Error) return err.message;

    return "Unknown error";
}