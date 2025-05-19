
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { trackError } from './analytics';

// Create a base axios instance
const api = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You could add auth tokens here
    return config;
  },
  (error) => {
    trackError('API Request', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    let message = 'Network error. Please check your connection and try again.';
    
    if (response) {
      // Handle different HTTP status codes
      switch (response.status) {
        case 401:
          message = 'Authentication required. Please log in again.';
          break;
        case 403:
          message = 'You do not have permission to access this resource.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = response.data?.message || 'Something went wrong. Please try again.';
      }
    }
    
    // Show toast notification for API errors
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
    
    // Log the error
    trackError('API Response', error, { 
      status: response?.status,
      url: error.config?.url,
      method: error.config?.method
    });
    
    return Promise.reject(error);
  }
);

// Create a fetch wrapper with similar error handling
export async function fetchWithErrorHandling(url: string, options: RequestInit = {}): Promise<any> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      let message = 'Something went wrong. Please try again.';
      
      switch (response.status) {
        case 401:
          message = 'Authentication required. Please log in again.';
          break;
        case 403:
          message = 'You do not have permission to access this resource.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
      }
      
      // Show toast notification
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      
      // Log the error
      trackError('Fetch', new Error(`HTTP Error ${response.status}`), { url, status: response.status });
      
      throw new Error(message);
    }
    
    return response.json();
  } catch (error) {
    // Show toast for network errors
    toast({
      title: "Network Error",
      description: "Unable to connect to the server. Please check your connection and try again.",
      variant: "destructive",
    });
    
    // Log the error
    trackError('Fetch', error, { url });
    
    throw error;
  }
}

export default api;
