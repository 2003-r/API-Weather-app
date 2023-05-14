const express = require('express');
const {
    getHistoryWeather
}= require('../controllers/HistoryWeather');

const router = express.Router();


router.route('/').get(getHistoryWeather);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: History Weather
 *   description: History weather API
 * /api/historyweather:
 *   get:
 *     summary: Get History weather by city id
 *     tags: [History Weather]
 *     parameters:
 *       - in: path
 *         name: id

 *         schema:
 *           type: string
 
 *         required: true
 *         description: The city id
 *     responses:
 *       200:
 *         description: The History weather response by city name
 *         content:
 *           application/json:
 *              $url: https://history.openweathermap.org/data/2.5/history/city?id=${id}&type=hour&start=${start}&end=${end}&appid=609f226efef5bf6ebc231885a172466c
 *       400:
 *         description: Bad Reqeust / Location not found
 *
 */
