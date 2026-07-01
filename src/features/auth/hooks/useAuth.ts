import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setLoading, setError, loginSuccess, logout } from '../store/authSlice';
import { authService } from '../services/authService';
import { LoginPayload, RegisterPayload, ForgotPasswordPayload, ResetPasswordPayload } from '../validation/authSchema';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user, isLoading, error } = useSelector((state: RootState) => state.auth);

  const checkSession = async () => {
    dispatch(setLoading(true));
    try {
      const sessionUser = await authService.getSession();
      if (sessionUser) {
        dispatch(loginSuccess(sessionUser));
      } else {
        dispatch(logout());
      }
    } catch {
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
  };

  const login = async (data: LoginPayload) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const user = await authService.login(data);
      dispatch(loginSuccess(user));
      router.push('/dashboard');
    } catch (err: any) {
      const message = err?.message || 'Failed to login';
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (data: RegisterPayload) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const user = await authService.register(data);
      dispatch(loginSuccess(user));
      router.push('/welcome');
    } catch (err: any) {
      const message = err?.message || 'Failed to register';
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async () => {
    dispatch(setLoading(true));
    try {
      await authService.logout();
    } finally {
      dispatch(logout());
      router.push('/login');
      dispatch(setLoading(false));
    }
  };

  const forgotPassword = async (data: ForgotPasswordPayload) => {
    router.push('/login');
  };

  const resetPassword = async (data: ResetPasswordPayload) => {
    router.push('/login');
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    register,
    logout: logoutUser,
    forgotPassword,
    resetPassword,
    checkSession
  };
}
