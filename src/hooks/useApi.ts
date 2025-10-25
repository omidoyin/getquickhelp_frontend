import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

async function fetchApi<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: any,
  headers: HeadersInit = {}
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  // For DELETE requests that might not return content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// Generic hook for GET requests
export function useFetch<T>(
  queryKey: string | any[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T, Error, T, any[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => fetchApi<T>(endpoint),
    ...options,
  });
}

// Generic hook for mutations (POST, PUT, DELETE, PATCH)
export function useApiMutation<T, V = any>(
  method: HttpMethod,
  endpoint: string,
  options?: UseMutationOptions<T, Error, V>
) {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) => fetchApi<T>(
      endpoint,
      method,
      data,
      {
        // You can add authentication headers here
        // 'Authorization': `Bearer ${token}`,
      }
    ),
    ...options,
  });
}

// Example usage:
/*
// For GET requests
const { data, isLoading, error } = useFetch<YourType>('users', '/users');

// For mutations
const { mutate: createUser } = useApiMutation<User, CreateUserPayload>('POST', '/users');
createUser({ name: 'John', email: 'john@example.com' });
*/

// Example of a typed API hook
export function useUsers() {
  return {
    // GET /users
    useUsers: () => useFetch<User[]>('users', '/users'),
    // GET /users/:id
    useUser: (id: string) => useFetch<User>(['user', id], `/users/${id}`),
    // POST /users
    useCreateUser: () => useApiMutation<User, Omit<User, 'id'>>('POST', '/users'),
    // PUT /users/:id
    useUpdateUser: (id: string) => useApiMutation<User, Partial<User>>('PUT', `/users/${id}`),
    // DELETE /users/:id
    useDeleteUser: (id: string) => useApiMutation<void, void>('DELETE', `/users/${id}`),
  };
}

// Example types
type User = {
  id: string;
  name: string;
  email: string;
  // Add other user properties
};
