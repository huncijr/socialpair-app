/**
 * Alerts routes for managing user alerts
 */
import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest, ErrorResponse } from '../types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * GET /api/alerts
 * Get all alerts for user
 * @requires Authorization: Bearer <token>
 */
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const alerts = await prisma.alert.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

/**
 * POST /api/alerts
 * Create a new alert
 * @body {platformId: string, metric: string, condition: string, threshold: number}
 * @requires Authorization: Bearer <token>
 */
router.post(
  '/',
  authenticateToken,
  [
    body('platformId').notEmpty().withMessage('Platform ID is required'),
    body('metric').notEmpty().withMessage('Metric is required'),
    body('condition').isIn(['above', 'below', 'equals']).withMessage('Condition must be above, below, or equals'),
    body('threshold').isFloat().withMessage('Threshold must be a number'),
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

      const { platformId, metric, condition, threshold } = req.body;

      const alert = await prisma.alert.create({
        data: {
          userId: req.user.id,
          platformId,
          metric,
          condition,
          threshold,
        },
      });

      res.status(201).json({ alert });
    } catch (error) {
      console.error('Create alert error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * PUT /api/alerts/:id
 * Update an alert
 * @body {condition?: string, threshold?: number, isActive?: boolean}
 * @requires Authorization: Bearer <token>
 */
router.put(
  '/:id',
  authenticateToken,
  [
    body('condition').optional().isIn(['above', 'below', 'equals']),
    body('threshold').optional().isFloat(),
    body('isActive').optional().isBoolean(),
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
      const { condition, threshold, isActive } = req.body;

      // Check if alert belongs to user
      const existing = await prisma.alert.findFirst({
        where: { id, userId: req.user.id },
      });

      if (!existing) {
        res.status(404).json({ error: 'Alert not found' } as ErrorResponse);
        return;
      }

      const alert = await prisma.alert.update({
        where: { id },
        data: {
          ...(condition && { condition }),
          ...(threshold !== undefined && { threshold }),
          ...(isActive !== undefined && { isActive }),
        },
      });

      res.status(200).json({ alert });
    } catch (error) {
      console.error('Update alert error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * DELETE /api/alerts/:id
 * Delete an alert
 * @requires Authorization: Bearer <token>
 */
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const { id } = req.params;

    // Check if alert belongs to user
    const existing = await prisma.alert.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existing) {
      res.status(404).json({ error: 'Alert not found' } as ErrorResponse);
      return;
    }

    await prisma.alert.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (error) {
    console.error('Delete alert error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

export default router;
