const cacheName = 'app_v1';

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          //removing previous version of cache
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


 //clean cache every week
function cleaningCache(){
  caches.open(cacheName).then(cache => {
    let cssfile = cache.match('style.css').then(resp=>{return resp}).then(res=>{
      if(res!=undefined){
        return res.headers.get('date')
      }else{
        return 0
      }
    });
    cssfile.then(date_old=>{
      let today = new Date();
      today=today.getTime();
      date_old = new Date(date_old);
      date_old=date_old.getTime();
      if(today - date_old>=604800000){
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cache => {
              //removing previous version of cache
                console.log('Service Worker: Clearing Old Cache');
                return caches.delete(cache);
            })
          );
        })
      }
    })
  });
}
// Add response to cache
function getCached(request, resClone){
  // Open cache
  caches.open(cacheName).then(cache => {
    if(!(request.url.includes('www.google-analytics.com/'))  &&  request.url.includes('/weather/')==false &&  request.url.includes('api')==false){
      // console.log('Service Worker: Caching New Material', request, resClone);
      //because it gives us 206 code
      if(request.destination != 'video'){
        cache.put(request, resClone).catch(err=>{
          console.error(err, request)
        });
      }
    }
  });
}

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
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
cleaningCache();

