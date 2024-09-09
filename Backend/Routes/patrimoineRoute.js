import express from 'express';
import { getPatrimoineByDate, getPatrimoineInRange } from './../Controleur/patrimoineControleur.js'; 

const router = express.Router();

router.get('/', getPatrimoineByDate);

router.get('/range', getPatrimoineInRange);

export default router;
