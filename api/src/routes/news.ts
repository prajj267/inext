import { Router } from 'express';
import { prisma } from '../lib/db';
import { requireAuth } from '../lib/auth';

const router = Router();

// GET /api/news
router.get('/', async (_req, res) => {
  try {
    const items = await prisma.newsItem.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(items);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/news
router.post('/', requireAuth, async (req, res) => {
  try {
    const item = await prisma.newsItem.create({ data: req.body });
    res.status(201).json(item);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/news/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const item = await prisma.newsItem.update({ where: { id: req.params.id }, data: req.body });
    res.json(item);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/news/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.newsItem.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

export default router;
