import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {User} from "@/interfaces/api";
import axios from "axios";
import {parseAxiosError} from "@/utils/error";
import {useState} from "react";
import {showToast} from "@/components/show-toast";
import {CustomAlertDialog} from "@/components/custom-alert-dialog";

export function AccountTab({user, isAdmin}: { user: User, isAdmin: boolean }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleAccount = async () => {
        if (!firstName || !lastName || !email) {
            showToast({
                title: "Warning",
                description: "All fields are required",
                type: "warning",
            });
            return;
        } else if (firstName.length < 1 && firstName.length > 31) {
            showToast({
                title: "Warning",
                description: "First Name must be between 3 and 30 characters",
                type: "warning",
            });
            return;
        } else if (lastName.length < 1 && lastName.length > 30) {
            showToast({
                title: "Warning",
                description: "Last name must be between 3 and 30 characters",
                type: "warning",
            });
            return;
        }
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id}`,
                {
                    firstName, lastName, email
                },
                {withCredentials: true}
            );
            showToast({
                title: "Success",
                description: response.data?.message,
                type: "success",
            });
        } catch (err) {
            showToast({
                title: "Error",
                description: parseAxiosError(err),
                type: "error",
            });
        }
    }

    const handleChangePassword = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!isAdmin) {
            if (!password || !newPassword) {
                showToast({
                    title: "Warning",
                    description: "All fields are required",
                    type: "warning",
                });
                return;
            } else if (!passwordRegex.test(password) || !passwordRegex.test(newPassword)) {
                showToast({
                    title: "Warning",
                    description: "Password and new password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                    type: "warning",
                });
                return;
            }
        } else {
            if (!passwordRegex.test(newPassword)) {
                showToast({
                    title: "Warning",
                    description: "Password and new password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                    type: "warning",
                });
                return;
            } else {
                setPassword(newPassword);
            }
        }

        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id}/updatePassword`,
                {
                    password,
                    newPassword,
                },
                {
                    withCredentials: true,
                }
            );
            showToast({
                title: "Success",
                description: response.data?.message,
                type: "success",
            });
        } catch (err) {
            showToast({
                title: "Error",
                description: parseAxiosError(err),
                type: "error",
            });
        }
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you&apos;re
                                done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">First Name</Label>
                                <Input id="tabs-demo-name" value={firstName} onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Last Name</Label>
                                <Input id="tabs-demo-name" value={lastName} onChange={(e) => {
                                    setLastName(e.target.value)
                                }}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Email</Label>
                                <Input type={"email"} id="tabs-demo-username" value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <CustomAlertDialog
                                trigger={<Button>Save changes</Button>}
                                title="Are you absolutely sure?"
                                description="This action modify your account."
                                actionText="Yes"
                                cancelText="Cancel"
                                onConfirm={handleAccount}
                            />
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3" hidden={isAdmin}>
                                <Label htmlFor="tabs-demo-current">Current password</Label>
                                <Input id="tabs-demo-current" type="password" value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-new">New password</Label>
                                <Input id="tabs-demo-new" type="password" value={newPassword} onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <CustomAlertDialog
                                trigger={<Button>Save password</Button>}
                                title="Are you absolutely sure?"
                                description="This action modify your password."
                                actionText="Yes"
                                cancelText="Cancel"
                                onConfirm={handleChangePassword}
                            />
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}