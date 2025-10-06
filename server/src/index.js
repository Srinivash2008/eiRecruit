// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';   // ✅ add this
import { jobApplicationRouter } from './routes/jobApplicationRoutes.js';
import { submitQueriesRouter } from './routes/submitQueriesRoutes.js';
import { authUserRouter } from './routes/authRouters.js';
import { newJobOpeningRouter } from './routes/newJobOpeningRoutes.js';
import { jobSeekerRouter } from './routes/jobSeekerRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'dist')))

// ✅ Allow CORS
app.use(cors({
  origin: "http://localhost:5185", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Job Application Routes
app.use('/api/v1', jobApplicationRouter);

// Submit Queries Routes
app.use('/api/v1', submitQueriesRouter);

app.use('/api/v1', authUserRouter);

app.use('/api/v1', newJobOpeningRouter);

app.use('/api/v1', jobSeekerRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});