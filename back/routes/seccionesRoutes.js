import express from 'express';
import { getSection } from '../controllers/sectionController.js';

const router = express.Router();

router.get('/getsection', getSection);

// Luego implementar un POST para agregar secciones, solo para admins

export default router;