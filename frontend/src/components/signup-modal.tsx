"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import axios from "axios";
import {parseAxiosError} from "@/utils/error";
import {showToast} from "@/components/show-toast";

export function SignUpModal() {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
            showToast({
                title: "Warning",
                description: "All fields are required",
                type: "warning",
            });
            return;
        }

        if (password !== confirmPassword) {
            showToast({
                title: "Warning",
                description: "Passwords do not match",
                type: "warning",
            });
            return;
        }

        if (!passwordRegex.test(password)) {
            showToast({
                title: "Warning",
                description: "Password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                type: "warning",
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/user", {
                firstName,
                lastName,
                username,
                email,
                password,
            });
            showToast({
                title: "Success",
                description: response.data?.message,
                type: "success",
            });
            setFirstName("");
            setLastName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setOpen(false);
        } catch (err) {
            showToast({
                title: "Error",
                description: parseAxiosError(err),
                type: "error",
            });
        }
    };

    // Aquí va el return correcto
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="p-0 h-auto text-sm">
                    Sign up
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>You can create your account here.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="button" className="w-full" onClick={handleRegister}>
                        Register
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
