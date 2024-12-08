import { Dare } from '@/types/dare';

export async function fetchDares(): Promise<Dare[]> {
  // TODO: Replace with actual API call
  return [
    {
      id: '1',
      title: 'Community Cleanup Challenge',
      description: 'Organize a local cleanup event and document the impact',
      reward: 100,
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      type: 'TEAM',
      status: 'ACTIVE',
      creatorId: '1'
    }
  ];
}