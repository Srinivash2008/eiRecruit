// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';   // ✅ add this
import { jobApplicationRouter } from './routes/jobApplicationRoutes.js';
import { submitQueriesRouter } from './routes/submitQueriesRoutes.js';
import { authUserRouter } from './routes/authRouters.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

