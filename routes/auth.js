const express = require('express');
const { register, login } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Auth-Register
 *   description: The Authentication register, login
 * /api/register:
 *   post:
 *     summary: Create a User
 *     tags: [Auth-Register]
 *     requestBody:
 *       name: username, email
 *       required: true
 *       content:
 *         schema:
 *            type: string
 *           
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/User'
 *       400:
 *         description: Bad Request
 *
 * 
 *   name: Auth-Login
 *   description: The Authentication login
 * /api/login:
 *   post:
 *     summary: sending an suthentication request
 *     tags: [Auth-Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/User'
 *     responses:
 *       200:
 *         description: The authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/User'
 *       400:
 *         description: Bad Request
 *
 */