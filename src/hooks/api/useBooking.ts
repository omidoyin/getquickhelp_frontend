import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';

type Booking = {
  id: string;
  userId: string;
  providerId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledDate: string;
  endDate?: string;
  address: string;
  locationLat: number;
  locationLng: number;
  notes?: string;
  price: number;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  provider: {
    id: string;
    businessName?: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string;
    };
  };
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
};

type CreateBookingData = {
  providerId: string;
  serviceId: string;
  scheduledDate: string;
  endDate?: string;
  address: string;
  locationLat: number;
  locationLng: number;
  notes?: string;
  price: number;
};

type UpdateBookingStatusData = {
  status: BookingStatus;
  cancellationReason?: string;
};

// Get all bookings for the current user
export const useUserBookings = (status?: string) => {
  return useQuery<Booking[], Error>({
    queryKey: ['user-bookings', status],
    queryFn: () => apiClient.get(`/users/me/bookings${status ? `?status=${status}` : ''}`),
  });
};

// Get all bookings for the current provider
export const useProviderBookings = (status?: string) => {
  return useQuery<Booking[], Error>({
    queryKey: ['provider-bookings', status],
    queryFn: () => apiClient.get(`/providers/me/bookings${status ? `?status=${status}` : ''}`),
  });
};

// Get a single booking by ID
export const useBooking = (bookingId: string) => {
  return useQuery<Booking, Error>({
    queryKey: ['booking', bookingId],
    queryFn: () => apiClient.get(`/bookings/${bookingId}`),
    enabled: !!bookingId,
  });
};

// Create a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Booking, Error, CreateBookingData>({
    mutationFn: (data) => apiClient.post('/bookings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['provider-bookings'] });
    },
  });
};

// Update booking status
export const useUpdateBookingStatus = (bookingId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation<Booking, Error, UpdateBookingStatusData>({
    mutationFn: (data) => apiClient.patch(`/bookings/${bookingId}/status`, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['provider-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Cancel a booking
export const useCancelBooking = (bookingId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation<Booking, Error, { cancellationReason?: string }>({
    mutationFn: (data) => apiClient.patch(`/bookings/${bookingId}/cancel`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['provider-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Complete a booking and leave a review
export const useCompleteBooking = (bookingId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation<Booking, Error, { rating: number; review?: string }>({
    mutationFn: (data) => apiClient.post(`/bookings/${bookingId}/complete`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['provider-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
