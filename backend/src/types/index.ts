/**
 * Type definitions for the SocialPair backend
 */

/** User type returned from the database (without password) */
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/** User type including password (internal use only) */
export interface UserWithPassword extends User {
  password: string;
}

/** JWT payload structure */
export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

/** Request body for user registration */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/** Request body for user login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Authentication response */
export interface AuthResponse {
  user: Omit<User, 'createdAt' | 'updatedAt'>;
  token: string;
}

/** API error response */
export interface ErrorResponse {
  error: string;
  message?: string;
}

/** Extended Express Request with user */
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: User;
}
