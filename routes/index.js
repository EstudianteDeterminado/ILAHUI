const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

const idLength = 6;

/**
 * @swagger
 * components:
 *   schemas:
 *     Articulos:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - telefono
 *         - correo
 *         - mensaje
 *       properties:
 *         id:
 *           type: string
 *           description: ID del artículo
 *         nombre:
 *           type: string
 *           description: Nombre del artículo
 *         telefono:
 *           type: integer
 *           description: Teléfono del artículo
 *         correo:
 *           type: string
 *           description: Correo del artículo
 *         mensaje:
 *           type: string
 *           description: Mensaje del artículo
 *       example:
 *         id: abcdef
 *         nombre: Artículo 1
 *         telefono: 1234567890
 *         correo: correo@example.com
 *         mensaje: Este es un artículo de ejemplo
 */

/**
 * @swagger
 * /articulos:
 *   post:
 *     summary: Registra un artículo
 *     tags: [Articulos]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Articulos'
 *     responses:
 *       200:
 *         description: Artículo registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulos'
 *       500:
 *         description: Error interno del servidor
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *         example:
 *           error: Ocurrió un error interno del servidor
 */
router.post('/', (req, res) => {
  try {
    const articulo = {
      id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get('articulos').push(articulo).write();
    res.status(200).send(articulo);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /articulos/{id}:
 *   put:
 *     summary: Actualiza un artículo existente
 *     tags: [Articulos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del artículo a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Articulos'
 *     responses:
 *       200:
 *         description: Artículo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulos'
 *       500:
 *         description: Error interno del servidor
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *         example:
 *           error: Ocurrió un error interno del servidor
 */
router.put('/:id', (req, res) => {
  try {
    req.app.db.get('articulos')
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    const updatedArticulo = req.app.db.get('articulos').find({ id: req.params.id }).value();
    res.status(200).send(updatedArticulo);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
