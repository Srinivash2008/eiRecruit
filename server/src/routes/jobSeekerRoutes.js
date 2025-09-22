import express from 'express';
import { createJobSeekerController, fetchJobSeekerController } from '../controllers/jobSeekerController.js'; // <- .js extension added


import { fileURLToPath } from 'url'
import path from "path";
import multer from 'multer';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumeFolder'); // uploads folder must exist
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// fetch  files
router.get('/uploads/resumeFolder/:filename', (req, res) => {
    const filename = req.params.filename;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, '..', '..', 'uploads','resumeFolder', filename);
    // console.log(imagePath, "imagepath");

    res.sendFile(imagePath);
})

router.get('/job-seeker/fetch', fetchJobSeekerController);

router.post('/job-seeker/create',upload.single('resume'), createJobSeekerController);

export const jobSeekerRouter = router;
