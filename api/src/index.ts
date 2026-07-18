import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

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

// Test route to verify routing works
app.get('/api/test', (_req, res) => {
  res.json({ message: 'Routing works!' });
});

// Import and register routes dynamically
const loadRoutes = async () => {
  const authRoutes        = (await import('./routes/auth.js')).default;
  const membersRoutes     = (await import('./routes/members.js')).default;
  const publicationsRoutes = (await import('./routes/publications.js')).default;
  const projectsRoutes    = (await import('./routes/projects.js')).default;
  const newsRoutes        = (await import('./routes/news.js')).default;
  const achievementsRoutes = (await import('./routes/achievements.js')).default;
  
  app.use('/api/auth',         authRoutes);
  app.use('/api/members',      membersRoutes);
  app.use('/api/publications', publicationsRoutes);
  app.use('/api/projects',     projectsRoutes);
  app.use('/api/news',         newsRoutes);
  app.use('/api/achievements', achievementsRoutes);
  console.log('Routes registered');
  
  // ── HEALTH CHECK ─────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });

  // ── NOT FOUND ────────────────────────────────────────────────
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`i-NEXT API running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

loadRoutes().catch(console.error);

export default app;
