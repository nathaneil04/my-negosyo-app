const CACHE_NAME = "mynegosyo-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./notification.js",
  "./notification-settings.js",
  "./manifest.json",
  "./MNLogo2.png"
];

/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener("install", function (event) {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .catch(() => {})
  );

  self.skipWaiting();
});

/* =========================================================
   ACTIVATE
   ========================================================= */

self.addEventListener("activate", function (event) {

  event.waitUntil(

    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

/* =========================================================
   FETCH
   ========================================================= */

self.addEventListener("fetch", function (event) {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request)
      .then(cached => {

        if (cached) {
          return cached;
        }

        return fetch(event.request)
          .then(response => {

            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache =>
                cache.put(event.request, copy)
              )
              .catch(() => {});

            return response;
          })
          .catch(() =>
            caches.match("./index.html")
          );
      })
  );
});

/* =========================================================
   SHOW NOTIFICATION
   ========================================================= */

self.addEventListener(
  "notificationclick",
  function (event) {

    event.notification.close();

    const page =
      event.notification.data?.page ||
      "dashboard";

    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(clientList => {

        for (const client of clientList) {

          if (
            "focus" in client &&
            "postMessage" in client
          ) {

            client.focus();

            client.postMessage({
              type:
                "MYNEGOSYO_NOTIFICATION_CLICK",
              page: page
            });

            return;
          }
        }

        if (clients.openWindow) {

          return clients.openWindow(
            `./index.html#${page}`
          );
        }
      })
    );
  }
);

/* =========================================================
   PUSH SUPPORT
   ========================================================= */

self.addEventListener(
  "push",
  function (event) {

    let data = {};

    try {
      data = event.data
        ? event.data.json()
        : {};
    } catch (error) {
      data = {
        title: "MyNegosyo",
        body: "You have a new notification."
      };
    }

    const title =
      data.title || "MyNegosyo";

    const options = {

      body:
        data.body ||
        "You have a new MyNegosyo alert.",

      icon:
        data.icon ||
        "./icons/icon-192.png",

      badge:
        data.badge ||
        "./icons/icon-192.png",

      tag:
        data.tag ||
        "mynegosyo-push",

      renotify:
        true,

      data: {
        page:
          data.page ||
          "dashboard"
      }
    };

    event.waitUntil(

      self.registration.showNotification(
        title,
        options
      )
    );
  }
);
