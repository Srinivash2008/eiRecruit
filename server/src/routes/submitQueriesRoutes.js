// src/routes/submitQueriesRoutes.js
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { fetchQueriesController, submitQueryController } from '../controllers/submitQueriesController.js';


import { fileURLToPath } from 'url'
import path from "path";


const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const destinationPath = path.join('uploads', 'submitQueriesFolder');
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
router.get('/uploads/submitQueriesFolder/:filename', (req, res) => {
    const filename = req.params.filename;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'submitQueriesFolder', filename);
    // console.log(imagePath, "imagepath");

    res.sendFile(imagePath);
})

// Routes
router.post('/submit-queries/create', upload.single('attachment'), submitQueryController);
router.get('/submit-queries/fetch', fetchQueriesController);

export const submitQueriesRouter = router;
