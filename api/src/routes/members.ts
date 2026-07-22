import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

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
    console.log('=== UPDATE MEMBER REQUEST ===');
    console.log('Member ID:', req.params.id);
    console.log('Data keys:', Object.keys(data));
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('Links:', JSON.stringify(links, null, 2));
    console.log('============================');
    
    // First, delete existing links
    const deletedCount = await prisma.memberLink.deleteMany({ where: { memberId: req.params.id } });
    console.log('Deleted', deletedCount.count, 'existing links');
    
    // Then update the member
    const member = await prisma.member.update({
      where: { id: req.params.id },
      data: { ...data, links: { create: links ?? [] } },
      include: { links: true },
    });
    
    console.log('Member updated successfully');
    res.json(member);
  } catch (err) { 
    console.error('!!! ERROR UPDATING MEMBER !!!');
    console.error('Error type:', err instanceof Error ? err.constructor.name : typeof err);
    console.error('Error message:', err instanceof Error ? err.message : String(err));
    console.error('Full error:', err);
    
    res.status(500).json({ 
      error: 'Server error', 
      details: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined
    }); 
  }
});

// DELETE /api/members/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.member.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/members/upload-photo — upload member photo (store as base64 in database)
router.post('/upload-photo', requireAuth, async (req, res) => {
  try {
    if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }
    
    // Convert image to base64
    const base64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64}`;
    
    // Return the data URL to be stored in the member's photo field
    res.json({ path: dataUrl });
  } catch (err) { 
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' }); 
  }
});

export default router;
