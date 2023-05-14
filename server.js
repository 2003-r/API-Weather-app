const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require('dotenv');
const cookieParser =  require('cookie-parser');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const apicache = require('apicache');
const cache = apicache.middleware;

const app = express();

//Route files 
const CurrentWeather = require('./routes/CurrentWeather');
const ForcastWeather = require('./routes/ForcastWeather');
const HistoryWeather = require('./routes/HistoryWeather');
const auth = require('./routes/auth');
const { set } = require('mongoose');


// load env vars
dotenv.config({path: './config/config.env'});

connectDB();


//Body parser
app.use(express.json());

// Connect Swagger 
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Weather Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple weather API application made with expressand documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

// Cookie-Parser
app.use(cookieParser());

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Mount Routers
app.use('/api/currentweather', cache('5 minutes'), CurrentWeather);
app.use('/api/forcastweather', cache('5 minutes'), ForcastWeather);
app.use('/api/historyweather', cache('5 minutes'), HistoryWeather);
app.use('/api/auth', cache('5 minutes'), auth);

app.use(logger);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle the unhandled promise rejections
process.on('unhandled rejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //close server & exit process
    server.close(() => process.exit(1));
});