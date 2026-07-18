import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

import authRoutes        from './routes/auth';
import membersRoutes     from './routes/members';
import publicationsRoutes from './routes/publications';
import projectsRoutes    from './routes/projects';
import newsRoutes        from './routes/news';
import achievementsRoutes from './routes/achievements';

const app  = express();
const PORT = process.env.PORT ?? 4000;

// ── CORS ─────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL ?? 'https://inext.iitp.ac.in',
  'http://localhost:3000',  // local dev
  'http://localhost:3001',
];

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (Postman, server-side, etc.)
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── BODY PARSING ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── FILE UPLOADS (multer memory storage) ─────────────────────
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
app.use('/api/members/upload-photo', upload.single('photo'));

// ── STATIC UPLOADS ───────────────────────────────────────────
// Serve uploaded member photos
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ── ROUTES ───────────────────────────────────────────────────
console.log('Registering routes...');
app.use('/api/auth',         authRoutes);
app.use('/api/members',      membersRoutes);
app.use('/api/publications', publicationsRoutes);
app.use('/api/projects',     projectsRoutes);
app.use('/api/news',         newsRoutes);
app.use('/api/achievements', achievementsRoutes);
console.log('Routes registered');

// ── HEALTH CHECK ─────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── NOT FOUND ────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`i-NEXT API running on port ${PORT}`);
});

export default app;
