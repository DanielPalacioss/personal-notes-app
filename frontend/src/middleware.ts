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
        'ADMIN': (id: string) => NextResponse.redirect(new URL(`/personal-notes/${id}/admin`, req.url)),
        'USER': (id: string) => NextResponse.redirect(new URL(`/personal-notes/${id}/directories`, req.url)),
    }

    const {pathname} = req.nextUrl;

    if (!token) {
        if (pathname !== '/auth/login' && pathname !== '/auth/register') {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
        return NextResponse.next();
    }

    try {
        const data: { payload: Payload } = await jwtVerify(token, JWT_SECRET);
        if (pathname.match(/^\/personal-notes\/[^/]+\/admin$/) && data.payload.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        } else if (pathname === "/" || pathname === "/auth/login" || pathname === "/auth/register") {
            return redirection[data.payload.role]?.(data.payload.sub);
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
        '/personal-notes/:path*',],
}
