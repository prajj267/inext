import { Router } from 'express';
import { prisma } from '../lib/db';
import { requireAuth } from '../lib/auth';
import path from 'path';
import fs from 'fs';

const router = Router();

// ── PUBLIC ──────────────────────────────────────────────────

// GET /api/members
router.get('/', async (_req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: { links: true },
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });
    res.json(members);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// ── ADMIN (protected) ────────────────────────────────────────

// POST /api/members
router.post('/', requireAuth, async (req, res) => {
  try {
    const { links, ...data } = req.body;
    const member = await prisma.member.create({
      data: { ...data, links: { create: links ?? [] } },
      include: { links: true },
    });
    res.status(201).json(member);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// PUT /api/members/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { links, ...data } = req.body;
    await prisma.memberLink.deleteMany({ where: { memberId: req.params.id } });
    const member = await prisma.member.update({
      where: { id: req.params.id },
      data: { ...data, links: { create: links ?? [] } },
      include: { links: true },
    });
    res.json(member);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// DELETE /api/members/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.member.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/members/upload-photo — upload member photo
router.post('/upload-photo', requireAuth, async (req, res) => {
  try {
    if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }
    const uploadDir = path.join(process.cwd(), 'uploads', 'members');
    fs.mkdirSync(uploadDir, { recursive: true });
    const filename = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    fs.writeFileSync(path.join(uploadDir, filename), req.file.buffer);
    res.json({ path: `/uploads/members/${filename}` });
  } catch { res.status(500).json({ error: 'Upload failed' }); }
});

export default router;
