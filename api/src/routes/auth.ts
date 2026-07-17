import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/db';
import { signToken, requireAuth } from '../lib/auth';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) { res.status(401).json({ error: 'Invalid credentials' }); return; }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) { res.status(401).json({ error: 'Invalid credentials' }); return; }

    const token = signToken({ id: user.id, email: user.email });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/auth/me — verify token
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
