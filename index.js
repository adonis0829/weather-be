import urlJoin from "url-join";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const weatherApiKey = process.env.WEATHER_API_KEY;
const cityApiKey = process.env.CITY_API_KEY;
const baseUrl = process.env.OPEN_WEATHER_API_BASE_URL;
const geoUrl = process.env.GEO_API_BASE_URL;
const urlGetCities = 'v1/geo/places';
const urlGetWeather = 'v1/current.json';

app.use(cors());

// Utility function to build the weather API URL
const buildWeatherUrl = (city, lat, lon) => {
    const params = new URLSearchParams({ key: weatherApiKey });

    if (city) {
        params.append('q', city);
    } else if (lat && lon) {
        params.append('q', `${lat},${lon}`);
    }

    return urlJoin(baseUrl, urlGetWeather, '?' + params.toString());
};

// Utility function to build the city API URL
const buildGeoUrl = (query, limit = 5, offset = 0) => {
    const params = new URLSearchParams({
        namePrefix: query,
        limit: limit.toString(),
        offset: offset.toString(),
        apiKey: cityApiKey
    });

    return urlJoin(geoUrl, urlGetCities, '?' + params.toString());
};

// Centralized error handling function
const handleApiError = (res, error, message) => {
    console.error(message, error);
    res.status(500).send({ error: message });
};

// Endpoint to get weather data
app.get('/weather', async (req, res) => {
    const { lat, lon, city } = req.query;

    try {
        const url = buildWeatherUrl(city, lat, lon);
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        handleApiError(res, error, 'Failed to fetch weather data');
    }
});

// Endpoint to get city data
app.get('/cities', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).send({ error: 'Query parameter is required' });
    }

    try {
        const url = buildGeoUrl(query);
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        handleApiError(res, error, 'Failed to fetch city data');
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
