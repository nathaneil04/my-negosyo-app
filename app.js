/* =========================================================
   MYNEGOSYO — FUNCTIONAL SINGLE-PAGE BUSINESS MANAGER
   Complete updated app.js
   ========================================================= */


/* =========================================================
   DEFAULT APPLICATION STATE
   ========================================================= */

const DEFAULT_STATE = {
  page: 'dashboard',
  pay: 'Cash',
  cart: [],

  products: [
    {
      id: 1,
      name: 'Lucky Me Pancit Canton',
      category: 'Noodles',
      stock: 18,
      reorder: 10,
      price: 16,
      cost: 11,
      expiry: '2026-10-03',
      barcode: '480001234001'
    },
    {
      id: 2,
      name: 'Coca-Cola 1.5L',
      category: 'Beverages',
      stock: 4,
      reorder: 8,
      price: 82,
      cost: 68,
      expiry: '2026-12-08',
      barcode: '480001234002'
    },
    {
      id: 3,
      name: 'Bear Brand 33g',
      category: 'Grocery',
      stock: 6,
      reorder: 10,
      price: 18,
      cost: 14,
      expiry: '2026-09-27',
      barcode: '480001234003'
    },
    {
      id: 4,
      name: 'Piattos Cheese 85g',
      category: 'Snacks',
      stock: 27,
      reorder: 8,
      price: 39,
      cost: 31,
      expiry: '2027-01-12',
      barcode: '480001234004'
    },
    {
      id: 5,
      name: 'Century Tuna 155g',
      category: 'Canned Goods',
      stock: 15,
      reorder: 6,
      price: 49,
      cost: 41,
      expiry: '2026-10-15',
      barcode: '480001234005'
    },
    {
      id: 6,
      name: 'Surf Powder 25g',
      category: 'Laundry',
      stock: 0,
      reorder: 8,
      price: 10,
      cost: 7,
      expiry: '2027-04-02',
      barcode: '480001234006'
    },
    {
      id: 7,
      name: 'Lucky Me Beef 55g',
      category: 'Noodles',
      stock: 32,
      reorder: 10,
      price: 12,
      cost: 8.5,
      expiry: '2027-02-11',
      barcode: '480001234007'
    },
    {
      id: 8,
      name: 'Selecta Ice Cream Cup',
      category: 'Frozen',
      stock: 9,
      reorder: 5,
      price: 35,
      cost: 28,
      expiry: '2026-09-23',
      barcode: '480001234008'
    },
    {
      id: 9,
      name: 'SkyFlakes Crackers',
      category: 'Snacks',
      stock: 21,
      reorder: 8,
      price: 9,
      cost: 6.5,
      expiry: '2027-03-18',
      barcode: '480001234009'
    },
    {
      id: 10,
      name: 'Alaska Evap 370ml',
      category: 'Grocery',
      stock: 13,
      reorder: 6,
      price: 45,
      cost: 37,
      expiry: '2026-11-20',
      barcode: '480001234010'
    },
    {
      id: 11,
      name: 'Wilkins 500ml',
      category: 'Beverages',
      stock: 41,
      reorder: 12,
      price: 20,
      cost: 14,
      expiry: '2027-07-09',
      barcode: '480001234011'
    },
    {
      id: 12,
      name: 'Palmolive Sachet',
      category: 'Personal Care',
      stock: 16,
      reorder: 8,
      price: 9,
      cost: 6.5,
      expiry: '2027-01-26',
      barcode: '480001234012'
    }
  ],

  services: [
    {
      id: 101,
      name: 'Phone Repair',
      price: 250,
      duration: '45 min',
      icon: 'fa-mobile-screen-button',
      description: 'Basic phone diagnostics and repair'
    },
    {
      id: 102,
      name: 'Haircut',
      price: 80,
      duration: '30 min',
      icon: 'fa-scissors',
      description: 'Basic haircut service'
    },
    {
      id: 103,
      name: 'Motorcycle Tune-up',
      price: 350,
      duration: '1 hr',
      icon: 'fa-wrench',
      description: 'Standard tune-up'
    }
  ],

  utang: [
    {
      id: 201,
      name: 'Maria Santos',
      balance: 1250,
      last: 'Sep 13, 2026',
      status: 'Overdue'
    },
    {
      id: 202,
      name: 'Jun Reyes',
      balance: 840,
      last: 'Sep 14, 2026',
      status: 'Current'
    },
    {
      id: 203,
      name: 'Ana Cruz',
      balance: 620,
      last: 'Sep 12, 2026',
      status: 'Current'
    },
    {
      id: 204,
      name: 'Pedro Dela Cruz',
      balance: 980,
      last: 'Sep 10, 2026',
      status: 'Overdue'
    },
    {
      id: 205,
      name: 'Liza Mendoza',
      balance: 350,
      last: 'Sep 14, 2026',
      status: 'Current'
    }
  ],

  gcash: [
    {
      id: 301,
      date: 'Sep 14, 2026',
      type: 'Cash-in',
      customer: 'Carla R.',
      amount: 500,
      fee: 10,
      notes: 'Wallet top-up'
    },
    {
      id: 302,
      date: 'Sep 14, 2026',
      type: 'Cash-out',
      customer: 'Ben P.',
      amount: 200,
      fee: 10,
      notes: 'Customer cash-out'
    },
    {
      id: 303,
      date: 'Sep 13, 2026',
      type: 'Cash-in',
      customer: 'Jomar A.',
      amount: 1000,
      fee: 10,
      notes: 'Wallet top-up'
    },
    {
      id: 304,
      date: 'Sep 13, 2026',
      type: 'Cash-out',
      customer: 'Nina T.',
      amount: 300,
      fee: 10,
      notes: 'Customer cash-out'
    }
  ],

  eload: [
    {
      id: 401,
      date: 'Sep 14, 2026',
      network: 'Globe',
      type: 'Cash-out',
      amount: 100,
      fee: 5,
      customer: ''
    },
    {
      id: 402,
      date: 'Sep 14, 2026',
      network: 'Smart',
      type: 'Cash-out',
      amount: 50,
      fee: 5,
      customer: ''
    },
    {
      id: 403,
      date: 'Sep 13, 2026',
      network: 'DITO',
      type: 'Cash-out',
      amount: 100,
      fee: 5,
      customer: ''
    },
    {
      id: 404,
      date: 'Sep 13, 2026',
      network: 'TM',
      type: 'Cash-out',
      amount: 50,
      fee: 5,
      customer: ''
    }
  ],

  bills: [
    {
      id: 501,
      name: 'Electricity',
      amount: 1850,
      due: '2026-09-18',
      status: 'Due soon',
      icon: 'fa-bolt'
    },
    {
      id: 502,
      name: 'Water',
      amount: 620,
      due: '2026-09-22',
      status: 'Scheduled',
      icon: 'fa-droplet'
    },
    {
      id: 503,
      name: 'Internet',
      amount: 1499,
      due: '2026-10-01',
      status: 'Scheduled',
      icon: 'fa-wifi'
    }
  ],

  employees: [
    {
      id: 601,
      name: 'Aira Mae',
      role: 'Store Staff',
      rate: 480,
      paid: 4320,
      icon: 'AM'
    },
    {
      id: 602,
      name: 'Mark John',
      role: 'Delivery',
      rate: 500,
      paid: 3500,
      icon: 'MJ'
    }
  ],

  vault: [
    {
      id: 701,
      date: 'Sep 14, 2026',
      type: 'Cash in',
      amount: 1000,
      notes: 'End-of-day sales transfer'
    },
    {
      id: 702,
      date: 'Sep 14, 2026',
      type: 'Cash out',
      amount: 400,
      notes: 'Supplier payment'
    },
    {
      id: 703,
      date: 'Sep 13, 2026',
      type: 'Cash in',
      amount: 2500,
      notes: 'Previous day deposit'
    }
  ],

  sales: [],

  settings: {
    store: 'My Store',
    owner: 'Negosyo Owner',
    lowStock: true,
    expiry: true,
    dailySummary: true
  }
};


/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

const $ = s => document.querySelector(s);

const $$ = s =>
  [...document.querySelectorAll(s)];

const money = n =>
  '₱' +
  Number(n || 0).toLocaleString(
    'en-PH',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );

const uid = () =>
  Date.now() +
  Math.floor(Math.random() * 1000);

const esc = v =>
  String(v ?? '').replace(
    /[&<>'"]/g,
    c =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      })[c]
  );

const today = () =>
  new Date().toISOString().slice(0, 10);

const humanDate = value => {

  const d = value
    ? new Date(
        value.includes('T')
          ? value
          : `${value}T12:00:00`
      )
    : new Date();

  return isNaN(d)
    ? value
    : d.toLocaleDateString(
        'en-PH',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        }
      );
};

const daysUntil = value =>
  (
    new Date(`${value}T12:00:00`) -
    new Date()
  ) / 86400000;

const clone = x =>
  JSON.parse(JSON.stringify(x));


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let state =
  clone(DEFAULT_STATE);


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function storageKey() {
  return 'mynegosyo_state_v3';
}


function load() {

  try {

    const raw =
      localStorage.getItem(
        storageKey()
      );

    if (raw) {

      const saved =
        JSON.parse(raw);

      state =
        Object.assign(
          clone(DEFAULT_STATE),
          saved
        );

      state.settings =
        Object.assign(
          clone(DEFAULT_STATE.settings),
          saved.settings || {}
        );

      state.cart =
        Array.isArray(saved.cart)
          ? saved.cart
          : [];
    }

  } catch (e) {

    console.warn(
      'MyNegosyo load error',
      e
    );

  }

  if ($('#storeNameSidebar')) {
    $('#storeNameSidebar').textContent =
      state.settings.store ||
      'My Store';
  }

  if ($('#storeNameInput')) {
    $('#storeNameInput').value =
      state.settings.store ||
      'My Store';
  }
}


function save() {

  try {

    localStorage.setItem(
      storageKey(),
      JSON.stringify(state)
    );

    if ($('#storeNameSidebar')) {
      $('#storeNameSidebar').textContent =
        state.settings.store ||
        'My Store';
    }

    /*
      Immediately refresh the visible dashboard
      after every state update.
    */

    if (
      typeof state !== 'undefined' &&
      state.page === 'dashboard' &&
      typeof renderDashboard === 'function'
    ) {
      renderDashboard();
    }

  } catch (e) {

    console.error(
      'MyNegosyo save error',
      e
    );

  }
}


/* =========================================================
   DYNAMIC MODAL
   ========================================================= */

