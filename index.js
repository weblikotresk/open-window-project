
const express = require('express');
const compression = require('compression');
const fetch = require('node-fetch');
const app = express();
app.use(compression());
app.listen(process.env.PORT || 5000);
app.use(express.static('public', {
    etag: true, // Just being explicit about the default.
    lastModified: true,  // Just being explicit about the default.
    
    setHeaders: (res, path) => {
      if (path.endsWith('.ico')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'max-age=1296000');
      
      }else if (path.endsWith('.svg')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'max-age=1296000');
      
      }else if (path.endsWith('swap')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'max-age=1296000');
      }else if (path.endsWith('.png')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'max-age=259200')
      }else if (path.endsWith('si')) {
         // All of the project's HTML files end in .html
         res.setHeader('Cache-Control', 'max-age=70')
      };
    },
  }));
app.use(express.json());
app.post('/api', (req, res)=>{
    console.log(req.body);
});

app.get('/weather/:latlon/:lang/:units', async (req, res)=>{
    const latlon = req.params.latlon.split(',');
    const lang = req.params.lang;
    const units = req.params.units;

    const lat = latlon[0];
    const lon = latlon[1];
    console.log(latlon, lang, units);
    const api_url = `https://api.darksky.net/forecast/c5205b20e17e602f523b9a2155d6f3c8/${lat},${lon}?extend=hourly&units=${units}&lang=${lang}`;
    //const api_url =`https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${lat},${lon}&format=json&units=m&language=en-US&apiKey=174ba2eac16447ce8ba2eac16407ce9b`;
    
    //const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7707a0eb1901438d95e150ef48c69901&units=metric`;
    
    const response = await fetch(api_url);
    const json = await response.json();
    res.json(json);
    


});
