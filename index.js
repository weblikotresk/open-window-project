
const express = require('express');
const compression = require('compression');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config()

app.use(compression());
app.listen(process.env.PORT || 5000);

app.use(express.static('public', {
    etag: true, 
    lastModified: true,  
  }));
app.use(express.json());

app.get('/weather/:latlon/:lang/:units', async (req, res)=>{
    const latlon = req.params.latlon.split(',');
    const lang = req.params.lang;
    const units = req.params.units;
    const lat = latlon[0];
    const lon = latlon[1];
    //console.log(latlon, lang, units);
    const api_url = `https://api.darksky.net/forecast/${process.env.dsk}/${lat},${lon}?extend=hourly&units=${units}&lang=${lang}`;
    const response = await fetch(api_url);
    const json = await response.json();
    res.setHeader('Cache-Control','max-age=65');
    res.json(json);
});
