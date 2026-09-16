/* =========================================================
   MYNEGOSYO — DEVICE NOTIFICATION SETTINGS
   COMPLETE UPDATED VERSION
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     STORAGE KEYS
     ========================================================= */

  const SETTINGS_KEY =
    "mynegosyo_device_notifications_v2";

  const SENT_KEY =
    "mynegosyo_device_notification_sent_v2";


  /* =========================================================
     DEFAULT NOTIFICATION SETTINGS
     ========================================================= */

  const defaultSettings = {
    enabled: false,

    lowStock: true,
    expiry: true,
    utang: true,
    bills: true,
    sales: true,
    gcash: true,
    eload: true,
    vault: true,
    dailySummary: true
  };


  let notificationSettings =
    loadNotificationSettings();

  let lastStateSignature = "";


  /* =========================================================
     BASIC HELPERS
     ========================================================= */

  function $(selector) {
    return document.querySelector(selector);
  }


  function todayKey() {
    const d = new Date();

    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join("-");
  }


  function money(value) {
    return "₱" +
      Number(value || 0).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
  }


  /* =========================================================
     LOAD SETTINGS
     ========================================================= */

  function loadNotificationSettings() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(SETTINGS_KEY) || "{}"
        );

      return Object.assign(
        {},
        defaultSettings,
        saved
      );

    } catch (error) {

      console.warn(
        "MyNegosyo notification settings load error:",
        error
      );

      return Object.assign(
        {},
        defaultSettings
      );
    }
  }


  /* =========================================================
     SAVE SETTINGS
     ========================================================= */

  function saveNotificationSettings() {

    try {

      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(notificationSettings)
      );

    } catch (error) {

      console.warn(
        "MyNegosyo notification settings save error:",
        error
      );
    }
  }


  /* =========================================================
     SENT NOTIFICATIONS
     ========================================================= */

  function getSentNotifications() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(SENT_KEY) || "{}"
        );

      if (
        saved &&
        typeof saved === "object"
      ) {
        return saved;
      }

    } catch (error) {
      console.warn(
        "MyNegosyo notification history read error:",
        error
      );
    }

    return {};
  }


  function wasNotificationSent(id) {

    const sent =
      getSentNotifications();

    return Object.prototype.hasOwnProperty.call(
      sent,
      id
    );
  }


  function setNotificationSent(id) {

    try {

      const sent =
        getSentNotifications();

      sent[id] = Date.now();

      /*
       * Keep only the latest 500 records.
       */
      const trimmed =
        Object.entries(sent)
          .sort((a, b) => {
            return Number(b[1]) - Number(a[1]);
          })
          .slice(0, 500);

      localStorage.setItem(
        SENT_KEY,
        JSON.stringify(
          Object.fromEntries(trimmed)
        )
      );

    } catch (error) {

      console.warn(
        "MyNegosyo notification history save error:",
        error
      );
    }
  }


  /* =========================================================
     BROWSER NOTIFICATION SUPPORT
     ========================================================= */

  function notificationSupported() {

    return (
      "Notification" in window
    );
  }


  function permissionGranted() {

    return (
      notificationSupported() &&
      Notification.permission === "granted"
    );
  }


  /* =========================================================
     MESSAGE
     ========================================================= */

  function showMessage(
    message,
    type = "success"
  ) {

    const element =
      $("#notificationSaveMessage");

    if (!element) {
      return;
    }

    element.textContent =
      message;

    element.style.color =
      type === "error"
        ? "#e53935"
        : "#1b9b61";

    clearTimeout(
      window.__myNegosyoNotificationMessage
    );

    window.__myNegosyoNotificationMessage =
      setTimeout(function () {

        element.textContent = "";

      }, 3500);
  }


  /* =========================================================
     NOTIFICATION SWITCH IDS
     ========================================================= */

  function getNotificationSwitches() {

    return [

      "notifyLowStock",
      "notifyExpiry",
      "notifyUtang",
      "notifyBills",
      "notifySales",
      "notifyGcash",
      "notifyEload",
      "notifyVault",
      "notifyDailySummary"

    ];
  }


  /* =========================================================
     ENABLE SWITCHES
     IMPORTANT:
     These remain clickable even before permission is granted.
     ========================================================= */

  function enableNotificationSwitches() {

    getNotificationSwitches()
      .forEach(function (id) {

        const input =
          document.getElementById(id);

        if (input) {
          input.disabled = false;
        }

      });
  }


  /* =========================================================
     DISABLE SWITCHES
     Kept as a function for compatibility, but the switches
     remain usable so users can configure preferences first.
     ========================================================= */

  function disableNotificationSwitches() {

    getNotificationSwitches()
      .forEach(function (id) {

        const input =
          document.getElementById(id);

        if (input) {

          /*
           * Do NOT disable the switches.
           *
           * Users should be able to select:
           * Low Stock
           * Expiry
           * Bills
           * Sales
           * etc.
           *
           * even before browser permission is granted.
           */

          input.disabled = false;
        }

      });
  }


  /* =========================================================
     SYNC SWITCH VALUES
     ========================================================= */

  function syncNotificationCheckboxes() {

    const mapping = {

      notifyLowStock:
        "lowStock",

      notifyExpiry:
        "expiry",

      notifyUtang:
        "utang",

      notifyBills:
        "bills",

      notifySales:
        "sales",

      notifyGcash:
        "gcash",

      notifyEload:
        "eload",

      notifyVault:
        "vault",

      notifyDailySummary:
        "dailySummary"

    };


    Object.entries(mapping)
      .forEach(function ([id, key]) {

        const input =
          document.getElementById(id);

        if (!input) {
          return;
        }

        input.checked =
          !!notificationSettings[key];

        /*
         * Always allow preference changes.
         */
        input.disabled = false;

      });
  }


  /* =========================================================
     UPDATE STATUS
     ========================================================= */

  function updateNotificationStatus() {

    const status =
      $("#deviceNotificationStatus");

    const title =
      $("#notificationPermissionTitle");

    const text =
      $("#notificationPermissionText");

    const button =
      $("#enableDeviceNotifications");

    if (!status) {
      return;
    }


    const statusText =
      status.querySelector("span");


    status.classList.remove(
      "enabled",
      "denied",
      "warning"
    );


    /* =======================================================
       NOT SUPPORTED
       ======================================================= */

    if (!notificationSupported()) {

      status.classList.add(
        "warning"
      );

      if (statusText) {

        statusText.textContent =
          "Not supported";
      }


      if (title) {

        title.textContent =
          "Device notifications are not supported";
      }


      if (text) {

        text.textContent =
          "Use a supported browser to receive MyNegosyo notifications.";
      }


      if (button) {

        button.disabled =
          true;

        button.classList.remove(
          "notification-enabled-button"
        );

        button.innerHTML =
          '<i class="fa-solid fa-ban"></i> Not Supported';
      }


      enableNotificationSwitches();

      return;
    }


    /* =======================================================
       PERMISSION BLOCKED
       ======================================================= */

    if (
      Notification.permission ===
      "denied"
    ) {

      status.classList.add(
        "denied"
      );


      if (statusText) {

        statusText.textContent =
          "Blocked";
      }


      if (title) {

        title.textContent =
          "Device notifications are blocked";
      }


      if (text) {

        text.textContent =
          "Allow MyNegosyo notifications in your browser or device settings.";
      }


      if (button) {

        button.disabled =
          false;

        button.classList.remove(
          "notification-enabled-button"
        );

        button.innerHTML =
          '<i class="fa-solid fa-gear"></i> Check Settings';
      }


      /*
       * Preferences remain clickable.
       */
      enableNotificationSwitches();

      return;
    }


    /* =======================================================
       ENABLED
       ======================================================= */

    if (
      Notification.permission ===
        "granted" &&
      notificationSettings.enabled ===
        true
    ) {

      status.classList.add(
        "enabled"
      );


      if (statusText) {

        statusText.textContent =
          "Enabled";
      }


      if (title) {

        title.textContent =
          "Device notifications are enabled";
      }


      if (text) {

        text.textContent =
          "MyNegosyo can send business alerts to this device.";
      }


      if (button) {

        /*
         * The button changes from Enable
         * to Enabled automatically.
         */

        button.disabled =
          false;

        button.classList.add(
          "notification-enabled-button"
        );

        button.innerHTML =
          '<i class="fa-solid fa-circle-check"></i> Enabled';
      }


      enableNotificationSwitches();

      return;
    }


    /* =======================================================
       NOT ENABLED YET
       ======================================================= */

    if (statusText) {

      statusText.textContent =
        "Not enabled";
    }


    if (title) {

      title.textContent =
        "Device notifications are not enabled";
    }


    if (text) {

      text.textContent =
        "Choose the alerts you want below, then enable device notifications.";
    }


    if (button) {

      button.disabled =
        false;

      button.classList.remove(
        "notification-enabled-button"
      );

      button.innerHTML =
        '<i class="fa-solid fa-bell"></i> Enable';
    }


    /*
     * Preferences remain clickable.
     */
    enableNotificationSwitches();
  }


  /* =========================================================
     ENABLE DEVICE NOTIFICATIONS
     ========================================================= */

 async function enableDeviceNotifications() {

  /* Check secure context first */
  if (!window.isSecureContext) {

    showMessage(
      "Notifications require HTTPS or localhost. Open MyNegosyo using http://localhost/...",
      "error"
    );

    updateNotificationStatus();

    return;
  }

  /* Browser support */
  if (!("Notification" in window)) {

    showMessage(
      "This browser does not support device notifications.",
      "error"
    );

    return;
  }

  /* Already enabled */
  if (
    Notification.permission === "granted"
  ) {

    notificationSettings.enabled = true;

    saveNotificationSettings();

    updateNotificationStatus();

    showMessage(
      "Device notifications are already enabled."
    );

    return;
  }

  /* Previously blocked */
  if (
    Notification.permission === "denied"
  ) {

    showMessage(
      "Notifications are blocked. Allow notifications for MyNegosyo in your browser settings.",
      "error"
    );

    updateNotificationStatus();

    return;
  }

  /* Request permission */
  try {

    const permission =
      await Notification.requestPermission();

    console.log(
      "MyNegosyo notification permission:",
      permission
    );

    if (
      permission === "granted"
    ) {

      notificationSettings.enabled =
        true;

      saveNotificationSettings();

      /*
       * Immediately update:
       * Enable → Enabled
       * Not enabled → Enabled
       * status badge → Enabled
       */
      updateNotificationStatus();

      showMessage(
        "Device notifications enabled."
      );

      /*
       * Send confirmation notification.
       */
      await sendDeviceNotification(
        "MyNegosyo Notifications",
        {
          body:
            "Device notifications are now enabled.",
          tag:
            "mynegosyo-device-enabled",
          page:
            "dashboard",
          renotify:
            true
        }
      );

    } else {

      notificationSettings.enabled =
        false;

      saveNotificationSettings();

      updateNotificationStatus();

      showMessage(
        "Notification permission was not granted.",
        "error"
      );
    }

  } catch (error) {

    console.error(
      "MyNegosyo Enable notification error:",
      error
    );

    showMessage(
      "Unable to request notification permission: " +
      error.message,
      "error"
    );

    updateNotificationStatus();
  }


    /* -------------------------------------------------------
       ALREADY ENABLED
       ------------------------------------------------------- */

    if (
      Notification.permission ===
        "granted" &&
      notificationSettings.enabled ===
        true
    ) {

      showMessage(
        "Device notifications are already enabled."
      );

      updateNotificationStatus();

      return;
    }


    /* -------------------------------------------------------
       BLOCKED
       ------------------------------------------------------- */

    if (
      Notification.permission ===
      "denied"
    ) {

      showMessage(
        "Notifications are blocked. Allow MyNegosyo notifications in your browser or device settings.",
        "error"
      );

      updateNotificationStatus();

      return;
    }


    /* -------------------------------------------------------
       REQUEST PERMISSION
       ------------------------------------------------------- */

    try {

      const permission =
        await Notification.requestPermission();


      if (
        permission ===
        "granted"
      ) {

        notificationSettings.enabled =
          true;

        saveNotificationSettings();

        updateNotificationStatus();


        showMessage(
          "Device notifications enabled."
        );


        /*
         * Send confirmation notification.
         */
        await sendDeviceNotification(
          "MyNegosyo Notifications",
          {
            body:
              "Device notifications are now enabled.",
            tag:
              "mynegosyo-enabled",
            page:
              "dashboard",
            renotify:
              true
          }
        );


        /*
         * Check current business conditions.
         */
        runBusinessNotificationCheck();


      } else {

        notificationSettings.enabled =
          false;

        saveNotificationSettings();

        updateNotificationStatus();


        showMessage(
          "Notification permission was not granted.",
          "error"
        );
      }

    } catch (error) {

      console.error(
        "MyNegosyo notification permission error:",
        error
      );


      showMessage(
        "Unable to enable device notifications.",
        "error"
      );


      updateNotificationStatus();
    }
  }


  /* =========================================================
     SEND DEVICE NOTIFICATION
     ========================================================= */

  async function sendDeviceNotification(
    title,
    options = {}
  ) {

    if (
      !notificationSupported()
    ) {
      return false;
    }


    if (
      !permissionGranted()
    ) {
      return false;
    }


    if (
      !notificationSettings.enabled
    ) {
      return false;
    }


    const notificationOptions = {

      body:
        options.body ||
        "",

      icon:
        options.icon ||
        "./icons/icon-192.png",

      badge:
        options.badge ||
        "./icons/icon-192.png",

      tag:
        options.tag ||
        "mynegosyo-notification",

      renotify:
        options.renotify === true,

      requireInteraction:
        options.requireInteraction === true,

      data: {

        page:
          options.page ||
          "dashboard"

      }
    };


    try {

      /* -----------------------------------------------------
         SERVICE WORKER
         ----------------------------------------------------- */

      if (
        "serviceWorker" in
        navigator
      ) {

        try {

          const registration =
            await navigator.serviceWorker.ready;


          if (
            registration &&
            typeof registration.showNotification ===
              "function"
          ) {

            await registration.showNotification(
              title,
              notificationOptions
            );

            return true;
          }

        } catch (serviceWorkerError) {

          console.warn(
            "Service worker notification unavailable. Using browser notification.",
            serviceWorkerError
          );
        }
      }


      /* -----------------------------------------------------
         BROWSER FALLBACK
         ----------------------------------------------------- */

      const notification =
        new Notification(
          title,
          notificationOptions
        );


      notification.onclick =
        function () {

          window.focus();


          const page =
            notificationOptions.data?.page ||
            "dashboard";


          if (
            typeof window.showPage ===
            "function"
          ) {

            window.showPage(
              page
            );
          }


          notification.close();
        };


      return true;

    } catch (error) {

      console.warn(
        "MyNegosyo device notification failed:",
        error
      );

      return false;
    }
  }


  /* =========================================================
     TEST NOTIFICATION
     ========================================================= */

  async function sendTestNotification() {

    if (
      !notificationSupported()
    ) {

      showMessage(
        "Device notifications are not supported.",
        "error"
      );

      return;
    }


    if (
      Notification.permission !==
      "granted"
    ) {

      showMessage(
        "Click Enable first and allow notifications.",
        "error"
      );

      return;
    }


    if (
      !notificationSettings.enabled
    ) {

      showMessage(
        "Device notifications are not enabled.",
        "error"
      );

      return;
    }


    const sent =
      await sendDeviceNotification(
        "MyNegosyo Test Notification",
        {

          body:
            "Your device notifications are working correctly.",

          tag:
            "mynegosyo-test-notification",

          page:
            "dashboard",

          renotify:
            true

        }
      );


    if (sent) {

      showMessage(
        "Test notification sent."
      );

    } else {

      showMessage(
        "The test notification could not be sent.",
        "error"
      );
    }
  }


  /* =========================================================
     INVENTORY NOTIFICATIONS
     ========================================================= */

  function checkInventoryNotifications() {

    if (
      !Array.isArray(
        state?.products
      )
    ) {
      return;
    }


    state.products.forEach(
      function (product) {

        const productId =
          product.id;

        const stock =
          Number(
            product.stock || 0
          );

        const reorder =
          Number(
            product.reorder || 0
          );


        /* ---------------------------------------------------
           OUT OF STOCK
           --------------------------------------------------- */

        if (
          notificationSettings.lowStock &&
          stock === 0
        ) {

          const id =
            `stock-out-${productId}-${todayKey()}`;


          if (
            !wasNotificationSent(id)
          ) {

            setNotificationSent(id);


            sendDeviceNotification(
              "MyNegosyo — Out of Stock",
              {

                body:
                  `${product.name} is out of stock.`,

                tag:
                  id,

                page:
                  "inventory",

                renotify:
                  true,

                requireInteraction:
                  true

              }
            );
          }
        }


        /* ---------------------------------------------------
           LOW STOCK
           --------------------------------------------------- */

        else if (
          notificationSettings.lowStock &&
          stock > 0 &&
          stock <= reorder
        ) {

          const id =
            `stock-low-${productId}-${todayKey()}`;


          if (
            !wasNotificationSent(id)
          ) {

            setNotificationSent(id);


            sendDeviceNotification(
              "MyNegosyo — Low Stock",
              {

                body:
                  `${product.name} has only ${stock} item(s) left.`,

                tag:
                  id,

                page:
                  "inventory",

                renotify:
                  true

              }
            );
          }
        }


        /* ---------------------------------------------------
           EXPIRY
           --------------------------------------------------- */

        if (
          notificationSettings.expiry &&
          product.expiry
        ) {

          const expiryDate =
            new Date(
              `${product.expiry}T12:00:00`
            );


          if (
            !Number.isNaN(
              expiryDate.getTime()
            )
          ) {

            const days =
              Math.ceil(
                (
                  expiryDate.getTime() -
                  Date.now()
                ) /
                86400000
              );


            if (
              days >= 0 &&
              days <= 30
            ) {

              const id =
                `expiry-${productId}-${product.expiry}`;


              if (
                !wasNotificationSent(id)
              ) {

                setNotificationSent(id);


                const body =
                  days === 0
                    ? `${product.name} expires today.`
                    : `${product.name} expires in ${days} day(s).`;


                sendDeviceNotification(
                  "MyNegosyo — Expiry Alert",
                  {

                    body:
                      body,

                    tag:
                      id,

                    page:
                      "inventory",

                    renotify:
                      true

                  }
                );
              }
            }
          }
        }

      }
    );
  }


  /* =========================================================
     UTANG NOTIFICATIONS
     ========================================================= */

  function checkUtangNotifications() {

    if (
      !notificationSettings.utang ||
      !Array.isArray(
        state?.utang
      )
    ) {
      return;
    }


    state.utang.forEach(
      function (item) {

        const status =
          String(
            item.status || ""
          ).toLowerCase();


        const balance =
          Number(
            item.balance || 0
          );


        if (
          status !== "overdue" ||
          balance <= 0
        ) {
          return;
        }


        const id =
          `utang-overdue-${item.id}-${todayKey()}`;


        if (
          wasNotificationSent(id)
        ) {
          return;
        }


        setNotificationSent(id);


        sendDeviceNotification(
          "MyNegosyo — Overdue Utang",
          {

            body:
              `${item.name || "Customer"} has an overdue balance of ${money(balance)}.`,

            tag:
              id,

            page:
              "utang",

            renotify:
              true,

            requireInteraction:
              true

          }
        );

      }
    );
  }


  /* =========================================================
     BILL NOTIFICATIONS
     ========================================================= */

  function checkBillNotifications() {

    if (
      !notificationSettings.bills ||
      !Array.isArray(
        state?.bills
      )
    ) {
      return;
    }


    state.bills.forEach(
      function (bill) {

        if (!bill.due) {
          return;
        }


        const dueDate =
          new Date(
            `${bill.due}T12:00:00`
          );


        if (
          Number.isNaN(
            dueDate.getTime()
          )
        ) {
          return;
        }


        const days =
          Math.ceil(
            (
              dueDate.getTime() -
              Date.now()
            ) /
            86400000
          );


        /* ---------------------------------------------------
           OVERDUE
           --------------------------------------------------- */

        if (
          days < 0
        ) {

          const id =
            `bill-overdue-${bill.id}-${bill.due}`;


          if (
            !wasNotificationSent(id)
          ) {

            setNotificationSent(id);


            sendDeviceNotification(
              "MyNegosyo — Bill Overdue",
              {

                body:
                  `${bill.name || "Bill"} is overdue.`,

                tag:
                  id,

                page:
                  "bills",

                renotify:
                  true,

                requireInteraction:
                  true

              }
            );
          }


          return;
        }


        /* ---------------------------------------------------
           DUE TODAY
           --------------------------------------------------- */

        if (
          days === 0
        ) {

          const id =
            `bill-today-${bill.id}-${bill.due}`;


          if (
            !wasNotificationSent(id)
          ) {

            setNotificationSent(id);


            sendDeviceNotification(
              "MyNegosyo — Bill Due Today",
              {

                body:
                  `${bill.name || "Bill"} is due today.`,

                tag:
                  id,

                page:
                  "bills",

                renotify:
                  true

              }
            );
          }


          return;
        }


        /* ---------------------------------------------------
           DUE SOON
           --------------------------------------------------- */

        if (
          days <= 7
        ) {

          const id =
            `bill-soon-${bill.id}-${bill.due}`;


          if (
            !wasNotificationSent(id)
          ) {

            setNotificationSent(id);


            sendDeviceNotification(
              "MyNegosyo — Bill Due Soon",
              {

                body:
                  `${bill.name || "Bill"} is due in ${days} day(s).`,

                tag:
                  id,

                page:
                  "bills"

              }
            );
          }
        }

      }
    );
  }


  /* =========================================================
     SALES NOTIFICATIONS
     ========================================================= */

  function checkSalesNotifications() {

    if (
      !notificationSettings.sales ||
      !Array.isArray(
        state?.sales
      ) ||
      state.sales.length === 0
    ) {
      return;
    }


    const latest =
      state.sales[0];


    if (!latest) {
      return;
    }


    const saleId =
      latest.id ||
      latest.date ||
      JSON.stringify(latest);


    const id =
      `sale-${saleId}`;


    if (
      wasNotificationSent(id)
    ) {
      return;
    }


    setNotificationSent(id);


    sendDeviceNotification(
      "MyNegosyo — New Sale",
      {

        body:
          `A new sale worth ${money(latest.total)} was recorded.`,

        tag:
          id,

        page:
          "sales"

      }
    );
  }


  /* =========================================================
     GCASH NOTIFICATIONS
     ========================================================= */

  function checkGCashNotifications() {

    if (
      !notificationSettings.gcash ||
      !Array.isArray(
        state?.gcash
      ) ||
      state.gcash.length === 0
    ) {
      return;
    }


    const latest =
      state.gcash[0];


    if (!latest) {
      return;
    }


    const transactionId =
      latest.id ||
      latest.date ||
      JSON.stringify(latest);


    const id =
      `gcash-${transactionId}`;


    if (
      wasNotificationSent(id)
    ) {
      return;
    }


    setNotificationSent(id);


    sendDeviceNotification(
      "MyNegosyo — GCash Transaction",
      {

        body:
          `${latest.type || "GCash transaction"}: ${money(latest.amount)}.`,

        tag:
          id,

        page:
          "gcash"

      }
    );
  }


  /* =========================================================
     E-LOAD NOTIFICATIONS
     ========================================================= */

  function checkELoadNotifications() {

    if (
      !notificationSettings.eload ||
      !Array.isArray(
        state?.eload
      ) ||
      state.eload.length === 0
    ) {
      return;
    }


    const latest =
      state.eload[0];


    if (!latest) {
      return;
    }


    const transactionId =
      latest.id ||
      latest.date ||
      JSON.stringify(latest);


    const id =
      `eload-${transactionId}`;


    if (
      wasNotificationSent(id)
    ) {
      return;
    }


    setNotificationSent(id);


    sendDeviceNotification(
      "MyNegosyo — E-Load Transaction",
      {

        body:
          `${latest.network || "E-Load"} transaction of ${money(latest.amount)} recorded.`,

        tag:
          id,

        page:
          "eload"

      }
    );
  }


  /* =========================================================
     VAULT NOTIFICATIONS
     ========================================================= */

  function checkVaultNotifications() {

    if (
      !notificationSettings.vault ||
      !Array.isArray(
        state?.vault
      ) ||
      state.vault.length === 0
    ) {
      return;
    }


    const latest =
      state.vault[0];


    if (!latest) {
      return;
    }


    const transactionId =
      latest.id ||
      latest.date ||
      JSON.stringify(latest);


    const id =
      `vault-${transactionId}`;


    if (
      wasNotificationSent(id)
    ) {
      return;
    }


    setNotificationSent(id);


    sendDeviceNotification(
      "MyNegosyo — Vault Activity",
      {

        body:
          `${latest.type || "Cash movement"}: ${money(latest.amount)}.`,

        tag:
          id,

        page:
          "vault"

      }
    );
  }


  /* =========================================================
     RUN ALL BUSINESS NOTIFICATIONS
     ========================================================= */

  function runBusinessNotificationCheck() {

    if (
      !notificationSettings.enabled
    ) {
      return;
    }


    if (
      !permissionGranted()
    ) {
      return;
    }


    if (
      typeof state ===
      "undefined"
    ) {
      return;
    }


    try {

      checkInventoryNotifications();

      checkUtangNotifications();

      checkBillNotifications();

      checkSalesNotifications();

      checkGCashNotifications();

      checkELoadNotifications();

      checkVaultNotifications();

    } catch (error) {

      console.error(
        "MyNegosyo notification check error:",
        error
      );
    }
  }


  /* =========================================================
     BUILD STATE SIGNATURE
     ========================================================= */

  function buildStateSignature() {

    try {

      if (
        typeof state ===
        "undefined"
      ) {
        return "";
      }


      return JSON.stringify({

        products:
          state.products || [],

        utang:
          state.utang || [],

        bills:
          state.bills || [],

        sales:
          state.sales || [],

        gcash:
          state.gcash || [],

        eload:
          state.eload || [],

        vault:
          state.vault || []

      });

    } catch (error) {

      return "";
    }
  }


  /* =========================================================
     MONITOR STATE CHANGES
     ========================================================= */

  function monitorState() {

    try {

      const signature =
        buildStateSignature();


      if (!signature) {
        return;
      }


      /*
       * Do not send notifications on the very first
       * initialization. This prevents old data from
       * immediately flooding the device.
       *
       * New notifications are generated after data
       * changes.
       */

      if (
        lastStateSignature &&
        signature !== lastStateSignature
      ) {

        runBusinessNotificationCheck();
      }


      lastStateSignature =
        signature;

    } catch (error) {

      console.warn(
        "MyNegosyo notification monitor error:",
        error
      );
    }
  }


  /* =========================================================
     DAILY SUMMARY
     ========================================================= */

  function checkDailySummary() {

    if (
      !notificationSettings.enabled ||
      !notificationSettings.dailySummary ||
      !permissionGranted()
    ) {
      return;
    }


    if (
      typeof state ===
      "undefined"
    ) {
      return;
    }


    const now =
      new Date();


    /*
     * Daily summary starts at 8 PM.
     */

    if (
      now.getHours() <
      20
    ) {
      return;
    }


    const id =
      `daily-summary-${todayKey()}`;


    if (
      wasNotificationSent(id)
    ) {
      return;
    }


    const today =
      todayKey();


    /* -------------------------------------------------------
       TODAY'S SALES
       ------------------------------------------------------- */

    const sales =
      Array.isArray(
        state.sales
      )
        ? state.sales
        : [];


    const todaySales =
      sales
        .filter(function (item) {

          return (
            item.date &&
            String(item.date)
              .startsWith(today)
          );

        })
        .reduce(
          function (total, item) {

            return (
              total +
              Number(
                item.total || 0
              )
            );

          },
          0
        );


    /* -------------------------------------------------------
       LOW STOCK
       ------------------------------------------------------- */

    const products =
      Array.isArray(
        state.products
      )
        ? state.products
        : [];


    const lowStockCount =
      products.filter(
        function (product) {

          return (
            Number(
              product.stock || 0
            ) <=
            Number(
              product.reorder || 0
            )
          );

        }
      ).length;


    /* -------------------------------------------------------
       OUTSTANDING UTANG
       ------------------------------------------------------- */

    const utang =
      Array.isArray(
        state.utang
      )
        ? state.utang
        : [];


    const outstandingUtang =
      utang.reduce(
        function (total, item) {

          return (
            total +
            Number(
              item.balance || 0
            )
          );

        },
        0
      );


    setNotificationSent(id);


    sendDeviceNotification(
      "MyNegosyo — Daily Summary",
      {

        body:
          `Today's sales: ${money(todaySales)} • Low stock: ${lowStockCount} • Outstanding utang: ${money(outstandingUtang)}.`,

        tag:
          id,

        page:
          "dashboard"

      }
    );
  }


  /* =========================================================
     DEVICE PERMISSION CHANGES
     ========================================================= */

  function refreshPermissionState() {

    /*
     * If the browser permission has changed outside
     * MyNegosyo, update the UI immediately.
     */

    if (
      notificationSupported()
    ) {

      if (
        Notification.permission ===
        "granted"
      ) {

        /*
         * If permission is granted but our local
         * setting is still false, enable it.
         */

        if (
          notificationSettings.enabled !==
          true
        ) {

          notificationSettings.enabled =
            true;

          saveNotificationSettings();
        }

      } else {

        /*
         * Keep local setting false when browser
         * permission is not granted.
         */

        if (
          Notification.permission !==
          "granted"
        ) {

          notificationSettings.enabled =
            false;

          saveNotificationSettings();
        }
      }
    }


    syncNotificationCheckboxes();

    updateNotificationStatus();
  }


  /* =========================================================
     ENABLE BUTTON
     ========================================================= */

  function bindEnableButton() {

    const button =
      $("#enableDeviceNotifications");


    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      async function () {

        /*
         * Already enabled.
         */

        if (
          notificationSupported() &&
          Notification.permission ===
            "granted" &&
          notificationSettings.enabled
        ) {

          showMessage(
            "Device notifications are already enabled."
          );

          updateNotificationStatus();

          return;
        }


        /*
         * Blocked.
         */

        if (
          notificationSupported() &&
          Notification.permission ===
            "denied"
        ) {

          showMessage(
            "Notifications are blocked. Allow MyNegosyo in your browser/device settings.",
            "error"
          );

          return;
        }


        await enableDeviceNotifications();
      }
    );
  }


  /* =========================================================
     TEST BUTTON
     ========================================================= */

  function bindTestButton() {

    const button =
      $("#testDeviceNotification");


    if (!button) {
      return;
    }


    button.addEventListener(
      "click",
      function () {

        sendTestNotification();

      }
    );
  }


  /* =========================================================
     NOTIFICATION PREFERENCE SWITCHES
     ========================================================= */

  function bindNotificationSwitches() {

    const mapping = {

      notifyLowStock:
        "lowStock",

      notifyExpiry:
        "expiry",

      notifyUtang:
        "utang",

      notifyBills:
        "bills",

      notifySales:
        "sales",

      notifyGcash:
        "gcash",

      notifyEload:
        "eload",

      notifyVault:
        "vault",

      notifyDailySummary:
        "dailySummary"

    };


    Object.entries(mapping)
      .forEach(function ([id, settingKey]) {

        const input =
          document.getElementById(id);


        if (!input) {
          return;
        }


        input.addEventListener(
          "change",
          function () {

            notificationSettings[
              settingKey
            ] =
              !!input.checked;


            saveNotificationSettings();


            showMessage(
              "Notification setting saved."
            );


            /*
             * Recalculate immediately.
             */
            runBusinessNotificationCheck();
          }
        );

      });
  }


  /* =========================================================
     SERVICE WORKER MESSAGE
     ========================================================= */

  if (
    "serviceWorker" in
    navigator
  ) {

    navigator.serviceWorker.addEventListener(
      "message",
      function (event) {

        if (
          event.data?.type ===
          "MYNEGOSYO_NOTIFICATION_CLICK"
        ) {

          const page =
            event.data.page ||
            "dashboard";


          if (
            typeof window.showPage ===
            "function"
          ) {

            window.showPage(
              page
            );
          }
        }

      }
    );
  }


  /* =========================================================
     STORAGE CHANGE
     ========================================================= */

  window.addEventListener(
    "storage",
    function (event) {

      /*
       * Notification settings changed in another tab.
       */

      if (
        event.key ===
        SETTINGS_KEY
      ) {

        notificationSettings =
          loadNotificationSettings();


        syncNotificationCheckboxes();

        updateNotificationStatus();
      }


      /*
       * Business data changed in another tab.
       */

      monitorState();

      runBusinessNotificationCheck();
    }
  );


  /* =========================================================
     FOCUS
     ========================================================= */

  window.addEventListener(
    "focus",
    function () {

      refreshPermissionState();

      monitorState();

      runBusinessNotificationCheck();

      checkDailySummary();
    }
  );


  /* =========================================================
     VISIBILITY
     ========================================================= */

  document.addEventListener(
    "visibilitychange",
    function () {

      if (
        document.visibilityState ===
        "visible"
      ) {

        refreshPermissionState();

        monitorState();

        runBusinessNotificationCheck();

        checkDailySummary();
      }

    }
  );


  /* =========================================================
     INITIALIZATION
     ========================================================= */

  function initialize() {

    /*
     * Reload settings.
     */

    notificationSettings =
      loadNotificationSettings();


    /*
     * If browser permission has already been granted,
     * automatically synchronize the Enabled status.
     */

    if (
      notificationSupported() &&
      Notification.permission ===
        "granted"
    ) {

      notificationSettings.enabled =
        true;

      saveNotificationSettings();

    } else {

      /*
       * Permission isn't currently granted.
       */

      notificationSettings.enabled =
        false;

      saveNotificationSettings();
    }


    /*
     * Setup UI.
     */

    syncNotificationCheckboxes();

    updateNotificationStatus();


    /*
     * Bind buttons and switches.
     */

    bindEnableButton();

    bindTestButton();

    bindNotificationSwitches();


    /*
     * Establish the initial state signature.
     *
     * This prevents old business records from immediately
     * generating device notifications when the app first
     * opens.
     */

    lastStateSignature =
      buildStateSignature();


    /*
     * First daily-summary check.
     */

    setTimeout(
      function () {

        checkDailySummary();

      },
      1000
    );


    /*
     * Monitor application data.
     */

    setInterval(
      function () {

        monitorState();

        checkDailySummary();

      },
      5000
    );


    /*
     * Refresh browser permission/status.
     */

    setInterval(
      function () {

        refreshPermissionState();

      },
      3000
    );
  }


  /* =========================================================
     PUBLIC API
     ========================================================= */

  window.MyNegosyoDeviceNotifications = {

    enable:
      enableDeviceNotifications,

    send:
      sendDeviceNotification,

    test:
      sendTestNotification,

    refresh:
      refreshPermissionState,

    check:
      runBusinessNotificationCheck,

    settings:
      function () {

        return Object.assign(
          {},
          notificationSettings
        );
      },

    resetSentHistory:
      function () {

        localStorage.removeItem(
          SENT_KEY
        );

        showMessage(
          "Notification history reset."
        );
      }

  };


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  } else {

    initialize();
  }

})();