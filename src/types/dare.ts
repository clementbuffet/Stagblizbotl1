export interface Dare {
  id: string;
  title: string;
  description: string;
  reward: number;
  startDate: string;
  endDate: string;
  type: 'SOLO' | 'TEAM' | 'BATTLE';
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  creatorId: string;
}

export interface DareParticipation {
  id: string;
  dareId: string;
  userId: string;
  status: 'JOINED' | 'COMPLETED' | 'VERIFIED';
  proofUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}