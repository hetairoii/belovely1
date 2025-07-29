import express from 'express';
import { createSurprise, getSurprise } from '../controllers/surpriseController.js';
import validateSurprise from '../middleware/validateSurprise.js';

const router = express.Router();

/**
 * @swagger
 * /surprise:
 *   post:
 *     summary: Crea una nueva sorpresa
 *     tags: [Surprise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Surprise'
 *     responses:
 *       200:
 *         description: Sorpresa creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Surprise'
 */
router.post('/', validateSurprise, createSurprise);

/**
 * @swagger
 * /surprise/{id}:
 *   get:
 *     summary: Obtiene una sorpresa por ID
 *     tags: [Surprise]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sorpresa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Surprise'
 *       404:
 *         description: No encontrado
 */
router.get('/:id', getSurprise);

export default router;