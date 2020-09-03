
function convertSeconds(seconds){
    let date = new Date();
    date.setTime(seconds * 1000);
    return date.toISOString().slice(11,16);

}
function videoBack(name){
  if(document.querySelector('#videoBG > source') !=null){
    //daily forecast
    let videobg = document.createElement('video');
    videobg.setAttribute('autoplay', true);
    videobg.setAttribute('muted', true);
    videobg.setAttribute('loop', true);
    videobg.id= 'videoBG';
    videobg.classList.add('no_opacity');

    let mp4 = document.createElement('source');
    mp4.src = `videos/${name}.mp4`;
    mp4.type = 'video/mp4';
    videobg.appendChild(mp4);
    let webm = document.createElement('source');
    webm.src = `videos/webm/${name}.webm`;
    webm.type = 'video/webm';
    videobg.appendChild(webm);

    let fallback = document.createElement('img');
    fallback.src = `videos/${name}.png`;
    videobg.appendChild(fallback);

    document.querySelector('#videoBG').classList.add('no_opacity');
    setTimeout(()=>{
      document.querySelector('#videoBG').classList.remove('full_opacity');
      document.querySelector('#videoBG').remove();
      document.body.prepend(videobg);
      document.querySelector('#videoBG').classList.add('full_opacity');
      setTimeout(()=>document.querySelector('#videoBG').classList.remove('no_opacity'), 400);
    }, 400);
  }else{
    //first creation
    let mp4 = document.createElement('source');
    mp4.src = `videos/${name}.mp4`;
    mp4.type = 'video/mp4';
    let webm = document.createElement('source');
    webm.src = `videos/webm/${name}.webm`;
    webm.type = 'video/webm';
    let fallback = document.createElement('img');
    fallback.src = `videos/${name}.png`;
    document.querySelector('#videoBG').appendChild(fallback);
    document.querySelector('#videoBG').appendChild(mp4);
    document.querySelector('#videoBG').appendChild(webm);
    document.querySelector('#videoBG').classList.add('full_opacity');
    setTimeout(()=>document.querySelector('#videoBG').classList.remove('no_opacity'), 400);
  }

}

