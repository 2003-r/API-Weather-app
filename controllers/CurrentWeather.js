const ErrorResponse = require('../utils/errorResponse');


// @desc   Get single Current weather
// @route  Get /api/CurrentWeather
// @access Public
exports.getCurrentWeather = async (req, res, next) => {
    try{
        let city = req.query.city;
        console.log(city);
         if (!city){
             return next(new ErrorResponse(`not available city ${city}`, 400));
        }
        var request = require('request');
        request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=609f226efef5bf6ebc231885a172466c`,
        function(error, response, body){
         let data = JSON.parse(body);
         console.log(data);
         console.log(response.statusCode);
         
        if(response.statusCode === 200)
        {
            res.status(200).json(data);
        }
       }); 
       
    }catch(err){
        console.log(err);
       next(new ErrorResponse(`Current weather not found for city ${req.params.city}`, 400));
    }
};