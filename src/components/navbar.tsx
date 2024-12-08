'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Bolt Community
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span>Welcome, {session.user?.name}</span>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  )
}