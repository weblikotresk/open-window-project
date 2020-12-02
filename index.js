
const express = require('express');
const compression = require('compression');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config()

app.use(compression());
app.listen(process.env.PORT || 5000);
// app.use (function (req, res, next) {
//   if (req.secure) {
//           // request was via https, so do no special handling
//           next();
//   } else {
//           // request was via http, so redirect to https
//           res.redirect('https://' + req.headers.host + req.url);
//   }
// });
app.use(express.static('public', {
    etag: true, // Just being explicit about the default.
    lastModified: true,  // Just being explicit about the default.
    //acceptEncoding:'gzip',
  }));
app.use(express.json());

app.get('/weather/:latlon/:lang/:units', async (req, res)=>{
    const latlon = req.params.latlon.split(',');
    const lang = req.params.lang;
    const units = req.params.units;

    const lat = latlon[0];
    const lon = latlon[1];
    console.log(latlon, lang, units);
    const api_url = `https://api.darksky.net/forecast/${process.env.dsk}/${lat},${lon}?extend=hourly&units=${units}&lang=${lang}`;
    //const api_url =`https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${lat},${lon}&format=json&units=m&language=en-US&apiKey=174ba2eac16447ce8ba2eac16407ce9b`;
    //const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7707a0eb1901438d95e150ef48c69901&units=metric`;
    const response = await fetch(api_url);
    const json = await response.json();
    res.setHeader('Cache-Control','max-age=65');
    res.json(json);
});
