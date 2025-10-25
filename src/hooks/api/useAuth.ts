import { useMutation, useQuery } from '@tanstack/react-query';
import { useApiMutation, useFetch } from '../useApi';

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'USER' | 'PROVIDER';
  phone?: string;
};

type ForgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  token: string;
  password: string;
};

type UpdatePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// Auth API hooks
export const useLogin = () => {
  return useApiMutation<{ accessToken: string; user: any }, LoginCredentials>('POST', '/auth/login');
};

export const useSignup = () => {
  return useApiMutation<{ message: string }, SignupData>('POST', '/auth/signup');
};

export const useForgotPassword = () => {
  return useApiMutation<{ message: string }, ForgotPasswordData>('POST', '/auth/forgot-password');
};

export const useResetPassword = (token: string) => {
  return useApiMutation<{ message: string }, Omit<ResetPasswordData, 'token'>>(
    'POST',
    `/auth/reset-password/${token}`
  );
};

export const useUpdatePassword = () => {
  return useApiMutation<{ message: string }, UpdatePasswordData>('PATCH', '/auth/update-password');
};

export const useVerifyEmail = (token: string) => {
  return useFetch<{ message: string }>(['verify-email', token], `/auth/verify-email/${token}`, {
    enabled: !!token,
  });
};

export const useResendVerificationEmail = () => {
  return useApiMutation<{ message: string }, void>('POST', '/auth/resend-verification');
};

export const useLogout = () => {
  return useApiMutation<{ message: string }, void>('POST', '/auth/logout');
};

export const useRefreshToken = () => {
  return useApiMutation<{ accessToken: string }, void>('POST', '/auth/refresh-token');
};

// User session management
export const useCurrentUser = () => {
  return useQuery(['currentUser'], () => 
    fetch('/api/auth/me').then(res => res.json())
  );
};
