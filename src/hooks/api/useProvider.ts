import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type DocumentType = 'ID' | 'CERTIFICATE' | 'PORTFOLIO' | 'OTHER';

type Provider = {
  id: string;
  userId: string;
  bio?: string;
  profession?: string;
  skills: string[];
  experience: number;
  hourlyRate?: number;
  isAvailable: boolean;
  rating?: number;
  reviewCount: number;
  address?: string;
  locationLat?: number;
  locationLng?: number;
  documents: Array<{
    id: string;
    type: DocumentType;
    url: string;
    verified: boolean;
    createdAt: string;
  }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    isActive: boolean;
  }>;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
};

type UpdateProviderData = {
  bio?: string;
  profession?: string;
  skills?: string[] | string;
  experience?: number | string;
  hourlyRate?: number | string;
  isAvailable?: boolean | string;
  address?: string;
  locationLat?: number | string;
  locationLng?: number | string;
};

type SearchProvidersParams = {
  query?: string;
  profession?: string;
  minRating?: number;
  maxRate?: number;
  location?: {
    lat: number;
    lng: number;
    radius?: number; // in kilometers
  };
  page?: number;
  limit?: number;
};

type ProviderService = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Get current provider profile
export const useCurrentProvider = () => {
  return useQuery<Provider>({
    queryKey: ['provider', 'me'],
    queryFn: () => apiClient.get('/providers/me'),
  });
};

// Get provider by ID
export const useProvider = (providerId: string) => {
  return useQuery<Provider>({
    queryKey: ['provider', providerId],
    queryFn: () => apiClient.get(`/providers/${providerId}`),
    enabled: !!providerId,
  });
};

// Update provider profile
export const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Provider, Error, UpdateProviderData>({
    mutationFn: async (data) => {
      // Process skills if it's a string
      const processedData = { ...data };
      if (typeof processedData.skills === 'string') {
        processedData.skills = processedData.skills
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
      
      // Convert number strings to numbers
      if (typeof processedData.experience === 'string') {
        processedData.experience = parseInt(processedData.experience, 10);
      }
      
      if (typeof processedData.hourlyRate === 'string') {
        processedData.hourlyRate = parseFloat(processedData.hourlyRate);
      }
      
      // Convert string booleans
      if (typeof processedData.isAvailable === 'string') {
        processedData.isAvailable = processedData.isAvailable === 'true';
      }
      
      // Convert location coordinates
      if (typeof processedData.locationLat === 'string') {
        processedData.locationLat = parseFloat(processedData.locationLat);
      }
      
      if (typeof processedData.locationLng === 'string') {
        processedData.locationLng = parseFloat(processedData.locationLng);
      }
      
      return apiClient.patch('/providers/me', processedData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['provider', data.id] });
      queryClient.invalidateQueries({ queryKey: ['provider', 'me'] });
    },
  });
};

// Upload provider documents
export const useUploadProviderDocuments = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Provider, Error, { files: FileList; type: DocumentType }>({
    mutationFn: async ({ files, type }) => {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('documents', file);
      });
      formData.append('type', type);
      
      return apiClient.post('/providers/me/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider', 'me'] });
    },
  });
};

// Search providers with filters
export const useSearchProviders = (params: SearchProvidersParams = {}) => {
  return useInfiniteQuery<{
    providers: Provider[];
    total: number;
    page: number;
    totalPages: number;
    nextCursor?: string;
  }>({
    queryKey: ['providers', 'search', params],
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get('/providers/search', {
        params: { ...params, cursor: pageParam },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });
};

// Get provider services
export const useProviderServices = (providerId: string) => {
  return useQuery<ProviderService[]>({
    queryKey: ['provider-services', providerId],
    queryFn: () => apiClient.get(`/providers/${providerId}/services`),
    enabled: !!providerId,
  });
};

// Toggle provider availability
export const useToggleProviderAvailability = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Provider, Error, boolean>({
    mutationFn: (isAvailable) => 
      apiClient.patch('/providers/me/availability', { isAvailable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['providers', 'search'] });
    },
  });
};

// Delete provider document
export const useDeleteProviderDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (documentId) => 
      apiClient.delete(`/providers/me/documents/${documentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider', 'me'] });
    },
  });
};
