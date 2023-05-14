const ErrorResponse = require('../utils/errorResponse');

// @desc   Get single Forcast weather
// @route  Get /api/CurrentWeather
// @access Public
exports.getHistoryWeather = async(req, res, next) => {
    try{
        // to get history weather for specific location need to provide the city id 
        // cannot request history weather for a give time range because of the availabe time range 
        let id = req.query.id;
        // let start = req.query.start;
        // let end = req.query.end;
    
        console.log(id);
        // console.log(start);
        // console.log(end);

        if (!id ){
            return next(new ErrorResponse(`unavailable city id  ${id}`, 400));
        }
        var request = require('request');
        request(`https://history.openweathermap.org/data/2.5/history/city?id=${id}&type=hour&appid=609f226efef5bf6ebc231885a172466c`,
        function(error, response, body){
         let data = JSON.parse(body);
         console.log(data);
         console.log(res.statusCode);
        if(response.statusCode === 200)
        {
            res.status(200).json(data);
        }
       }); 
    }catch(err){
        console.log(err);
       next(new ErrorResponse(`history weather not found for city id ${req.params.id} `, 400));
    }
}