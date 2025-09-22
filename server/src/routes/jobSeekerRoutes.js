import express from 'express';
import { createJobSeekerController, fetchJobSeekerController } from '../controllers/jobSeekerController.js'; // <- .js extension added


import { fileURLToPath } from 'url'
import path from "path";
import multer from 'multer';
import fs from 'fs/promises';
const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {

        const destinationPath = path.join('uploads', 'resumeFolder');
        try {
            await fs.access(destinationPath);
        } catch {
            // Create the directory if it does not exist
            await fs.mkdir(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
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
    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'resumeFolder', filename);
    // console.log(imagePath, "imagepath");

    res.sendFile(imagePath);
})

router.get('/job-seeker/fetch', fetchJobSeekerController);

router.post('/job-seeker/create', upload.single('resume'), createJobSeekerController);

export const jobSeekerRouter = router;
