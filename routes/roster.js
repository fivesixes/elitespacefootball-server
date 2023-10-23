import express from 'express';

import { getEntries, createEntry, updateEntry, deleteEntry, getEntry } from '../controllers/roster.js';

const router = express.Router();

router.get('/', getEntries);
router.post('/create', createEntry);
router.patch('/:id', updateEntry);
router.delete('/:id', deleteEntry);
router.get('/:id', getEntry);

export default router;