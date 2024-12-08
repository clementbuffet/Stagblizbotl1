import { signIn, useSession } from 'next-auth/react';
import { Button } from '../ui/button';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return null;
  }

  return (
    <Button 
      onClick={() => signIn()}
      className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
    >
      Get Started
    </Button>
  );
}