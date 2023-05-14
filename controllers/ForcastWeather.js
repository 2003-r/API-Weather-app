const ErrorResponse = require('../utils/errorResponse');

// @desc   Get single Forcast weather
// @route  Get /api/CurrentWeather
// @access Public
exports.getForcastWeather = async(req, res, next) => {
   try{
     let city = req.query.city;
     console.log(city);
      if(!city){
        return next(new ErrorResponse(`Cannot provide forcast weather because city ${city} is not available`, 400));
      }
     var request = require('request');
     request(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=609f226efef5bf6ebc231885a172466c`,
     function(error, response, body){
      let data = JSON.parse(body);
      console.log(data);
     if(response.statusCode === 200)
     {
      res.status(200).json(data);
     }
    }); 
   }catch(err){
    console.log(err);
    next(new ErrorResponse(`Forcast weather not found ${req.params.city}`, 400));
   }
};

