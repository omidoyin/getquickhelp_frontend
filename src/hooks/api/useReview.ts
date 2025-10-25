import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi, useApiMutation } from '../useApi';

type Review = {
  id: string;
  bookingId: string;
  userId: string;
  providerId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
};

type CreateReviewData = {
  bookingId: string;
  rating: number;
  comment?: string;
};

type UpdateReviewData = {
  rating?: number;
  comment?: string;
};

export const useProviderReviews = (providerId: string) => {
  return useQuery<Review[]>({
    queryKey: ['reviews', 'provider', providerId],
    queryFn: () => useApi.get(`/reviews/provider/${providerId}`),
    enabled: !!providerId,
  });
};

export const useUserReviews = (userId?: string) => {
  const endpoint = userId ? `/reviews/user/${userId}` : '/reviews/me';
  
  return useQuery<Review[]>({
    queryKey: ['reviews', 'user', userId || 'me'],
    queryFn: () => useApi.get(endpoint),
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateReviewData) => 
      useApiMutation('POST', '/reviews', data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'provider', variables.providerId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'user'] 
      });
      // Invalidate provider data to update rating
      queryClient.invalidateQueries({ 
        queryKey: ['provider', variables.providerId] 
      });
    },
  });
};

export const useUpdateReview = (reviewId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateReviewData) => 
      useApiMutation('PATCH', `/reviews/${reviewId}`, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'provider', data.providerId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'user'] 
      });
      // Invalidate provider data to update rating
      queryClient.invalidateQueries({ 
        queryKey: ['provider', data.providerId] 
      });
    },
  });
};

export const useDeleteReview = (reviewId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => useApiMutation('DELETE', `/reviews/${reviewId}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'provider', data.providerId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'user'] 
      });
      // Invalidate provider data to update rating
      queryClient.invalidateQueries({ 
        queryKey: ['provider', data.providerId] 
      });
    },
  });
};
