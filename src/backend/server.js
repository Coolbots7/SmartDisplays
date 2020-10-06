const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const OPENHAB_URL = process.env.OPENHAB_URL || "http://openhab.cb7.com";
const OPEN_WEATHER_MAP_URL = process.env.OPEN_WEATHER_MAP_URL || "http://weather-api.cb7.com";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const getOpenHabItem = async (item) => {
    const url = `${OPENHAB_URL}/rest/items/${item}`;
    return await axios.get(url);
};

app.get('/', function (req, res) {
    return res.send('Hello world');
});

app.get('/openhab/rest/items/:item', async (req, res) => {
    const item = req.params.item;

    const response = await getOpenHabItem(item);

    res.json(response.data);
});

app.get('/openweathermap/onecall', async (req, res) => {
    const queryParams = req.query;

    axios.get(`${OPEN_WEATHER_MAP_URL}/openweathermap/onecall`,
        {
            method: 'get',
            params: queryParams
        })
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error);
        });
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
});