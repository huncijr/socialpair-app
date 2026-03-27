/**
 * Templates routes for managing comparison templates
 */
import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest, ErrorResponse } from '../types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * GET /api/templates
 * Get all templates for user
 * @requires Authorization: Bearer <token>
 */
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const templates = await prisma.template.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ templates });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

/**
 * POST /api/templates
 * Create a new template
 * @body {name: string, platforms: string[]}
 * @requires Authorization: Bearer <token>
 */
router.post(
  '/',
  authenticateToken,
  [
    body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
    body('platforms').isArray({ min: 2 }).withMessage('At least 2 platforms are required'),
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

      const { name, platforms } = req.body;

      const template = await prisma.template.create({
        data: {
          userId: req.user.id,
          name,
          platforms,
        },
      });

      res.status(201).json({ template });
    } catch (error) {
      console.error('Create template error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * DELETE /api/templates/:id
 * Delete a template
 * @requires Authorization: Bearer <token>
 */
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const { id } = req.params;

    // Check if template belongs to user
    const existing = await prisma.template.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existing) {
      res.status(404).json({ error: 'Template not found' } as ErrorResponse);
      return;
    }

    await prisma.template.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

export default router;
