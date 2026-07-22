import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

// GET /api/projects
router.get('/', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } });
    res.json(projects);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/projects
router.post('/', requireAuth, async (req, res) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/projects/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const project = await prisma.project.update({ where: { id: req.params.id }, data: req.body });
    res.json(project);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/projects/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

export default router;
