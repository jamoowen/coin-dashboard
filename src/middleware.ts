import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl


    if (pathname.startsWith('/dashboard')) {
        // console.log(`pathname: ${request.url}`)

        if (!request.url.match(/dashboard\?id=[A-Za-z]+-[A-Za-z]+/)) {
            return NextResponse.redirect(new URL('/', request.url))
        }

    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}