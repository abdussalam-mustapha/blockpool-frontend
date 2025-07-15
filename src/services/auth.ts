import { api } from './api';

export interface User {
  _id: string;
  email: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword?: string;
}

const TOKEN_KEY = 'blockpool_auth_token';
const USER_KEY = 'blockpool_user';

/**
 * Authentication service
 */
export const authService = {
  /**
   * Register a new user
   * @param credentials - User registration credentials
   */
  async register(credentials: RegisterCredentials): Promise<User> {
    const { email, password } = credentials;
    const data = await api.post('/auth/register', { email, password });
    this.setUserData(data);
    return data;
  },

  /**
   * Login a user
   * @param credentials - User login credentials
   */
  async login(credentials: LoginCredentials): Promise<User> {
    const data = await api.post('/auth/login', credentials);
    this.setUserData(data);
    return data;
  },

  /**
   * Logout the current user
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Get the current user
   */
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  /**
   * Get the auth token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Check if a user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  },

  /**
   * Set user data in local storage
   * @param user - User data
   */
  setUserData(user: User): void {
    localStorage.setItem(TOKEN_KEY, user.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
};
