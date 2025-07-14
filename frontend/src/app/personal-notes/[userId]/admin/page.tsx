'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {showToast} from "@/components/show-toast";
import {parseAxiosError} from "@/utils/error";
import {User} from "@/interfaces/api";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {AccountDialog} from "@/components/account-dialog";

export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                    withCredentials: true,
                });
                setUsers(response.data);
            } catch (err) {
                showToast({
                    title: "Error",
                    description: parseAxiosError(err),
                    type: "error",
                });
            }
        }
        fetchData();
    }, []);

    const handleRowClick = (user: User) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    return (
        <div className="px-4 md:px-10 py-8 w-full">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">User Management</h1>
            <div className="overflow-x-auto rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg">
                <Table className="w-full border-collapse">
                    <TableCaption className="text-gray-500 dark:text-gray-400">A list of registered
                        users.</TableCaption>
                    <TableHeader className="bg-gray-100 dark:bg-gray-800">
                        <TableRow className="border-b border-gray-300 dark:border-gray-600">
                            <TableHead className="p-4 border-r border-gray-300 dark:border-gray-600">ID</TableHead>
                            <TableHead
                                className="p-4 border-r border-gray-300 dark:border-gray-600">Username</TableHead>
                            <TableHead className="p-4 border-r border-gray-300 dark:border-gray-600">First
                                Name</TableHead>
                            <TableHead className="p-4 border-r border-gray-300 dark:border-gray-600">Last
                                Name</TableHead>
                            <TableHead className="p-4 border-r border-gray-300 dark:border-gray-600">Email</TableHead>
                            <TableHead className="p-4">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                onClick={() => handleRowClick(user)}
                                className="cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                <TableCell
                                    className="p-4 border-r border-gray-200 dark:border-gray-700">{user.id}</TableCell>
                                <TableCell
                                    className="p-4 border-r border-gray-200 dark:border-gray-700">{user.username}</TableCell>
                                <TableCell
                                    className="p-4 border-r border-gray-200 dark:border-gray-700">{user.firstName}</TableCell>
                                <TableCell
                                    className="p-4 border-r border-gray-200 dark:border-gray-700">{user.lastName}</TableCell>
                                <TableCell
                                    className="p-4 border-r border-gray-200 dark:border-gray-700">{user.email}</TableCell>
                                <TableCell className="p-4">{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedUser && (
                <AccountDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    user={selectedUser}
                    isAdmin={true}
                />
            )}
        </div>
    );
}