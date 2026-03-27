/**
 * Saved comparisons routes for managing user comparisons
 */
import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest, ErrorResponse } from '../types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * GET /api/comparisons
 * Get all saved comparisons for user
 * @requires Authorization: Bearer <token>
 */
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const comparisons = await prisma.savedComparison.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json({ comparisons });
  } catch (error) {
    console.error('Get comparisons error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

/**
 * POST /api/comparisons
 * Save a new comparison
 * @body {name: string, platforms: string[], notes?: string, data: object}
 * @requires Authorization: Bearer <token>
 */
router.post(
  '/',
  authenticateToken,
  [
    body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
    body('platforms').isArray({ min: 2 }).withMessage('At least 2 platforms are required'),
    body('data').isObject().withMessage('Data is required'),
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

      const { name, platforms, notes, data } = req.body;

      const comparison = await prisma.savedComparison.create({
        data: {
          userId: req.user.id,
          name,
          platforms,
          notes,
          data,
        },
      });

      res.status(201).json({ comparison });
    } catch (error) {
      console.error('Create comparison error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * PUT /api/comparisons/:id
 * Update a saved comparison
 * @body {name?: string, notes?: string}
 * @requires Authorization: Bearer <token>
 */
router.put(
  '/:id',
  authenticateToken,
  [
    body('name').optional().trim().isLength({ min: 1, max: 100 }),
    body('notes').optional(),
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

      const { id } = req.params;
      const { name, notes } = req.body;

      // Check if comparison belongs to user
      const existing = await prisma.savedComparison.findFirst({
        where: { id, userId: req.user.id },
      });

      if (!existing) {
        res.status(404).json({ error: 'Comparison not found' } as ErrorResponse);
        return;
      }

      const comparison = await prisma.savedComparison.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(notes !== undefined && { notes }),
        },
      });

      res.status(200).json({ comparison });
    } catch (error) {
      console.error('Update comparison error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * DELETE /api/comparisons/:id
 * Delete a saved comparison
 * @requires Authorization: Bearer <token>
 */
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const { id } = req.params;

    // Check if comparison belongs to user
    const existing = await prisma.savedComparison.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existing) {
      res.status(404).json({ error: 'Comparison not found' } as ErrorResponse);
      return;
    }

    await prisma.savedComparison.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Comparison deleted successfully' });
  } catch (error) {
    console.error('Delete comparison error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

export default router;
