import express from 'express';
import { createAdmin, adminAuth } from '../controllers/admin.js';

const router = express.Router();

router.post('/create', createAdmin);
router.post('/signin', adminAuth);

export default router;