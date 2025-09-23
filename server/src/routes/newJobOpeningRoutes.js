import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url'
import path from "path";
import fs from 'fs/promises';

import { fetchOpeningController, createNewOpeningController, updateCurrentOpeningStatusController, fetchOpeningWithStatusController, updateCurrentOpeningController } from '../controllers/newJobOpeningController.js';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const destinationPath = path.join('uploads', 'logoFolder');
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

// fetch logo files
router.get('/uploads/logoFolder/:filename', (req, res) => {
    const filename = req.params.filename;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'logoFolder', filename);

    res.sendFile(imagePath);
})



router.get('/currentJobOpening/fetch', fetchOpeningController);
router.get('/currentJobOpening/fetchWithStatus', fetchOpeningWithStatusController);

router.post('/newJobOpening/create', upload.single('logo'), createNewOpeningController);
router.post('/currentJobOpening/update', upload.single('logo'), updateCurrentOpeningController);

router.post('/currentJobOpening/status/update', updateCurrentOpeningStatusController);

export const newJobOpeningRouter = router;