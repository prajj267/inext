import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

// GET /api/publications
router.get('/', async (_req, res) => {
  try {
    const pubs = await prisma.publication.findMany({
      include: { authors: { orderBy: { order: 'asc' } } },
      orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
    });
    res.json(pubs);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/publications
router.post('/', requireAuth, async (req, res) => {
  try {
    const { authors, ...data } = req.body;
    const pub = await prisma.publication.create({
      data: {
        ...data,
        authors: {
          create: (authors ?? []).map((a: { text: string; bold: boolean }, i: number) => ({
            ...a, order: i,
          })),
        },
      },
      include: { authors: { orderBy: { order: 'asc' } } },
    });
    res.status(201).json(pub);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/publications/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { authors, ...data } = req.body;
    await prisma.publicationAuthor.deleteMany({ where: { publicationId: req.params.id } });
    const pub = await prisma.publication.update({
      where: { id: req.params.id },
      data: {
        ...data,
        authors: {
          create: (authors ?? []).map((a: { text: string; bold: boolean }, i: number) => ({
            ...a, order: i,
          })),
        },
      },
      include: { authors: { orderBy: { order: 'asc' } } },
    });
    res.json(pub);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/publications/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.publication.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

export default router;
