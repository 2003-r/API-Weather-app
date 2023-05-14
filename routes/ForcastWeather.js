const express = require('express');
const {
    getForcastWeather
}= require('../controllers/ForcastWeather');

const router = express.Router();


router.route('/').get(getForcastWeather);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Forcast Weather
 *   description: Forcast weather API
 * /api/forcastweather:
 *   get:
 *     summary: Get Forcast weather by city name
 *     tags: [Forcast Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: city name
 *     responses:
 *       200:
 *         description: The Forcast weather response by city name
 *         content:
 *           application/json:
 *              $url: https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=b2eb09a6505e9cac83ff98a0d14c1d8b
 *             
 *       400:
 *         description: Bad Reqeust / Location not found
 *
 */