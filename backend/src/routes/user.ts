/**
 * User profile routes for managing user data
 */
import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest, ErrorResponse } from '../types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * GET /api/user/profile
 * Get detailed user profile
 * @requires Authorization: Bearer <token>
 */
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' } as ErrorResponse);
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

/**
 * PUT /api/user/profile
 * Update user profile
 * @body {name?: string, bio?: string, avatarUrl?: string}
 * @requires Authorization: Bearer <token>
 */
router.put(
  '/profile',
  authenticateToken,
  [
    body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
    body('avatarUrl').optional().trim().isURL().withMessage('Avatar URL must be a valid URL'),
  ],
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
        return;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ error: 'Validation failed', details: errors.array() } as ErrorResponse);
        return;
      }

      const { name, bio, avatarUrl } = req.body;

      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...(name && { name }),
          ...(bio !== undefined && { bio }),
          ...(avatarUrl && { avatarUrl }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(200).json({ user });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * POST /api/user/change-password
 * Change user password
 * @body {currentPassword: string, newPassword: string}
 * @requires Authorization: Bearer <token>
 */
router.post(
  '/change-password',
  authenticateToken,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
  ],
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
        return;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ error: 'Validation failed', details: errors.array() } as ErrorResponse);
        return;
      }

      const { currentPassword, newPassword } = req.body;

      // Get user with password
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' } as ErrorResponse);
        return;
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Current password is incorrect' } as ErrorResponse);
        return;
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await prisma.user.update({
        where: { id: req.user.id },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * DELETE /api/user/account
 * Delete user account
 * @requires Authorization: Bearer <token>
 */
router.delete('/account', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

export default router;
