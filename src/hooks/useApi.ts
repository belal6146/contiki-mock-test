
import { useState, useCallback } from 'react';
import api from '@/lib/api';
import { trackEvent, trackError } from '@/lib/analytics';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  errorMessage?: string;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    payload?: any
  ) => {
    setLoading(true);
    setError(null);

    try {
      trackEvent('api_request_started', { method, url });
      
      const response = method === 'get' || method === 'delete'
        ? await api[method](url)
        : await api[method](url, payload);
      
      setData(response.data);
      options.onSuccess?.(response.data);
      trackEvent('api_request_succeeded', { method, url });
      
      return response.data;
    } catch (err: any) {
      const errorMsg = options.errorMessage || err.response?.data?.message || 'An error occurred';
      setError(errorMsg);
      
      trackError('API Request', err, { method, url });
      options.onError?.(err);
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const get = useCallback((url: string) => request('get', url), [request]);
  const post = useCallback((url: string, payload?: any) => request('post', url, payload), [request]);
  const put = useCallback((url: string, payload?: any) => request('put', url, payload), [request]);
  const del = useCallback((url: string) => request('delete', url), [request]);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    reset: () => {
      setData(null);
      setError(null);
      setLoading(false);
    }
  };
}

export default useApi;
