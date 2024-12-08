import { Dare } from '@/types/dare';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

interface DareCardProps {
  dare: Dare;
}

export function DareCard({ dare }: DareCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dare.title}</CardTitle>
        <CardDescription>{dare.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Reward: {dare.reward} DARE tokens</p>
          <p>Type: {dare.type}</p>
          <p>Ends: {new Date(dare.endDate).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}