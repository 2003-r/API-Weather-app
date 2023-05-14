const express = require('express');
const {
    getCurrentWeather
}= require('../controllers/CurrentWeather');


const router = express.Router();

router.route('/').get(getCurrentWeather);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Current Weather
 *   description: Retrieving data API
 * /api/currentweather:
 *   get:
 *     summary: Get Current Weather by city name
 *     tags: [Current Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city name
 *     responses:
 *       200:
 *         description: The Current Weather response by city name
 *         contens:
 *           application/json:
 *             schema:
 *               $url: https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=609f226efef5bf6ebc231885a172466c
 *       400:
 *         description: Bad Reqeust / Location not found
 */ 