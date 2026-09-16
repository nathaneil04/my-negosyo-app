/* =========================================================
   MYNEGOSYO — FULLY INTEGRATED NOTIFICATION SYSTEM
   Reads directly from the main MyNegosyo state
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const button =
    document.getElementById(
      "notifBtn"
    );

  const panel =
    document.getElementById(
      "notificationPanel"
    );

  const list =
    document.getElementById(
      "notificationList"
    );

  const badge =
    document.getElementById(
      "notificationBadge"
    );

  const subtitle =
    document.getElementById(
      "notificationSubtitle"
    );

  const markAll =
    document.getElementById(
      "markNotificationsRead"
    );

  const viewAll =
    document.getElementById(
      "viewAllNotifications"
    );


  /*
    Stop safely if notification HTML
    has not been added yet.
  */

  if (
    !button ||
    !panel ||
    !list
  ) {
    return;
  }


  /* =======================================================
     STORAGE
     ======================================================= */

  const READ_STORAGE_KEY =
    "mynegosyo_notification_read_v2";


  const MAX_READ_IDS =
    200;


  function loadReadIds() {

    try {

      const raw =
        localStorage.getItem(
          READ_STORAGE_KEY
        );


      if (!raw) {
        return new Set();
      }


      const parsed =
        JSON.parse(raw);


      if (
        !Array.isArray(parsed)
      ) {

        return new Set();

      }


      return new Set(
        parsed
      );

    } catch (error) {

      console.warn(
        "Notification read-state error:",
        error
      );

      return new Set();

    }

  }


  let readIds =
    loadReadIds();


  function saveReadIds() {

    try {

      localStorage.setItem(
        READ_STORAGE_KEY,
        JSON.stringify(
          [...readIds]
            .slice(-MAX_READ_IDS)
        )
      );

    } catch (error) {

      console.warn(
        "Notification read-state save error:",
        error
      );

    }

  }


  /* =======================================================
     APP STATE
     ======================================================= */

  function getAppState() {

    if (
      typeof state ===
      "undefined"
    ) {

      return null;

    }

    return state;

  }


  /* =======================================================
     HELPERS
     ======================================================= */

  function escapeHTML(
    value
  ) {

    return String(
      value ?? ""
    ).replace(
      /[&<>'"]/g,
      character =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;"
        })[character]
    );

  }


  function notificationId(
    prefix,
    id
  ) {

    return (
      prefix +
      "::" +
      String(id)
    );

  }


  function relativeTime(
    date
  ) {

    if (!date) {
      return "Recent";
    }


    const time =
      new Date(date)
        .getTime();


    if (
      Number.isNaN(time)
    ) {

      return "Recent";

    }


    const difference =
      Date.now() -
      time;


    if (
      difference <
      60000
    ) {

      return "Just now";

    }


    const minutes =
      Math.floor(
        difference /
        60000
      );


    if (
      minutes <
      60
    ) {

      return (
        minutes +
        " min ago"
      );

    }


    const hours =
      Math.floor(
        minutes /
        60
      );


    if (
      hours <
      24
    ) {

      return (
        hours +
        " hr ago"
      );

    }


    const days =
      Math.floor(
        hours /
        24
      );


    if (
      days < 7
    ) {

      return (
        days +
        " day" +
        (
          days === 1
            ? ""
            : "s"
        ) +
        " ago"
      );

    }


    return "Recent";

  }


  function itemDate(
    item
  ) {

    if (
      item.timestamp
    ) {

      return item.timestamp;

    }


    if (
      item.date
    ) {

      return (
        String(
          item.date
        )
        .replace(
          /,\s*/g,
          ", "
        )
      );

    }


    return "";

  }


  function makeTransactionDate(
    date,
    time
  ) {

    if (!date) {
      return null;
    }


    const parsed =
      new Date(
        date
      );


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {

      return null;

    }


    if (!time) {
      return parsed;
    }


    const match =
      String(time).match(
        /(\d{1,2}):(\d{2})\s*(AM|PM)?/i
      );


    if (!match) {
      return parsed;
    }


    let hour =
      Number(
        match[1]
      );


    const minute =
      Number(
        match[2]
      );


    const meridiem =
      match[3]
        ?.toUpperCase();


    if (
      meridiem ===
      "PM" &&
      hour < 12
    ) {

      hour += 12;

    }


    if (
      meridiem ===
      "AM" &&
      hour === 12
    ) {

      hour = 0;

    }


    parsed.setHours(
      hour,
      minute,
      0,
      0
    );


    return parsed;

  }


  function daysUntilSafe(
    value
  ) {

    if (
      typeof daysUntil ===
      "function"
    ) {

      return daysUntil(
        value
      );

    }


    const target =
      new Date(
        `${value}T12:00:00`
      );


    return (
      target -
      new Date()
    ) / 86400000;

  }


  /* =======================================================
     BUILD NOTIFICATIONS
     ======================================================= */

  function buildNotifications() {

    const appState =
      getAppState();


    if (!appState) {
      return [];
    }


    const notifications = [];


    /* =====================================================
       INVENTORY — OUT OF STOCK
       ===================================================== */

    appState.products
      .filter(
        product =>
          Number(
            product.stock || 0
          ) === 0
      )
      .forEach(
        product => {

          notifications.push({

            id:
              notificationId(
                "inventory-out",
                product.id
              ),

            type:
              "red",

            icon:
              "fa-box-open",

            title:
              "Out of stock",

            text:
              `${escapeHTML(
                product.name
              )} has no stock remaining.`,

            page:
              "inventory",

            priority:
              1

          });

        }
      );


    /* =====================================================
       INVENTORY — LOW STOCK
       ===================================================== */

    appState.products
      .filter(
        product =>
          Number(
            product.stock || 0
          ) > 0 &&

          Number(
            product.stock || 0
          ) <=
          Number(
            product.reorder || 0
          )
      )
      .forEach(
        product => {

          notifications.push({

            id:
              notificationId(
                "inventory-low",
                product.id
              ),

            type:
              "yellow",

            icon:
              "fa-triangle-exclamation",

            title:
              "Low stock",

            text:
              `${escapeHTML(
                product.name
              )} has only ${Number(
                product.stock || 0
              )} left.`,

            page:
              "inventory",

            priority:
              2

          });

        }
      );


    /* =====================================================
       INVENTORY — EXPIRING SOON
       ===================================================== */

    appState.products
      .filter(
        product => {

          if (
            !product.expiry
          ) {

            return false;

          }


          const days =
            daysUntilSafe(
              product.expiry
            );


          return (
            days >= 0 &&
            days <= 30
          );

        }
      )
      .forEach(
        product => {

          notifications.push({

            id:
              notificationId(
                "inventory-expiry",
                product.id
              ),

            type:
              "blue",

            icon:
              "fa-clock",

            title:
              "Expiring soon",

            text:
              `${escapeHTML(
                product.name
              )} expires on ${escapeHTML(
                product.expiry
              )}.`,

            page:
              "inventory",

            priority:
              3

          });

        }
      );


    /* =====================================================
       UTANG — OVERDUE
       ===================================================== */

    appState.utang
      .filter(
        entry =>
          String(
            entry.status || ""
          ).toLowerCase() ===
          "overdue" &&

          Number(
            entry.balance || 0
          ) > 0
      )
      .forEach(
        entry => {

          notifications.push({

            id:
              notificationId(
                "utang-overdue",
                entry.id
              ),

            type:
              "orange",

            icon:
              "fa-hand-holding-dollar",

            title:
              "Overdue Utang",

            text:
              `${escapeHTML(
                entry.name
              )} has ${money(
                Number(
                  entry.balance || 0
                )
              )} outstanding.`,

            page:
              "utang",

            priority:
              4

          });

        }
      );


    /* =====================================================
       BILLS — OVERDUE
       ===================================================== */

    appState.bills
      .filter(
        bill => {

          if (
            !bill.due
          ) {

            return false;

          }


          return (
            daysUntilSafe(
              bill.due
            ) < 0
          );

        }
      )
      .forEach(
        bill => {

          notifications.push({

            id:
              notificationId(
                "bill-overdue",
                bill.id
              ),

            type:
              "red",

            icon:
              "fa-file-invoice-dollar",

            title:
              "Bill overdue",

            text:
              `${escapeHTML(
                bill.name
              )} is overdue: ${money(
                Number(
                  bill.amount || 0
                )
              )}.`,

            page:
              "bills",

            priority:
              1

          });

        }
      );


    /* =====================================================
       BILLS — DUE SOON
       ===================================================== */

    appState.bills
      .filter(
        bill => {

          if (
            !bill.due
          ) {

            return false;

          }


          const days =
            daysUntilSafe(
              bill.due
            );


          return (
            days >= 0 &&
            days <= 7
          );

        }
      )
      .forEach(
        bill => {

          notifications.push({

            id:
              notificationId(
                "bill-due",
                bill.id
              ),

            type:
              "yellow",

            icon:
              "fa-calendar-days",

            title:
              "Bill due soon",

            text:
              `${escapeHTML(
                bill.name
              )} is due on ${escapeHTML(
                bill.due
              )}.`,

            page:
              "bills",

            priority:
              3

          });

        }
      );


    /* =====================================================
       SALES — RECENT SALES
       ===================================================== */

    appState.sales
      .filter(
        sale =>
          sale &&
          Number(
            sale.total || 0
          ) > 0
      )
      .slice(
        0,
        10
      )
      .forEach(
        sale => {

          const timestamp =
            makeTransactionDate(
              sale.date,
              sale.time
            );


          notifications.push({

            id:
              notificationId(
                "sale",
                sale.id
              ),

            type:
              "green",

            icon:
              "fa-circle-check",

            title:
              "Sale recorded",

            text:
              `Sale completed for ${money(
                Number(
                  sale.total || 0
                )
              )} via ${escapeHTML(
                sale.payment ||
                "Cash"
              )}.`,

            page:
              "sales",

            priority:
              5,

            timestamp

          });

        }
      );


    /* =====================================================
       GCASH — RECENT TRANSACTIONS
       ===================================================== */

    appState.gcash
      .slice(
        0,
        10
      )
      .forEach(
        entry => {

          const isCashIn =
            String(
              entry.type || ""
            ).toLowerCase() ===
            "cash-in";


          notifications.push({

            id:
              notificationId(
                "gcash",
                entry.id
              ),

            type:
              isCashIn
                ? "green"
                : "blue",

            icon:
              isCashIn
                ? "fa-arrow-down"
                : "fa-arrow-up",

            title:
              isCashIn
                ? "GCash cash-in"
                : "GCash cash-out",

            text:
              `${money(
                Number(
                  entry.amount || 0
                )
              )} ${
                isCashIn
                  ? "added to"
                  : "released from"
              } GCash${
                entry.customer
                  ? ` · ${escapeHTML(
                      entry.customer
                    )}`
                  : ""
              }.`,

            page:
              "gcash",

            priority:
              6,

            timestamp:
              entry.date

          });

        }
      );


    /* =====================================================
       E-LOAD — RECENT TRANSACTIONS
       ===================================================== */

    appState.eload
      .slice(
        0,
        10
      )
      .forEach(
        entry => {

          notifications.push({

            id:
              notificationId(
                "eload",
                entry.id
              ),

            type:
              "blue",

            icon:
              "fa-mobile-screen-button",

            title:
              "E-Load transaction",

            text:
              `${escapeHTML(
                entry.network ||
                "Network"
              )} · ${money(
                Number(
                  entry.amount || 0
                )
              )}${

                entry.customer
                  ? ` · ${escapeHTML(
                      entry.customer
                    )}`
                  : ""

              }.`,

            page:
              "eload",

            priority:
              7,

            timestamp:
              entry.date

          });

        }
      );


    /* =====================================================
       VAULT — RECENT MOVEMENTS
       ===================================================== */

    appState.vault
      .slice(
        0,
        10
      )
      .forEach(
        entry => {

          const isIn =
            String(
              entry.type || ""
            ).toLowerCase()
              .includes(
                "in"
              );


          notifications.push({

            id:
              notificationId(
                "vault",
                entry.id
              ),

            type:
              isIn
                ? "green"
                : "orange",

            icon:
              isIn
                ? "fa-vault"
                : "fa-money-bill-transfer",

            title:
              isIn
                ? "Cash added to Vault"
                : "Cash removed from Vault",

            text:
              `${money(
                Number(
                  entry.amount || 0
                )
              )} ${
                isIn
                  ? "added"
                  : "removed"
              } ${
                entry.notes
                  ? `· ${escapeHTML(
                      entry.notes
                    )}`
                  : ""
              }.`,

            page:
              "vault",

            priority:
              8,

            timestamp:
              entry.date

          });

        }
      );


    /* =====================================================
       EMPLOYEES — RECENT PAYMENTS
       ===================================================== */

    appState.employees
      .filter(
        employee =>
          Number(
            employee.paid || 0
          ) > 0
      )
      .slice(
        0,
        10
      )
      .forEach(
        employee => {

          notifications.push({

            id:
              notificationId(
                "employee",
                employee.id
              ),

            type:
              "green",

            icon:
              "fa-money-check-dollar",

            title:
              "Employee payroll",

            text:
              `${escapeHTML(
                employee.name
              )} has ${money(
                Number(
                  employee.paid || 0
                )
              )} paid this period.`,

            page:
              "payroll",

            priority:
              9

          });

        }
      );


    /* =====================================================
       SORT
       ===================================================== */

    notifications.sort(
      (
        a,
        b
      ) => {

        if (
          a.priority !==
          b.priority
        ) {

          return (
            a.priority -
            b.priority
          );

        }


        const aTime =
          a.timestamp
            ? new Date(
                a.timestamp
              ).getTime()
            : 0;


        const bTime =
          b.timestamp
            ? new Date(
                b.timestamp
              ).getTime()
            : 0;


        return (
          bTime -
          aTime
        );

      }
    );


    return notifications.slice(
      0,
      50
    );
  }


  /* =======================================================
     UPDATE BADGE
     ======================================================= */

  function updateBadge(
    notifications
  ) {

    const unread =
      notifications.filter(
        item =>
          !readIds.has(
            item.id
          )
      ).length;


    if (
      unread > 0
    ) {

      badge.classList.remove(
        "hidden"
      );

      badge.textContent =
        unread > 99
          ? "99+"
          : String(
              unread
            );

      badge.setAttribute(
        "aria-hidden",
        "false"
      );

    } else {

      badge.classList.add(
        "hidden"
      );

      badge.textContent =
        "";

      badge.setAttribute(
        "aria-hidden",
        "true"
      );

    }


    if (subtitle) {

      subtitle.textContent =
        unread > 0

          ? `${unread} unread notification${
              unread === 1
                ? ""
                : "s"
            }`

          : "You're all caught up";

    }

  }


  /* =======================================================
     RENDER
     ======================================================= */

  function renderNotifications() {

    const notifications =
      buildNotifications();


    updateBadge(
      notifications
    );


    if (
      !notifications.length
    ) {

      list.innerHTML = `

        <div class="notification-empty">

          <div
            class="notification-empty-icon"
          >
            <i
              class="fa-regular fa-bell"
            ></i>
          </div>

          <strong>
            No notifications
          </strong>

          <span>
            You're all caught up.
          </span>

        </div>

      `;

      return;

    }


    list.innerHTML =
      notifications
        .map(
          item => {

            const unread =
              !readIds.has(
                item.id
              );


            return `

              <button
                type="button"
                class="notification-item ${
                  unread
                    ? "unread"
                    : ""
                }"
                data-notification-id="${
                  escapeHTML(
                    item.id
                  )
                }"
                data-notification-page="${
                  escapeHTML(
                    item.page
                  )
                }"
              >

                <div
                  class="notification-icon ${
                    item.type
                  }"
                >

                  <i
                    class="fa-solid ${
                      escapeHTML(
                        item.icon
                      )
                    }"
                  ></i>

                </div>


                <div
                  class="notification-content"
                >

                  <span
                    class="notification-item-title"
                  >
                    ${escapeHTML(
                      item.title
                    )}
                  </span>


                  <span
                    class="notification-item-text"
                  >
                    ${item.text}
                  </span>


                  <span
                    class="notification-item-time"
                  >
                    ${
                      relativeTime(
                        item.timestamp
                      )
                    }
                  </span>

                </div>


                ${
                  unread
                    ? `
                      <span
                        class="notification-unread-dot"
                      ></span>
                    `
                    : ""
                }

              </button>

            `;

          }
        )
        .join("");

  }


  /* =======================================================
     OPEN / CLOSE
     ======================================================= */

  function openPanel() {

    renderNotifications();

    panel.classList.add(
      "open"
    );

    panel.setAttribute(
      "aria-hidden",
      "false"
    );

    button.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  function closePanel() {

    panel.classList.remove(
      "open"
    );

    panel.setAttribute(
      "aria-hidden",
      "true"
    );

    button.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  function togglePanel() {

    if (
      panel.classList.contains(
        "open"
      )
    ) {

      closePanel();

    } else {

      openPanel();

    }

  }


  /* =======================================================
     MARK ALL AS READ
     ======================================================= */

  function markAllNotificationsRead() {

    const notifications =
      buildNotifications();


    notifications.forEach(
      item =>
        readIds.add(
          item.id
        )
    );


    /*
      Remove old IDs so
      localStorage doesn't
      grow indefinitely.
    */

    readIds =
      new Set(
        [...readIds]
          .slice(-MAX_READ_IDS)
      );


    saveReadIds();

    renderNotifications();

  }


  /* =======================================================
     CLICK SINGLE NOTIFICATION
     ======================================================= */

  function handleNotificationClick(
    event
  ) {

    const item =
      event.target.closest(
        ".notification-item"
      );


    if (!item) {
      return;
    }


    const id =
      item.dataset
        .notificationId;


    const page =
      item.dataset
        .notificationPage;


    if (id) {

      readIds.add(
        id
      );

      saveReadIds();

    }


    closePanel();


    if (
      page &&
      typeof showPage ===
      "function"
    ) {

      showPage(
        page
      );

    }

  }


  /* =======================================================
     VIEW ALL
     ======================================================= */

  function viewAllNotifications() {

    const notifications =
      buildNotifications();


    /*
      Mark currently displayed
      notifications as read.
    */

    notifications.forEach(
      item =>
        readIds.add(
          item.id
        )
    );


    saveReadIds();

    closePanel();

    /*
      Existing alert system is
      primarily inventory-based,
      so View all opens Inventory.
    */

    if (
      typeof showPage ===
      "function"
    ) {

      showPage(
        "inventory"
      );

    }

  }


  /* =======================================================
     EVENTS
     ======================================================= */

  /*
    Capture-phase listener prevents
    the original app.js #notifBtn
    handler from navigating to
    Inventory when the bell is clicked.
  */

  button.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopImmediatePropagation();

      togglePanel();

    },
    true
  );


  list.addEventListener(
    "click",
    handleNotificationClick
  );


  markAll?.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      markAllNotificationsRead();

    }
  );


  viewAll?.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      viewAllNotifications();

    }
  );


  /* -------------------------------------------------------
     CLICK OUTSIDE
     ------------------------------------------------------- */

  document.addEventListener(
    "click",
    function (event) {

      if (
        !panel.classList.contains(
          "open"
        )
      ) {

        return;

      }


      if (
        event.target.closest(
          ".notification-wrapper"
        )
      ) {

        return;

      }


      closePanel();

    }
  );


  /* -------------------------------------------------------
     ESCAPE
     ------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key ===
        "Escape"
      ) {

        closePanel();

      }

    }
  );


  /* =======================================================
     LIVE SYNCHRONIZATION
     ======================================================= */

  let lastSignature =
    "";


  function getStateSignature() {

    const appState =
      getAppState();


    if (!appState) {
      return "";
    }


    try {

      return JSON.stringify({
        products:
          appState.products,

        sales:
          appState.sales,

        utang:
          appState.utang,

        gcash:
          appState.gcash,

        eload:
          appState.eload,

        bills:
          appState.bills,

        employees:
          appState.employees,

        vault:
          appState.vault
      });

    } catch (error) {

      return "";

    }

  }


  function refresh() {

    const signature =
      getStateSignature();


    if (
      signature ===
      lastSignature
    ) {

      return;

    }


    lastSignature =
      signature;


    renderNotifications();

  }


  /*
    Same-tab synchronization.
    The main app modifies `state` and
    saves it to localStorage.
    Polling catches those updates
    without creating a second state.
  */

  setInterval(
    refresh,
    1000
  );


  /*
    Other browser tab/window.
  */

  window.addEventListener(
    "storage",
    function (event) {

      if (
        typeof storageKey ===
        "function" &&
        event.key ===
        storageKey()
      ) {

        if (
          typeof load ===
          "function"
        ) {

          load();

        }

        lastSignature =
          "";

        refresh();

      }

    }
  );


  /*
    Returning to PWA/browser.
  */

  window.addEventListener(
    "focus",
    function () {

      if (
        typeof load ===
        "function"
      ) {

        load();

      }

      lastSignature =
        "";

      refresh();

    }
  );


  document.addEventListener(
    "visibilitychange",
    function () {

      if (
        document.visibilityState ===
        "visible"
      ) {

        lastSignature =
          "";

        refresh();

      }

    }
  );


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.MyNegosyoNotifications = {

    refresh,

    open:
      openPanel,

    close:
      closePanel,

    markAllRead:
      markAllNotificationsRead

  };


  /* =======================================================
     INITIAL RENDER
     ======================================================= */

  renderNotifications();

})();