const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), h = [
  s + "/_app/immutable/entry/app.c0f2b794.js",
  s + "/_app/immutable/assets/0.033dc64a.css",
  s + "/_app/immutable/nodes/0.eace6fc2.js",
  s + "/_app/immutable/assets/logo_nobg.bdbf221b.svg",
  s + "/_app/immutable/assets/logo_nobg_light.64523f67.svg",
  s + "/_app/immutable/assets/Supreme-Variable.89d26fcd.ttf",
  s + "/_app/immutable/nodes/1.99d45715.js",
  s + "/_app/immutable/nodes/2.1cc02107.js",
  s + "/_app/immutable/nodes/3.d001b26c.js",
  s + "/_app/immutable/nodes/4.00fa1d6f.js",
  s + "/_app/immutable/nodes/5.0a3da941.js",
  s + "/_app/immutable/nodes/6.63f66f0f.js",
  s + "/_app/immutable/chunks/Icon.429f2b39.js",
  s + "/_app/immutable/chunks/dayjs.min.a0a66fd6.js",
  s + "/_app/immutable/chunks/hooks.client.16043796.js",
  s + "/_app/immutable/chunks/index.3afa8ada.js",
  s + "/_app/immutable/chunks/index.51bba90f.js",
  s + "/_app/immutable/chunks/loader.4cce511e.js",
  s + "/_app/immutable/chunks/scheduler.e427dfb5.js",
  s + "/_app/immutable/chunks/singletons.4d73db2a.js",
  s + "/_app/immutable/chunks/stores.14b5174e.js",
  s + "/_app/immutable/entry/start.8094a777.js"
], u = [
  s + "/logo.png",
  s + "/logo.svg",
  s + "/logo_nobg.svg",
  s + "/logo_nobg_light.svg",
  s + "/manifest.json"
], i = "1697622434725", c = self, p = `cache${i}`, l = h.concat(u), r = new Set(l);
c.addEventListener("install", (a) => {
  a.waitUntil(
    caches.open(p).then((e) => e.addAll(l)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (a) => {
  a.waitUntil(
    caches.keys().then(async (e) => {
      for (const t of e)
        t !== p && await caches.delete(t);
      c.clients.claim();
    })
  );
});
async function d(a) {
  const e = await caches.open(`offline${i}`);
  try {
    const t = await fetch(a);
    return e.put(a, t.clone()), t;
  } catch (t) {
    const n = await e.match(a);
    if (n)
      return n;
    throw t;
  }
}
c.addEventListener("fetch", (a) => {
  if (a.request.method !== "GET" || a.request.headers.has("range"))
    return;
  const e = new URL(a.request.url), t = e.protocol.startsWith("http"), n = e.hostname === self.location.hostname && e.port !== self.location.port, o = e.host === self.location.host && r.has(e.pathname), m = a.request.cache === "only-if-cached" && !o;
  t && !n && !m && a.respondWith(
    (async () => o && await caches.match(a.request) || d(a.request))()
  );
});
