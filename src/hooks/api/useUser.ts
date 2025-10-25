import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'USER' | 'PROVIDER' | 'ADMIN';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type UpdateProfileData = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};

type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// User Profile Hooks
export const useCurrentUser = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ['current-user'],
    queryFn: () => apiClient.get('/users/me'),
    retry: 1,
  });
};

export const useUserProfile = (userId: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: ['user', userId],
    queryFn: () => apiClient.get(`/users/${userId}`),
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation<UserProfile, Error, UpdateProfileData>({
    mutationFn: (data: UpdateProfileData) => 
      apiClient.patch('/users/me', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation<{ message: string }, Error, ChangePasswordData>({
    mutationFn: (data: ChangePasswordData) => 
      apiClient.patch('/users/me/password', data),
  });
};

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();
  
  return useMutation<{ imageUrl: string }, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation<{ message: string }, Error, void>({
    mutationFn: () => apiClient.delete('/users/me'),
    onSuccess: () => {
      // Clear all queries and local storage on account deletion
      queryClient.clear();
      localStorage.removeItem('accessToken');
    },
  });
};

export const useUserBookings = (userId: string, status?: string) => {
  return useQuery({
    queryKey: ['user-bookings', userId, status],
    queryFn: () => 
      apiClient.get(`/users/${userId}/bookings${status ? `?status=${status}` : ''}`),
    enabled: !!userId,
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => useApiMutation('DELETE', '/users/me'),
    onSuccess: () => {
      // Invalidate all queries and redirect to home
      queryClient.clear();
      window.location.href = '/';
    },
  });
};
