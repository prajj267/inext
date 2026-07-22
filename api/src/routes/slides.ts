import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

// GET /api/slides - get all slides ordered by order field
router.get('/', async (_req, res) => {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(slides);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/slides - create new slide (admin only)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { image, alt, order } = req.body;
    const slide = await prisma.slide.create({
      data: {
        image,
        alt: alt || 'Lab slide',
        order: order ?? 0,
      },
    });
    res.status(201).json(slide);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/slides/:id - update slide (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { image, alt, order } = req.body;
    const slide = await prisma.slide.update({
      where: { id: req.params.id },
      data: {
        ...(image !== undefined && { image }),
        ...(alt !== undefined && { alt }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    res.json(slide);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/slides/:id - delete slide (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.slide.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

export default router;