function ensureDynamicModal() {

  if ($('#entityModal')) {
    return;
  }

  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div class="modal" id="entityModal">

      <div class="modal-head">

        <div>
          <p
            class="eyebrow"
            id="entityEyebrow"
          >
            RECORD
          </p>

          <h2 id="entityTitle">
            Add Record
          </h2>
        </div>

        <button
          class="icon-btn"
          data-close="entityModal"
          type="button"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

      </div>

      <form id="entityForm"></form>

    </div>
    `
  );

  $('[data-close="entityModal"]')
    .onclick = () =>
      closeModal('entityModal');
}


/* =========================================================
   MODALS
   ========================================================= */

function openModal(id) {

  $('#overlay')
    ?.classList
    .add('open');

  $('#' + id)
    ?.classList
    .add('open');
}


function closeModal(id) {

  $('#' + id)
    ?.classList
    .remove('open');

  if (!$$('.modal.open').length) {

    $('#overlay')
      ?.classList
      .remove('open');

  }
}


/* =========================================================
   TOAST
   ========================================================= */

function toast(
  msg,
  type = 'ok'
) {

  const t =
    $('#toast');

  if (!t) {
    return;
  }

  const span =
    t.querySelector('span');

  if (span) {
    span.textContent =
      msg;
  }

  const icon =
    t.querySelector('i');

  if (icon) {

    icon.className =
      type === 'error'
        ? 'fa-solid fa-circle-exclamation'
        : 'fa-solid fa-circle-check';

  }

  t.classList.add('show');

  clearTimeout(
    window._toast
  );

  window._toast =
    setTimeout(
      () =>
        t.classList.remove('show'),
      2200
    );
}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(page) {

  if (!$('#page-' + page)) {
    page = 'dashboard';
  }

  state.page =
    page;

  $$('.page')
    .forEach(
      x =>
        x.classList.toggle(
          'active',
          x.id === `page-${page}`
        )
    );

  $$('.nav-item[data-page], .bottom-item[data-page]')
    .forEach(
      x =>
        x.classList.toggle(
          'active',
          x.dataset.page === page
        )
    );

  if (
    window.innerWidth <= 760
  ) {

    $('#sidebar')
      ?.classList
      .remove('open');

  }

  renderPage(page);

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


function renderPage(page) {

  const map = {

    dashboard:
      renderDashboard,

    inventory:
      renderInventory,

    sales:
      renderSaleCatalog,

    services:
      renderServices,

    utang:
      renderUtang,

    gcash:
      renderGCash,

    eload:
      renderELoad,

    bills:
      renderBills,

    payroll:
      renderEmployees,

    vault:
      renderVault,

    reports:
      renderReports,

    settings:
      renderSettings

  };

  map[page]?.();
}


/* =========================================================
   FINANCIAL CALCULATIONS
   ========================================================= */

function dateSalesTotal() {

  const d =
    today();

  return state.sales
    .filter(
      s => s.date === d
    )
    .reduce(
      (a, s) =>
        a + Number(s.total || 0),
      0
    );
}


function monthSalesTotal() {

  const prefix =
    today().slice(0, 7);

  return state.sales
    .filter(
      s =>
        String(s.date || '')
          .startsWith(prefix)
    )
    .reduce(
      (a, s) =>
        a + Number(s.total || 0),
      0
    );
}


function totalUtang() {

  return state.utang
    .reduce(
      (a, u) =>
        a +
        Number(
          u.balance || 0
        ),
      0
    );
}


function vaultBalance() {

  return state.vault
    .reduce(
      (a, v) =>
        a +
        (
          v.type === 'Cash out'
            ? -Number(v.amount || 0)
            : Number(v.amount || 0)
        ),
      0
    );
}


function gcashBalance() {

  return state.gcash
    .reduce(
      (a, r) =>
        a +
        (
          r.type === 'Cash-in'
            ? Number(r.amount || 0)
            : -Number(r.amount || 0)
        ),
      0
    );
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

  /* -------------------------------------------------------
     LOW STOCK
     ------------------------------------------------------- */

  const low =
    state.products.filter(
      p =>
        Number(p.stock || 0) > 0 &&
        Number(p.stock || 0) <=
          Number(p.reorder || 0)
    );

  const out =
    state.products.filter(
      p =>
        Number(p.stock || 0) === 0
    );

  const lowCount =
    low.length +
    out.length;


  /* -------------------------------------------------------
     EXPIRING
     ------------------------------------------------------- */

  const exp =
    state.products.filter(
      p =>
        p.expiry &&
        daysUntil(p.expiry) >= 0 &&
        daysUntil(p.expiry) <= 30
    ).length;


  /* -------------------------------------------------------
     TODAY'S SALES
     ------------------------------------------------------- */

  const todaySales =
    dateSalesTotal();

  const todaySalesEl =
    $('#todaySales');

  if (todaySalesEl) {

    todaySalesEl.textContent =
      money(todaySales);

    todaySalesEl.hidden =
      false;

    todaySalesEl.style.display =
      'block';

    todaySalesEl.style.visibility =
      'visible';

    todaySalesEl.style.opacity =
      '1';

    todaySalesEl.style.color =
      '#ffffff';

    todaySalesEl.style.fontSize =
      'clamp(28px, 7vw, 38px)';

    todaySalesEl.style.fontWeight =
      '800';

    todaySalesEl.style.lineHeight =
      '1.05';

    todaySalesEl.style.letterSpacing =
      '-1px';

    todaySalesEl.style.whiteSpace =
      'nowrap';
  }


  /* -------------------------------------------------------
     LOW STOCK
     ------------------------------------------------------- */

  const lowStockEl =
    $('#dashLowStock');

  if (lowStockEl) {

    lowStockEl.textContent =
      `${lowCount} item${
        lowCount === 1
          ? ''
          : 's'
      }`;

    lowStockEl.hidden =
      false;

    lowStockEl.style.display =
      'block';

    lowStockEl.style.visibility =
      'visible';

    lowStockEl.style.opacity =
      '1';

    lowStockEl.style.color =
      '#152033';

    lowStockEl.style.fontSize =
      'clamp(22px, 6vw, 30px)';

    lowStockEl.style.fontWeight =
      '800';

    lowStockEl.style.lineHeight =
      '1.05';

    lowStockEl.style.letterSpacing =
      '-0.7px';

    lowStockEl.style.whiteSpace =
      'nowrap';
  }


  /* -------------------------------------------------------
     UTANG
     ------------------------------------------------------- */

  const utangValue =
    totalUtang();

  const utangEl =
    $('#todayUtang');

  if (utangEl) {

    utangEl.textContent =
      money(utangValue);

    utangEl.hidden =
      false;

    utangEl.style.display =
      'block';

    utangEl.style.visibility =
      'visible';

    utangEl.style.opacity =
      '1';

    utangEl.style.color =
      '#152033';

    utangEl.style.fontSize =
      'clamp(25px, 7vw, 36px)';

    utangEl.style.fontWeight =
      '800';

    utangEl.style.lineHeight =
      '1.05';

    utangEl.style.letterSpacing =
      '-1px';

    utangEl.style.whiteSpace =
      'nowrap';
  }


  /* -------------------------------------------------------
     GCASH
     ------------------------------------------------------- */

  const gcashValue =
    gcashBalance();

  const gcashEl =
    $('#dashGcash');

  if (gcashEl) {

    gcashEl.textContent =
      money(gcashValue);

    gcashEl.hidden =
      false;

    gcashEl.style.display =
      'block';

    gcashEl.style.visibility =
      'visible';

    gcashEl.style.opacity =
      '1';

    gcashEl.style.color =
      '#152033';

    gcashEl.style.fontSize =
      'clamp(25px, 7vw, 36px)';

    gcashEl.style.fontWeight =
      '800';

    gcashEl.style.lineHeight =
      '1.05';

    gcashEl.style.letterSpacing =
      '-1px';

    gcashEl.style.whiteSpace =
      'nowrap';
  }


  /* -------------------------------------------------------
     OTHER NUMBERS
     ------------------------------------------------------- */

  if ($('#summaryLow')) {

    $('#summaryLow').textContent =
      lowCount;

  }

  if ($('#lowStockBadge')) {

    $('#lowStockBadge').textContent =
      lowCount;

  }

  if ($('#summaryExpiry')) {

    $('#summaryExpiry').textContent =
      exp;

  }

  if ($('#totalProducts')) {

    $('#totalProducts').textContent =
      state.products.length;

  }

  if ($('#stockValue')) {

    const stockValue =
      state.products.reduce(
        (sum, p) =>
          sum +
          Number(p.stock || 0) *
          Number(p.cost || 0),
        0
      );

    $('#stockValue').textContent =
      money(stockValue);

  }


  /* -------------------------------------------------------
     ACTIVE UTANG CUSTOMERS
     ------------------------------------------------------- */

  const activeCustomers =
    state.utang.filter(
      u =>
        Number(u.balance || 0) > 0
    ).length;

  const utangCard =
    $('#todayUtang')
      ?.closest('.stat-card');

  if (utangCard) {

    const trend =
      utangCard.querySelector('.trend');

    if (trend) {

      trend.textContent =
        `${activeCustomers} active customer${
          activeCustomers === 1
            ? ''
            : 's'
        }`;
    }
  }


  /* -------------------------------------------------------
     ALERTS
     ------------------------------------------------------- */

  const alerts = [];


  out
    .slice(0, 3)
    .forEach(
      p => {

        alerts.push(
          alertRow(
            'red',
            'fa-circle-exclamation',
            `${esc(p.name)} is out of stock`,
            'Restock now'
          )
        );

      }
    );


  low
    .slice(0, 3)
    .forEach(
      p => {

        alerts.push(
          alertRow(
            'yellow',
            'fa-triangle-exclamation',
            `${esc(p.name)} is running low`,
            `${p.stock} left`
          )
        );

      }
    );


  state.products
    .filter(
      p =>
        p.expiry &&
        daysUntil(p.expiry) >= 0 &&
        daysUntil(p.expiry) <= 30
    )
    .slice(0, 2)
    .forEach(
      p => {

        alerts.push(
          alertRow(
            'blue',
            'fa-clock',
            `${esc(p.name)} expires soon`,
            humanDate(p.expiry)
          )
        );

      }
    );


  if ($('#alertList')) {

    $('#alertList').innerHTML =
      alerts.join('') ||
      `
      <div class="empty-state">
        <p>No alerts</p>
        <span>Your store looks good.</span>
      </div>
      `;
  }


  /* -------------------------------------------------------
     REFRESH OTHER DASHBOARD COMPONENTS
     ------------------------------------------------------- */

  renderTopProducts();

  drawChart();
}


/* =========================================================
   ALERT ROW
   ========================================================= */

function alertRow(
  kind,
  icon,
  title,
  sub
) {

  return `
    <div class="alert-item">

      <div class="alert-dot alert-${kind}">
        <i class="fa-solid ${icon}"></i>
      </div>

      <div>
        <strong>${title}</strong>
        <span>${esc(sub)}</span>
      </div>

    </div>
  `;
}


/* =========================================================
   TOP PRODUCTS
   ========================================================= */

function soldMap() {

  const m = {};

  state.sales.forEach(
    s => {

      if (!Array.isArray(s.items)) {
        return;
      }

      s.items.forEach(
        i => {

          if (!i.service) {

            m[i.id] =
              (m[i.id] || 0) +
              Number(i.qty || 0);

          }

        }
      );

    }
  );

  return m;
}


function topProductRows() {

  const sold =
    soldMap();

  return state.products
    .map(
      p => ({
        p,
        sold:
          sold[p.id] || 0
      })
    )
    .sort(
      (a, b) =>
        b.sold - a.sold ||
        a.p.name.localeCompare(
          b.p.name
        )
    )
    .slice(0, 6);
}


function renderTopProducts() {

  const rows =
    topProductRows();

  const html =
    rows.length
      ? rows
          .map(
            (r, i) =>
              `
              <div class="rank-row">

                <div class="rank-num">
                  ${i + 1}
                </div>

                <div class="rank-info">

                  <strong>
                    ${esc(r.p.name)}
                  </strong>

                  <span>
                    ${esc(r.p.category)}
                  </span>

                </div>

                <div class="rank-value">
                  ${r.sold} sold
                </div>

              </div>
              `
          )
          .join('')
      : `
        <div class="empty-state">
          <p>No sales yet</p>
        </div>
        `;

  if ($('#topProducts')) {

    $('#topProducts').innerHTML =
      html;

  }

  if ($('#reportProducts')) {

    $('#reportProducts').innerHTML =
      html;

  }
}


/* =========================================================
   SALES CHART
   ========================================================= */

function drawChart() {

  const c =
    $('#salesChart');

  if (!c) {
    return;
  }

  const rect =
    c.getBoundingClientRect();

  const w =
    Math.max(
      280,
      Math.floor(
        rect.width || 500
      )
    );

  const h =
    180;

  const dpr =
    window.devicePixelRatio || 1;

  c.width =
    w * dpr;

  c.height =
    h * dpr;

  const ctx =
    c.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  ctx.clearRect(
    0,
    0,
    w,
    h
  );


  const vals = [];
  const labels = [];


  for (
    let i = 6;
    i >= 0;
    i--
  ) {

    const d =
      new Date();

    d.setDate(
      d.getDate() - i
    );

    const key =
      d.toISOString()
        .slice(0, 10);

    vals.push(
      state.sales
        .filter(
          s =>
            s.date === key
        )
        .reduce(
          (a, s) =>
            a +
            Number(
              s.total || 0
            ),
          0
        )
    );

    labels.push(
      i === 0
        ? 'Today'
        : d.toLocaleDateString(
            'en-PH',
            {
              month: 'short',
              day: 'numeric'
            }
          )
    );
  }


  const max =
    Math.max(
      100,
      Math.max(...vals) * 1.2
    );


  /* Grid */

  ctx.strokeStyle =
    '#e9edf4';

  ctx.lineWidth =
    1;

  for (
    let y = 25;
    y < h - 24;
    y += 31
  ) {

    ctx.beginPath();

    ctx.moveTo(
      0,
      y
    );

    ctx.lineTo(
      w,
      y
    );

    ctx.stroke();

  }


  /* Line */

  ctx.beginPath();

  vals.forEach(
    (v, i) => {

      const x =
        16 +
        i *
          (w - 32) /
          6;

      const y =
        h -
        24 -
        (v / max) *
          (h - 55);

      if (i) {

        ctx.lineTo(
          x,
          y
        );

      } else {

        ctx.moveTo(
          x,
          y
        );

      }

    }
  );

  ctx.strokeStyle =
    '#0d6efd';

  ctx.lineWidth =
    3;

  ctx.stroke();


  /* Points + Labels */

  vals.forEach(
    (v, i) => {

      const x =
        16 +
        i *
          (w - 32) /
          6;

      const y =
        h -
        24 -
        (v / max) *
          (h - 55);


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        4,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        '#fff';

      ctx.fill();

      ctx.strokeStyle =
        '#0d6efd';

      ctx.lineWidth =
        2;

      ctx.stroke();


      ctx.fillStyle =
        '#8793a7';

      ctx.font =
        '9px Inter';

      ctx.fillText(
        labels[i],
        x - 12,
        h - 7
      );

    }
  );
}


/* =========================================================
   INVENTORY STATUS
   ========================================================= */

function productStatus(p) {

  if (
    Number(p.stock || 0) === 0
  ) {

    return [
      'low',
      'Out of stock'
    ];

  }

  if (
    Number(p.stock || 0) <=
    Number(p.reorder || 0)
  ) {

    return [
      'low',
      'Low stock'
    ];

  }

  if (
    p.expiry &&
    daysUntil(p.expiry) >= 0 &&
    daysUntil(p.expiry) <= 30
  ) {

    return [
      'exp',
      'Expiring soon'
    ];

  }

  if (
    p.expiry &&
    daysUntil(p.expiry) < 0
  ) {

    return [
      'low',
      'Expired'
    ];

  }

  return [
    'good',
    'In stock'
  ];
}


/* =========================================================
   INVENTORY
   ========================================================= */

function renderInventory() {

  const q =
    (
      $('#inventorySearch')
        ?.value ||
      ''
    )
      .trim()
      .toLowerCase();

  const f =
    $('#inventoryFilter')
      ?.value ||
    'all';


  const list =
    state.products.filter(
      p => {

        const [k] =
          productStatus(p);

        const hay =
          `${p.name} ${p.category} ${p.barcode || ''}`
            .toLowerCase();

        return (

          (
            !q ||
            hay.includes(q)
          )

          &&

          (
            f === 'all' ||

            (
              f === 'low' &&
              p.stock > 0 &&
              p.stock <= p.reorder
            ) ||

            (
              f === 'out' &&
              p.stock === 0
            ) ||

            (
              f === 'expiry' &&
              k === 'exp'
            )
          )

        );

      }
    );


  if ($('#inventoryTable')) {

    $('#inventoryTable').innerHTML =
      list.length

        ? list
            .map(
              p => {

                const [k, s] =
                  productStatus(p);

                return `
                  <tr>

                    <td>
                      <strong>
                        ${esc(p.name)}
                      </strong>
                    </td>

                    <td>
                      ${esc(p.category)}
                    </td>

                    <td>
                      ${p.stock}
                    </td>

                    <td>
                      ${money(p.price)}
                    </td>

                    <td>
                      ${money(p.cost)}
                    </td>

                    <td>
                      ${p.expiry || '—'}
                    </td>

                    <td>
                      <span class="status ${k}">
                        ${s}
                      </span>
                    </td>

                    <td>

                      <div class="row-actions">

                        <button
                          title="Edit"
                          onclick="editProduct(${p.id})"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </button>

                        <button
                          title="Delete"
                          onclick="deleteProduct(${p.id})"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>

                      </div>

                    </td>

                  </tr>
                `;

              }
            )
            .join('')

        : `
          <tr>

            <td colspan="8">

              <div class="empty-state">

                <p>
                  No products found
                </p>

                <span>
                  Try a different search
                  or add a product.
                </span>

              </div>

            </td>

          </tr>
          `;
  }


  if ($('#mobileProducts')) {

    $('#mobileProducts').innerHTML =
      list.length

        ? list
            .map(
              p => {

                const [k, s] =
                  productStatus(p);

                return `
                  <div class="product-mobile">

                    <div class="pm-top">

                      <strong>
                        ${esc(p.name)}
                      </strong>

                      <span
                        class="status ${k}"
                      >
                        ${s}
                      </span>

                    </div>

                    <div class="pm-meta">

                      <div>
                        <span>Stock</span>
                        <b>${p.stock}</b>
                      </div>

                      <div>
                        <span>Price</span>
                        <b>${money(p.price)}</b>
                      </div>

                      <div>
                        <span>Expiry</span>
                        <b>${p.expiry || '—'}</b>
                      </div>

                    </div>

                    <div
                      class="row-actions"
                      style="margin-top:10px"
                    >

                      <button
                        onclick="editProduct(${p.id})"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </button>

                      <button
                        onclick="deleteProduct(${p.id})"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>

                    </div>

                  </div>
                `;

              }
            )
            .join('')

        : `
          <div class="empty-state">
            <p>No products found</p>
          </div>
          `;
  }


  if ($('#totalProducts')) {

    $('#totalProducts').textContent =
      state.products.length;

  }


  if ($('#stockValue')) {

    $('#stockValue').textContent =
      money(
        state.products.reduce(
          (a, p) =>
            a +
            Number(p.stock || 0) *
            Number(p.cost || 0),
          0
        )
      );

  }


  if ($('#summaryLow')) {

    $('#summaryLow').textContent =
      state.products.filter(
        p =>
          p.stock <=
          p.reorder
      ).length;

  }


  if ($('#summaryExpiry')) {

    $('#summaryExpiry').textContent =
      state.products.filter(
        p =>
          p.expiry &&
          daysUntil(p.expiry) >= 0 &&
          daysUntil(p.expiry) <= 30
      ).length;

  }
}


/* =========================================================
   SALES CATALOG
   ========================================================= */

function renderSaleCatalog() {

  const q =
    (
      $('#saleSearch')
        ?.value ||
      ''
    ).toLowerCase();


  const products =
    state.products.filter(
      p =>
        p.name
          .toLowerCase()
          .includes(q) ||

        (
          p.category ||
          ''
        )
          .toLowerCase()
          .includes(q)
    );


  const services =
    state.services.filter(
      s =>
        s.name
          .toLowerCase()
          .includes(q)
    );


  const arr = [
    ...products,

    ...services.map(
      s => ({
        id: s.id,
        name: s.name,
        category: 'Service',
        price: s.price,
        stock: 999,
        service: true,
        icon: s.icon
      })
    )
  ];


  if ($('#saleCatalog')) {

    $('#saleCatalog').innerHTML =
      arr.length

        ? arr
            .map(
              p =>
                `
                <div class="sale-product">

                  <div>

                    <strong>
                      ${esc(p.name)}
                    </strong>

                    <span>
                      ${esc(p.category)}
                      ${
                        p.service
                          ? ''
                          : ` · Stock ${p.stock}`
                      }
                    </span>

                    <div class="price">
                      ${money(p.price)}
                    </div>

                  </div>

                  <button
                    class="add-to-cart"
                    ${
                      !p.service &&
                      p.stock === 0
                        ? 'disabled'
                        : ''
                    }
                    onclick="addToCart(
                      ${p.id},
                      ${!!p.service}
                    )"
                  >

                    <i
                      class="fa-solid ${
                        p.stock === 0
                          ? 'fa-ban'
                          : 'fa-plus'
                      }"
                    ></i>

                  </button>

                </div>
                `
            )
            .join('')

        : `
          <div class="empty-state">
            <p>No item found</p>
          </div>
          `;
  }


  renderCart();
}


/* =========================================================
   CART
   ========================================================= */

function addToCart(
  id,
  service = false
) {

  const source =
    service

      ? state.services.find(
          x => x.id === id
        )

      : state.products.find(
          x => x.id === id
        );


  if (!source) {
    return;
  }


  if (
    !service &&
    source.stock <= 0
  ) {

    return toast(
      'Item is out of stock',
      'error'
    );

  }


  const item =
    state.cart.find(
      x =>
        x.id === id &&
        x.service === service
    );


  if (item) {

    if (
      !service &&
      item.qty >= source.stock
    ) {

      return toast(
        'Not enough stock',
        'error'
      );

    }

    item.qty++;

  } else {

    state.cart.push({
      id,
      name: source.name,
      price: Number(source.price),
      qty: 1,
      service,
      category:
        source.category ||
        'Service'
    });

  }


  save();

  renderCart();

  toast(
    `${source.name} added`
  );
}


function renderCart() {

  const count =
    state.cart.reduce(
      (a, x) =>
        a + Number(x.qty || 0),
      0
    );


  const total =
    state.cart.reduce(
      (a, x) =>
        a +
        Number(x.qty || 0) *
        Number(x.price || 0),
      0
    );


  if ($('#cartCount')) {

    $('#cartCount').textContent =
      `${count} item${
        count === 1
          ? ''
          : 's'
      }`;

  }


  if ($('#cartTotal')) {

    $('#cartTotal').textContent =
      money(total);

  }


  if ($('#cartItems')) {

    $('#cartItems').innerHTML =
      !state.cart.length

        ? `
          <div class="empty-state">

            <i
              class="fa-solid fa-basket-shopping"
            ></i>

            <p>
              Your cart is empty
            </p>

            <span>
              Add a product to start a sale.
            </span>

          </div>
          `

        : state.cart
            .map(
              x =>
                `
                <div class="cart-line">

                  <div>

                    <strong>
                      ${esc(x.name)}
                    </strong>

                    <span>
                      ${money(x.price)} each
                    </span>

                  </div>

                  <div class="qty-box">

                    <button
                      onclick="changeQty(
                        ${x.id},
                        -1,
                        ${x.service}
                      )"
                    >
                      −
                    </button>

                    <b>
                      ${x.qty}
                    </b>

                    <button
                      onclick="changeQty(
                        ${x.id},
                        1,
                        ${x.service}
                      )"
                    >
                      +
                    </button>

                  </div>

                  <strong>
                    ${
                      money(
                        x.price *
                        x.qty
                      )
                    }
                  </strong>

                </div>
                `
            )
            .join('');

  }
}


function changeQty(
  id,
  d,
  service = false
) {

  const item =
    state.cart.find(
      x =>
        x.id === id &&
        x.service === service
    );

  if (!item) {
    return;
  }


  const src =
    service

      ? state.services.find(
          x => x.id === id
        )

      : state.products.find(
          x => x.id === id
        );


  if (
    d > 0 &&
    !service &&
    src &&
    item.qty >= src.stock
  ) {

    return toast(
      'Not enough stock',
      'error'
    );

  }


  if (
    d < 0 &&
    item.qty === 1
  ) {

    state.cart =
      state.cart.filter(
        x =>
          !(
            x.id === id &&
            x.service === service
          )
      );

  } else {

    item.qty += d;

  }


  save();

  renderCart();
}


function completeSale() {

  if (!state.cart.length) {

    return toast(
      'Cart is empty',
      'error'
    );

  }


  const total =
    state.cart.reduce(
      (a, x) =>
        a +
        x.qty *
        x.price,
      0
    );


  if (
    state.pay === 'Utang'
  ) {

    openEntity(
      'utang',
      {
        customer: '',
        amount: total,
        mode: 'sale-credit'
      }
    );

    return;
  }


  finalizeSale(
    state.pay
  );
}


function finalizeSale(
  payment,
  customer = ''
) {

  const items =
    clone(state.cart);


  const total =
    items.reduce(
      (a, x) =>
        a +
        x.qty *
        x.price,
      0
    );


  for (
    const item of items
  ) {

    if (!item.service) {

      const p =
        state.products.find(
          x =>
            x.id === item.id
        );


      if (
        !p ||
        p.stock <
          item.qty
      ) {

        return toast(
          `Not enough stock for ${item.name}`,
          'error'
        );

      }


      p.stock -=
        item.qty;
    }
  }


  const sale = {

    id:
      uid(),

    date:
      today(),

    time:
      new Date().toLocaleTimeString(
        'en-PH',
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      ),

    payment,

    total,

    customer,

    items

  };


  state.sales.unshift(
    sale
  );

  state.cart = [];


  save();

  renderCart();

  renderInventory();

  renderDashboard();

  renderReports();


  toast(
    `Sale completed · ${money(total)}`
  );
}


function clearCart() {

  state.cart = [];

  save();

  renderCart();

  toast(
    'Cart cleared'
  );
}


/* =========================================================
   SERVICES
   ========================================================= */

function renderServices() {

  if (!$('#servicesGrid')) {
    return;
  }

  $('#servicesGrid').innerHTML =
    state.services.length

      ? state.services
          .map(
            s =>
              `
              <div class="service-card">

                <div class="head">

                  <div class="round-icon">
                    <i
                      class="fa-solid ${esc(
                        s.icon ||
                        'fa-wrench'
                      )}"
                    ></i>
                  </div>

                  <div>

                    <strong>
                      ${esc(s.name)}
                    </strong>

                    <div class="card-meta">
                      ${esc(
                        s.duration ||
                        ''
                      )}
                    </div>

                  </div>

                </div>

                <div class="card-price">
                  ${money(s.price)}
                </div>

                <div class="card-meta">
                  ${esc(
                    s.description ||
                    'Available in checkout'
                  )}
                </div>

                <div
                  class="row-actions"
                  style="margin-top:14px"
                >

                  <button
                    onclick="editService(${s.id})"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button
                    onclick="deleteService(${s.id})"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>

                </div>

              </div>
              `
          )
          .join('')

      : `
        <div class="empty-state">
          <p>No services yet</p>
        </div>
        `;
}


/* =========================================================
   UTANG
   ========================================================= */

function renderUtang() {

  const active =
    state.utang.filter(
      u =>
        Number(u.balance || 0) >
        0
    ).length;


  const overdue =
    state.utang.filter(
      u =>
        u.status === 'Overdue' &&
        Number(u.balance || 0) >
        0
    ).length;


  const banner =
    document.querySelector(
      '#page-utang .summary-banner'
    );


  if (banner) {

    const vals =
      banner.querySelectorAll(
        'strong'
      );

    if (vals[0]) {

      vals[0].textContent =
        money(totalUtang());

    }

    if (vals[1]) {

      vals[1].textContent =
        active;

    }

    if (vals[2]) {

      vals[2].textContent =
        overdue;

    }

  }


  if ($('#utangTable')) {

    $('#utangTable').innerHTML =
      state.utang.length

        ? state.utang
            .map(
              u =>
                `
                <tr>

                  <td>
                    <strong>
                      ${esc(u.name)}
                    </strong>
                  </td>

                  <td>
                    ${money(u.balance)}
                  </td>

                  <td>
                    ${esc(u.last)}
                  </td>

                  <td>

                    <span
                      class="status ${
                        u.status === 'Overdue'
                          ? 'low'
                          : 'good'
                      }"
                    >
                      ${esc(u.status)}
                    </span>

                  </td>

                  <td>

                    <div class="row-actions">

                      <button
                        title="Payment"
                        onclick="collectUtang(${u.id})"
                      >
                        <i
                          class="fa-solid fa-hand-holding-dollar"
                        ></i>
                      </button>

                      <button
                        title="Edit"
                        onclick="editUtang(${u.id})"
                      >
                        <i
                          class="fa-solid fa-pen"
                        ></i>
                      </button>

                      <button
                        title="Delete"
                        onclick="deleteUtang(${u.id})"
                      >
                        <i
                          class="fa-solid fa-trash"
                        ></i>
                      </button>

                    </div>

                  </td>

                </tr>
                `
            )
            .join('')

        : `
          <tr>

            <td colspan="5">

              <div class="empty-state">
                <p>No credit entries</p>
              </div>

            </td>

          </tr>
          `;
  }
}


function collectUtang(id) {

  const u =
    state.utang.find(
      x => x.id === id
    );

  if (!u) {
    return;
  }

  openEntity(
    'utangPayment',
    {
      customer: u.name,
      amount: u.balance,
      utangId: id
    }
  );
}


/* =========================================================
   GCASH
   ========================================================= */

function renderGCash() {

  const card =
    $('#page-gcash .wallet-card strong');

  if (card) {

    card.textContent =
      money(gcashBalance());

  }


  if ($('#gcashTable')) {

    $('#gcashTable').innerHTML =
      state.gcash.length

        ? state.gcash
            .map(
              r =>
                `
                <tr>

                  <td>
                    ${esc(r.date)}
                  </td>

                  <td>

                    <span
                      class="status ${
                        r.type === 'Cash-in'
                          ? 'good'
                          : 'exp'
                      }"
                    >
                      ${esc(r.type)}
                    </span>

                  </td>

                  <td>
                    ${esc(
                      r.customer ||
                      '—'
                    )}
                  </td>

                  <td>
                    <strong>
                      ${money(r.amount)}
                    </strong>
                  </td>

                  <td>
                    ${money(r.fee)}
                  </td>

                  <td>
                    ${esc(
                      r.notes ||
                      ''
                    )}
                  </td>

                  <td>

                    <button
                      class="row-delete"
                      onclick="deleteEntry(
                        'gcash',
                        ${r.id}
                      )"
                    >
                      <i
                        class="fa-solid fa-trash"
                      ></i>
                    </button>

                  </td>

                </tr>
                `
            )
            .join('')

        : `
          <tr>

            <td colspan="7">

              <div class="empty-state">

                <p>
                  No GCash entries
                </p>

              </div>

            </td>

          </tr>
          `;
  }
}


/* =========================================================
   E-LOAD
   ========================================================= */

function renderELoad() {

  if (!$('#eloadTable')) {
    return;
  }

  $('#eloadTable').innerHTML =
    state.eload.length

      ? state.eload
          .map(
            r =>
              `
              <tr>

                <td>
                  ${esc(r.date)}
                </td>

                <td>
                  ${esc(r.network)}
                </td>

                <td>
                  ${esc(r.type)}
                </td>

                <td>
                  <strong>
                    ${money(r.amount)}
                  </strong>
                </td>

                <td>
                  ${money(r.fee)}
                </td>

                <td>
                  ${esc(
                    r.customer ||
                    '—'
                  )}
                </td>

                <td>

                  <button
                    class="row-delete"
                    onclick="deleteEntry(
                      'eload',
                      ${r.id}
                    )"
                  >
                    <i
                      class="fa-solid fa-trash"
                    ></i>
                  </button>

                </td>

              </tr>
              `
          )
          .join('')

      : `
        <tr>

          <td colspan="7">

            <div class="empty-state">

              <p>
                No E-Load entries
              </p>

            </div>

          </td>

        </tr>
        `;
}


/* =========================================================
   BILLS
   ========================================================= */

function dueLabel(date) {

  const d =
    daysUntil(date);

  if (d < 0) {

    return 'Overdue';

  }

  if (d <= 7) {

    return 'Due soon';

  }

  return 'Scheduled';
}


function renderBills() {

  if (!$('#billsGrid')) {
    return;
  }

  $('#billsGrid').innerHTML =
    state.bills.length

      ? state.bills
          .map(
            b => {

              const status =
                dueLabel(
                  b.due
                );

              return `
                <div class="bill-card">

                  <div class="head">

                    <div class="round-icon">

                      <i
                        class="fa-solid ${esc(
                          b.icon ||
                          'fa-receipt'
                        )}"
                      ></i>

                    </div>

                    <div>

                      <strong>
                        ${esc(b.name)}
                      </strong>

                      <div class="card-meta">
                        Due ${humanDate(
                          b.due
                        )}
                      </div>

                    </div>

                  </div>

                  <div class="card-price">
                    ${money(b.amount)}
                  </div>

                  <span
                    class="status ${
                      status === 'Overdue'
                        ? 'low'
                        : status === 'Due soon'
                          ? 'exp'
                          : 'good'
                    }"
                  >
                    ${status}
                  </span>

                  <div
                    class="row-actions"
                    style="margin-top:14px"
                  >

                    <button
                      onclick="editBill(${b.id})"
                    >
                      <i
                        class="fa-solid fa-pen"
                      ></i>
                    </button>

                    <button
                      onclick="deleteBill(${b.id})"
                    >
                      <i
                        class="fa-solid fa-trash"
                      ></i>
                    </button>

                  </div>

                </div>
              `;

            }
          )
          .join('')

      : `
        <div class="empty-state">
          <p>No bills yet</p>
        </div>
        `;
}


/* =========================================================
   EMPLOYEES
   ========================================================= */

function renderEmployees() {

  if (!$('#employeesGrid')) {
    return;
  }

  $('#employeesGrid').innerHTML =
    state.employees.length

      ? state.employees
          .map(
            e =>
              `
              <div class="employee-card">

                <div class="head">

                  <div class="avatar">
                    ${esc(
                      e.icon ||
                      initials(e.name)
                    )}
                  </div>

                  <div>

                    <strong>
                      ${esc(e.name)}
                    </strong>

                    <div class="card-meta">
                      ${esc(e.role)}
                    </div>

                  </div>

                </div>

                <div class="card-price">
                  ${money(e.rate)}/day
                </div>

                <div class="card-meta">

                  Paid this period:

                  <b
                    style="color:#33415c"
                  >
                    ${money(e.paid)}
                  </b>

                </div>

                <div
                  class="row-actions"
                  style="margin-top:14px"
                >

                  <button
                    onclick="payEmployee(${e.id})"
                  >
                    <i
                      class="fa-solid fa-money-bill-wave"
                    ></i>
                  </button>

                  <button
                    onclick="editEmployee(${e.id})"
                  >
                    <i
                      class="fa-solid fa-pen"
                    ></i>
                  </button>

                  <button
                    onclick="deleteEmployee(${e.id})"
                  >
                    <i
                      class="fa-solid fa-trash"
                    ></i>
                  </button>

                </div>

              </div>
              `
          )
          .join('')

      : `
        <div class="empty-state">
          <p>No employees yet</p>
        </div>
        `;
}


/* =========================================================
   VAULT
   ========================================================= */

function renderVault() {

  const card =
    $('#page-vault .wallet-card strong');

  if (card) {

    card.textContent =
      money(vaultBalance());

  }


  if ($('#vaultTable')) {

    $('#vaultTable').innerHTML =
      state.vault.length

        ? state.vault
            .map(
              r =>
                `
                <tr>

                  <td>
                    ${esc(r.date)}
                  </td>

                  <td>
                    ${esc(r.type)}
                  </td>

                  <td>
                    <strong>
                      ${money(r.amount)}
                    </strong>
                  </td>

                  <td>
                    ${esc(
                      r.notes ||
                      ''
                    )}
                  </td>

                  <td>

                    <button
                      class="row-delete"
                      onclick="deleteEntry(
                        'vault',
                        ${r.id}
                      )"
                    >
                      <i
                        class="fa-solid fa-trash"
                      ></i>
                    </button>

                  </td>

                </tr>
                `
            )
            .join('')

        : `
          <tr>

            <td colspan="5">

              <div class="empty-state">

                <p>
                  No vault movements
                </p>

              </div>

            </td>

          </tr>
          `;
  }
}


/* =========================================================
   REPORTS
   ========================================================= */

function renderReports() {

  const month =
    monthSalesTotal();


  const units =
    state.sales.reduce(
      (a, s) =>
        a +
        (
          Array.isArray(s.items)
            ? s.items.reduce(
                (q, i) =>
                  q +
                  (
                    i.service
                      ? 0
                      : Number(
                          i.qty || 0
                        )
                  ),
                0
              )
            : 0
        ),
      0
    );


  const profit =
    state.sales.reduce(
      (a, s) =>
        a +
        (
          Array.isArray(s.items)
            ? s.items.reduce(
                (q, i) => {

                  if (i.service) {

                    return (
                      q +
                      Number(i.qty || 0) *
                      Number(i.price || 0)
                    );

                  }

                  const p =
                    state.products.find(
                      x =>
                        x.id ===
                        i.id
                    );

                  return (
                    q +
                    Number(i.qty || 0) *
                    (
                      Number(i.price || 0) -
                      Number(
                        p?.cost ||
                        0
                      )
                    )
                  );

                },
                0
              )
            : 0
        ),
      0
    );


  const cards =
    $$('#page-reports .report-card strong');


  if (cards[0]) {
    cards[0].textContent =
      money(month);
  }

  if (cards[1]) {
    cards[1].textContent =
      units;
  }

  if (cards[2]) {
    cards[2].textContent =
      money(totalUtang());
  }

  if (cards[3]) {
    cards[3].textContent =
      money(profit);
  }


  renderTopProducts();
}


/* =========================================================
   SETTINGS
   ========================================================= */

function renderSettings() {

  if ($('#storeNameInput')) {

    $('#storeNameInput').value =
      state.settings.store;

  }


  const inputs =
    $$('#page-settings input[type="checkbox"]');


  if (inputs[0]) {
    inputs[0].checked =
      state.settings.lowStock;
  }

  if (inputs[1]) {
    inputs[1].checked =
      state.settings.expiry;
  }

  if (inputs[2]) {
    inputs[2].checked =
      state.settings.dailySummary;
  }
}


/* =========================================================
   PRODUCT FORM
   ========================================================= */

function resetProductForm() {

  $('#productForm')
    ?.reset();

  if ($('#productForm')) {

    $('#productForm')
      .dataset
      .editId = '';

  }

  const title =
    document.querySelector(
      '.modal h2'
    );

  if (title) {
    title.textContent =
      'Add Product';
  }
}


function editProduct(id) {

  const p =
    state.products.find(
      x => x.id === id
    );

  if (!p) {
    return;
  }


  openModal(
    'productModal'
  );


  if ($('#productName')) {
    $('#productName').value =
      p.name;
  }

  if ($('#productCategory')) {
    $('#productCategory').value =
      p.category;
  }

  if ($('#productPrice')) {
    $('#productPrice').value =
      p.price;
  }

  if ($('#productCost')) {
    $('#productCost').value =
      p.cost;
  }

  if ($('#productStock')) {
    $('#productStock').value =
      p.stock;
  }

  if ($('#productReorder')) {
    $('#productReorder').value =
      p.reorder;
  }

  if ($('#productExpiry')) {
    $('#productExpiry').value =
      p.expiry || '';
  }


  if ($('#productForm')) {

    $('#productForm')
      .dataset
      .editId = id;

  }


  ensureProductBarcodeField();


  if ($('#productBarcode')) {

    $('#productBarcode').value =
      p.barcode ||
      '';

  }


  const title =
    document.querySelector(
      '.modal#productModal h2'
    );

  if (title) {

    title.textContent =
      'Edit Product';

  }
}


function ensureProductBarcodeField() {

  if ($('#productBarcode')) {
    return;
  }


  const target =
    $('#productForm .form-grid');

  if (!target) {
    return;
  }


  target.insertAdjacentHTML(
    'beforeend',
    `
    <label>

      Barcode

      <input
        id="productBarcode"
        inputmode="numeric"
        placeholder="Scan or enter barcode"
      >

    </label>
    `
  );
}


function deleteProduct(id) {

  const p =
    state.products.find(
      x => x.id === id
    );

  if (!p) {
    return;
  }


  if (
    !confirm(
      `Delete ${p.name}?`
    )
  ) {
    return;
  }


  state.products =
    state.products.filter(
      x => x.id !== id
    );


  state.cart =
    state.cart.filter(
      x =>
        !(
          x.id === id &&
          !x.service
        )
    );


  save();

  renderInventory();

  renderDashboard();

  toast(
    'Product deleted'
  );
}


/* =========================================================
   DYNAMIC ENTITY FORMS
   ========================================================= */

function openEntity(
  type,
  data = {}
) {

  ensureDynamicModal();


  const modal =
    $('#entityModal');

  const form =
    $('#entityForm');


  const configs = {

    service: {
      eyebrow:
        'SERVICES',

      title:
        data.id
          ? 'Edit Service'
          : 'Add Service',

      fields: [
        [
          'name',
          'Service name',
          'text',
          data.name || '',
          true
        ],
        [
          'price',
          'Price',
          'number',
          data.price || '',
          true
        ],
        [
          'duration',
          'Duration',
          'text',
          data.duration ||
            '30 min',
          false
        ],
        [
          'icon',
          'Font Awesome icon',
          'text',
          data.icon ||
            'fa-wrench',
          false
        ],
        [
          'description',
          'Description',
          'text',
          data.description ||
            '',
          false
        ]
      ]
    },


    utang: {

      eyebrow:
        'UTANG',

      title:
        data.mode ===
          'sale-credit'

          ? 'Credit Sale'

          : (
              data.id
                ? 'Edit Customer'
                : 'Add Credit Entry'
            ),

      fields: [
        [
          'name',
          'Customer name',
          'text',
          data.customer ||
            data.name ||
            '',
          true
        ],
        [
          'amount',
          data.mode ===
            'sale-credit'
              ? 'Credit amount'
              : 'Balance',
          'number',
          data.amount ??
            data.balance ??
            '',
          true
        ],
        [
          'status',
          'Status',
          'select',
          data.status ||
            'Current',
          true,
          [
            'Current',
            'Overdue'
          ]
        ]
      ]
    },


    utangPayment: {

      eyebrow:
        'UTANG PAYMENT',

      title:
        'Record Payment',

      fields: [
        [
          'amount',
          'Payment amount',
          'number',
          data.amount ||
            '',
          true
        ],
        [
          'note',
          'Note',
          'text',
          'Payment received',
          false
        ]
      ]

    },


    gcash: {

      eyebrow:
        'GCASH',

      title:
        'New GCash Entry',

      fields: [
        [
          'type',
          'Type',
          'select',
          'Cash-in',
          true,
          [
            'Cash-in',
            'Cash-out'
          ]
        ],
        [
          'customer',
          'Customer',
          'text',
          '',
          true
        ],
        [
          'amount',
          'Amount',
          'number',
          '',
          true
        ],
        [
          'fee',
          'Fee',
          'number',
          '10',
          false
        ],
        [
          'notes',
          'Notes',
          'text',
          '',
          false
        ]
      ]

    },


    eload: {

      eyebrow:
        'E-LOAD',

      title:
        'New Load Entry',

      fields: [
        [
          'network',
          'Network',
          'select',
          'Globe',
          true,
          [
            'Globe',
            'Smart',
            'DITO',
            'TM',
            'TNT',
            'GOMO'
          ]
        ],
        [
          'type',
          'Type',
          'select',
          'Cash-out',
          true,
          [
            'Cash-out',
            'Load purchase',
            'Cash-in'
          ]
        ],
        [
          'customer',
          'Customer / Mobile',
          'text',
          '',
          false
        ],
        [
          'amount',
          'Amount',
          'number',
          '',
          true
        ],
        [
          'fee',
          'Fee',
          'number',
          '5',
          false
        ]
      ]

    },


    bill: {

      eyebrow:
        'BILLS',

      title:
        data.id
          ? 'Edit Bill'
          : 'Add Bill',

      fields: [
        [
          'name',
          'Bill name',
          'text',
          data.name ||
            '',
          true
        ],
        [
          'amount',
          'Amount',
          'number',
          data.amount ||
            '',
          true
        ],
        [
          'due',
          'Due date',
          'date',
          data.due ||
            today(),
          true
        ],
        [
          'icon',
          'Icon',
          'text',
          data.icon ||
            'fa-receipt',
          false
        ]
      ]

    },


    employee: {

      eyebrow:
        'STAFF',

      title:
        data.id
          ? 'Edit Employee'
          : 'Add Employee',

      fields: [
        [
          'name',
          'Employee name',
          'text',
          data.name ||
            '',
          true
        ],
        [
          'role',
          'Role',
          'text',
          data.role ||
            'Store Staff',
          true
        ],
        [
          'rate',
          'Daily rate',
          'number',
          data.rate ||
            '',
          true
        ],
        [
          'paid',
          'Paid this period',
          'number',
          data.paid ||
            0,
          false
        ]
      ]

    },


    employeePayment: {

      eyebrow:
        'PAYROLL',

      title:
        'Record Salary Payment',

      fields: [
        [
          'amount',
          'Payment amount',
          'number',
          data.amount ||
            '',
          true
        ]
      ]

    },


    vault: {

      eyebrow:
        'VAULT',

      title:
        'Cash Movement',

      fields: [
        [
          'type',
          'Movement',
          'select',
          'Cash in',
          true,
          [
            'Cash in',
            'Cash out'
          ]
        ],
        [
          'amount',
          'Amount',
          'number',
          '',
          true
        ],
        [
          'notes',
          'Notes',
          'text',
          '',
          true
        ]
      ]

    }

  };


  const c =
    configs[type] ||
    configs.service;


  $('#entityEyebrow')
    .textContent =
    c.eyebrow;


  $('#entityTitle')
    .textContent =
    c.title;


  form.innerHTML =
    c.fields
      .map(
        f => {

          if (
            f[2] ===
            'select'
          ) {

            const options =
              f[5] || [];

            return `
              <label>

                ${esc(f[1])}

                <select
                  name="${f[0]}"
                  required
                >

                  ${options
                    .map(
                      o =>
                        `
                        <option
                          ${
                            String(o) ===
                            String(f[3])
                              ? 'selected'
                              : ''
                          }
                        >
                          ${esc(o)}
                        </option>
                        `
                    )
                    .join('')}

                </select>

              </label>
            `;

          }


          return `
            <label>

              ${esc(f[1])}

              <input
                name="${f[0]}"
                type="${f[2]}"
                value="${esc(f[3])}"
                ${
                  f[4]
                    ? 'required'
                    : ''
                }
                min="0"
                step="0.01"
              >

            </label>
          `;

        }
      )
      .join('')

    +

    `
    <div class="modal-actions">

      <button
        type="button"
        class="outline-btn"
        data-cancel
      >
        Cancel
      </button>

      <button
        class="primary-btn"
        type="submit"
      >
        Save
      </button>

    </div>
    `;


  modal.dataset.type =
    type;

  modal._data =
    data;


  openModal(
    'entityModal'
  );


  form.querySelector(
    '[data-cancel]'
  ).onclick =
    () =>
      closeModal(
        'entityModal'
      );


  form.onsubmit =
    e => {

      e.preventDefault();

      handleEntitySubmit(
        type,
        data,
        new FormData(form)
      );

    };
}


function fv(fd, k) {

  return (
    fd.get(k)
      ?.toString()
      .trim() ||
    ''
  );
}


/* =========================================================
   ENTITY SUBMISSIONS
   ========================================================= */

function handleEntitySubmit(
  type,
  data,
  fd
) {

  /* -------------------------------------------------------
     SERVICE
     ------------------------------------------------------- */

  if (
    type ===
    'service'
  ) {

    const obj = {

      id:
        data.id ||
        uid(),

      name:
        fv(fd, 'name'),

      price:
        Number(
          fv(fd, 'price')
        ),

      duration:
        fv(fd, 'duration'),

      icon:
        fv(fd, 'icon') ||
        'fa-wrench',

      description:
        fv(
          fd,
          'description'
        )

    };


    if (data.id) {

      state.services =
        state.services.map(
          x =>
            x.id === data.id
              ? obj
              : x
        );

    } else {

      state.services.unshift(
        obj
      );

    }


    save();

    renderServices();

    renderSaleCatalog();

    closeModal(
      'entityModal'
    );

    return toast(
      data.id
        ? 'Service updated'
        : 'Service added'
    );
  }


  /* -------------------------------------------------------
     UTANG
     ------------------------------------------------------- */

  if (
    type ===
    'utang'
  ) {

    const name =
      fv(fd, 'name');

    const amount =
      Number(
        fv(fd, 'amount')
      ) || 0;

    const status =
      fv(fd, 'status') ||
      'Current';


    if (
      !name ||
      amount < 0
    ) {

      return toast(
        'Enter valid customer details',
        'error'
      );

    }


    if (
      data.mode ===
      'sale-credit'
    ) {

      const existing =
        state.utang.find(
          u =>
            u.name
              .toLowerCase() ===
            name.toLowerCase()
        );


      if (existing) {

        existing.balance +=
          amount;

        existing.last =
          humanDate(
            today()
          );

        existing.status =
          'Current';

      } else {

        state.utang.unshift({
          id: uid(),
          name,
          balance: amount,
          last:
            humanDate(
              today()
            ),
          status
        });

      }


      finalizeSale(
        'Utang',
        name
      );


      closeModal(
        'entityModal'
      );

      renderUtang();

      save();

      renderDashboard();

      return;
    }


    const obj = {

      id:
        data.id ||
        uid(),

      name,

      balance:
        amount,

      last:
        humanDate(
          today()
        ),

      status

    };


    if (data.id) {

      state.utang =
        state.utang.map(
          x =>
            x.id === data.id
              ? obj
              : x
        );

    } else {

      state.utang.unshift(
        obj
      );

    }


    save();

    renderUtang();

    renderDashboard();

    closeModal(
      'entityModal'
    );

    return toast(
      data.id
        ? 'Utang updated'
        : 'Credit entry added'
    );
  }


  /* -------------------------------------------------------
     UTANG PAYMENT
     ------------------------------------------------------- */

  if (
    type ===
    'utangPayment'
  ) {

    const amount =
      Number(
        fv(fd, 'amount')
      ) || 0;


    const u =
      state.utang.find(
        x =>
          x.id ===
          data.utangId
      );


    if (
      !u ||
      amount <= 0
    ) {

      return toast(
        'Enter a valid payment',
        'error'
      );

    }


    u.balance =
      Math.max(
        0,
        Number(
          u.balance || 0
        ) -
        amount
      );

    u.last =
      humanDate(
        today()
      );

    u.status =
      u.balance === 0
        ? 'Current'
        : u.status;


    save();

    closeModal(
      'entityModal'
    );

    renderUtang();

    renderDashboard();

    return toast(
      'Payment recorded'
    );
  }


  /* -------------------------------------------------------
     GCASH
     ------------------------------------------------------- */

  if (
    type ===
    'gcash'
  ) {

    const obj = {

      id:
        uid(),

      date:
        humanDate(
          today()
        ),

      type:
        fv(
          fd,
          'type'
        ),

      customer:
        fv(
          fd,
          'customer'
        ),

      amount:
        Number(
          fv(
            fd,
            'amount'
          )
        ) || 0,

      fee:
        Number(
          fv(
            fd,
            'fee'
          )
        ) || 0,

      notes:
        fv(
          fd,
          'notes'
        )

    };


    state.gcash.unshift(
      obj
    );

    save();

    renderGCash();

    closeModal(
      'entityModal'
    );

    renderDashboard();

    return toast(
      'GCash entry saved'
    );
  }


  /* -------------------------------------------------------
     E-LOAD
     ------------------------------------------------------- */

  if (
    type ===
    'eload'
  ) {

    const obj = {

      id:
        uid(),

      date:
        humanDate(
          today()
        ),

      network:
        fv(
          fd,
          'network'
        ),

      type:
        fv(
          fd,
          'type'
        ),

      customer:
        fv(
          fd,
          'customer'
        ),

      amount:
        Number(
          fv(
            fd,
            'amount'
          )
        ) || 0,

      fee:
        Number(
          fv(
            fd,
            'fee'
          )
        ) || 0

    };


    state.eload.unshift(
      obj
    );

    save();

    renderELoad();

    closeModal(
      'entityModal'
    );

    return toast(
      'E-Load entry saved'
    );
  }


  /* -------------------------------------------------------
     BILL
     ------------------------------------------------------- */

  if (
    type ===
    'bill'
  ) {

    const obj = {

      id:
        data.id ||
        uid(),

      name:
        fv(
          fd,
          'name'
        ),

      amount:
        Number(
          fv(
            fd,
            'amount'
          )
        ) || 0,

      due:
        fv(
          fd,
          'due'
        ),

      status:
        dueLabel(
          fv(
            fd,
            'due'
          )
        ),

      icon:
        fv(
          fd,
          'icon'
        ) ||
        'fa-receipt'

    };


    if (data.id) {

      state.bills =
        state.bills.map(
          x =>
            x.id === data.id
              ? obj
              : x
        );

    } else {

      state.bills.unshift(
        obj
      );

    }


    save();

    renderBills();

    closeModal(
      'entityModal'
    );

    return toast(
      data.id
        ? 'Bill updated'
        : 'Bill added'
    );
  }


  /* -------------------------------------------------------
     EMPLOYEE
     ------------------------------------------------------- */

  if (
    type ===
    'employee'
  ) {

    const obj = {

      id:
        data.id ||
        uid(),

      name:
        fv(
          fd,
          'name'
        ),

      role:
        fv(
          fd,
          'role'
        ),

      rate:
        Number(
          fv(
            fd,
            'rate'
          )
        ) || 0,

      paid:
        Number(
          fv(
            fd,
            'paid'
          )
        ) || 0,

      icon:
        initials(
          fv(
            fd,
            'name'
          )
        )

    };


    if (data.id) {

      state.employees =
        state.employees.map(
          x =>
            x.id === data.id
              ? obj
              : x
        );

    } else {

      state.employees.unshift(
        obj
      );

    }


    save();

    renderEmployees();

    closeModal(
      'entityModal'
    );

    return toast(
      data.id
        ? 'Employee updated'
        : 'Employee added'
    );
  }


  /* -------------------------------------------------------
     EMPLOYEE PAYMENT
     ------------------------------------------------------- */

  if (
    type ===
    'employeePayment'
  ) {

    const e =
      state.employees.find(
        x =>
          x.id ===
          data.employeeId
      );

    const amount =
      Number(
        fv(
          fd,
          'amount'
        )
      ) || 0;


    if (
      !e ||
      amount <= 0
    ) {

      return toast(
        'Enter a valid payment',
        'error'
      );

    }


    e.paid +=
      amount;


    save();

    renderEmployees();

    closeModal(
      'entityModal'
    );

    return toast(
      'Salary payment recorded'
    );
  }


  /* -------------------------------------------------------
     VAULT
     ------------------------------------------------------- */

  if (
    type ===
    'vault'
  ) {

    const obj = {

      id:
        uid(),

      date:
        humanDate(
          today()
        ),

      type:
        fv(
          fd,
          'type'
        ),

      amount:
        Number(
          fv(
            fd,
            'amount'
          )
        ) || 0,

      notes:
        fv(
          fd,
          'notes'
        )

    };


    state.vault.unshift(
      obj
    );

    save();

    renderVault();

    renderDashboard();

    closeModal(
      'entityModal'
    );

    return toast(
      'Vault movement saved'
    );
  }
}


/* =========================================================
   EDIT / DELETE HELPERS
   ========================================================= */

function editService(id) {

  const s =
    state.services.find(
      x => x.id === id
    );

  if (s) {

    openEntity(
      'service',
      s
    );

  }
}


function deleteService(id) {

  if (
    !confirm(
      'Delete this service?'
    )
  ) {

    return;
  }


  state.services =
    state.services.filter(
      x => x.id !== id
    );


  state.cart =
    state.cart.filter(
      x =>
        !(
          x.id === id &&
          x.service
        )
    );


  save();

  renderServices();

  renderSaleCatalog();

  toast(
    'Service deleted'
  );
}


function editUtang(id) {

  const u =
    state.utang.find(
      x => x.id === id
    );

  if (u) {

    openEntity(
      'utang',
      u
    );

  }
}


function deleteUtang(id) {

  if (
    !confirm(
      'Delete this credit account?'
    )
  ) {

    return;
  }


  state.utang =
    state.utang.filter(
      x => x.id !== id
    );


  save();

  renderUtang();

  renderDashboard();

  toast(
    'Credit account deleted'
  );
}


function editBill(id) {

  const b =
    state.bills.find(
      x => x.id === id
    );

  if (b) {

    openEntity(
      'bill',
      b
    );

  }
}


function deleteBill(id) {

  if (
    !confirm(
      'Delete this bill?'
    )
  ) {

    return;
  }


  state.bills =
    state.bills.filter(
      x => x.id !== id
    );


  save();

  renderBills();

  toast(
    'Bill deleted'
  );
}


function editEmployee(id) {

  const e =
    state.employees.find(
      x => x.id === id
    );

  if (e) {

    openEntity(
      'employee',
      e
    );

  }
}


function deleteEmployee(id) {

  if (
    !confirm(
      'Delete this employee?'
    )
  ) {

    return;
  }


  state.employees =
    state.employees.filter(
      x => x.id !== id
    );


  save();

  renderEmployees();

  toast(
    'Employee deleted'
  );
}


function payEmployee(id) {

  const e =
    state.employees.find(
      x => x.id === id
    );

  if (e) {

    openEntity(
      'employeePayment',
      {
        employeeId: id,
        amount: e.rate
      }
    );

  }
}


function deleteEntry(
  collection,
  id
) {

  if (
    !confirm(
      'Delete this record?'
    )
  ) {

    return;
  }


  if (
    !Array.isArray(
      state[collection]
    )
  ) {

    return;
  }


  state[collection] =
    state[collection].filter(
      x =>
        x.id !== id
    );


  save();

  renderPage(
    state.page
  );

  renderDashboard();

  toast(
    'Record deleted'
  );
}


/* =========================================================
   BARCODE SCANNER
   ========================================================= */

async function scanBarcode() {

  if (
    !(
      'BarcodeDetector'
      in window
    )
  ) {

    const code =
      prompt(
        'BarcodeDetector is not supported in this browser. Enter barcode:'
      );

    if (code) {

      findBarcode(
        code.trim()
      );

    }

    return;
  }


  try {

    const supported =
      await BarcodeDetector
        .getSupportedFormats();


    const detector =
      new BarcodeDetector({
        formats: supported
      });


    const video =
      document.createElement(
        'video'
      );

    video.setAttribute(
      'playsinline',
      ''
    );

    video.autoplay = true;


    const wrap =
      document.createElement(
        'div'
      );

    wrap.className =
      'modal';

    wrap.id =
      'scannerModal';


    wrap.innerHTML = `
      <div class="modal-head">

        <div>

          <p class="eyebrow">
            INVENTORY
          </p>

          <h2>
            Scan Barcode
          </h2>

        </div>

        <button class="icon-btn">
          <i
            class="fa-solid fa-xmark"
          ></i>
        </button>

      </div>

      <div
        style="padding:18px"
      >

        <video
          style="
            width:100%;
            border-radius:16px;
            background:#111
          "
          playsinline
        ></video>

        <p
          class="muted"
          style="margin-top:10px"
        >
          Point your camera at
          a product barcode.
        </p>

      </div>
    `;


    document.body.appendChild(
      wrap
    );


    wrap
      .querySelector('video')
      .replaceWith(
        video
      );


    wrap.classList.add(
      'open'
    );


    $('#overlay')
      ?.classList
      .add('open');


    let stream = null;


    const stop = () => {

      if (stream) {

        stream
          .getTracks()
          .forEach(
            t =>
              t.stop()
          );

      }

      wrap.remove();

      $('#overlay')
        ?.classList
        .remove('open');
    };


    wrap
      .querySelector('button')
      .onclick =
      stop;


    stream =
      await navigator
        .mediaDevices
        .getUserMedia({
          video: {
            facingMode: {
              ideal:
                'environment'
            }
          }
        });


    video.srcObject =
      stream;


    const tick =
      async () => {

        if (
          !document.body.contains(
            wrap
          )
        ) {

          return;
        }


        try {

          const codes =
            await detector.detect(
              video
            );


          if (
            codes.length
          ) {

            findBarcode(
              codes[0]
                .rawValue
            );

            stop();

            return;
          }

        } catch (e) {

          /* Continue scanning */

        }


        requestAnimationFrame(
          tick
        );
      };


    tick();

  } catch (e) {

    toast(
      'Camera permission was not available',
      'error'
    );
  }
}


function findBarcode(
  code
) {

  const p =
    state.products.find(
      x =>
        x.barcode ===
        code
    );


  if (!p) {

    return toast(
      `No product found for ${code}`,
      'error'
    );

  }


  showPage(
    'sales'
  );


  const item =
    state.cart.find(
      x =>
        x.id === p.id &&
        !x.service
    );


  if (item) {

    if (
      item.qty <
      p.stock
    ) {

      item.qty++;

    } else {

      return toast(
        'Not enough stock',
        'error'
      );

    }

  } else {

    state.cart.push({
      id: p.id,
      name: p.name,
      price: p.price,
      qty: 1,
      service: false,
      category:
        p.category
    });

  }


  save();

  renderCart();

  toast(
    `${p.name} scanned`
  );
}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function globalSearch(
  value
) {

  const q =
    value
      .trim();


  if (!q) {
    return;
  }


  const lower =
    q.toLowerCase();


  const p =
    state.products.find(
      x =>
        `${x.name} ${
          x.category
        } ${
          x.barcode || ''
        }`
          .toLowerCase()
          .includes(lower)
    );


  const u =
    state.utang.find(
      x =>
        x.name
          .toLowerCase()
          .includes(lower)
    );


  if (p) {

    showPage(
      'inventory'
    );

    if ($('#inventorySearch')) {

      $('#inventorySearch')
        .value = q;

    }

    renderInventory();

    return;
  }


  if (u) {

    showPage(
      'utang'
    );

    return;
  }


  showPage(
    'inventory'
  );


  if ($('#inventorySearch')) {

    $('#inventorySearch')
      .value = q;

  }


  renderInventory();
}


/* =========================================================
   INITIALS
   ========================================================= */

function initials(
  name
) {

  return (
    String(name || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(
        x => x[0]
      )
      .join('')
      .toUpperCase() ||
    'NA'
  );
}


/* =========================================================
   EVENT BINDING
   ========================================================= */

function bind() {

  load();

  ensureDynamicModal();

  ensureProductBarcodeField();


  /* Navigation */

  $$('[data-page]')
    .forEach(
      b =>
        b.addEventListener(
          'click',
          () =>
            showPage(
              b.dataset.page
            )
        )
    );


  $$('[data-page-link]')
    .forEach(
      b =>
        b.addEventListener(
          'click',
          () => {

            if (
              b.dataset.close
            ) {

              closeModal(
                b.dataset.close
              );

            }

            showPage(
              b.dataset.pageLink
            );

          }
        )
    );


  /* Sidebar */

  $('#menuBtn')
    ?.addEventListener(
      'click',
      () =>
        $('#sidebar')
          ?.classList
          .toggle('open')
    );


  /* Overlay */

  $('#overlay')
    ?.addEventListener(
      'click',
      () => {

        $$('.modal')
          .forEach(
            m =>
              m.classList
                .remove('open')
          );

        $('#overlay')
          ?.classList
          .remove('open');

      }
    );


  /* Close buttons */

  $$('[data-close]')
    .forEach(
      b =>
        b.addEventListener(
          'click',
          () =>
            closeModal(
              b.dataset.close
            )
        )
    );


  /* Quick Add */

  $('#quickAddBtn')
    ?.addEventListener(
      'click',
      () =>
        openModal(
          'quickModal'
        )
    );


  /* Bottom Sale */

  $('#bottomSale')
    ?.addEventListener(
      'click',
      () =>
        showPage(
          'sales'
        )
    );


  /* Dashboard New Sale */

  $('#dashboardSaleBtn')
    ?.addEventListener(
      'click',
      () =>
        showPage(
          'sales'
        )
    );


  /* Sales New Sale */

  $('#newSaleBtn')
    ?.addEventListener(
      'click',
      () =>
        showPage(
          'sales'
        )
    );


  /* Add Product */

  $('#addProductBtn')
    ?.addEventListener(
      'click',
      () => {

        resetProductForm();

        ensureProductBarcodeField();

        openModal(
          'productModal'
        );

      }
    );


  /* Product Form */

  $('#productForm')
    ?.addEventListener(
      'submit',
      e => {

        e.preventDefault();


        const editId =
          Number(
            e.target.dataset.editId ||
            0
          );


        const p = {

          id:
            editId ||
            uid(),

          name:
            $('#productName')
              .value
              .trim(),

          category:
            $('#productCategory')
              .value
              .trim() ||
            'General',

          price:
            Number(
              $('#productPrice')
                .value
            ),

          cost:
            Number(
              $('#productCost')
                .value ||
              0
            ),

          stock:
            Number(
              $('#productStock')
                .value
            ),

          reorder:
            Number(
              $('#productReorder')
                .value ||
              0
            ),

          expiry:
            $('#productExpiry')
              .value,

          barcode:
            $('#productBarcode')
              ?.value
              .trim() ||
            ''

        };


        if (
          !p.name ||
          p.price < 0 ||
          p.stock < 0
        ) {

          return toast(
            'Please complete the product form',
            'error'
          );

        }


        if (editId) {

          const i =
            state.products
              .findIndex(
                x =>
                  x.id ===
                  editId
              );


          if (i >= 0) {

            state.products[i] =
              p;

          }

        } else {

          state.products.unshift(
            p
          );

        }


        save();

        closeModal(
          'productModal'
        );

        renderInventory();

        renderDashboard();

        toast(
          editId
            ? 'Product updated'
            : 'Product added'
        );

      }
    );


  /* Search */

  $('#inventorySearch')
    ?.addEventListener(
      'input',
      renderInventory
    );


  $('#inventoryFilter')
    ?.addEventListener(
      'change',
      renderInventory
    );


  $('#saleSearch')
    ?.addEventListener(
      'input',
      renderSaleCatalog
    );


  /* Cart */

  $('#clearCart')
    ?.addEventListener(
      'click',
      clearCart
    );


  /* Payment buttons */

  $$('.pay-btn')
    .forEach(
      b =>
        b.addEventListener(
          'click',
          () => {

            $$('.pay-btn')
              .forEach(
                x =>
                  x.classList
                    .remove(
                      'selected'
                    )
              );


            b.classList.add(
              'selected'
            );


            state.pay =
              b.dataset.pay;

          }
        )
    );


  /* Complete sale */

  $('#completeSale')
    ?.addEventListener(
      'click',
      completeSale
    );


  /* Barcode scanner */

  $('#scanBtn')
    ?.addEventListener(
      'click',
      scanBarcode
    );


  /* Notification */

  $('#notifBtn')
    ?.addEventListener(
      'click',
      () => {

        showPage(
          'inventory'
        );

        if ($('#inventoryFilter')) {

          $('#inventoryFilter')
            .value = 'low';

        }

        renderInventory();

      }
    );


  /* Settings */

  $('#saveSettings')
    ?.addEventListener(
      'click',
      () => {

        state.settings.store =
          $('#storeNameInput')
            .value
            .trim() ||
          'My Store';


        const inps =
          $$('#page-settings input[type="checkbox"]');


        state.settings.lowStock =
          !!inps[0]?.checked;

        state.settings.expiry =
          !!inps[1]?.checked;

        state.settings.dailySummary =
          !!inps[2]?.checked;


        save();

        renderSettings();

        toast(
          'Settings saved'
        );

      }
    );


  /* Add entities */

  $('#addServiceBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'service'
        )
    );


  $('#addUtangBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'utang'
        )
    );


  $('#gcashEntryBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'gcash'
        )
    );


  $('#eloadBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'eload'
        )
    );


  $('#addBillBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'bill'
        )
    );


  $('#addEmployeeBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'employee'
        )
    );


  $('#vaultEntryBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'vault'
        )
    );


  /* Global search */

  $('#globalSearch')
    ?.addEventListener(
      'keydown',
      e => {

        if (
          e.key ===
          'Enter'
        ) {

          globalSearch(
            e.target.value
          );

        }

      }
    );


  /* Resize */

  window.addEventListener(
    'resize',
    () => {

      if (
        state.page ===
        'dashboard'
      ) {

        drawChart();

      }

    }
  );


  /* Navigation click fallback */

  document.addEventListener(
    'click',
    e => {

      const nav =
        e.target.closest(
          '.nav-item,.bottom-item'
        );


      if (
        nav &&
        !e.defaultPrevented
      ) {

        showPage(
          nav.dataset.page
        );

      }

    }
  );


  /* Initial chart */

  if ($('#salesChart')) {

    setTimeout(
      () =>
        drawChart(),
      100
    );

  }
}


/* =========================================================
   PUBLIC INLINE HANDLERS
   ========================================================= */

Object.assign(
  window,
  {
    showPage,
    editProduct,
    deleteProduct,
    addToCart,
    changeQty,
    editService,
    deleteService,
    editUtang,
    deleteUtang,
    collectUtang,
    editBill,
    deleteBill,
    editEmployee,
    deleteEmployee,
    payEmployee,
    deleteEntry,
    completeSale,
    scanBarcode
  }
);


/* =========================================================
   SERVICE WORKER
   ========================================================= */

if (
  'serviceWorker'
  in navigator
) {

  window.addEventListener(
    'load',
    () =>
      navigator.serviceWorker
        .register('sw.js')
        .catch(
          () => {}
        )
  );

}


/* =========================================================
   LIVE DASHBOARD SYNC
   ========================================================= */

function refreshDashboardSync() {

  if (
    document.visibilityState ===
      'visible' &&

    typeof state !==
      'undefined' &&

    state.page ===
      'dashboard'
  ) {

    renderDashboard();

  }

}


/* ---------------------------------------------------------
   WHEN RETURNING TO THE APP
   --------------------------------------------------------- */

window.addEventListener(
  'focus',
  refreshDashboardSync
);


/* ---------------------------------------------------------
   WHEN ANOTHER TAB/WINDOW CHANGES DATA
   --------------------------------------------------------- */

window.addEventListener(
  'storage',
  function (event) {

    if (
      event.key ===
      storageKey()
    ) {

      load();

      if (
        state.page ===
        'dashboard'
      ) {

        renderDashboard();

      }

    }

  }
);


/* ---------------------------------------------------------
   WHEN PWA/BROWSER BECOMES VISIBLE
   --------------------------------------------------------- */

document.addEventListener(
  'visibilitychange',
  function () {

    if (
      document.visibilityState ===
      'visible'
    ) {

      load();

      if (
        state.page ===
        'dashboard'
      ) {

        renderDashboard();

      }

    }

  }
);


/* ---------------------------------------------------------
   SAFETY REFRESH
   --------------------------------------------------------- */

setInterval(
  refreshDashboardSync,
  2000
);


/* =========================================================
   START APPLICATION
   ========================================================= */

bind();

showPage(
  'dashboard'
);
