// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://aarogaya-claims.onrender.com';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/register`,
  login: `${API_BASE_URL}/api/login`,
  googleAuth: `${API_BASE_URL}/api/google-auth`,
  claims: `${API_BASE_URL}/claimapi/claims`,
  questions: `${API_BASE_URL}/questionapi/questions`,
};
