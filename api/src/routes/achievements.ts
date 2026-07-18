import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

// GET /api/achievements
router.get('/', async (_req, res) => {
  try {
    const items = await prisma.achievement.findMany({
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });
    res.json(items);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/achievements
router.post('/', requireAuth, async (req, res) => {
  try {
    const item = await prisma.achievement.create({ data: req.body });
    res.status(201).json(item);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/achievements/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const item = await prisma.achievement.update({ where: { id: req.params.id }, data: req.body });
    res.json(item);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/achievements/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.achievement.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

export default router;