let localization = {
  'ru':{
    app_temp:'Ощущается как: ',
    pop:'Вероятность осадков',
    uv:'Интенсивность УФ ',
    uvint:'Интенсивность УФ: ',
    clouds:'Облачное покрытие',
    wind:'Ветер',
    sunr:'Рассвет: ',
    suns:'Закат: ', 
    pres:'Давление: ',
    hum:'Влажность',
    date:'DD.MM',
    curr:'Текущая погода',
    local:'Язык',
    uni:'Единицы измерения',
    source:'Источники',
    tochange:'Чтобы подвердить изменения, закройте окно настроек. Страница автоматически перезагрузится.',
    loading:'Страница загружается, пожалуйста, подождите.',
    not_load:'Если страница долго не загружается, проверьте, включена ли геолокация на вашем устройстве и разрешено ли её использование на этом сайте.',
    geo_error:'Версия вашего браузера не поддерживает функцию передачи геолокации сторонним сайтам. Обновите его до последней версии и попробуйте снова.',
    wind_dir_h:'Направление ветра<br>(только для мобильных устройств)',
    wind_dir:'Эта функция включает автопозиционирование стрелки, которая показывает направление ветра относительно Северного полюса.<br> Может работать не на всех устройствах.<br> Если ваш компас работает некорректно, откалибруйте его в Google/Apple Maps.',
    on:'Включить',
    off:'Выключить',
    'Mon':'Пн,',
    'Tue':'Вт,',
    'Wed':'Ср,',
    'Thu':'Чт,',
    'Fri':'Пт,',
    'Sat':'Сб,',
    'Sun':'Вс,',
    
    units:{
      'us':{
        temp : '°F', 
        wind_units:'ми/ч',
        pres_units:' мм рт.ст.',
      }, 
      'ca':{
        temp:'°C',
        wind_units:'км/ч',
        pres_units:' мм рт.ст.',
      },
      'si':{
        temp:'°C',
        wind_units:'м/с',
        pres_units:' мм рт.ст.',
      },
      'uk2':{
        temp:'°C',
        wind_units:'ми/ч',
        pres_units:' мм рт.ст.',
      },
    },
  }, 
  'en':{
    app_temp:'Feels like: ',
    pop:'Precipation',
    uvint:'UV intensity: ',
    uv:'UV',
    
    clouds:'Cloud coverage',
    wind:'Wind',
    sunr:'Sunrise: ',
    suns:'Sunset: ', 
    pres:'Pressure: ',
    hum:'Humidity',
    date:'MM.DD',
    curr:'Current mode',
    local:'Language',
    uni:'Units of measurements',
    source:'Sources',
    tochange:'Close the settings window to confirm the changes. The page will automatically reload.',
    geo_error:'Your browser version does not support the function of transferring geolocation to third-party sites. Please update it to the latest version and try again.',
    wind_dir_h:'Wind direction<br>(only for mobile devices)',
    wind_dir:"This function enables auto-positioning of the wind arrow relative to the North Pole.<br> May not work on every device.<br> If the compass doesn't work correctly, consider recalibrate it in the Google/Apple Maps.",
    on:'On',
    off:'Off',
    'Mon':'Mon,',
    'Tue':'Tue,',
    'Wed':'Wed,',
    'Thu':'Thu,',
    'Fri':'Fri,',
    'Sat':'Sat,',
    'Sun':'Sun,',
    loading:'Your page is loading, please wait.',
    not_load:'If page takes a long time loading, please, consider checking if your geolocation service is on and allowed for use on this site.',
    units:{
      'us':{
        temp : '°F', 
        wind_units:'mph',
        pres_units:' mb'
      }, 
      'ca':{
        temp:'°C',
        wind_units:'km/h',
        pres_units:' mb'
      },
      'si':{
        temp:'°C',
        wind_units:'m/s',
        pres_units:' mb'
      },
      'uk2':{
        temp:'°C',
        wind_units:'mph',
        pres_units:' mb'
      },
    },
  },

};

//Settings 
//Settings are using localStorage, so we store everything there
if(localStorage.lang == undefined){
  //default localStorage
  localStorage.lang = 'ru';
  localStorage.units = 'si';
  localStorage.wind = 'off';
}

let settingsInputs =[];
settingsInputs[0] =  document.querySelectorAll('.lang');
settingsInputs[1] =  document.querySelectorAll('.units');
settingsInputs[2] =  document.querySelectorAll('.wind-input');

  for(let i =0;i<settingsInputs[0].length; i++){
    //we need to highlight options that are in the localStorage
    if(localStorage.lang == settingsInputs[0][i].value){
      settingsInputs[0][i].checked = true;
    }
    settingsInputs[0][i].addEventListener('click', ()=>{
      //onclick we change option in the localStorage 
      localStorage.lang = settingsInputs[0][i].value;
    })
  }
  for(let i =0;i<settingsInputs[1].length; i++){
    if(localStorage.units == settingsInputs[1][i].value){
      settingsInputs[1][i].checked = true;
    }
    settingsInputs[1][i].addEventListener('click', ()=>{
      localStorage.units = settingsInputs[1][i].value;
    })
  }
   for(let i =0;i<settingsInputs[2].length; i++){

     if(localStorage.wind == settingsInputs[2][i].value){
       settingsInputs[2][i].checked = true;
     }
     settingsInputs[2][i].addEventListener('click', ()=>{
       localStorage.wind = settingsInputs[2][i].value;
     })
   }


let settingsIcon = document.querySelector('#settings > svg'),
closeBtn = document.getElementsByClassName('close_settings')[0];
settingsIcon.addEventListener('click', ()=>{
  //open the settings window
  document.getElementsByClassName('settings_window')[0].style.zIndex = 2;
  document.getElementsByClassName('settings_window')[0].style.clipPath = 'circle(100%)';
});

