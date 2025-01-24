import express from 'express';
import { getSection } from '../controllers/sectionController.js';

const router = express.Router();

router.get('/getsection', getSection);

export default router;