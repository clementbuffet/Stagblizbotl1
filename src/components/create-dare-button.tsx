'use client'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function CreateDareButton() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleClick = () => {
    if (!session) {
      // If not signed in, prompt to sign in
      return
    }
    // TODO: Implement dare creation flow
    console.log('Create dare clicked')
  }

  return (
    <Button 
      onClick={handleClick}
      className="bg-white text-purple-600 hover:bg-gray-100"
    >
      Create a Dare
    </Button>
  )
}