closeBtn.addEventListener('click', ()=>{
  //close the settings window
    document.getElementsByClassName('settings_window')[0].style.clipPath = 'circle(0.1% at 53.6% 2.2%)'; 
    setTimeout(()=>{document.getElementsByClassName('settings_window')[0].style.zIndex = -2;load(localStorage)}, 550);
});

//Loading window
let load_text = document.getElementsByClassName('loading_support');
load_text[0].innerHTML = localization['ru'].loading;
load_text[1].innerHTML = localization['en'].loading;
setTimeout(()=>{
if(load_text[0] != undefined){
    load_text[0].innerHTML = localization['ru'].not_load;
    load_text[1].innerHTML = localization['en'].not_load;
}}, 5000);


window.onload = load();
//we set default parameter for the load function as localStorage default values,
//if function runs for the first time, else we load there 
//values that were chosen earlier and were put in the localStorage
function load(request_data = localStorage){

    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(async position =>{
          //location btn fix
          if(localStorage != request_data){
            request_data = localStorage;
          }
          //setting vars that will go to the api
           let lat = position.coords.latitude,
           lon = position.coords.longitude,
           lang = request_data.lang,
           units = request_data.units,
           wind = request_data.wind;
           console.log(lat, lon, units, lang,localStorage ,request_data, wind);
           const api_url = `weather/${lat},${lon}/${lang}/${units}`;
           const options = {
            method: "GET",
            withCredentials: true,
            headers:{
                'Content-Type':'application/json',
                'X-Requested-With': 'XMLHttpRequest' 
    
            }
           }
           const response = await fetch(api_url, options);
           const rdata = await response.json();
           console.log(rdata);
           //rdata is raw data response from the api

            
            function compass(event) {
              var alpha;
              const delta = 75;
              console.log(event);
              if (event.absolute) {
                alpha = event.alpha;
              } else if (event.hasOwnProperty('webkitCompassHeading')) {
                // get absolute orientation for Safari/iOS
                alpha = 360 - event.webkitCompassHeading; // conversion taken from a comment on Google Documentation, not tested
              } else {
                console.log('Could not retrieve absolute orientation');
              }
              alpha = alpha + delta - rdata.currently.windBearing;
            document.querySelector('.wind_dir').style.transform = `rotate(${alpha}deg)`;
              console.log('Absolute orientation: ' + alpha);
            }
          
          //slidemenu manage which chart to summon onclick on slidemenu
           function slidemenu(value, option){

            switch(value){
              case 'wind':
                chart_summon('windSpeed', 'rgb(0,204,255)', 'rgba(0,204,255, 0.25)', localization[lang].units[units].wind_units, option);
              break;
              case 'humidity':
                chart_summon('humidity',  'rgb(0,238,255)', 'rgba(0,238,255, 0.25)', '%', option);
              break;
              case 'uv':
                chart_summon('uvIndex', 'rgb(163,78,233)', 'rgba(163,78,233, 0.25)', '', option);
              break;
              case 'clouds':
                chart_summon('cloudCover','rgb(104,231,142)', 'rgba(104,231,142, 0.25)', '%', option);
              break;
              case 'precipProbability':
                chart_summon('precipProbability','rgb(0, 119, 255)', 'rgba(0, 119, 255, 0.25)', '%', option);
            }
            
          }
          //radio_events removes events for slidemenu and sets new eventListeners
          function radio_events(option){
            let radio_arr = document.getElementsByClassName('slide-toggle');
             radio_arr[0].checked = true;
            remove_events();
            for(let i = 0; i<radio_arr.length;i++){
              radio_arr[i].addEventListener('click', ()=>{
                slidemenu(radio_arr[i].value, option)}); 
            }
          }
          function chart_summon(option, option_color, option_back, axis_l, mode){
            //restart chart
            document.getElementById('myChart').remove();
            let chart_block = document.createElement('canvas');
            chart_block.id = 'myChart';
            document.getElementsByClassName('chart-container')[0].append(chart_block);
            console.log('chart was created');
            //chart
          let chart_data = [],
          max_chart =0,
          chart_labels = [];

          if(mode=='' || mode ==0){
            for(let i =0; i<24;i++){
              //current data
              if(option == 'cloudCover' || option == 'humidity' || option == 'precipProbability'){
                chart_data[i] = Math.round(rdata.hourly.data[i][option]*100);
              }else{
                chart_data[i] = Math.round(rdata.hourly.data[i][option]);
              }
              document.querySelectorAll('.hour > .pop' )[i].innerHTML = Math.round(rdata.hourly.data[i].precipProbability*100) +'%';
              document.querySelectorAll('.hour > .temp' )[i].innerHTML = Math.round(rdata.hourly.data[i].temperature) +localization[lang].units[units].temp;
              document.querySelectorAll('.hour > .sky' )[i].src = `img/icons/${rdata.hourly.data[i].icon}.svg`;
              document.querySelectorAll('.hour > .time' )[i].innerHTML = convertSeconds(rdata.hourly.data[i].time+rdata.offset*3600);
              chart_labels[i] = convertSeconds(rdata.hourly.data[i].time+rdata.offset*3600);
              //max_chart later makes chart go higher than it's maximum value
              if(max_chart < chart_data[i]){
                max_chart = chart_data[i];
              }
            }
          }
          else if(mode != ''){
            for(let i = 0; i<rdata.hourly.data.length;i++){
              if(rdata.hourly.data[i].time == rdata.daily.data[mode].time){
               
                for(let j =0; j<24;j++){
                  //hourly
          
                    document.querySelectorAll('.hour > .pop' )[j].innerHTML = Math.round(rdata.hourly.data[i+j].precipProbability*100) +'%';
                  document.querySelectorAll('.hour > .temp' )[j].innerHTML = Math.round(rdata.hourly.data[i+j].temperature) +localization[lang].units[units].temp;
                  document.querySelectorAll('.hour > .sky' )[j].src = `img/icons/${rdata.hourly.data[i+j].icon}.svg`;
          
                 document.querySelectorAll('.hour > .time' )[j].innerHTML = convertSeconds(rdata.hourly.data[i+j].time+rdata.offset*3600);
                 if(option == 'cloudCover' || option == 'humidity' || option == 'precipProbability'){
                  chart_data[j] = Math.round(rdata.hourly.data[i+j][option]*100);
                }else{
                  chart_data[j] = Math.round(rdata.hourly.data[i+j][option]);
                }
                chart_labels[j] = convertSeconds(rdata.hourly.data[i+j].time+rdata.offset*3600);
                if(max_chart < chart_data[j]){
                  max_chart = chart_data[j];
                }
                }
                  
                  
              }
            }
          }
          //coef helps max_chart to fix chart maximum
          let coef =0;
          if(max_chart > 70){
            coef = 30;
          }else{
            coef = 3;
            tooltip_pos = 'bottom';
          }
          //using chart.js library
            let ctx = document.getElementById('myChart').getContext('2d');
            let chart = new Chart(ctx, {
                type: 'line',
          
                data: {
                    labels: chart_labels,
                    datasets: [{
          
                        label: '',
                        pointBackgroundColor: option_color,
                        backgroundColor: option_back,
                        borderColor: option_color,
                        data: chart_data
                    }]
                },
          
                // Configuration options go here
                options: {
                  //responsive:false,
                    maintainAspectRatio: false,
                    onAnimationComplete: function(){
                        myBarChart.showTooltip(bars,false);
                        },
                        
                    scales: {
                        xAxes: [{
          
                            gridLines: {
                                 color: "rgba(255, 255, 255, 0.25)",
                                 zeroLineColor: 'rgba(255, 255, 255, 0.25)',
                                 drawBorder:false,
          
                                 
                                },
                            ticks:{
                                fontColor:'#fff',
                                fontSize:18,
          
                            }
                            
                        }],
                        yAxes: [{
                          
                            display:false,
                            
                            gridLines: { color: "rgba(255, 255, 255, 0)",
                          zeroLineColor: 'rgba(255, 255, 255, 0.25)' },
          
                            ticks: {
                                beginAtZero:true,
                                
                                max: max_chart +coef
                            }
                        }]
                    },
                    
                    legend: {
                        display: false,
                    },
                     showAllTooltips: true,
                     tooltips:{
                         
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        displayColors: false,
                        bodyFontSize: 18,
                        bodyAlign:'center',
                      xPadding:-20,
          
                        
                        
                        bodyFontFamily:"'Rubik', sans-serif",
                        callbacks: {
                           label: function(tooltipItem, data) { return tooltipItem.yLabel + axis_l; },
                            title: function() {return null},
                         }
                     }
                }
            });
            
          }
          //plugin that lets keep all tooltips always shown
          Chart.pluginService.register({
              beforeRender: function(chart) {
                if (chart.config.options.showAllTooltips) {
                  // create an array of tooltips
                  // we can't use the chart tooltip because there is only one tooltip per chart
                  chart.pluginTooltips = [];
                  chart.config.data.datasets.forEach(function(dataset, i) {
                    chart.getDatasetMeta(i).data.forEach(function(sector, j) {
                      chart.pluginTooltips.push(new Chart.Tooltip({
                        _chart: chart.chart,
                        _chartInstance: chart,
                        _data: chart.data,
                        _options: chart.options.tooltips,
                        _active: [sector]
                      }, chart));
                    });
                  });
          
                  // turn off normal tooltips
                  chart.options.tooltips.enabled = false;
                }
              },
              afterDraw: function(chart, easing) {
                if (chart.config.options.showAllTooltips) {
                  // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                  if (!chart.allTooltipsOnce) {
                    if (easing !== 1)
                      return;
                    chart.allTooltipsOnce = true;
                  }
          
                  // turn on tooltips
                  chart.options.tooltips.enabled = true;
                  Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                    tooltip.initialize();
                    tooltip.update();
                    // we don't actually need this since we are not animating tooltips
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                  });
                  chart.options.tooltips.enabled = false;
                }
              }
            })
          //removes events for slidemenu
          function remove_events(){
            let new_nav = document.getElementById('slidemenu');
            let newest_nav = new_nav.cloneNode(true);
            new_nav.remove();
            document.getElementById('display').appendChild(newest_nav);
          }
          //end of function declaration part

           //setting_headlines 
           let settings_headlines = document.querySelectorAll('.wind-subitem_label > h3');
           settings_headlines[0].innerHTML = localization[lang].local;
           settings_headlines[1].innerHTML =localization[lang].uni;
           settings_headlines[2].innerHTML = localization[lang].wind_dir_h;
           settings_headlines[3].innerHTML = localization[lang].source;
           document.querySelector('.settings_block > span').innerHTML = localization[lang].tochange;
           document.querySelector('.wind-settings  p').innerHTML = localization[lang].wind_dir;
           let wind_options = document.querySelectorAll('.turn_wind');
           wind_options[0].innerHTML = localization[lang].on;
           wind_options[1].innerHTML = localization[lang].off;

          //legal fix lmao
           if(moment().format('YYYY') == 2020){
            document.querySelector('#legal > p>span').innerHTML = moment().format('YYYY')
           }else{
            document.querySelector('#legal > p> span').innerHTML = '2020-' + moment().format('YYYY');
           }
           //current function delivers rdata to every block that needs it
           let current = function current(){
            videoBack(rdata.currently.icon);
              let icon = document.createElement('img');
              icon.src=`img/icons/${rdata.currently.icon}.svg`;
              icon.alt='';
              icon.className='icon';

              let water_drop = document.createElement('img');
              water_drop.src = 'img/icons/water.svg';
              water_drop.classList.add('pop_drop');
             
            console.log(localization[lang].units[units], lang);
            document.querySelector('.temp_val').innerHTML = Math.round(rdata.currently.temperature) + localization[lang].units[units].temp;
            
            document.querySelector('.app_temp').innerHTML = localization[lang].app_temp +''+ Math.round(rdata.currently.apparentTemperature) +localization[lang].units[units].temp ;
            document.querySelector('.condition').innerHTML = rdata.currently.summary;
            document.querySelector('.condition').prepend(icon);
 
            document.querySelector('.propability').innerHTML = localization[lang].pop+ ': '+ Math.round(rdata.hourly.data[0].precipProbability*100) + '%';
            document.querySelector('.uv').innerHTML =localization[lang].uvint +  rdata.currently.uvIndex;
            document.querySelector('.clouds').innerHTML = localization[lang].clouds+ ': ' +Math.round(rdata.currently.cloudCover*100) + '%';
            document.querySelector('.wind_text > h3').innerHTML = localization[lang].wind+ ': ';
            //document.querySelector('.wind_speed').innerHTML = rdata.currently.windSpeed +' '+ localization[lang].units[units].wind_units;
            //if wind is turned off, we remove deviceorientation
            // event and set normal mode for the wind arrow
            if ('ondeviceorientationabsolute' in window && localStorage.wind == 'on') {
              // Chrome 50+ specific
              window.addEventListener('deviceorientationabsolute', compass);
            } else if ('ondeviceorientation' in window && localStorage.wind == 'on') {
              window.addEventListener('deviceorientation', compass);
              setTimeout(()=>
              document.querySelector('.wind_dir').style.transform = `rotate(${rdata.currently.windBearing+45}deg)`, 1000);
            }

          
            document.querySelector('#sunr').innerHTML = localization[lang].sunr  +  convertSeconds(rdata.daily.data[0].sunriseTime +rdata.offset*3600);
            document.querySelector('#suns').innerHTML =localization[lang].suns +  convertSeconds(rdata.daily.data[0].sunsetTime +rdata.offset*3600);
            document.querySelector('#pres').innerHTML =localization[lang].pres + rdata.currently.pressure + localization[lang].units[units].pres_units;
            document.querySelector('#hum').innerHTML =localization[lang].hum+ ': '+ Math.round(rdata.currently.humidity*100) + '%';  

            let label_arr = document.querySelectorAll('#slidemenu > label > span');
            //labels for slidemenu
            label_arr[0].innerHTML = localization[lang].wind;
            label_arr[1].innerHTML = localization[lang].hum;
            label_arr[2].innerHTML = localization[lang].uv;
            label_arr[3].innerHTML = localization[lang].clouds;
            label_arr[4].innerHTML = localization[lang].pop;
            
            //backto button removal
            if(document.getElementsByClassName('backto')[0] != null){
              document.getElementsByClassName('backto')[0].remove();
            }
            //hourly forecast
            for(let i =0;i<24;i++){
              let pop = document.querySelectorAll('.hour > .pop' )[i];
              pop.innerHTML =water_drop + Math.round(rdata.hourly.data[i].precipProbability*100)+'%' ;
              pop.prepend(water_drop);
              document.querySelectorAll('.hour > .temp' )[i].innerHTML = Math.round(rdata.hourly.data[i].temperature) +localization[lang].units[units].temp;
              document.querySelectorAll('.hour > .sky' )[i].src = `img/icons/${rdata.hourly.data[i].icon}.svg`;
              document.querySelectorAll('.hour > .time' )[i].innerHTML = convertSeconds(rdata.hourly.data[i].time+rdata.offset*3600);
            }

            radio_events('');
            chart_summon('windSpeed', 'rgb(0,204,255)', 'rgba(0,204,255, 0.25)', localization[lang].units[units].wind_units, 0);
            document.getElementById('days-fake').checked = true;
           }
           //when current function ended it's work, we remove loading window
           if(load_text[0] != undefined){
           document.getElementsByClassName('loading')[0].remove();
           }

           current();
          
           //daily forecast
             for(let i = 0;i<8;i++){
            document.querySelectorAll('.day > .pop' )[i].innerHTML = Math.round(rdata.daily.data[i].precipProbability*100) +'%';
            document.querySelectorAll('.day > .sky')[i].src = `img/icons/${rdata.daily.data[i].icon}.svg`;
            document.querySelectorAll('.day > .temp')[i].innerHTML = Math.round(rdata.daily.data[i].temperatureMax) +localization[lang].units[units].temp;
            //date
            let date = moment(rdata.daily.data[i].time*1000);
            if(document.getElementsByClassName('weekday')[i] != null){
              document.getElementsByClassName('weekday')[i].remove();
            }
            document.querySelectorAll('.day > .date')[i].innerHTML = localization[lang][date.format('ddd')]+' ' + date.format(localization[lang].date);
            }

            
            
            
            // forecast with hours and graphs on click on the day
            let days = document.getElementsByClassName('day');
            //onclick backto we go to the current weather
            function backToCurrent(){
              let backto =document.createElement('div');
              backto.className='backto';
              backto.innerHTML = localization[lang].curr;
              backto.onclick = current;
              if(window.matchMedia('(max-width: 500px)').matches){
                document.getElementsByClassName('day')[0].before(backto);
              }else{
                document.getElementsByClassName('app_temp')[0].after(backto);
              }
            }

            for(let i = 0;i<days.length-1;i++){
              days[i].addEventListener('click', ()=>{
                videoBack(rdata.daily.data[i].icon);

              document.getElementById('slide-item-1').checked = 'checked';
                let icon = document.createElement('img');
                icon.src=`img/icons/${rdata.daily.data[i].icon}.svg`;
                icon.alt='';
                icon.className='icon';
                document.querySelector('.temp_val').innerHTML = Math.round(rdata.daily.data[i].temperatureMax) +localization[lang].units[units].temp ;
           
                document.querySelector('.app_temp').innerHTML = localization[lang].app_temp +' ' + Math.round(rdata.daily.data[i].apparentTemperatureMax) +localization[lang].units[units].temp ;
                document.querySelector('.condition').innerHTML = rdata.daily.data[i].summary;
                document.querySelector('.condition').prepend(icon);
                
                
                if(document.getElementsByClassName('backto')[0] == null){
                  backToCurrent();
                }else{
                  document.getElementsByClassName('backto')[0].remove();
                  backToCurrent();
                }
                window.onresize = ()=>{
                  if(document.getElementsByClassName('backto')[0] != null){
                    document.getElementsByClassName('backto')[0].remove();
                    backToCurrent();
                  }
                };


                document.querySelector('.propability').innerHTML = localization[lang].pop+ ': '+ Math.round(rdata.daily.data[i].precipProbability*100) + '%';
                document.querySelector('.uv').innerHTML =localization[lang].uvint +rdata.daily.data[i].uvIndex;
                document.querySelector('.clouds').innerHTML = localization[lang].clouds+ ': ' + Math.round(rdata.daily.data[i].cloudCover*100) + '%';
                document.querySelector('.wind_text > h3').innerHTML = localization[lang].wind+ ': ';
                document.querySelector('.wind_speed').innerHTML = rdata.daily.data[i].windSpeed +' '+ localization[lang].units[units].wind_units;
                document.querySelector('.wind_dir').style.transform = `rotate(${rdata.daily.data[i].windBearing+225}deg)`;
          
                  document.querySelector('#sunr').innerHTML =localization[lang].sunr +  convertSeconds(rdata.daily.data[i].sunriseTime +rdata.offset*3600);
                  document.querySelector('#suns').innerHTML =localization[lang].suns +  convertSeconds(rdata.daily.data[i].sunsetTime +rdata.offset*3600);
                  document.querySelector('#pres').innerHTML =localization[lang].pres + rdata.daily.data[i].pressure + localization[lang].units[units].pres_units;
                  document.querySelector('#hum').innerHTML =localization[lang].hum+ ': ' + Math.round(rdata.daily.data[i].humidity*100) + '%';

                radio_events(i);
                chart_summon('windSpeed', 'rgb(0,204,255)', 'rgba(0,204,255, 0.25)', localization[lang].units[units].wind_units, i);
                  
              }); 
            }
           });
    
       
    }else{
      //if browser doesn't support geolocation, we make special error notification
      load_text[0].innerHTML = localization['ru'].geo_error;
      load_text[1].innerHTML = localization['en'].geo_error;
    }
}
document.getElementById('location').onclick = load;