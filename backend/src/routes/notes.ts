/**
 * Notes routes for managing user notes
 */
import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest, ErrorResponse } from '../types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * GET /api/notes
 * Get all notes for user
 * @requires Authorization: Bearer <token>
 */
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const notes = await prisma.note.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

/**
 * POST /api/notes
 * Create a new note
 * @body {title: string, content: string, platformId?: string}
 * @requires Authorization: Bearer <token>
 */
router.post(
  '/',
  authenticateToken,
  [
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('platformId').optional(),
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

      const { title, content, platformId } = req.body;

      const note = await prisma.note.create({
        data: {
          userId: req.user.id,
          title,
          content,
          platformId,
        },
      });

      res.status(201).json({ note });
    } catch (error) {
      console.error('Create note error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * PUT /api/notes/:id
 * Update a note
 * @body {title?: string, content?: string}
 * @requires Authorization: Bearer <token>
 */
router.put(
  '/:id',
  authenticateToken,
  [
    body('title').optional().trim().isLength({ min: 1, max: 200 }),
    body('content').optional().trim(),
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
      const { title, content } = req.body;

      // Check if note belongs to user
      const existing = await prisma.note.findFirst({
        where: { id, userId: req.user.id },
      });

      if (!existing) {
        res.status(404).json({ error: 'Note not found' } as ErrorResponse);
        return;
      }

      const note = await prisma.note.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(content !== undefined && { content }),
        },
      });

      res.status(200).json({ note });
    } catch (error) {
      console.error('Update note error:', error);
      res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
    }
  }
);

/**
 * DELETE /api/notes/:id
 * Delete a note
 * @requires Authorization: Bearer <token>
 */
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' } as ErrorResponse);
      return;
    }

    const { id } = req.params;

    // Check if note belongs to user
    const existing = await prisma.note.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!existing) {
      res.status(404).json({ error: 'Note not found' } as ErrorResponse);
      return;
    }

    await prisma.note.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Internal server error' } as ErrorResponse);
  }
});

export default router;
