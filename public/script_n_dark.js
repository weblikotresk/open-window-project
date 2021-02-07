
// declaration of general functions
window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
function seasonsCheck(rdata){
  let min_temp=100;
  for(let i=0;i<rdata.daily.data.length;i++){
    if(rdata.flags.units!='si'){
      if((rdata.daily.data[i].temperatureHigh-32)*5/9<min_temp){
        min_temp= (rdata.daily.data[i].temperatureHigh-32)*5/9
      }
    }else{
      if(rdata.daily.data[i].temperatureHigh<min_temp){
        min_temp=rdata.daily.data[i].temperatureHigh;
      }
    }
  }
  if(min_temp<15 && min_temp>5){
    return '-autumn'
  }else if(min_temp<=5){
    return '-winter'
  }else if(min_temp>=15 && min_temp<20){
    return '-spring'
  }else{
    return ''
  }
}
function snowCheck(rdata, level){
  if(rdata.summary == undefined || rdata.summary =="404: Something has gone wrong.."){
    rdata.summary="404: Something has gone wrong.."
    return false
  }
  if(rdata.precipType ==undefined && rdata.icon =='fog' && (rdata.summary.includes('Туман') || rdata.summary.includes('туман') ||
  rdata.summary.includes('Fog') ||rdata.summary.includes('fog'))){
    return 'cloudy'
  }
  if((level.includes('hourly') || level.includes('daily') ||level.includes('currently'))&&
  (rdata.precipType == 'snow' &&
       (rdata.summary.includes('Туман') || rdata.summary.includes('туман') ||
       rdata.summary.includes('Fog') ||rdata.summary.includes('fog') || rdata.icon=='fog')&&
       rdata.humidity*100<99)
  )
  {
    return true
  }else if((level=='hourlysumm' || level=='dailysumm')&&
   (rdata.summary.includes('Туман') || rdata.summary.includes('туман') ||
    rdata.summary.includes('Fog') ||rdata.summary.includes('fog'))&& rdata.icon == 'snow'){
    return true
  }else{
    return false
  }
}
function fogToSnow(str, lang){
  if(str.includes('Туман')){
    return str.replace('Туман', 'Снег')
  }else if(str.includes('туман')){
    return str.replace('туман', 'снег');
  }else{
    if(lang =='ru'){
    return str.replace('.', ',') + ' возможен снег.'
    }else{
      return str.replace('Foggy', 'It may snow')
    }
  }
}
function convertSeconds(seconds){
  let time = new Date();
  time.setTime(seconds * 1000);
  return time.toISOString().slice(11,16);
}
function windIntensity(wind_speed, lang, units){
  switch(units){
    case 'us':
    case 'uk2':
      wind_speed = wind_speed/2,237
      break;
    case 'ca':
      wind_speed = wind_speed/3.6
      break;
  }
  if(wind_speed <= 0.2){
    return localization[lang].windIntensity.calm
  }
  else if(0.2< wind_speed && wind_speed <= 1.5){
    return localization[lang].windIntensity.light 
  }
  else if(1.5< wind_speed && wind_speed <= 3.3){
    return localization[lang].windIntensity.breeze  
  }
  else if(3.3< wind_speed && wind_speed <= 5.4){
    return localization[lang].windIntensity.gbreeze  
  }
  else if(5.4< wind_speed && wind_speed <= 7.9){
    return localization[lang].windIntensity.moderate  
  }
  else if(7.9< wind_speed && wind_speed <= 10.7){
    return localization[lang].windIntensity.fresh  
  }
  else if(10.7< wind_speed && wind_speed <= 13.8){
    return localization[lang].windIntensity.strong 
  }
  else if(13.8< wind_speed && wind_speed <= 17.1){
    return localization[lang].windIntensity.high 
  }
  else if(17.1< wind_speed && wind_speed <= 20.7){
    return localization[lang].windIntensity.gale 
  }
  else if(20.7< wind_speed && wind_speed <= 24.4){
    return localization[lang].windIntensity.sgale 
  }
  else if(24.4< wind_speed && wind_speed <= 28.4){
    return localization[lang].windIntensity.storm 
  }
  else if(28.4< wind_speed && wind_speed <= 32.6){
    return localization[lang].windIntensity.vstorm 
  }
  else{
    return localization[lang].windIntensity.hurricane 
  }
}
function videoBack(name,rdata){

  let date = new Date(),
   time = date.getHours(),
   postfix;
  if(name == 'clear-day' || name == 'rain'){
    postfix = seasonsCheck(rdata)
  }else{
    postfix = '';
  }
 
 
  if(localStorage.back != 'vid'){
    if((time <= 18 || time <= 5) && name == 'snow'){
      name = name + '_n';
    }
    document.querySelector('#videoBG').remove();
    let img_bg = document.createElement('img');
    img_bg.src = `https://d3aid59h00lu28.cloudfront.net/img/back/${name + postfix}.png`;
    img_bg.id = 'videoBG';
    document.body.prepend(img_bg);
  }
  else{
    if(document.querySelector('#videoBG > source') !=null){
      //daily forecast
  
      let videobg = document.createElement('video');
      videobg.setAttribute('autoplay', true);
      videobg.setAttribute('muted', true);
      videobg.setAttribute('loop', true);
      videobg.setAttribute('poster', `https://d3aid59h00lu28.cloudfront.net/img/back/${name + postfix}.png`);
      videobg.id= 'videoBG';
      videobg.classList.add('no_opacity');
  
      let mp4 = document.createElement('source');
      mp4.src = `https://d3aid59h00lu28.cloudfront.net/videos/${name + postfix}.mp4`;
      mp4.type = 'video/mp4';
      videobg.appendChild(mp4);
      let webm = document.createElement('source');
      webm.src = `https://d3aid59h00lu28.cloudfront.net/videos/webm/${name + postfix}.webm`;
      webm.type = 'video/webm';
      videobg.appendChild(webm);
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
      mp4.src = `https://d3aid59h00lu28.cloudfront.net/videos/${name + postfix}.mp4`;
      mp4.type = 'video/mp4';
      let webm = document.createElement('source');
      webm.src = `https://d3aid59h00lu28.cloudfront.net/videos/webm/${name + postfix}.webm`;
      webm.type = 'video/webm';
      document.querySelector('#videoBG').appendChild(mp4);
      document.querySelector('#videoBG').appendChild(webm);
      document.querySelector('#videoBG').classList.add('full_opacity');
      setTimeout(()=>document.querySelector('#videoBG').classList.remove('no_opacity'), 400);
    }
  }
}
function summaries(rdata, level){
  let container = '';
  if(level =='daily'){
    container='days_slider'
  }else{
    container = 'hours'
  }
  if(rdata[level].icon=='fog' && snowCheck(rdata[level], 'hourlysumm')){
    rdata[level].icon='snow';
    rdata[level].summary=fogToSnow(rdata[level].summary, localStorage.lang);
  }
  if(document.querySelector(`#${level}_summary`)==undefined){
    document.querySelector(`#${container}`).insertAdjacentHTML('beforebegin', `
    <div id="${level}_summary">
      <img class="summary_img" alt="${rdata[level].icon}" width="45px" height="45px" src="https://d3aid59h00lu28.cloudfront.net/img/icons/${rdata[level].icon}.svg">
      <span>${rdata[level].summary}</span>
    </div>
    `) 
  }else{
    if(level =='daily'){
      document.getElementsByClassName('summary_img')[1].src = `https://d3aid59h00lu28.cloudfront.net/img/icons/${rdata[level].icon}.svg`;
    }else{
      document.getElementsByClassName('summary_img')[0].src = `https://d3aid59h00lu28.cloudfront.net/img/icons/${rdata[level].icon}.svg`;
    }
    document.querySelector(`#${level}_summary > span`).innerHTML = rdata[level].summary;
  }
}
function getCardinalDirection(angle, directions) {
  let val = Math.floor((angle / 45) + 0.5);
  return directions[(val % 8)];
}
//setting city name
function cityName(city){
  if(document.querySelector('.city') == null){
    let text = document.createElement('span');
    text.classList.add('city');
    if(city.city == ''){
      text.innerHTML = city.locality + ', ' + city.countryName;
    }else{
      text.innerHTML = city.city + ', ' + city.countryName;
    }
    let block = document.getElementById('current');
    block.append(text);
  }
  else if(city.city == ''){
    document.querySelector('.city').innerHTML = city.locality + ', ' + city.countryName;
  }
  else{
    document.querySelector('.city').innerHTML = city.city + ', ' + city.countryName;
  
  }

}
//checking if localStorage stores any data from DS (Dark Sky)
function isCache(){
  let today=new Date();
  today=today.getTime();
  let cached_objects= localStorage.getItem('cached_data');
  cached_objects = JSON.parse(cached_objects);
  console.log(cached_objects);
  if(cached_objects==null || today>cached_objects[0].daily.data[6].time*1000){
    return [false];
  }else{
    return [true, today, cached_objects];
  }
}
//getWeather gets forecast for specific coords and turns output into promise
async function getWeather(latitude, longitude, language, unit, city){
  let cache_result = isCache(), cached_objects = cache_result[2], today = cache_result[1];
  const api_url = `weather/${latitude},${longitude}/${language}/${unit}`;
  const options = {
    method: "GET",
    withCredentials: true,
    headers:{
        'Content-Type':'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
  }
  //response varies due to different time of request
  if(cache_result[0]==false || city.locality!=cached_objects[1].locality){
    //after 6 days we are fetchng new data
    console.log('after 6 days');
    const response = await fetch(api_url, options);
    const rdata = await response.json();
    return [rdata, city, 8, 169]; 
   }else if (today-cached_objects[0].currently.time*1000>28800000){
     //before 6 days, but after 8 hours since first request
     document.getElementsByClassName('updating')[0].classList.toggle('updating_closed');
     let days_counter=Math.round((cached_objects[0].daily.data[7].time*1000-today)/86400000)+1;
     let hour_counter=Math.round((cached_objects[0].daily.data[7].time*1000-today)/3600000);
     console.log('before 6 days, but after 8 hours', hour_counter);
     return [cached_objects[0], cached_objects[1], days_counter ,hour_counter];
   }else if (today-cached_objects[0].currently.time*1000<28800000){
     //before 8 hours since first request
    let days_counter=Math.round((cached_objects[0].daily.data[7].time*1000-today)/86400000)+1;
    let hour_counter=Math.round((cached_objects[0].hourly.data[168].time*1000-today)/3600000)+1;
    console.log('before 8 hours', days_counter);
    return [cached_objects[0], cached_objects[1],days_counter,hour_counter];
  }
}
//anchor appearing/disappearing logic
window.onscroll = ()=>{
  if(window.matchMedia('(max-width: 1000px)').matches == false){
    if(window.pageYOffset>document.documentElement.clientHeight){
    document.getElementsByClassName('anchor_wrapper')[0].classList.remove('hide_anchor');
  }else{
    document.getElementsByClassName('anchor_wrapper')[0].classList.add('hide_anchor');
  }
}
  else{
    if(window.pageYOffset>document.documentElement.clientHeight){
      document.getElementsByClassName('anchor_wrapper')[0].classList.add('hide_anchor');
    }else{
      document.getElementsByClassName('anchor_wrapper')[0].classList.remove('hide_anchor');
    }
  }
};

//general variables

let localization = {
  'ru':{
    app_temp:'Ощущается как: ',
    pop:'Вероятность осадков',
    uv:'Интенсивность УФ ',
    uvint:'Интенсивность УФ: ',
    clouds:'Облачное покрытие',
    temp:'Температура',
    wind:'Ветер',
    sunr:'Рассвет: ',
    suns:'Закат: ', 
    pres:'Давление: ',
    hum:'Влажность',
    dwp:'Точка росы',
    date:'DD.MM',
    curr:'Текущая погода',
    local:'Язык',
    uni:'Единицы измерения',
    back:'Фон',
    back_p:'Эта опция позволяет вам выбрать фон сайта. Фон-изображение может заметно сократить время загрузки.',
    img:'Изображение',
    vid:'Видео',
    source:'Источники',
    tochange:'Чтобы подвердить изменения, закройте окно настроек. Страница автоматически перезагрузится.',
    loading:'Страница загружается, пожалуйста, подождите.',
    not_load:'Если страница долго не загружается, проверьте, включена ли геолокация на вашем устройстве и разрешено ли её использование на этом сайте.',
    geo_error:'Версия вашего браузера не поддерживает функцию передачи геолокации сторонним сайтам. Обновите его до последней версии и попробуйте снова.',
    wind_dir_h:'Направление ветра<br><span>(только для мобильных устройств)</span>',
    wind_dir:'Эта функция включает автопозиционирование стрелки, которая показывает направление ветра относительно Северного полюса.<br> Может работать не на всех устройствах.<br> Если ваш компас работает некорректно, откалибруйте его в Google/Apple Maps.',
    directions:['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'],
    on:'Включить',
    off:'Выключить',
    compass_error:'Ваш браузер не поддерживает получение данных компаса. Пожалуйста, обновите его до последней версии и попробуйте снова.',
    compass_f:'Сервис не смог получить информацию компаса. Обновите ваш браузер до последней версии и попробуйте снова.',
    search_place:'Название города...',
    not_found:'По вашему запросу ничего не было найдено. Пожалуйста, попробуйте ещё раз.',
    undefined:'Не определено (полярный день/ночь)',
    updated:'Ваши данные на ',
    refresh:`Обновить 
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" class='refresh_icon' x="0px" y="0px" viewBox="0 0 489.711 489.711" style="enable-background:new 0 0 489.711 489.711;" xml:space="preserve">
<g>
	<g>
		<path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"/>
		<path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8    c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4    C456.056,357.911,481.656,274.811,462.456,195.511z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    `,
    details:'Рассвет/закат, точка росы, давление и др.',
    details_hide:'Скрыть',
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
    windIntensity:{
      calm:'Штиль, ',
      light:'Тихий, ',
      breeze:'Лёгкий, ',
      gbreeze:'Слабый, ',
      moderate:'Умеренный, ',
      fresh:'Свежий, ',
      strong:'Сильный, ',
      high:'Крепкий, ',
      gale:'Очень крепкий, ',
      sgale:'Шторм, ',
      storm:'Сильный шторм, ',
      vstorm:'Жестокий шторм, ',
      hurricane:'Ураган, ',
    },
    tooltips:[`Здесь вы можете настроить сайт согласно вашим предпочтениям: изменить язык, единицы измерения и т.д.`,
    `Нажав на любую из этих иконок, вы сможете увидеть прогноз погоды в данный день.`,
]
  }, 
  'en':{
    app_temp:'Feels like: ',
    pop:'Precipation',
    uvint:'UV intensity: ',
    uv:'UV',
    temp:'Temparature',
    clouds:'Cloud coverage',
    wind:'Wind',
    sunr:'Sunrise: ',
    suns:'Sunset: ', 
    pres:'Pressure: ',
    hum:'Humidity',
    dwp:'Dew point',
    date:'MM.DD',
    curr:'Current mode',
    local:'Language',
    uni:'Units of measurements',
    back:'Background',
    back_p:'This option lets you choose your background. Consider using image background if the website takes too long to load.',
    img:'Image',
    vid:'Video',
    source:'Sources',
    tochange:'Close the settings window to confirm the changes. The page will automatically reload.',
    geo_error:'Your browser version does not support the function of transferring geolocation to third-party sites. Please update it to the latest version and try again.',
    wind_dir_h:'Wind direction<br><span>(only for mobile devices)</span>',
    wind_dir:"This function enables auto-positioning of the wind arrow relative to the North Pole.<br> May not work on every device.<br> If the compass doesn't work correctly, consider recalibrate it in the Google/Apple Maps.",
    directions:['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    //directions:['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'],

    on:'On',
    off:'Off',
    compass_error:'Compass heading is not available in your browser. Consider update it to the last version and try again.',
    compass_f:'Could not retrieve absolute orientation. Consider update your browser to the last version and try again.',
    search_place:'City name...',
    not_found:'Nothing has been found. Please, try again.',
    undefined:'Undefined (polar day/night)',
    updated:'Your data is on ',
    refresh:`Update  
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" class='refresh_icon' x="0px" y="0px" viewBox="0 0 489.711 489.711" style="enable-background:new 0 0 489.711 489.711;" xml:space="preserve">
<g>
	<g>
		<path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"/>
		<path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8    c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4    C456.056,357.911,481.656,274.811,462.456,195.511z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    `,
    details:'Sunrise/sunset, dew point, pressure and more.',
    details_hide:'Hide',
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
    windIntensity:{
      calm:'Calm, ',
      light:'Light air, ',
      breeze:'Light breeze, ',
      gbreeze:'Gentle breeze, ',
      moderate:'Moderate breeze, ',
      fresh:'Fresh breeze, ',
      strong:'Strong breeze, ',
      high:'High wind, ',
      gale:'Gale, ',
      sgale:'Strong gale, ',
      storm:'Storm, ',
      vstorm:'Violent storm, ',
      hurricane:'Hurricane, ',
    },
    tooltips:[`Here you can customize the site according to your preferences: change the language, units of measurement, etc.`,
    `If you click on any of these icons, you will see the weather forecast for that day.`],
  },
},
settingsIcon = document.querySelector('#settings > svg'),
closeBtn = document.getElementById('close_settings'),
lat = '37.42158889770508',
lon = '-122.08370208740234',
searchIcon = document.querySelector('#search > img'),
closeSearch = document.querySelector('#close_search');

//Settings 

//Settings are using localStorage, so we store data there

//setting default localStorage data
if(localStorage.tools == undefined){
  localStorage.lang = 'ru';
  localStorage.units = 'si';
  localStorage.wind = 'off';
  localStorage.back = 'vid';
  localStorage.location = 'off';
  localStorage.tools= 'true';
  if(window.mobileAndTabletCheck()){
    localStorage.wind = 'on';
  }
}
//logic behind settings 
let settingsInputs =[];
settingsInputs[0] =  document.querySelectorAll('.lang');
settingsInputs[1] =  document.querySelectorAll('.units');
settingsInputs[2] =  document.querySelectorAll('.wind-input');
settingsInputs[3] =  document.querySelectorAll('.back-input');

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
  for(let i =0;i<settingsInputs[3].length; i++){

    if(localStorage.back == settingsInputs[3][i].value){
      settingsInputs[3][i].checked = true;
    }
    settingsInputs[3][i].addEventListener('click', ()=>{
      localStorage.back = settingsInputs[3][i].value;
    })
  }

settingsIcon.addEventListener('click', ()=>{
  //open the settings window
  document.getElementsByClassName('settings_window')[0].style.zIndex = 2;
  document.getElementsByClassName('settings_window')[0].style.clipPath = 'circle(100%)';
});

closeBtn.addEventListener('click', ()=>{
  //close the settings window
    document.getElementsByClassName('settings_window')[0].style.clipPath = 'circle(0.1% at 53.6% 2.2%)'; 
    setTimeout(()=>{document.getElementsByClassName('settings_window')[0].style.zIndex = -2;
    localStorage.removeItem('cached_data');
    location.reload();
    return false;}, 550);
});
searchIcon.addEventListener('click', ()=>{
  //open the search window
  document.getElementsByClassName('search_window')[0].style.zIndex = 5;
  document.getElementsByClassName('search_window')[0].style.clipPath = 'circle(200%)';
});
closeSearch.addEventListener('click', ()=>{
  //close the search window
    document.getElementsByClassName('search_window')[0].style.clipPath = 'circle(0.1% at 55.6% 28.2%)'; 
    setTimeout(()=>{document.getElementsByClassName('search_window')[0].style.zIndex = -5;
    return false;}, 550);
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

//function starts when the page is ready
function loaded(request_data = localStorage, cached_coords){
  let promise;
  if(localStorage != request_data){
    request_data = localStorage;
  }
  //service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
       navigator.serviceWorker.register('/sw.js').then(function(registration) {
      //   // Registration was successful
         console.log('ServiceWorker registration successful with scope: ', registration.scope);
       }, function(err) {
      //   // registration failed :(
         console.log('ServiceWorker registration failed: ', err);
       });
    });
  }
  if('geolocation' in navigator){
    let lang = request_data.lang,
    units = request_data.units;
    let input_field = document.getElementById('city_input'),
    createTools = true,
    city_data=[],
    city_promise,
    cache_results=isCache();
    input_field.setAttribute('placeholder', localization[lang].search_place);

    //focusing from keyboard
    function Focusing(blocks, input){
      var divs = document.getElementsByClassName(blocks), selectedDiv = 0,i;
      for(i = 0; i < divs.length; i++){
        divs[i].onmouseover = (function(i){
          return function(){
            divs[selectedDiv].style.backgroundColor = '';
            selectedDiv = i;
            divs[selectedDiv].style.backgroundColor = '#68F';
          }
        })(i);
      }
      divs[selectedDiv].style.backgroundColor = '#68F';
      
      document.getElementById(input).onkeydown = function(e){
        var x = 0;
        if(e.key == "ArrowUp")
            x = -1;
        else if(e.key == "ArrowDown")
            x = 1;
          else if(e.key == "Enter"){
            divs[selectedDiv].click();
            document.getElementById(input).focus();
          } 
        else
          return;
        divs[selectedDiv].style.backgroundColor = '';
        selectedDiv = ((selectedDiv+x)%divs.length);
        selectedDiv = selectedDiv < 0 ? 
          divs.length+selectedDiv : selectedDiv;
        divs[selectedDiv].style.backgroundColor = '#68F'; 
      };

    }
    //logic behind search and it's results
    function Cities(){
        fetch(`https://api.teleport.org/api/cities/?search=${input_field.value}&limit=8`)
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{
          //when input is clear or result isn't obtainable
          if(data.count == 0 || input_field.value==' '){
            let items = document.querySelectorAll('.auto_item');
            let auto_wrapper = document.createElement('div');
              auto_wrapper.className = 'auto_wrapper';
              document.getElementsByClassName('search_window')[0].append(auto_wrapper);
              for(let j=0;j<items.length;j++){
                items[j].remove();
              }
              if(document.querySelector('.not_found') != undefined){
                document.querySelector('.not_found').remove();
              }
              city_data=[];
              let auto_item = document.createElement('span');
              auto_item.className = 'not_found';
              auto_item.innerHTML = localization[lang].not_found;
              document.querySelector('.auto_wrapper').append(auto_item);
          }
          else{
            //when data is obtainable
            if(createTools && input_field.value!=' ' && input_field.value !=''){
              if(document.querySelector('.not_found') != undefined){
                document.querySelector('.not_found').remove();
              }
              let auto_wrapper = document.createElement('div');
              auto_wrapper.className = 'auto_wrapper';
              document.getElementsByClassName('search_window')[0].append(auto_wrapper);
              createTools=false;
              
              for(let i = 0;i<data._embedded['city:search-results'].length;i++){
                city_data[i] = data._embedded['city:search-results'][i].matching_full_name;
                document.querySelector('.auto_wrapper').insertAdjacentHTML('beforeend',`
                <input type='radio' name='search_res' id='search_${i}'>
                <label for='search_${i}'><span class='auto_item'>${city_data[i]}</span></label>`);
                let search_res = document.getElementById(`search_${i}`);
                search_res.onclick =()=>{ 

                  fetch(data._embedded['city:search-results'][i]._links["city:item"].href).then((response)=>{
                    return response.json();
                  }).then((data)=>{
                    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.location.latlon.latitude}&longitude=${data.location.latlon.longitude}&localityLanguage=${lang}`).then((response) => {
                        return response.json();
                      })
                      .then((city) => {
                        city_promise = getWeather(data.location.latlon.latitude, data.location.latlon.longitude, lang, units,city);
                        city_promise.then(data_set=>{
                          console.log(data_set);
                          document.getElementsByClassName('search_window')[0].style.clipPath = 'circle(0.1% at 53.6% 6.2%)'; 
                          setTimeout(()=>{document.getElementsByClassName('search_window')[0].style.zIndex = -5;
                          return false;}, 550);
                          wrapper(data_set);
                          cityName(data_set[1]);
                        });
                      });
                  })}
                }
              Focusing('auto_item', 'city_input');
            }
            else if(input_field.value !='' && input_field.value!=' '){
              if(document.querySelector('.not_found') != undefined){
                document.querySelector('.not_found').remove();
              }
                let items = document.querySelectorAll('.auto_item');
                for(let j=0;j<items.length;j++){
                  items[j].remove();
                }
                city_data=[];
                for(let i = 0;i<data._embedded['city:search-results'].length;i++){
                  city_data[i] = data._embedded['city:search-results'][i].matching_full_name;
                  document.querySelector('.auto_wrapper').insertAdjacentHTML('beforeend',`
                  <input type='radio' name='search_res' id='search_${i}'>
                  <label for='search_${i}'><span class='auto_item'>${city_data[i]}</span></label>`);
                  let search_res = document.getElementById(`search_${i}`);
                  search_res.onclick =()=>{ 
                    fetch(data._embedded['city:search-results'][i]._links["city:item"].href).then((response)=>{
                      return response.json();
                    }).then((data)=>{
                      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.location.latlon.latitude}&longitude=${data.location.latlon.longitude}&localityLanguage=${lang}`).then((response) => {
                          return response.json();
                        })
                        .then((city) => {
                          city_promise = getWeather(data.location.latlon.latitude, data.location.latlon.longitude, lang, units,city);
                          city_promise.then(data_set=>{
                            document.getElementsByClassName('search_window')[0].style.clipPath = 'circle(0.1% at 53.6% 6.2%)'; 
                          setTimeout(()=>{document.getElementsByClassName('search_window')[0].style.zIndex = -5;
                          return false;}, 550);
                            console.log(data_set);
                            wrapper(data_set);
                            cityName(data_set[1]);
                          });
                        });
                    })}
                  }
                Focusing('auto_item', 'city_input');
              }
            else{
              if(document.querySelector('.auto_wrapper')!=undefined){
                document.querySelector('.auto_wrapper').remove();
              }
              createTools = true;
            }
          }
        });
    }
    input_field.oninput= Cities;

    function getPreciseLocation() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let return_data;
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=${lang}`).then((response) => {
            return response.json();
          })
          .then((data) => {
            return_data = data;
            resolve([position.coords.latitude, position.coords.longitude, lang, units, return_data]);
          });
        });
      });
    }
    //loading starts here
    if(localStorage.location == 'off' || cached_coords!=undefined){
      if(cached_coords!=undefined){
        lat= cached_coords[0];
        lon=cached_coords[1];
      }
      //sending data to cityName and getWeather
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${lang}`).then((response) => {
        return response.json();
      })
      .then((data) => {
      promise = getWeather(lat, lon, lang, units,data);
      promise.then(result=>{
        cityName(result[1]);
        wrapper(result);
      });
      })
    }else if(cache_results[0]){
      let cached_objects=cache_results[2], today = cache_results[1];
        if (today-cached_objects[0].currently.time*1000>28800000){
          //before 6 days, but after 8 hours since first request
          document.getElementsByClassName('updating')[0].classList.toggle('updating_closed');
          let days_counter=Math.round((cached_objects[0].daily.data[7].time*1000-today)/86400000)+1;
          let hour_counter=Math.round((cached_objects[0].hourly.data[168].time*1000-today)/3600000)+1;
          console.log('before 6 days, but after 8 hours', hour_counter);
          cityName(cached_objects[1]);
          wrapper([cached_objects[0], cached_objects[1], days_counter ,hour_counter]);
        }else{
          //before 8 hours since first request
          let days_counter=Math.round((cached_objects[0].daily.data[7].time*1000-today)/86400000)+2;
          let hour_counter=Math.round((cached_objects[0].hourly.data[168].time*1000-today)/3600000)+1;
          console.log('before 8 hours', days_counter);
          cityName(cached_objects[1]);
          wrapper([cached_objects[0], cached_objects[1], days_counter ,hour_counter]);
        }
    }else if(cached_coords!=undefined){
      promise = getPreciseLocation().then(result =>getWeather(result[0], result[1], result[2],result[3], result[4]));
      promise.then(data_set=>{
        cityName(data_set[1]);
        wrapper(data_set);
      });
    }else{
      promise = getPreciseLocation().then(result =>getWeather(result[0], result[1], result[2],result[3], result[4]));
      promise.then(data_set=>{
        cityName(data_set[1]);
        wrapper(data_set);
      });
    }
    // main function
    function wrapper(rdata){
      //rdata is getWeather promise resolve
      localStorage.setItem('cached_data', JSON.stringify(rdata));
      let city = rdata[1],
      days_counter= rdata[2],
      hour_counter=rdata[3];
      rdata = rdata[0];
      let data_time= convertSeconds(rdata.currently.time+rdata.offset*3600);
      let data_date = moment(rdata.currently.time*1000);
      document.getElementsByClassName('updating')[0].innerHTML = `
      <span>${localization[lang].updated}${data_time}, ${data_date.format('DD[.]MM[.]YYYY')}</span>
      <span>${localization[lang].refresh}</span>
      `;
      document.getElementsByClassName('updating_footer')[0].innerHTML = `
      <span>${localization[lang].updated}${data_time}, ${data_date.format('DD[.]MM[.]YYYY')}</span>
      <span>${localization[lang].refresh}</span>
      `;
      
      console.log(city, rdata);
      function compass(event){
        var alpha;
        const delta = 225;
        if(wind_mode == 'currently'){
          if (event.absolute) {
            alpha = event.alpha;
          } else if (event.hasOwnProperty('webkitCompassHeading')) {
            // get absolute orientation for Safari/iOS
            alpha = 360 - event.webkitCompassHeading; // conversion taken from a comment on Google Documentation, not tested
          } else {
              console.log('Could not retrieve absolute orientation');
              alpha = rdata[wind_mode].windBearing + 45;
          }
          alpha = alpha + delta - rdata[wind_mode].windBearing;
        document.querySelector('.wind_dir').style.transform = `rotate(${alpha}deg)`;
        }else{
          
          if (event.absolute) {
            alpha = 360 - event.alpha;
          } else if (event.hasOwnProperty('webkitCompassHeading')) {
            // get absolute orientation for Safari/iOS
            alpha = 360 - event.webkitCompassHeading; // conversion taken from a comment on Google Documentation, not tested
          } else {
              alpha = wind_mode.windBearing + 45;
          }
          alpha = alpha + delta - wind_mode.windBearing;
        document.querySelector('.wind_dir').style.transform = `rotate(${alpha}deg)`;
        }
        
      }

      let wind_mode ='currently';
      function wind_arrow(mode, i){
        //mode = currently, daily, hourly
        wind_mode = mode;
        if(wind_mode!='currently'){
          wind_mode = rdata[wind_mode].data[i];
        }else{
          wind_mode= rdata[wind_mode];
        }
        
        //if wind is turned off, we remove deviceorientation
        // event and set normal mode for the wind arrow
        if ('ondeviceorientationabsolute' in window && localStorage.wind == 'on') {
          // Chrome 50+ specific
          window.addEventListener('deviceorientationabsolute', compass);
        } else if ('ondeviceorientation' in window && localStorage.wind == 'on') {
          window.addEventListener('deviceorientation', compass);
        }else if(localStorage.wind == 'off' || localStorage.wind == undefined){
          window.removeEventListener('deviceorientationabsolute', compass);
          window.removeEventListener('deviceorientation', compass);
          setTimeout(()=>
          document.querySelector('.wind_dir').style.transform = `rotate(${wind_mode.windBearing+225}deg)`, 1000);
        }else{
          alert(localization[lang].compass_error);
          document.querySelector('.wind_dir').style.transform = `rotate(${wind_mode.windBearing+225}deg)`;
        }
      }
      //slidemenu manage which chart to summon onclick on slidemenu
      function slidemenu(value, option){
        switch(value){
          case 'temp':
            chart_summon('temperature',  'rgb(255, 81, 81)', 'rgba(255, 81, 81, 0.25)', localization[lang].units[units].temp, option);
          break;
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
      let water_drop = document.createElement('img');
        water_drop.src = 'https://d3aid59h00lu28.cloudfront.net/img/icons/water.svg';
        water_drop.width="13px";
        water_drop.height="13px";
        water_drop.className = 'pop_drop';
        water_drop.alt = 'Precip'
      function hourSetter(mode, option){
        let create_hours=true,
        chart_data = [],
        max_chart =0,
        chart_labels = [];
        if(document.querySelector('.hour')==null){
          create_hours=true;
        }else{
          create_hours=false;
        }
        if(mode<1000 && mode!=0){
          let j = 0;
          for(let i =mode; i<mode+24;i++){
            //current data
            if(option == 'cloudCover' || option == 'humidity' || option == 'precipProbability'){
              chart_data[j] = Math.round(rdata.hourly.data[i][option]*100);
            }else{
              chart_data[j] = Math.round(rdata.hourly.data[i][option]);
            }
            let pop_icon = water_drop.cloneNode(true);
            let sky_icon = rdata.hourly.data[i].icon;
            if(snowCheck(rdata.hourly.data[i], 'hourly') == 'cloudy'){
              sky_icon = 'cloudy'
            }else
              if(snowCheck(rdata.hourly.data[i], 'hourly') && sky_icon=='fog'){
                sky_icon='snow';
              }
            if(create_hours){
              
              document.querySelector("#hours").insertAdjacentHTML('beforeend',`
              <div class="hour">
                <div class="pop">${Math.round(rdata.hourly.data[i].precipProbability*100)}%</div>
                    <img src="https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg" alt="${sky_icon}" width="60px" height="60px" class="sky">
                    <div class="temp">${Math.round(rdata.hourly.data[i].temperature) +localization[lang].units[units].temp}</div>
                    <div class="time">${convertSeconds(rdata.hourly.data[i].time+rdata.offset*3600)}</div>
              </div>
              `);
              document.querySelectorAll('.hour > .pop' )[j].prepend(pop_icon);
              j++;
            }else{
              document.querySelectorAll('.hour > .pop' )[j].innerHTML = Math.round(rdata.hourly.data[i].precipProbability*100) +'%';
              document.querySelectorAll('.hour > .temp' )[j].innerHTML = Math.round(rdata.hourly.data[i].temperature) +localization[lang].units[units].temp;
              document.querySelectorAll('.hour > .sky' )[j].src = `https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg`;
              document.querySelectorAll('.hour > .time' )[j].innerHTML = convertSeconds(rdata.hourly.data[i].time+rdata.offset*3600);
              document.querySelectorAll('.hour > .pop' )[j].prepend(pop_icon);
              j++;
            }
            chart_labels[j-1] = convertSeconds(rdata.hourly.data[i].time+rdata.offset*3600);
            //max_chart makes chart go higher it's maximum value
            if(max_chart < chart_data[j-1]){
              max_chart = chart_data[j-1];
            }
          }
        }else if (mode==0){
              for(let j =0; j<24;j++){
                //current (for real)
                let sky_icon = rdata.hourly.data[j].icon;
                if(snowCheck(rdata.hourly.data[j], 'hourly') == 'cloudy'){
                  sky_icon = 'cloudy'
                }else
                if(snowCheck(rdata.hourly.data[j], 'hourly') && sky_icon=='fog'){
                  sky_icon='snow';
                }
                let pop_icon = water_drop.cloneNode(true);
                if(create_hours){
                  document.querySelector("#hours").insertAdjacentHTML('beforeend',`
                  <div class="hour">
                    <div class="pop">${Math.round(rdata.hourly.data[j].precipProbability*100)}%</div>
                        <img src="https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg" alt="${sky_icon}" width="60px" height="60px" class="sky">
                        <div class="temp">${Math.round(rdata.hourly.data[j].temperature) +localization[lang].units[units].temp}</div>
                        <div class="time">${convertSeconds(rdata.hourly.data[j].time+rdata.offset*3600)}</div>
                  </div>
                  `);
                  document.querySelectorAll('.hour > .pop' )[j].prepend(pop_icon);
                }else{
                  document.querySelectorAll('.hour > .pop' )[j].innerHTML = Math.round(rdata.hourly.data[j].precipProbability*100) +'%';
                  document.querySelectorAll('.hour > .temp' )[j].innerHTML = Math.round(rdata.hourly.data[j].temperature) +localization[lang].units[units].temp;
                  document.querySelectorAll('.hour > .sky' )[j].src = `https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg`;
                  document.querySelectorAll('.hour > .time' )[j].innerHTML = convertSeconds(rdata.hourly.data[j].time+rdata.offset*3600);
                  document.querySelectorAll('.hour > .pop' )[j].prepend(pop_icon);
                }
                if(option == 'cloudCover' || option == 'humidity' || option == 'precipProbability'){
                chart_data[j] = Math.round(rdata.hourly.data[j][option]*100);
              }else{
                chart_data[j] = Math.round(rdata.hourly.data[j][option]);
              }
              chart_labels[j] = convertSeconds(rdata.hourly.data[j].time+rdata.offset*3600);
              if(max_chart < chart_data[j]){
                max_chart = chart_data[j];
              }
              }
        }
        else if(mode>=1000){
          mode=mode/1000;
          for(let i = mode; i<rdata.hourly.data.length;i++){
            
            if(rdata.hourly.data[i].time == rdata.daily.data[mode].time){
              for(let j =0; j<24;j++){
                //hourly for daily
                let sky_icon = rdata.hourly.data[i+j].icon;
                if(snowCheck(rdata.hourly.data[i+j], 'hourly') == 'cloudy'){
                  sky_icon = 'cloudy'
                }else
                if(snowCheck(rdata.hourly.data[i+j], 'hourly') && sky_icon=='fog'){
                  
                  sky_icon='snow';
                }
                let pop_icon = water_drop.cloneNode(true);
                if(create_hours){
                  document.querySelector("#hours").insertAdjacentHTML('beforeend',`
                  <div class="hour">
                    <div class="pop">${Math.round(rdata.hourly.data[i+j].precipProbability*100)}%</div>
                        <img src="https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg" alt="${sky_icon}" width="60px" height="60px" class="sky">
                        <div class="temp">${Math.round(rdata.hourly.data[i+j].temperature) +localization[lang].units[units].temp}</div>
                        <div class="time">${convertSeconds(rdata.hourly.data[i+j].time+rdata.offset*3600)}</div>
                  </div>
                  `);
                  document.querySelectorAll('.hour > .pop' )[j].prepend(pop_icon);
                }else{
                  document.querySelectorAll('.hour > .pop' )[j].innerHTML = Math.round(rdata.hourly.data[i+j].precipProbability*100) +'%';
                  document.querySelectorAll('.hour > .temp' )[j].innerHTML = Math.round(rdata.hourly.data[i+j].temperature) +localization[lang].units[units].temp;
                  document.querySelectorAll('.hour > .sky' )[j].src = `https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg`;
                  document.querySelectorAll('.hour > .time' )[j].innerHTML = convertSeconds(rdata.hourly.data[i+j].time+rdata.offset*3600);
                  document.querySelectorAll('.hour > .pop' )[j].prepend(pop_icon);
                }
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
        return [chart_data, max_chart, chart_labels];
      }
      function chart_summon(option, option_color, option_back, axis_l, mode){
        //restart chart
        
        document.getElementById('myChart').remove();
        let chart_block = document.createElement('canvas');
        chart_block.id = 'myChart';
        document.getElementsByClassName('chart-container')[0].append(chart_block);

        //chart
      let hour_ret=hourSetter(mode, option),
      chart_data = hour_ret[0],
      max_chart =hour_ret[1],
      chart_labels = hour_ret[2];
      //coef helps max_chart to fix chart maximum
      let coef =0;
      if(max_chart > 70){
        coef = 30;
      }else{
        coef = 3;
        //tooltip_pos = 'bottom';
      }
      //using chart.js library
      let ctx = document.getElementById('myChart').getContext('2d');
      let bor_width, chartColors;
          if(option == 'temperature'){
            bor_width = 6
            chartColors= {
              blue:'rgb(153, 206, 255)',
              yellow:'rgb(224, 209, 0)',
              red:'rgb(255, 99, 51)',
            };
            let min_t = 0;
            for(let i = 0;i<chart_data.length;i++){
              if(chart_data[i]<0){
                min_t++;
              }
            }
            if(min_t>chart_data.length/2){
              option_back = 'rgba(56, 75, 243, 0.3)'
              chartColors= {
                blue:'rgb(56, 75, 243)',
                yellow:'rgb(33, 214, 250)',
                red:'rgb(24, 190, 140)',
              };
            }else{
              option_back = 'rgba(255, 81, 81, 0.25)'
            }
          }else{
            bor_width = 3;
          }
        let gradient =null;

        
          let chart = new Chart(ctx, {
            type: 'line',
      
            data: {
                labels: chart_labels,
                datasets: [{
                    label: '',
                    fill:true,
                    backgroundColor: option_back,
                    borderColor: function(context) {
                      var chartArea = context.chart.chartArea;
                      if (!chartArea) {
                        // This case happens on initial chart load
                        return null;
                      }
                      if(option == 'temperature'){
                        if (gradient === null) {
                          // Create the gradient because this is either the first render
                          // or the size of the chart has changed
                          let ctx = context.chart.ctx;
                          gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                          gradient.addColorStop(0, chartColors.blue);
                          gradient.addColorStop(0.5, chartColors.yellow);
                          gradient.addColorStop(1, chartColors.red);}
                      }
                      else{
                        gradient = option_color;
                      }
                      return gradient;
                    },
                    data: chart_data,
                    borderWidth:bor_width
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
                      
                    backgroundColor: 'rgba(0, 0, 0, 0)',
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
      //tooltips
      function secondTooltip(){
        tippy(document.getElementsByClassName('day')[0], {
          content: localization[lang].tooltips[1],
          theme:'normal',
          sticky: true,
          arrow: true,
          showOnCreate: true,
          placement: 'top',
          delay:500,
          maxWidth:250,
          onHidden(Tooltip) {
            Tooltip.destroy();
            localStorage.tools = 'false';
        },
      });
      }
      function firstTooltip(){
        const instance = tippy(settingsIcon, {
          content: localization[lang].tooltips[0],
          theme:'normal',
          sticky: true,
          arrow: true,
          showOnCreate: true,
          placement: 'bottom',
          delay:500,
          maxWidth:250,

          onHidden(Tooltip) {
            Tooltip.destroy();
            window.scrollBy(0, document.body.scrollHeight);
            secondTooltip();
          }
        });
      }     

      //setting_headlines 
      let settings_headlines = document.querySelectorAll('.settings-item_label > h3');
      settings_headlines[0].innerHTML = localization[lang].local;
      settings_headlines[1].innerHTML =localization[lang].uni;
      settings_headlines[2].innerHTML = localization[lang].wind_dir_h;
      settings_headlines[3].innerHTML = localization[lang].back;
      settings_headlines[4].innerHTML = localization[lang].source;
      document.querySelector('.settings_block > span').innerHTML = localization[lang].tochange;
      document.querySelector('.wind-settings  p').innerHTML = localization[lang].wind_dir;
      document.querySelector('.settings_item  p').innerHTML = localization[lang].back_p;

      let wind_options = document.querySelectorAll('.turn_wind');
      wind_options[0].innerHTML = localization[lang].on;
      wind_options[1].innerHTML = localization[lang].off;

      let back_options = document.querySelectorAll('.back-label > span');
      back_options[0].innerHTML = localization[lang].img;
      back_options[1].innerHTML = localization[lang].vid;
      document.querySelector('#legal > p> span').innerHTML = '2020-' + moment().format('YYYY');

      let show_details = document.getElementById('show_details'),
      details_opened = false;
      show_details.innerHTML = localization[lang].details;
      show_details.onclick = ()=>{
          if(window.matchMedia('(max-width: 550px)').matches){
          document.getElementsByClassName('details_wrap')[0].classList.toggle('details_opened');
          if(details_opened){
            details_opened=false;
            setTimeout(()=>{
              document.getElementsByClassName('details_wrap')[0].classList.toggle('details_hide');
              show_details.innerHTML = localization[lang].details;
              },210);
          }else{
            details_opened=true;
            show_details.innerHTML = localization[lang].details_hide;
            setTimeout(()=>document.getElementsByClassName('details_wrap')[0].classList.toggle('details_hide'),210);
          }
        }
      }

      //current function delivers rdata to every block that needs it
      function current(i){
        let option= rdata.currently;
        if(i>0){
          option=rdata.hourly.data[i];
        }
        let snow = snowCheck(option, 'currently');
        if(window.matchMedia('(max-width: 700px)').matches && window.matchMedia('(max-width: 550px)').matches == false){
          document.getElementById('details').style.marginTop = '-40px';
          document.getElementById('other').style.marginTop = '-40px';
        }else if(window.matchMedia('(max-width: 550px)').matches){
          document.getElementById('other').style.marginTop = '0';
          document.getElementById('details').style.marginTop = '0';
        }
        
        summaries(rdata, 'hourly');
        summaries(rdata, 'daily');
        let icon = document.createElement('img');
        let sky_icon = option.icon;
        if(snow){
          if(sky_icon == 'fog'){
            icon.src=`https://d3aid59h00lu28.cloudfront.net/img/icons/snow.svg`;
            icon.alt='snow';
            sky_icon='snow';
          }
          document.querySelector('.condition').innerHTML = fogToSnow(option.summary,localStorage.lang);
        }else{
          icon.alt=option.icon;
          icon.src=`https://d3aid59h00lu28.cloudfront.net/img/icons/${option.icon}.svg`;
          document.querySelector('.condition').innerHTML = option.summary;
        }
        let date_ny = moment(option.time*1000);
        date_ny = date_ny.format(localization[lang].date);
          if(date_ny== '31.12' || date_ny== '12.31' ){
          videoBack('NewYear', rdata);
          }else{
          videoBack(sky_icon, rdata);
          }
        icon.className='icon';
        icon.width='60px';
        icon.height='60px';
        let curr_icon = document.createElement('img');
        curr_icon.src='https://d3aid59h00lu28.cloudfront.net/img/icons/water.svg';
        curr_icon.alt ='';
        curr_icon.className = 'curr_icon';
        curr_icon.width='30px';
        curr_icon.height='30px';
        document.querySelector('.temp_val').innerHTML = Math.round(option.temperature) + localization[lang].units[units].temp;
        document.querySelector('.app_temp').innerHTML = localization[lang].app_temp +''+ Math.round(option.apparentTemperature) +localization[lang].units[units].temp ;
        document.querySelector('.condition').prepend(icon);

        document.querySelector('.propability').innerHTML = localization[lang].pop+ ': '+ Math.round(rdata.hourly.data[0].precipProbability*100) + '%';
        document.querySelector('.propability').prepend(curr_icon);

        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/uv.svg';
        document.querySelector('.uv').innerHTML =localization[lang].uvint +  option.uvIndex;
        document.querySelector('.uv').prepend(curr_icon);

        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/coverage.svg';
        document.querySelector('.clouds').innerHTML = localization[lang].clouds+ ': ' +Math.round(option.cloudCover*100) + '%';
        document.querySelector('.clouds').prepend(curr_icon);

        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/wind.svg';
        document.querySelector('.wind_text > h3').innerHTML = localization[lang].wind+ ': ';
        document.querySelector('.wind_text > h3').prepend(curr_icon);

        document.querySelector('.wind_speed').innerHTML = windIntensity(option.windSpeed, lang, units) + getCardinalDirection(option.windBearing, localization[lang].directions) + ', ' + option.windSpeed +' '+ localization[lang].units[units].wind_units;
        wind_arrow('currently');

        

        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/sunrise.svg';
        if(rdata.daily.data[0].sunriseTime === undefined){
          document.querySelector('#sunr').innerHTML = localization[lang].undefined;
        }else{
          document.querySelector('#sunr').innerHTML = localization[lang].sunr  +  convertSeconds(rdata.daily.data[0].sunriseTime +rdata.offset*3600);
        }
        document.querySelector('#sunr').prepend(curr_icon);
        
        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/sunset.svg';
        if(rdata.daily.data[0].sunsetTime === undefined){
          document.querySelector('#suns').innerHTML = localization[lang].undefined;
        }else{
          document.querySelector('#suns').innerHTML = localization[lang].suns  +  convertSeconds(rdata.daily.data[0].sunsetTime +rdata.offset*3600);
        }
        document.querySelector('#suns').prepend(curr_icon);

        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/pressure.svg';
        document.querySelector('#pres').innerHTML =localization[lang].pres + option.pressure + localization[lang].units[units].pres_units;
        document.querySelector('#pres').prepend(curr_icon);

        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/humidity.svg';
        document.querySelector('#hum').innerHTML =localization[lang].hum+ ': '+ Math.round(option.humidity*100) + '%';  
        document.querySelector('#hum').prepend(curr_icon);

        curr_icon = curr_icon.cloneNode(true);
        curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/dewpoint.svg';
        document.querySelector('#dew').innerHTML =localization[lang].dwp+ ': ' + Math.round(option.dewPoint) + localization[lang].units[units].temp;
        document.querySelector('#dew').prepend(curr_icon);
        let label_arr = document.querySelectorAll('#slidemenu > label > span');
        //labels for slidemenu
        label_arr[0].innerHTML = localization[lang].temp;
        label_arr[1].innerHTML = localization[lang].wind;
        label_arr[2].innerHTML = localization[lang].hum;
        label_arr[3].innerHTML = localization[lang].uv;
        label_arr[4].innerHTML = localization[lang].clouds;
        label_arr[5].innerHTML = localization[lang].pop;
        
        //backto button removal
        if(document.getElementsByClassName('backto')[0] != null){
          document.getElementsByClassName('backto')[0].remove();
        }
        
        radio_events(i);
        chart_summon('temperature',  'rgb(255, 81, 81)', 'rgba(255, 81, 81, 0.25)', localization[lang].units[units].temp, i);
        document.getElementById('days-fake').checked = true;
      }

      //when current function ended it's work, we remove loading window
      if(load_text[0] != undefined){
        document.getElementsByClassName('loading')[0].remove();
        document.getElementById('display').style.opacity='1';
        document.getElementById('legal').style.opacity='1';
        document.getElementById('days_wrap').style.opacity='1';
        document.getElementsByClassName('slider_wrap')[0].style.opacity=1;
        document.getElementsByClassName('anchor_wrapper')[0].classList.remove('hide_anchor');
        
        if(localStorage.tools == 'true'){
          firstTooltip();
        }
      }

      current(169-hour_counter);
      //daily forecast
      if(days_counter>8){
        days_counter=8
      }
      let create_days=true;
      if(8-days_counter!=0 && document.querySelector('.day')!=null){
        create_days=false;
      }else{
        create_days=true;
      }
      let days_length = document.querySelectorAll('.day');
      days_length=days_length.length;
      if(create_days){
        
        document.querySelector('#days').innerHTML ='<input type="radio" name="days-radio" id="days-fake" class="days_radio" checked="">';
      }
      for(let i=8-days_counter;i<8;i++){
        let date = moment(rdata.daily.data[i].time*1000);
        let sky_icon= rdata.daily.data[i].icon;
        if(snowCheck(rdata.daily.data[i], 'daily') == 'cloudy'){
          sky_icon = 'cloudy'
        }else
        if(snowCheck(rdata.daily.data[i], 'daily') && sky_icon=='fog'){
          sky_icon='snow';
        }
        if(create_days){
          
          if(i!=7){
            document.querySelector('#days').insertAdjacentHTML('beforeend', `
          <input type="radio" name="days-radio" id="days-${i+1}" class="days_radio">
          <label for="days-${i+1}" class="day">
                  <div class="pop">
                  <img src="https://d3aid59h00lu28.cloudfront.net/img/icons/water.svg" width="13px" height="13px" alt="Precip" class="pop_drop">${Math.round(rdata.daily.data[i].precipProbability*100)}%
                  </div>
                  <img src="https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg" alt="${sky_icon}" width="60px" height="60px" class="sky">
                  <div class="temp">
                    <div class="temp_max">
                      ${Math.round(rdata.daily.data[i].temperatureMax)}${localization[lang].units[units].temp}</div>
                    <div class="temp_min">
                      ${Math.round(rdata.daily.data[i].temperatureMin)}${localization[lang].units[units].temp}</div>
                  </div>
                  <div class="date">${localization[lang][date.format('ddd')]+'<br>' + date.format(localization[lang].date)}</div>
          </label>`);
          }else{
            document.querySelector('#days').insertAdjacentHTML('beforeend', `
            <div class="day">
              <div class="pop">
              <img src="https://d3aid59h00lu28.cloudfront.net/img/icons/water.svg" alt="Precip" width="13px" height="13px" class="pop_drop">${Math.round(rdata.daily.data[i].precipProbability*100)}%
              </div>
              <img src="https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg" alt="${sky_icon}" width="60px" height="60px" class="sky">
              <div class="temp">
                <div class="temp_max">
                  ${Math.round(rdata.daily.data[i].temperatureMax)}${localization[lang].units[units].temp}</div>
                <div class="temp_min">
                  ${Math.round(rdata.daily.data[i].temperatureMin)}${localization[lang].units[units].temp}</div>
              </div>
              <div class="date">${localization[lang][date.format('ddd')]+'<br>' + date.format(localization[lang].date)}</div>
            </div>`);
          }
        }else{
          if(i==8){
            break;
          }
          document.querySelectorAll('.day > .pop')[i].innerHTML= `<img src="https://d3aid59h00lu28.cloudfront.net/img/icons/water.svg" width="13px" height="13px" alt="Precip" class="pop_drop">${Math.round(rdata.daily.data[i].precipProbability*100)}%`;
          document.querySelectorAll('.day > .sky')[i].src=`https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg`;
          document.querySelectorAll('.day > .sky')[i].alt = sky_icon;
          document.querySelectorAll('.day > .temp')[i].innerHTML=`
          <div class="temp_max">
            ${Math.round(rdata.daily.data[i].temperatureMax)}${localization[lang].units[units].temp}</div>
          <div class="temp_min">
            ${Math.round(rdata.daily.data[i].temperatureMin)}${localization[lang].units[units].temp}</div>
          `;
          document.querySelectorAll('.date')[i].innerHTML=localization[lang][date.format('ddd')]+'<br>' + date.format(localization[lang].date);

        }
        
        if(document.getElementsByClassName('weekday')[i] != null){
          document.getElementsByClassName('weekday')[i].remove();
        }
      }
      //onclick backto we go to the current weather
      function backToCurrent(){
        let backto =document.createElement('div');
        backto.className='backto';
        backto.innerHTML = localization[lang].curr;
        backto.onclick=()=>{
          current(169-hour_counter);
        } 
        if(window.matchMedia('(max-width: 550px)').matches){
          document.getElementsByClassName('day')[0].before(backto);
        }else{
          document.getElementsByClassName('app_temp')[0].after(backto);
          document.getElementById('other').style.marginTop = '0'
          document.getElementById('details').style.marginTop = '0'
        }
      }
      function daysSetter(day_number){
        let sky_icon= rdata.daily.data[day_number].icon;
        if(rdata.daily.data[day_number].summary == "404: Something has gone wrong.."){
          rdata.daily.data[day_number].summary=rdata.daily.data[day_number].icon;
        }
        if(snowCheck(rdata.daily.data[day_number], 'daily') == 'cloudy'){
          sky_icon = 'cloudy'
        }else
        if(snowCheck(rdata.daily.data[day_number], 'daily')){
          if(sky_icon=='fog'){
            sky_icon='snow';
          }
          document.querySelector('.condition').innerHTML =fogToSnow(rdata.daily.data[day_number].summary, localStorage.lang);
        }else{
          document.querySelector('.condition').innerHTML = rdata.daily.data[day_number].summary;
        }
        if(document.querySelectorAll('.date')[day_number].innerHTML.includes('<br>31.12')==true || document.querySelectorAll('.date')[day_number].innerHTML.includes('<br>12.31')==true ){
          videoBack('NewYear', rdata);
        }else{
          videoBack(sky_icon, rdata);
        };
        
        document.getElementById('slide-item-1').checked = 'checked';
          let icon = document.createElement('img');
          icon.src=`https://d3aid59h00lu28.cloudfront.net/img/icons/${sky_icon}.svg`;
          icon.alt=icon;
          icon.className='icon';
          icon.width="60px";
          icon.height="60px";
          document.querySelector('.temp_val').innerHTML = Math.round(rdata.daily.data[day_number].temperatureMax) +localization[lang].units[units].temp ;
          document.querySelector('.app_temp').innerHTML = localization[lang].app_temp +' ' + Math.round(rdata.daily.data[day_number].apparentTemperatureMax) +localization[lang].units[units].temp ;
          document.querySelector('.condition').prepend(icon);
          
          let curr_icon = document.createElement('img');
          curr_icon.src='https://d3aid59h00lu28.cloudfront.net/img/icons/water.svg';
          curr_icon.alt ='';
          curr_icon.className = 'curr_icon';
          curr_icon.width='30px';
          curr_icon.height='30px';
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

          document.querySelector('.propability').innerHTML = localization[lang].pop+ ': '+ Math.round(rdata.daily.data[day_number].precipProbability*100) + '%';
          document.querySelector('.propability').prepend(curr_icon);

          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/uv.svg';
          document.querySelector('.uv').innerHTML =localization[lang].uvint +rdata.daily.data[day_number].uvIndex;
          document.querySelector('.uv').prepend(curr_icon);

          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/coverage.svg';
          document.querySelector('.clouds').innerHTML = localization[lang].clouds+ ': ' + Math.round(rdata.daily.data[day_number].cloudCover*100) + '%';
          document.querySelector('.clouds').prepend(curr_icon);

          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/wind.svg';
          document.querySelector('.wind_text > h3').innerHTML = localization[lang].wind+ ': ';
          document.querySelector('.wind_text > h3').prepend(curr_icon);
          document.querySelector('.wind_speed').innerHTML = windIntensity(rdata.daily.data[day_number].windSpeed, lang, units) + getCardinalDirection(rdata.daily.data[day_number].windBearing, localization[lang].directions) + ', ' + rdata.daily.data[day_number].windSpeed +' '+ localization[lang].units[units].wind_units;
          wind_arrow(`daily`, day_number);

          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/sunrise.svg';
          if(rdata.daily.data[0].sunriseTime === undefined){
            document.querySelector('#sunr').innerHTML = localization[lang].undefined;
          }else{
            document.querySelector('#sunr').innerHTML =localization[lang].sunr +  convertSeconds(rdata.daily.data[day_number].sunriseTime +rdata.offset*3600);
          }
          document.querySelector('#sunr').prepend(curr_icon);

          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/sunset.svg';
          if(rdata.daily.data[0].sunsetTime === undefined){
            document.querySelector('#suns').innerHTML = localization[lang].undefined;
          }else{
            document.querySelector('#suns').innerHTML =localization[lang].suns +  convertSeconds(rdata.daily.data[day_number].sunsetTime +rdata.offset*3600);
          }
          document.querySelector('#suns').prepend(curr_icon);

          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/pressure.svg';
          document.querySelector('#pres').innerHTML =localization[lang].pres + rdata.daily.data[day_number].pressure + localization[lang].units[units].pres_units;
          document.querySelector('#pres').prepend(curr_icon);
          
          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/humidity.svg';
          document.querySelector('#hum').innerHTML =localization[lang].hum+ ': ' + Math.round(rdata.daily.data[day_number].humidity*100) + '%';
          document.querySelector('#hum').prepend(curr_icon);
          
          curr_icon = curr_icon.cloneNode(true);
          curr_icon.src= 'https://d3aid59h00lu28.cloudfront.net/img/icons/dewpoint.svg';
          document.querySelector('#dew').innerHTML =localization[lang].dwp+ ': ' + Math.round(rdata.daily.data[day_number].dewPoint) + localization[lang].units[units].temp;
          document.querySelector('#dew').prepend(curr_icon);
          
          radio_events(day_number*1000);
          chart_summon('temperature',  'rgb(255, 81, 81)', 'rgba(255, 81, 81, 0.25)', localization[lang].units[units].temp, day_number*1000);

      }
      // forecast with hours and graphs on click on the day
      let days = document.getElementsByClassName('day');
      for(let j=0;j<days.length-1;j++){
        days[j].addEventListener('click',()=>{
          daysSetter(8-days_counter+j);}
        ); 
      }
    }    
  }else{
    //if browser doesn't support geolocation, we make special error notification
    load_text[0].innerHTML = localization['ru'].geo_error;
    load_text[1].innerHTML = localization['en'].geo_error;
  }
}
window.onload = loaded();

document.getElementById('location').onclick = ()=>{
  localStorage.removeItem('cached_data');
  localStorage.location = 'on';
  loaded(localStorage);
};
document.getElementsByClassName('updating')[0].onclick=()=>{
  let cached_objects= localStorage.getItem('cached_data');
  cached_objects = JSON.parse(cached_objects);
  let coords=[cached_objects[1].latitude,cached_objects[1].longitude];
  localStorage.removeItem('cached_data');
  loaded(localStorage, coords);
  document.getElementsByClassName('updating')[0].classList.toggle('updating_closed');
}
document.getElementsByClassName('updating_footer')[0].onclick=()=>{
  let cached_objects= localStorage.getItem('cached_data');
  cached_objects = JSON.parse(cached_objects);
  let coords=[cached_objects[1].latitude,cached_objects[1].longitude];
  localStorage.removeItem('cached_data');
  loaded(localStorage, coords);
  if( document.getElementsByClassName('updating')[0].classList.contains('updating_closed')==false){
    document.getElementsByClassName('updating')[0].classList.toggle('updating_closed');
  }
}
