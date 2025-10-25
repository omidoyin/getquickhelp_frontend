import fetchAPI from '@/lib/api';

export async function testConnection() {
  try {
    const data = await fetchAPI('/api/health');
    return data;
  } catch (error) {
    console.error('Failed to connect to backend:', error);
    throw error;
  }
}
