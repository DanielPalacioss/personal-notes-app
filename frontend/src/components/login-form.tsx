"use client";

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {SignUpModal} from "@/components/signup-modal";
import axios from "axios";
import {User} from "@/interfaces/api";
import {parseAxiosError} from "@/utils/error";
import {showToast} from "@/components/show-toast";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"form">) {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        const redirection = {
            'ADMIN': () => router.push("/admin"),
            'USER': (userId: string) => router.push(`/personal-notes/${userId}/directories`),
        }

        try {
            const response = await axios.post(
                "http://localhost:4000/api/auth/login",
                {
                    usernameOrEmail,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            const data: { user: User; message: string } = response.data;
            showToast({
                title: "Success",
                description: data.message,
                type: "success",
            });
            redirection[data.user.role]?.(data.user.id);

        } catch (err) {
            showToast({
                title: "Error",
                description: parseAxiosError(err),
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email or username and password
                </p>
            </div>

            <div className="grid gap-3">
                <Label htmlFor="email">Email or Username</Label>
                <Input
                    id="email"
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                    placeholder="example@email.com or username"
                />
            </div>

            <div className="grid gap-3">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                        Forgot your password?
                    </a>
                </div>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

            </div>
            {error && (
                <div className="text-sm text-red-500 text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <SignUpModal />
            </div>
        </form>
    );
}
