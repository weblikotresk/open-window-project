
const cacheName = 'app_v1';

// Call Install Event
self.addEventListener('install', e => {
  self.skipWaiting();
  //console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {
  //console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          //removing previous version of cache
          if (cache !== cacheName) {
            //console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }else{
            caches.match('timestamp').then(function(response) {
              if(response==undefined){
                setTimestamp();
              }
             })
          }
        })
      );
    })
  );
});

function setTimestamp(){
  let caching_time = new Date();
  caching_time=caching_time.getTime();
  let time_header = new Headers({
    'timestamp':caching_time
  });
  let myBlob = new Blob([caching_time], {type: 'text/plain'});
  let init = { "status" : 200 , "url":"timestamp", "headers":time_header};
  let myResponse = new Response(myBlob,init);
  getCached('timestamp',myResponse)
}
 //clean cache every week
function cleaningCache(caching_time){
    let today = new Date();
    today=today.getTime();
    caching_time = parseInt(caching_time,10)
    //console.log(today-caching_time);
    if(today - caching_time>=7*24*60*60*60){
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            //removing previous version of cache
            caches.delete(cache);
          })
        );
      })
    }
}
// Add response to cache
function getCached(request, resClone){
  // Open cache
  caches.open(cacheName).then(cache => {
    if (request.url==undefined){
      cache.put(request, resClone).catch(err=>{
        console.error(err, request)

      });
    }else
    if(!(request.url.includes('www.google-analytics.com/'))   &&  request.url.includes('/weather/')==false &&  request.url.includes('api')==false){
      //can't store videos because it gives us 206 code
      if(request.destination != 'video' && resClone.status!=0){
        cache.put(request, resClone).catch(err=>{
          console.error(err, request)
        });
      }
    }
  });
}

// Call Fetch Event
let fetch_counter=0
self.addEventListener('fetch', e => {
  if (fetch_counter>30){
    fetch_counter=0
  }
  fetch_counter++;
  if(fetch_counter==2){
    caches.match('timestamp').then(function(response) {
      if(response==undefined){
        let time=new Date()
        time=time.getTime()
        cleaningCache(time);
      }else{
        cleaningCache(response.headers.get('timestamp'));}
     })
  }

  e.respondWith( 
    caches.match(e.request).then(function(response) {
      //return cached version of response, if it's not in cahce, then fetch and cache it
      if(response!=undefined){
        //if material is in cache
        return response 
      }else{
        return fetch(e.request)
          .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // 2 - cache request anyway 
            getCached(e.request, resClone)
            return res;
          })
          .catch(err =>{
            console.log(err);
            caches.match(e.request).then(res => res)
          })
      }
    })
  );
});


