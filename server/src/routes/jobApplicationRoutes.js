// src/routes/jobApplicationRoutes.js
import express from 'express';
import {  submitApplicationController, fetchApplicationsController } from '../controllers/jobApplicationController.js';

const router = express.Router();

router.post('/job-applications/apply', submitApplicationController);

router.get('/job-applications/fetch', fetchApplicationsController);

export const jobApplicationRouter = router;
