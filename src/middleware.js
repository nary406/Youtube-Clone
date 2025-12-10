import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('jwt_token')
  const { pathname } = request.nextUrl

  if (pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/trending',
    '/gaming',
    '/saved-videos',
    '/videos/:path*',
    '/login'
  ],
}
