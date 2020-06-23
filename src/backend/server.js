const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const OPENHAB_URL = "http://openhab.cb7.com:8080/rest/";

const getOpenHabItem = async (item) => {
    const url = `${OPENHAB_URL}items/${item}`;

    return await axios.get(url);
}

app.get('/', function (req, res) {
    return res.send('Hello world');
});

app.get('/openhab/rest/items/:item', async (req, res) => {
    const item = req.params.item;

    const response = await getOpenHabItem(item);
    
    res.json(response.data);
});

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
});