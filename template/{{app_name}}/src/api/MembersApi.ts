const baseUrl: string = 'https://63d006cc8a780ae6e681fea9.mockapi.io/api/members';

export interface Member {
  firstName: any;
  lastName: string;
  description: string;
  favoriteFruit: string;
}

export const MembersApi = {
  getMembers: async (): Promise<Member[]> => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch members data');
    }
    return response.json();
  },
};