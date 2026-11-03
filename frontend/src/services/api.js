const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchHealth() {
  const response = await fetch(`${API_URL}/api/health`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`);
  }

  return response.json();
}
