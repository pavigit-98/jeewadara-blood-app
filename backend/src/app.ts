import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Jeevadhara backend is running. Use /api/auth/login to get a token.' });
});

// Enable CORS for frontend connection (runs on Vite port 5173 or others)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Main Jeevadhara API Endpoints
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), platform: 'Jeevadhara' });
});

// Serve simulated media asset placeholders
app.get('/assets/map-data', (req, res) => {
  res.json({ message: 'SVG Coordinate matrix fetched.' });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error: ', err);
  res.status(500).json({ message: 'Internal emergency server error.', error: err.message });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` Jeevadhara (ජීවධාරා) Match Service API Server Online`);
  console.log(` Running on port: http://localhost:${PORT}`);
  console.log(` Access endpoints at /api/...`);
  console.log(`=================================================`);
});

export default app;
