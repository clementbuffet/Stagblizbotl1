import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ShareButtons } from '../social/share-buttons';
import { DareTokenContract } from '@/lib/blockchain/token-contract';

interface DareParticipationProps {
  dareId: string;
  reward: number;
}

export function DareParticipation({ dareId, reward }: DareParticipationProps) {
  const [proofUrl, setProofUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit participation proof
      await fetch('/api/dares/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dareId, proofUrl }),
      });

      // Distribute reward tokens
      const tokenContract = new DareTokenContract(process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!);
      await tokenContract.mint(window.ethereum.selectedAddress, reward.toString());

    } catch (error) {
      console.error('Failed to submit participation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="url"
          value={proofUrl}
          onChange={(e) => setProofUrl(e.target.value)}
          placeholder="Proof URL (video, image, or document)"
          required
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Proof'}
        </Button>
      </form>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Share your participation</h3>
        <ShareButtons
          url={`${window.location.origin}/dares/${dareId}`}
          title="Join me in this community challenge!"
          description="I'm participating in an exciting community dare. Join me!"
        />
      </div>
    </div>
  );
}