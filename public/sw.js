const CACHE='plan-it-campus-v7';
const assets=['/styles.css','/app.js?v=campus-v7','/travel.js','/whatsapp.js','/content.json','/assets/mark.svg','/assets/destinations/jaipur-small.webp','/assets/destinations/darjeeling-small.webp','/assets/destinations/sikkim-small.webp','/assets/destinations/meghalaya-small.webp'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(assets)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!assets.some(a=>new URL(a,self.location.origin).pathname===u.pathname))return;e.respondWith(fetch(e.request,{cache:'no-cache'}).catch(()=>caches.match(e.request,{ignoreSearch:true})));});
