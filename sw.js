/* Offline cache - Made by Risan */
const C='mdsg-cache-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;if(new URL(r.url).pathname.endsWith('version.json'))return;
 e.respondWith(caches.match(r).then(h=>{const f=fetch(r).then(n=>{if(n&&n.ok)caches.open(C).then(c=>c.put(r,n.clone()));return n}).catch(()=>h);return h||f}))});
