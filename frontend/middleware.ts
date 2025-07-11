import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('jwt')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET! || 'daniel_secret') as { role: string }
        const { pathname } = req.nextUrl
        if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }
        return NextResponse.next()
    } catch {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/directory/:path*', '/user/:path*', '/note/:path*'], // rutas protegidas
}
