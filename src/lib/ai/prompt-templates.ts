export const DARE_TEMPLATES = {
  SOLO: (theme: string, difficulty: string) => `
Create an engaging individual challenge ${theme ? `focused on ${theme}` : ''} 
with ${difficulty} difficulty level. The challenge should:
- Be achievable by a single person
- Have clear success criteria
- Be measurable and verifiable
- Be engaging and fun to complete`,

  TEAM: (theme: string, difficulty: string) => `
Create a team-based challenge ${theme ? `focused on ${theme}` : ''} 
with ${difficulty} difficulty level. The challenge should:
- Require collaboration between 2-5 people
- Have roles for each team member
- Include team coordination elements
- Be engaging and promote team spirit`,

  BATTLE: (theme: string, difficulty: string) => `
Create a competitive challenge ${theme ? `focused on ${theme}` : ''} 
with ${difficulty} difficulty level. The challenge should:
- Allow fair competition between participants
- Have clear winning conditions
- Be exciting and engaging
- Promote healthy competition`
};