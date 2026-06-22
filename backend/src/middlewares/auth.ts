import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { store } from '../services/dataStore';
import { UserRole } from '../models/types';

const JWT_SECRET = process.env.JWT_SECRET || 'jeevadhara-secret-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    name: string;
    email: string;
  };
}

/**
 * Bearer JWT Authentication Verification Middleware
 */
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    // Standard secure compliance: Return 401 Unauthorized if token is missing
    return res.status(401).json({ message: 'Authentication Bearer Token is required.' });
  }

  // Handle mock tokens for seamless demo-mode testing
  if (token.startsWith('mock-jwt-token-for-')) {
    const parts = token.split('-');
    const userId = parts[4] + '-' + parts[5] + '-' + parts[6]; // e.g. U-ADMIN-01
    const matchedUser = store.users.find(u => u.id.includes(parts[4])); // loose check for comfort
    
    if (matchedUser) {
      req.user = {
        id: matchedUser.id,
        role: matchedUser.role,
        name: matchedUser.name,
        email: matchedUser.email
      };
      return next();
    }
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication token is invalid or has expired.' });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name,
      email: decoded.email
    };
    next();
  });
}

/**
 * Role-Based Access Control Authorization Middleware
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User is not authenticated.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: Access requires one of the following permissions: [${allowedRoles.join(', ')}]. Current role: ${req.user.role}` 
      });
    }

    next();
  };
}
