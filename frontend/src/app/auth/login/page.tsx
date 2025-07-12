import { LoginForm } from "@/components/login-form"
import Image from "next/image";

function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:flex items-center justify-center overflow-hidden">
                <Image
                    src="/login.svg"
                    alt="Image"
                    fill
                    className="max-h-full max-w-full object-contain"
                />
            </div>
        </div>
    )
}

export default LoginPage