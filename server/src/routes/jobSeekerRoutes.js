import express from 'express';
import { fetchJobSeekerController } from '../controllers/jobSeekerController.js'; // <- .js extension added

const router = express.Router();

router.get('/job-seeker/fetch', fetchJobSeekerController);

export const jobSeekerRouter = router;
