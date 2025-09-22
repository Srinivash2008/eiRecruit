// src/routes/submitQueriesRoutes.js
import express from 'express';
import multer from 'multer';
import { fetchQueriesController, submitQueryController } from '../controllers/submitQueriesController.js';


import { fileURLToPath } from 'url'
import path from "path";


const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // uploads folder must exist
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// fetch  files
router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, '..', '..', 'uploads', filename);
    console.log(imagePath, "imagepath");

    res.sendFile(imagePath);
})

// Routes
router.post('/submit-queries/create', upload.single('attachment'), submitQueryController);
router.get('/submit-queries/fetch', fetchQueriesController);

export const submitQueriesRouter = router;
