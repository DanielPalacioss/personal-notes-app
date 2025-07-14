'use client'

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";

export function BackButton() {
    const router = useRouter()
    return (
        <div>
            <Button
                onClick={() => router.back()}
                variant="default"
                className="fixed top-6 right-6 rounded-full p-3 shadow-lg"
            >
                <ArrowLeft className="w-5 h-5"/>
            </Button>
        </div>
    );
}