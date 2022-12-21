import express from 'express';
import { getKategoris, getKategoriById, createKategori, updateKategori, deleteKategori } from '../controllers/Kategoris.js';

const router = express.Router();

router.get('/kategoris', getKategoris);
router.get('/kategori/:id', getKategoriById);
router.post('/kategori', createKategori);
router.patch('/kategori/:id', updateKategori);
router.delete('/kategori/:id', deleteKategori);

export default router;
