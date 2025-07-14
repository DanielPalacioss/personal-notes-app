export interface ErrorResponse {
    message: string | { message: [] } | { message: string };
    error?: string;
    statusCode?: number;
}

export interface User {
    id: string;
    username?: string;
    lastName?: string;
    firstName: string;
    email?: string;
    role: "ADMIN" | "USER";
}

export interface Directory {
    id: string;
    directoryName: string;
    updateAt: Date;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    href?: string;
}

export interface NoteRequestUpdate {
    title: string;
    content: string;
}

export interface NoteSection {
    [date: string]: Note[];
}
