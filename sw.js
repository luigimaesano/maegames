const C='maegames-v1';
const FILES=['./','index.html','manifest.webmanifest','angry-musician/','angry-musician/index.html','angry-musician/manifest.webmanifest','spare-mic/','spare-mic/index.html','spare-mic/manifest.webmanifest',
'icons/maegames-192.png','icons/maegames-512.png','icons/am-192.png','icons/am-512.png','icons/sm-192.png','icons/sm-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();if(r.ok&&new URL(e.request.url).origin===location.origin)caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
