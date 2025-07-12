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