// Guarda a aplicação no dispositivo para funcionar sem internet.
// Ao publicar uma versão nova, muda o número da CACHE para forçar a atualização.
const CACHE = "scm-orca-v1";
const FICHEIROS = ["./", "./index.html", "./manifest.webmanifest",
                   "./icone-192.png", "./icone-512.png", "./scm-orca.ico"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHEIROS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // Tenta a rede primeiro para apanhar versões novas; sem rede, serve o que está guardado.
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const copia = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
