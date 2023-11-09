import express from 'express';

import { getEntries, createEntry, updateEntry, deleteEntry, getEntrybyId, getEntriesbyLastName } from '../controllers/roster.js';

const router = express.Router();

router.get('/', getEntries);
router.post('/create', createEntry);
router.patch('/:id', updateEntry);
router.delete('/:id', deleteEntry);
router.get('/:id', getEntrybyId);
router.get('/names/:lastName', getEntriesbyLastName);

export default router;