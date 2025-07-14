import {cookies} from "next/headers";
import {ClientLayout} from "@/app/personal-notes/[userId]/client-layout";


export default async function Layout({
                                         children,
                                         params,
                                     }: {
    children: React.ReactNode;
    params: { userId: string };
}) {
    const cookieStore = await cookies();
    const jwt = await cookieStore.get("jwt")?.value;
    return <ClientLayout jwt={jwt || ''} userId={params.userId}>{children}</ClientLayout>;
}