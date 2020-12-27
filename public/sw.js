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
    return res.headers.get('date')
  });
  cssfile.then(date_old=>{
    console.log(date_old);
    let today = new Date();
    today=today.getTime();
    date_old = new Date(date_old);
    date_old=date_old.getTime();
    if(today - date_old>=604800000){
      console.log('!! bruh deletion');
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
// Call Fetch Event
 self.addEventListener('fetch', e => {
   console.log('Service Worker: Fetching');
   e.respondWith( 
         fetch(e.request)
       .then(res => {
         // Make copy/clone of response
         const resClone = res.clone();
         // Open cache
         caches.open(cacheName).then(cache => {
         
          // Add response to cache
           if(!(e.request.url.includes('www.google-analytics.com/')) &&  e.request.url.includes('videos')==false  &&  e.request.url.includes('/weather/')==false &&  e.request.url.includes('api')==false){
            cache.put(e.request, resClone);
           }
         });
         return res;
       })
       .catch(err => caches.match(e.request).then(res => res))
   );
 });
cleaningCache();
// self.addEventListener('fetch', function(event) {
//   console.log(event.request.url);
 
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     })
//   );
//  });
