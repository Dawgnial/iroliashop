
import { baseUrl } from '../constants/baseUrl';

export const appApi = {
  getAppInfo: async () => {
    const response = await fetch(`${baseUrl}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch app info');
    }
    return response.json();
  }
};
