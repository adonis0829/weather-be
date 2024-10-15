
# Weather and City Information API

This is a simple Express API that provides weather and city information using the OpenWeather API and a GeoAPI for fetching cities. It features endpoints for retrieving weather data based on city names or coordinates and city suggestions based on user queries.

## Features

- Fetch current weather information by city name or coordinates (latitude, longitude).
- Search cities based on name prefixes using the GeoAPI.
- Centralized error handling for API requests.
- CORS enabled for cross-origin requests.

## Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 12 or higher
- **npm** or **yarn**

## Environment Variables

Create a `.env` file at the root of the project and include the following environment variables:

```bash
WEATHER_API_KEY=<Your OpenWeather API Key>
CITY_API_KEY=<Your GeoAPI Key>
OPEN_WEATHER_API_BASE_URL=https://api.weatherapi.com/
GEO_API_BASE_URL=https://api.geoapify.com/
PORT=3000
```

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/weather-api.git
    cd weather-api
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Run the server:

    ```bash
    npm start
    # or
    yarn start
    ```

The server will start on `http://localhost:3000` by default unless you specify a different port in your `.env` file.

## API Endpoints

### 1. Get Weather Data

Fetch current weather data by city name or by latitude and longitude.

- **URL**: `/weather`
- **Method**: `GET`
- **Query Parameters**:
  - `city` (optional): The name of the city.
  - `lat` (optional): Latitude coordinate.
  - `lon` (optional): Longitude coordinate.

**Example Request**:

```bash
GET http://localhost:3000/weather?city=London
GET http://localhost:3000/weather?lat=51.5074&lon=-0.1278
```

**Example Response**:

```json
{
    "location": {
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.52,
        "lon": -0.11,
        "tz_id": "Europe/London",
        "localtime_epoch": 1601566045,
        "localtime": "2020-10-01 12:00"
    },
    "current": {
        "temp_c": 14.0,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
        },
        "wind_mph": 5.6,
        "humidity": 72,
        "cloud": 50,
        "feelslike_c": 12.0
    }
}
```

### 2. Get Cities List

Fetch cities based on a search query.

- **URL**: `/cities`
- **Method**: `GET`
- **Query Parameters**:
  - `query`: The search keyword to get city suggestions (required).

**Example Request**:

```bash
GET http://localhost:3000/cities?query=Lon
```

**Example Response**:

```json
{
    "results": [
        {
            "id": 1,
            "name": "London",
            "country": "United Kingdom",
            "latitude": 51.5074,
            "longitude": -0.1278
        },
        {
            "id": 2,
            "name": "Long Beach",
            "country": "United States",
            "latitude": 33.7701,
            "longitude": -118.1937
        }
    ]
}
```

## Error Handling

All API errors return a standardized response format with a `500` status code if something goes wrong:

```json
{
    "error": "Failed to fetch weather data"
}
```
