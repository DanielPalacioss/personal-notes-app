import {NextRequest, NextResponse} from 'next/server'
import {jwtVerify, JWTVerifyResult} from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'daniel_secret')

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('jwt')?.value

    interface Payload extends JWTVerifyResult {
        sub: string;
        role: "ADMIN" | "USER";
    }

    const redirection = {
        'ADMIN': () => NextResponse.redirect(new URL('/admin', req.url)),
        'USER': () => NextResponse.redirect(new URL('/directory', req.url)),
    }

    if (!token) return NextResponse.redirect(new URL('/auth/login', req.url));

    try {
        const data: { payload: Payload } = await jwtVerify(token, JWT_SECRET);
        const {pathname} = req.nextUrl;
        if (pathname.startsWith('/admin') && data.payload.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        } else if (pathname === "/" || pathname === "/auth/login" || pathname === "/auth/register") {
            return redirection[data.payload.role]?.();
        }

        return NextResponse.next()
    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }
}

export const config = {
    matcher: ['/',
        '/auth/:path*',
        '/directory/:path*',
        '/user/:path*',
        '/note/:path*',
        '/admin/:path*',], // rutas protegidas
}
