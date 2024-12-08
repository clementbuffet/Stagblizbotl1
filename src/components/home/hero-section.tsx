import { LoginButton } from '../auth/login-button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="text-center py-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">
          Create Engaging Community Challenges
        </h1>
        <p className="text-xl mb-8 text-gray-100">
          Use AI to generate exciting dares, earn rewards, and build your community
        </p>
        {session ? (
          <Link href="/dares/create">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3">
              Generate New Dare
            </Button>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </section>
  );
}