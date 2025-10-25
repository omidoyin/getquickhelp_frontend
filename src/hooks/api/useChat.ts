import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  useInfiniteQuery 
} from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type MessageType = 'TEXT' | 'IMAGE' | 'DOCUMENT';

type Message = {
  id: string;
  bookingId: string;
  senderId: string;
  content: string;
  type: MessageType;
  mediaUrl?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
};

type Chat = {
  id: string;
  bookingId: string;
  booking: {
    id: string;
    service: {
      id: string;
      title: string;
    };
    scheduledDate: string;
    status: string;
  };
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role: 'USER' | 'PROVIDER';
  }>;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
};

type SendMessageData = {
  bookingId: string;
  receiverId: string;
  content: string;
  type?: MessageType;
  file?: File;
};

type MarkAsReadData = {
  messageIds: string[];
};

// Get all chats for the current user
export const useChats = () => {
  return useQuery<Chat[], Error>({
    queryKey: ['chats'],
    queryFn: () => apiClient.get('/chats'),
    refetchOnWindowFocus: true,
  });
};

// Get chat history with infinite scroll
export const useChatHistory = (bookingId: string) => {
  return useInfiniteQuery<{
    messages: Message[];
    nextCursor?: string;
    hasMore: boolean;
  }, Error>({
    queryKey: ['chat-history', bookingId],
    queryFn: async ({ pageParam }) => {
      const url = `/chats/${bookingId}/messages${pageParam ? `?cursor=${pageParam}` : ''}`;
      return apiClient.get(url);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!bookingId,
    refetchOnWindowFocus: true,
  });
};

// Send a new message
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Message, Error, SendMessageData>({
    mutationFn: async (data) => {
      if (data.file) {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('bookingId', data.bookingId);
        formData.append('receiverId', data.receiverId);
        formData.append('type', data.type || 'TEXT');
        
        if (data.content) {
          formData.append('content', data.content);
        }
        
        return apiClient.post('/chats/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      
      return apiClient.post('/chats/messages', {
        bookingId: data.bookingId,
        receiverId: data.receiverId,
        content: data.content,
        type: data.type || 'TEXT',
      });
    },
    onSuccess: (_, variables) => {
      // Invalidate both the chat history and the chats list
      queryClient.invalidateQueries({ 
        queryKey: ['chat-history', variables.bookingId] 
      });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};

// Mark messages as read
export const useMarkAsRead = (bookingId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation<{ success: boolean }, Error, MarkAsReadData>({
    mutationFn: (data) => 
      apiClient.patch(`/chats/${bookingId}/read`, data),
    onSuccess: () => {
      // Invalidate both the chat history and the chats list
      queryClient.invalidateQueries({ 
        queryKey: ['chat-history', bookingId] 
      });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};

// Get upload URL for media files
export const useGetUploadUrl = () => {
  return useMutation<{ uploadUrl: string; fileUrl: string; key: string }, Error, { fileType: string; fileSize: number }>({
    mutationFn: (data) => 
      apiClient.post('/chats/upload-url', data),
  });
};

// Upload file to S3
export const useUploadFile = () => {
  return useMutation<void, Error, { uploadUrl: string; file: File }>({
    mutationFn: async ({ uploadUrl, file }) => {
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
    },
  });
};

export const useMarkMessagesAsRead = (chatId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation<{ success: boolean }, Error, MarkAsReadData>({
    mutationFn: (data) => 
      apiClient.patch(`/chats/${chatId}/read`, data),
    onSuccess: () => {
      // Invalidate both the chat history and the chats list
      queryClient.invalidateQueries({ 
        queryKey: ['chat-history', chatId] 
      });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};
