# API-Weather-app
A Restful API for a Weather app that retrieve the current and forcast weather conditions for specific city, and historical weather for specific city id , start & end date.
The API Request weather data for specific city and return response the Weather data as JSON and status 200. if city is invalid will return a status 400 / bad request.
After request&response , The weather data will be cached for 5min.
Basic authentication (register, login), new User can be created and stored in the database.

## Run Locally
Install dependencies
    ```bash
      npm install express 
    ```
Start the server
```bash
  npm run dev 
```
  Runs the in the development mode
  Open http://localhost:5000 to view in browser

  verify the API is running
  Test API Endpoints using POSTMAN
     send request to API's Endpoints and verify that you receive the expected responses.
  
## API Reference

#### Get Current Weather

```http
  GET /api/currentweather/:city
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city`    | `string` | **Required**.              |

#### GET Forecast Weather

```http
  GET /api/forcastweather/:city
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`    | `string` | **Required**.                     |

#### GET Forecast Weather

```http
  GET /api/Historyweather/?{id}&{start}&{end}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city id` | `string` | **Required**.                     |


#### POST Register user

```http
  POST /api/register/
```
#### POST login user

```http
  POST /api/login/
```
  
 #### POSTMAN
 
Weather API.postman_collection.json
