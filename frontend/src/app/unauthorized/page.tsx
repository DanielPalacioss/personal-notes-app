'use client'

import {Button} from "@/components/ui/button"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {AlertTriangle} from "lucide-react"
import {useRouter} from "next/navigation"

export default function Unauthorized() {
    const router = useRouter()

    return (
        <main className="flex h-screen items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full space-y-6 text-center">
                <Alert variant="destructive" className="text-left">
                    <AlertTriangle className="h-5 w-5"/>
                    <AlertTitle>Acceso no autorizado</AlertTitle>
                    <AlertDescription>
                        No tienes permisos para acceder a esta página.
                    </AlertDescription>
                </Alert>
                <Button onClick={() => router.back()} className="w-full">
                    Volver atrás
                </Button>
                <Button variant="ghost" onClick={() => router.push('/')}>
                    Ir al inicio
                </Button>
            </div>
        </main>
    )
}
