/* MyNegosyo — complete functional single-page business manager
   Updated:
   - Dashboard
   - Inventory
   - Barcode scanner
   - Sales / Cart
   - Services
   - Utang
   - GCash
   - E-Load
   - Bills
   - Employee Salary
   - Cash on Vault
   - Reports
   - Suppliers
   - Notes
   - Marketplace
   - Wishlist
   - Sales / Finance / Store dropdown support
   - Responsive navigation support
   - PWA service worker
*/

const DEFAULT_STATE = {
  page: 'dashboard',
  pay: 'Cash',
  cart: [],

  products: [
    {id:1,name:'Lucky Me Pancit Canton',category:'Noodles',stock:18,reorder:10,price:16,cost:11,expiry:'2026-10-03',barcode:'480001234001'},
    {id:2,name:'Coca-Cola 1.5L',category:'Beverages',stock:4,reorder:8,price:82,cost:68,expiry:'2026-12-08',barcode:'480001234002'},
    {id:3,name:'Bear Brand 33g',category:'Grocery',stock:6,reorder:10,price:18,cost:14,expiry:'2026-09-27',barcode:'480001234003'},
    {id:4,name:'Piattos Cheese 85g',category:'Snacks',stock:27,reorder:8,price:39,cost:31,expiry:'2027-01-12',barcode:'480001234004'},
    {id:5,name:'Century Tuna 155g',category:'Canned Goods',stock:15,reorder:6,price:49,cost:41,expiry:'2026-10-15',barcode:'480001234005'},
    {id:6,name:'Surf Powder 25g',category:'Laundry',stock:0,reorder:8,price:10,cost:7,expiry:'2027-04-02',barcode:'480001234006'},
    {id:7,name:'Lucky Me Beef 55g',category:'Noodles',stock:32,reorder:10,price:12,cost:8.5,expiry:'2027-02-11',barcode:'480001234007'},
    {id:8,name:'Selecta Ice Cream Cup',category:'Frozen',stock:9,reorder:5,price:35,cost:28,expiry:'2026-09-23',barcode:'480001234008'},
    {id:9,name:'SkyFlakes Crackers',category:'Snacks',stock:21,reorder:8,price:9,cost:6.5,expiry:'2027-03-18',barcode:'480001234009'},
    {id:10,name:'Alaska Evap 370ml',category:'Grocery',stock:13,reorder:6,price:45,cost:37,expiry:'2026-11-20',barcode:'480001234010'},
    {id:11,name:'Wilkins 500ml',category:'Beverages',stock:41,reorder:12,price:20,cost:14,expiry:'2027-07-09',barcode:'480001234011'},
    {id:12,name:'Palmolive Sachet',category:'Personal Care',stock:16,reorder:8,price:9,cost:6.5,expiry:'2027-01-26',barcode:'480001234012'}
  ],

  services: [
    {id:101,name:'Phone Repair',price:250,duration:'45 min',icon:'fa-mobile-screen-button',description:'Basic phone diagnostics and repair'},
    {id:102,name:'Haircut',price:80,duration:'30 min',icon:'fa-scissors',description:'Basic haircut service'},
    {id:103,name:'Motorcycle Tune-up',price:350,duration:'1 hr',icon:'fa-wrench',description:'Standard tune-up'}
  ],

  utang: [
    {id:201,name:'Maria Santos',balance:1250,last:'Sep 13, 2026',status:'Overdue'},
    {id:202,name:'Jun Reyes',balance:840,last:'Sep 14, 2026',status:'Current'},
    {id:203,name:'Ana Cruz',balance:620,last:'Sep 12, 2026',status:'Current'},
    {id:204,name:'Pedro Dela Cruz',balance:980,last:'Sep 10, 2026',status:'Overdue'},
    {id:205,name:'Liza Mendoza',balance:350,last:'Sep 14, 2026',status:'Current'}
  ],

  gcash: [
    {id:301,date:'Sep 14, 2026',type:'Cash-in',customer:'Carla R.',amount:500,fee:10,notes:'Wallet top-up'},
    {id:302,date:'Sep 14, 2026',type:'Cash-out',customer:'Ben P.',amount:200,fee:10,notes:'Customer cash-out'},
    {id:303,date:'Sep 13, 2026',type:'Cash-in',customer:'Jomar A.',amount:1000,fee:10,notes:'Wallet top-up'},
    {id:304,date:'Sep 13, 2026',type:'Cash-out',customer:'Nina T.',amount:300,fee:10,notes:'Customer cash-out'}
  ],

  eload: [
    {id:401,date:'Sep 14, 2026',network:'Globe',type:'Cash-out',amount:100,fee:5,customer:''},
    {id:402,date:'Sep 14, 2026',network:'Smart',type:'Cash-out',amount:50,fee:5,customer:''},
    {id:403,date:'Sep 13, 2026',network:'DITO',type:'Cash-out',amount:100,fee:5,customer:''},
    {id:404,date:'Sep 13, 2026',network:'TM',type:'Cash-out',amount:50,fee:5,customer:''}
  ],

  bills: [
    {id:501,name:'Electricity',amount:1850,due:'2026-09-18',status:'Due soon',icon:'fa-bolt'},
    {id:502,name:'Water',amount:620,due:'2026-09-22',status:'Scheduled',icon:'fa-droplet'},
    {id:503,name:'Internet',amount:1499,due:'2026-10-01',status:'Scheduled',icon:'fa-wifi'}
  ],

  employees: [
    {id:601,name:'Aira Mae',role:'Store Staff',rate:480,paid:4320,icon:'AM'},
    {id:602,name:'Mark John',role:'Delivery',rate:500,paid:3500,icon:'MJ'}
  ],

  vault: [
    {id:701,date:'Sep 14, 2026',type:'Cash in',amount:1000,notes:'End-of-day sales transfer'},
    {id:702,date:'Sep 14, 2026',type:'Cash out',amount:400,notes:'Supplier payment'},
    {id:703,date:'Sep 13, 2026',type:'Cash in',amount:2500,notes:'Previous day deposit'}
  ],

  sales: [],

  marketplace: [
    {id:1001,name:"Lucky Me Pancit Canton",category:"Food",price:12,suggestedPrice:16,stock:250,icon:"fa-bowl-food"},
    {id:1002,name:"Lucky Me Beef Noodles",category:"Food",price:9,suggestedPrice:12,stock:300,icon:"fa-bowl-food"},
    {id:1003,name:"Lucky Me Chicken Noodles",category:"Food",price:9,suggestedPrice:12,stock:300,icon:"fa-bowl-food"},
    {id:1004,name:"Payless Xtra Big Noodles",category:"Food",price:14,suggestedPrice:18,stock:180,icon:"fa-bowl-food"},
    {id:1005,name:"Nissin Ramen Beef",category:"Food",price:11,suggestedPrice:14,stock:220,icon:"fa-bowl-food"},
    {id:1006,name:"Nissin Ramen Chicken",category:"Food",price:11,suggestedPrice:14,stock:220,icon:"fa-bowl-food"},
    {id:1007,name:"Argentina Corned Beef 175g",category:"Food",price:38,suggestedPrice:45,stock:120,icon:"fa-can-food"},
    {id:1008,name:"Purefoods Corned Beef 150g",category:"Food",price:48,suggestedPrice:58,stock:100,icon:"fa-can-food"},
    {id:1009,name:"Century Tuna 155g",category:"Food",price:41,suggestedPrice:49,stock:160,icon:"fa-can-food"},
    {id:1010,name:"555 Sardines 155g",category:"Food",price:20,suggestedPrice:27,stock:200,icon:"fa-can-food"},
    {id:1011,name:"Mega Sardines 155g",category:"Food",price:20,suggestedPrice:27,stock:200,icon:"fa-can-food"},
    {id:1012,name:"Ligo Sardines 155g",category:"Food",price:21,suggestedPrice:28,stock:180,icon:"fa-can-food"},
    {id:1013,name:"CDO Carne Norte 100g",category:"Food",price:32,suggestedPrice:39,stock:130,icon:"fa-can-food"},
    {id:1014,name:"Maling Luncheon Meat",category:"Food",price:58,suggestedPrice:68,stock:80,icon:"fa-can-food"},
    {id:1015,name:"Datu Puti Soy Sauce 385ml",category:"Food",price:26,suggestedPrice:33,stock:120,icon:"fa-bottle-droplet"},
    {id:1016,name:"Datu Puti Vinegar 385ml",category:"Food",price:24,suggestedPrice:31,stock:120,icon:"fa-bottle-droplet"},
    {id:1017,name:"Silver Swan Soy Sauce 385ml",category:"Food",price:28,suggestedPrice:35,stock:120,icon:"fa-bottle-droplet"},
    {id:1018,name:"UFC Banana Ketchup 320g",category:"Food",price:35,suggestedPrice:43,stock:100,icon:"fa-bottle-droplet"},

    {id:1019,name:"Piattos Cheese 85g",category:"Snacks",price:31,suggestedPrice:39,stock:150,icon:"fa-cookie-bite"},
    {id:1020,name:"Nova Multigrain Snacks",category:"Snacks",price:31,suggestedPrice:39,stock:150,icon:"fa-cookie-bite"},
    {id:1021,name:"Clover Chips Cheese",category:"Snacks",price:25,suggestedPrice:32,stock:140,icon:"fa-cookie-bite"},
    {id:1022,name:"Chippy BBQ",category:"Snacks",price:25,suggestedPrice:32,stock:160,icon:"fa-cookie-bite"},
    {id:1023,name:"Chiz Curls Cheese",category:"Snacks",price:25,suggestedPrice:32,stock:130,icon:"fa-cookie-bite"},
    {id:1024,name:"Moby Caramel",category:"Snacks",price:26,suggestedPrice:33,stock:120,icon:"fa-cookie-bite"},
    {id:1025,name:"SkyFlakes Crackers",category:"Snacks",price:7,suggestedPrice:10,stock:250,icon:"fa-cookie-bite"},
    {id:1026,name:"Fita Crackers",category:"Snacks",price:7,suggestedPrice:10,stock:250,icon:"fa-cookie-bite"},
    {id:1027,name:"Hansel Chocolate",category:"Snacks",price:9,suggestedPrice:12,stock:220,icon:"fa-cookie-bite"},
    {id:1028,name:"Cream-O Chocolate Cookies",category:"Snacks",price:28,suggestedPrice:35,stock:130,icon:"fa-cookie-bite"},
    {id:1029,name:"Choco Mucho Bar",category:"Snacks",price:36,suggestedPrice:45,stock:100,icon:"fa-cookie-bite"},
    {id:1030,name:"Cloud 9 Chocolate Bar",category:"Snacks",price:18,suggestedPrice:24,stock:160,icon:"fa-cookie-bite"},

    {id:1031,name:"Coca-Cola 1.5L",category:"Drinks",price:68,suggestedPrice:82,stock:120,icon:"fa-bottle-water"},
    {id:1032,name:"Coca-Cola 330ml",category:"Drinks",price:18,suggestedPrice:25,stock:240,icon:"fa-bottle-water"},
    {id:1033,name:"Sprite 1.5L",category:"Drinks",price:66,suggestedPrice:80,stock:100,icon:"fa-bottle-water"},
    {id:1034,name:"Royal 1.5L",category:"Drinks",price:66,suggestedPrice:80,stock:100,icon:"fa-bottle-water"},
    {id:1035,name:"Mountain Dew 1.5L",category:"Drinks",price:65,suggestedPrice:79,stock:90,icon:"fa-bottle-water"},
    {id:1036,name:"Wilkins 500ml",category:"Drinks",price:14,suggestedPrice:20,stock:300,icon:"fa-bottle-water"},
    {id:1037,name:"Nature's Spring 500ml",category:"Drinks",price:10,suggestedPrice:15,stock:350,icon:"fa-bottle-water"},
    {id:1038,name:"Nature's Spring 1L",category:"Drinks",price:15,suggestedPrice:22,stock:250,icon:"fa-bottle-water"},
    {id:1039,name:"C2 Green Tea 350ml",category:"Drinks",price:18,suggestedPrice:25,stock:200,icon:"fa-bottle-water"},
    {id:1040,name:"Zesto Orange Drink",category:"Drinks",price:9,suggestedPrice:12,stock:300,icon:"fa-bottle-water"},

    {id:1041,name:"Milo 24g",category:"Grocery",price:10,suggestedPrice:13,stock:250,icon:"fa-mug-hot"},
    {id:1042,name:"Bear Brand 33g",category:"Grocery",price:14,suggestedPrice:18,stock:180,icon:"fa-box"},
    {id:1043,name:"Alaska Evap 370ml",category:"Grocery",price:37,suggestedPrice:45,stock:120,icon:"fa-box"},
    {id:1044,name:"Nescafe Original 25g",category:"Grocery",price:33,suggestedPrice:42,stock:180,icon:"fa-mug-hot"},
    {id:1045,name:"Nescafe Creamy White",category:"Grocery",price:8,suggestedPrice:11,stock:300,icon:"fa-mug-hot"},
    {id:1046,name:"Great Taste White",category:"Grocery",price:8,suggestedPrice:11,stock:300,icon:"fa-mug-hot"},
    {id:1047,name:"Kopiko Brown",category:"Grocery",price:8,suggestedPrice:11,stock:300,icon:"fa-mug-hot"},
    {id:1048,name:"Energen Cereal Drink",category:"Grocery",price:9,suggestedPrice:12,stock:250,icon:"fa-mug-hot"},

    {id:1049,name:"Safeguard Soap",category:"Personal Care",price:28,suggestedPrice:35,stock:90,icon:"fa-soap"},
    {id:1050,name:"Palmolive Shampoo Sachet",category:"Personal Care",price:6,suggestedPrice:9,stock:400,icon:"fa-pump-soap"},
    {id:1051,name:"Cream Silk Conditioner Sachet",category:"Personal Care",price:7,suggestedPrice:10,stock:350,icon:"fa-pump-soap"},
    {id:1052,name:"Head & Shoulders Sachet",category:"Personal Care",price:8,suggestedPrice:12,stock:300,icon:"fa-pump-soap"},
    {id:1053,name:"Dove Beauty Bar",category:"Personal Care",price:52,suggestedPrice:65,stock:80,icon:"fa-soap"},
    {id:1054,name:"Colgate Toothpaste 40g",category:"Personal Care",price:32,suggestedPrice:40,stock:100,icon:"fa-tooth"},
    {id:1055,name:"Closeup Toothpaste 40g",category:"Personal Care",price:30,suggestedPrice:38,stock:100,icon:"fa-tooth"},
    {id:1056,name:"Safeguard Liquid Hand Soap",category:"Personal Care",price:55,suggestedPrice:69,stock:70,icon:"fa-pump-soap"},
    {id:1057,name:"Hapee Toothpaste 40g",category:"Personal Care",price:25,suggestedPrice:32,stock:100,icon:"fa-tooth"},
    {id:1058,name:"Whisper Regular Pads",category:"Personal Care",price:7,suggestedPrice:10,stock:300,icon:"fa-box"},
    {id:1059,name:"Modess Napkin",category:"Personal Care",price:8,suggestedPrice:12,stock:250,icon:"fa-box"},

    {id:1060,name:"Surf Powder 25g",category:"Household",price:7,suggestedPrice:10,stock:300,icon:"fa-spray-can-sparkles"},
    {id:1061,name:"Ariel Powder Sachet",category:"Household",price:8,suggestedPrice:12,stock:300,icon:"fa-spray-can-sparkles"},
    {id:1062,name:"Tide Powder Sachet",category:"Household",price:8,suggestedPrice:12,stock:300,icon:"fa-spray-can-sparkles"},
    {id:1063,name:"Downy Fabric Conditioner",category:"Household",price:8,suggestedPrice:12,stock:320,icon:"fa-droplet"},
    {id:1064,name:"Zonrox Bleach 250ml",category:"Household",price:22,suggestedPrice:30,stock:120,icon:"fa-bottle-droplet"},
    {id:1065,name:"Joy Dishwashing Liquid",category:"Household",price:22,suggestedPrice:29,stock:130,icon:"fa-soap"},
    {id:1066,name:"Mr. Muscle Cleaner",category:"Household",price:35,suggestedPrice:45,stock:90,icon:"fa-spray-can-sparkles"},
    {id:1067,name:"Champion Powder Detergent",category:"Household",price:7,suggestedPrice:10,stock:280,icon:"fa-spray-can-sparkles"},
    {id:1068,name:"Walis Tingting",category:"Household",price:45,suggestedPrice:60,stock:40,icon:"fa-broom"},
    {id:1069,name:"Scrub Sponge",category:"Household",price:8,suggestedPrice:12,stock:180,icon:"fa-soap"},

    {id:1070,name:"Datu Puti Fish Sauce 150ml",category:"Grocery",price:15,suggestedPrice:20,stock:140,icon:"fa-bottle-droplet"},
    {id:1071,name:"Datu Puti Soy Sauce 150ml",category:"Grocery",price:15,suggestedPrice:20,stock:140,icon:"fa-bottle-droplet"},
    {id:1072,name:"Silver Swan Soy Sauce 150ml",category:"Grocery",price:16,suggestedPrice:21,stock:140,icon:"fa-bottle-droplet"},
    {id:1073,name:"Suka Pinoy Vinegar 350ml",category:"Grocery",price:18,suggestedPrice:24,stock:130,icon:"fa-bottle-droplet"},
    {id:1074,name:"White Sugar 1kg",category:"Grocery",price:78,suggestedPrice:92,stock:70,icon:"fa-cubes-stacked"},
    {id:1075,name:"Brown Sugar 1kg",category:"Grocery",price:72,suggestedPrice:88,stock:70,icon:"fa-cubes-stacked"},
    {id:1076,name:"Iodized Salt 500g",category:"Grocery",price:20,suggestedPrice:27,stock:100,icon:"fa-box"},
    {id:1077,name:"Rice 1kg",category:"Grocery",price:52,suggestedPrice:60,stock:100,icon:"fa-bowl-rice"},
    {id:1078,name:"Brown Rice 1kg",category:"Grocery",price:65,suggestedPrice:78,stock:60,icon:"fa-bowl-rice"},
    {id:1079,name:"Eggs 10pcs",category:"Grocery",price:75,suggestedPrice:90,stock:80,icon:"fa-egg"},

    {id:1080,name:"Pampers Diaper Small",category:"Family",price:85,suggestedPrice:105,stock:50,icon:"fa-baby"},
    {id:1081,name:"Pampers Diaper Medium",category:"Family",price:95,suggestedPrice:115,stock:50,icon:"fa-baby"},
    {id:1082,name:"Pampers Diaper Large",category:"Family",price:105,suggestedPrice:128,stock:50,icon:"fa-baby"},
    {id:1083,name:"Baby Wipes Small",category:"Family",price:35,suggestedPrice:45,stock:90,icon:"fa-box"},
    {id:1084,name:"Baby Powder Sachet",category:"Family",price:7,suggestedPrice:10,stock:250,icon:"fa-box"},

    {id:1085,name:"Ballpen Blue",category:"School & Office",price:5,suggestedPrice:8,stock:300,icon:"fa-pen"},
    {id:1086,name:"Ballpen Black",category:"School & Office",price:5,suggestedPrice:8,stock:300,icon:"fa-pen"},
    {id:1087,name:"Pencil",category:"School & Office",price:6,suggestedPrice:10,stock:250,icon:"fa-pencil"},
    {id:1088,name:"Eraser",category:"School & Office",price:4,suggestedPrice:7,stock:300,icon:"fa-eraser"},
    {id:1089,name:"Bond Paper A4 20 Sheets",category:"School & Office",price:25,suggestedPrice:35,stock:100,icon:"fa-file"},
    {id:1090,name:"Notebook 80 Leaves",category:"School & Office",price:28,suggestedPrice:38,stock:100,icon:"fa-book"},
    {id:1091,name:"Yellow Pad Paper",category:"School & Office",price:24,suggestedPrice:32,stock:100,icon:"fa-file-lines"},
    {id:1092,name:"Permanent Marker",category:"School & Office",price:18,suggestedPrice:25,stock:100,icon:"fa-marker"},

    {id:1093,name:"Dog Food 1kg",category:"Pet Care",price:85,suggestedPrice:105,stock:50,icon:"fa-bone"},
    {id:1094,name:"Cat Food 400g",category:"Pet Care",price:65,suggestedPrice:80,stock:60,icon:"fa-cat"},
    {id:1095,name:"Pet Soap",category:"Pet Care",price:35,suggestedPrice:45,stock:60,icon:"fa-paw"},
    {id:1096,name:"Pet Treats",category:"Pet Care",price:25,suggestedPrice:35,stock:80,icon:"fa-dog"},

    {id:1097,name:"USB Charging Cable",category:"Electronics",price:35,suggestedPrice:55,stock:80,icon:"fa-usb"},
    {id:1098,name:"USB-C Charging Cable",category:"Electronics",price:45,suggestedPrice:65,stock:80,icon:"fa-plug"},
    {id:1099,name:"Lightning Cable",category:"Electronics",price:55,suggestedPrice:75,stock:70,icon:"fa-plug"},
    {id:1100,name:"Earphones",category:"Electronics",price:35,suggestedPrice:55,stock:80,icon:"fa-headphones"},
    {id:1101,name:"Phone Charger",category:"Electronics",price:85,suggestedPrice:120,stock:60,icon:"fa-charging-station"},
    {id:1102,name:"Power Bank",category:"Electronics",price:280,suggestedPrice:399,stock:30,icon:"fa-battery-full"},
    {id:1103,name:"Tempered Glass",category:"Electronics",price:20,suggestedPrice:45,stock:100,icon:"fa-mobile-screen"},
    {id:1104,name:"Phone Case",category:"Electronics",price:45,suggestedPrice:80,stock:70,icon:"fa-mobile-screen"},

    {id:1105,name:"Umbrella",category:"Other",price:120,suggestedPrice:160,stock:30,icon:"fa-umbrella"},
    {id:1106,name:"Flashlight",category:"Other",price:70,suggestedPrice:100,stock:40,icon:"fa-lightbulb"}
  ],

  suppliers: [],
  notes: [],
  purchaseOrders: [],
  wishlist: [],

  settings: {
    store:'My Store',
    owner:'Negosyo Owner',
    lowStock:true,
    expiry:true,
    dailySummary:true
  }
};


/* =========================================================
   HELPERS
   ========================================================= */

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const money = n =>
  '₱' +
  Number(n || 0).toLocaleString(
    'en-PH',
    {
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  );

const uid = () =>
  Date.now() +
  Math.floor(
    Math.random() * 1000
  );

const esc = v =>
  String(v ?? '').replace(
    /[&<>'"]/g,
    c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      "'":'&#39;',
      '"':'&quot;'
    }[c])
  );

const today = () =>
  new Date()
    .toISOString()
    .slice(0,10);

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
          month:'short',
          day:'2-digit',
          year:'numeric'
        }
      );
};

const daysUntil = value =>
  (
    new Date(
      `${value}T12:00:00`
    ) -
    new Date()
  ) / 86400000;

const clone = x =>
  JSON.parse(
    JSON.stringify(x)
  );


/* =========================================================
   STATE
   ========================================================= */

let state =
  clone(
    DEFAULT_STATE
  );


/* =========================================================
   STORAGE
   ========================================================= */

function storageKey(){
  return 'mynegosyo_state_v3';
}

function mergeMarketplaceDefaults(){

  if(
    !Array.isArray(
      state.marketplace
    )
  ){

    state.marketplace =
      clone(
        DEFAULT_STATE.marketplace
      );

    return;
  }

  const existingIds =
    new Set(
      state.marketplace.map(
        item =>
          Number(item.id)
      )
    );

  const missing =
    DEFAULT_STATE.marketplace.filter(
      item =>
        !existingIds.has(
          Number(item.id)
        )
    );

  if(
    missing.length
  ){

    state.marketplace.push(
      ...clone(
        missing
      )
    );

    try{

      localStorage.setItem(
        storageKey(),
        JSON.stringify(state)
      );

    }catch(e){

      console.warn(
        'Marketplace migration save error',
        e
      );

    }
  }
}

function load(){

  try{

    const raw =
      localStorage.getItem(
        storageKey()
      );

    if(raw){

      const saved =
        JSON.parse(raw);

      state =
        Object.assign(
          clone(DEFAULT_STATE),
          saved
        );

      state.settings =
        Object.assign(
          clone(
            DEFAULT_STATE.settings
          ),
          saved.settings || {}
        );

    }

  }catch(e){

    console.warn(
      'MyNegosyo load error',
      e
    );

  }

  state.cart =
    Array.isArray(state.cart)
      ? state.cart
      : [];

  state.products =
    Array.isArray(state.products)
      ? state.products
      : [];

  state.services =
    Array.isArray(state.services)
      ? state.services
      : [];

  state.utang =
    Array.isArray(state.utang)
      ? state.utang
      : [];

  state.gcash =
    Array.isArray(state.gcash)
      ? state.gcash
      : [];

  state.eload =
    Array.isArray(state.eload)
      ? state.eload
      : [];

  state.bills =
    Array.isArray(state.bills)
      ? state.bills
      : [];

  state.employees =
    Array.isArray(state.employees)
      ? state.employees
      : [];

  state.vault =
    Array.isArray(state.vault)
      ? state.vault
      : [];

  state.sales =
    Array.isArray(state.sales)
      ? state.sales
      : [];

  state.suppliers =
    Array.isArray(state.suppliers)
      ? state.suppliers
      : [];

  state.notes =
    Array.isArray(state.notes)
      ? state.notes
      : [];

  state.purchaseOrders =
    Array.isArray(
      state.purchaseOrders
    )
      ? state.purchaseOrders
      : [];

  state.wishlist =
    Array.isArray(
      state.wishlist
    )
      ? state.wishlist
      : [];

  state.marketplace =
    Array.isArray(
      state.marketplace
    )
      ? state.marketplace
      : clone(
          DEFAULT_STATE.marketplace
        );

  mergeMarketplaceDefaults();

  updateStoreNameUI();
}

function save(){

  try{

    localStorage.setItem(
      storageKey(),
      JSON.stringify(state)
    );

  }catch(e){

    console.warn(
      'MyNegosyo save error',
      e
    );

  }

  updateStoreNameUI();
}

function updateStoreNameUI(){

  const name =
    state.settings?.store ||
    'My Store';

  if(
    $('#storeNameSidebar')
  ){

    $('#storeNameSidebar')
      .textContent =
      name;

  }

  if(
    $('#storeNameInput')
  ){

    $('#storeNameInput')
      .value =
      name;

  }
}


/* =========================================================
   MODAL
   ========================================================= */

function ensureDynamicModal(){

  if(
    $('#entityModal')
  ){

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
          type="button"
          data-close="entityModal"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

      </div>

      <form id="entityForm"></form>

    </div>
    `
  );

  $(
    '[data-close="entityModal"]'
  )?.addEventListener(
    'click',
    () =>
      closeModal(
        'entityModal'
      )
  );
}

function openModal(id){

  $('#overlay')
    ?.classList.add(
      'open'
    );

  $(`#${id}`)
    ?.classList.add(
      'open'
    );
}

function closeModal(id){

  $(`#${id}`)
    ?.classList.remove(
      'open'
    );

  if(
    !$$('.modal.open').length
  ){

    $('#overlay')
      ?.classList.remove(
        'open'
      );

  }
}

function toast(
  msg,
  type='ok'
){

  const t =
    $('#toast');

  if(!t)return;

  const span =
    t.querySelector(
      'span'
    );

  const icon =
    t.querySelector(
      'i'
    );

  if(span){

    span.textContent =
      msg;

  }

  if(icon){

    icon.className =
      type === 'error'
        ? 'fa-solid fa-circle-exclamation'
        : 'fa-solid fa-circle-check';

  }

  t.classList.add(
    'show'
  );

  clearTimeout(
    window.__myNegosyoToast
  );

  window.__myNegosyoToast =
    setTimeout(
      () =>
        t.classList.remove(
          'show'
        ),
      2200
    );
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showPage(page){

  if(
    !$('#page-'+page)
  ){

    page =
      'dashboard';

  }

  state.page =
    page;

  $$('.page')
    .forEach(
      x =>
        x.classList.toggle(
          'active',
          x.id ===
          `page-${page}`
        )
    );

  $$('.nav-item[data-page], .bottom-item[data-page]')
    .forEach(
      x =>
        x.classList.toggle(
          'active',
          x.dataset.page ===
          page
        )
    );

  if(
    window.innerWidth <= 760
  ){

    $('#sidebar')
      ?.classList.remove(
        'open'
      );

  }

  renderPage(
    page
  );

  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
}

function renderPage(page){

  
  const map = {

    calculator: renderCalculator,
    
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

    suppliers:
      renderSuppliers,

    notes:
      renderNotes,

    marketplace:
      renderMarketplace,

    settings:
      renderSettings

  };

  map[page]?.();

}


/* =========================================================
   TOTALS
   ========================================================= */

function dateSalesTotal(){

  const d =
    today();

  return state.sales
    .filter(
      s =>
        s.date === d
    )
    .reduce(
      (a,s) =>
        a +
        Number(
          s.total || 0
        ),
      0
    );
}

function monthSalesTotal(){

  const prefix =
    today().slice(
      0,
      7
    );

  return state.sales
    .filter(
      s =>
        String(
          s.date || ''
        ).startsWith(
          prefix
        )
    )
    .reduce(
      (a,s) =>
        a +
        Number(
          s.total || 0
        ),
      0
    );
}

function totalUtang(){

  return state.utang
    .reduce(
      (a,u) =>
        a +
        Number(
          u.balance || 0
        ),
      0
    );
}

function vaultBalance(){

  return state.vault
    .reduce(
      (a,v) =>
        a +
        (
          v.type ===
          'Cash out'
            ? -Number(
                v.amount || 0
              )
            : Number(
                v.amount || 0
              )
        ),
      0
    );
}

function gcashBalance(){

  return state.gcash
    .reduce(
      (a,r) =>
        a +
        (
          r.type ===
          'Cash-in'
            ? Number(
                r.amount || 0
              )
            : -Number(
                r.amount || 0
              )
        ),
      0
    );
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard(){

  const low =
    state.products.filter(
      p =>
        p.stock > 0 &&
        p.stock <= p.reorder
    );

  const out =
    state.products.filter(
      p =>
        p.stock === 0
    );

  const lowCount =
    low.length +
    out.length;

  const exp =
    state.products.filter(
      p =>
        p.expiry &&
        daysUntil(
          p.expiry
        ) >= 0 &&
        daysUntil(
          p.expiry
        ) <= 30
    ).length;

  const todaySales =
    dateSalesTotal();

  if(
    $('#todaySales')
  ){

    $('#todaySales')
      .textContent =
      money(
        todaySales
      );

  }

  if(
    $('#dashLowStock')
  ){

    $('#dashLowStock')
      .textContent =
      `${lowCount} item${
        lowCount === 1
          ? ''
          : 's'
      }`;

  }

  if(
    $('#todayUtang')
  ){

    $('#todayUtang')
      .textContent =
      money(
        totalUtang()
      );

  }

  if(
    $('#dashGcash')
  ){

    $('#dashGcash')
      .textContent =
      money(
        gcashBalance()
      );

  }

  if(
    $('#summaryLow')
  ){

    $('#summaryLow')
      .textContent =
      lowCount;

  }

  if(
    $('#lowStockBadge')
  ){

    $('#lowStockBadge')
      .textContent =
      lowCount;

  }

  if(
    $('#summaryExpiry')
  ){

    $('#summaryExpiry')
      .textContent =
      exp;

  }

  if(
    $('#totalProducts')
  ){

    $('#totalProducts')
      .textContent =
      state.products.length;

  }

  if(
    $('#stockValue')
  ){

    const value =
      state.products
        .reduce(
          (sum,p) =>
            sum +
            Number(
              p.stock || 0
            ) *
            Number(
              p.cost || 0
            ),
          0
        );

    $('#stockValue')
      .textContent =
      money(value);

  }

  const activeCustomers =
    state.utang
      .filter(
        u =>
          Number(
            u.balance || 0
          ) > 0
      ).length;

  const utangCard =
    $('#todayUtang')
      ?.closest(
        '.stat-card'
      );

  if(utangCard){

    const trend =
      utangCard.querySelector(
        '.trend'
      );

    if(trend){

      trend.textContent =
        `${activeCustomers} active customer${
          activeCustomers === 1
            ? ''
            : 's'
        }`;

    }

  }

  const alerts=[];

  out
    .slice(
      0,
      3
    )
    .forEach(
      p =>
        alerts.push(
          alertRow(
            'red',
            'fa-circle-exclamation',
            `${esc(p.name)} is out of stock`,
            'Restock now'
          )
        )
    );

  low
    .slice(
      0,
      3
    )
    .forEach(
      p =>
        alerts.push(
          alertRow(
            'yellow',
            'fa-triangle-exclamation',
            `${esc(p.name)} is running low`,
            `${p.stock} left`
          )
        )
    );

  state.products
    .filter(
      p =>
        p.expiry &&
        daysUntil(
          p.expiry
        ) >= 0 &&
        daysUntil(
          p.expiry
        ) <= 30
    )
    .slice(
      0,
      2
    )
    .forEach(
      p =>
        alerts.push(
          alertRow(
            'blue',
            'fa-clock',
            `${esc(p.name)} expires soon`,
            humanDate(
              p.expiry
            )
          )
        )
    );

  if(
    $('#alertList')
  ){

    $('#alertList')
      .innerHTML =
      alerts.join('') ||
      `
      <div class="empty-state">
        <p>No alerts</p>
        <span>Your store looks good.</span>
      </div>
      `;

  }

  renderTopProducts();
  drawChart();
}

function alertRow(
  kind,
  icon,
  title,
  sub
){

  return `
    <div class="alert-item">

      <div class="alert-dot alert-${kind}">
        <i class="fa-solid ${icon}"></i>
      </div>

      <div>
        <strong>
          ${title}
        </strong>
        <span>
          ${esc(sub)}
        </span>
      </div>

    </div>
  `;
}


/* =========================================================
   TOP PRODUCTS
   ========================================================= */

function soldMap(){

  const map={};

  state.sales.forEach(
    sale =>
      (sale.items || [])
        .forEach(
          item => {

            if(
              item.service
            )return;

            map[item.id] =
              (
                map[item.id] ||
                0
              ) +
              Number(
                item.qty || 0
              );

          }
        )
  );

  return map;
}

function topProductRows(){

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
      (a,b) =>
        b.sold-a.sold ||
        a.p.name.localeCompare(
          b.p.name
        )
    )
    .slice(
      0,
      6
    );
}

function renderTopProducts(){

  const rows =
    topProductRows();

  const html =
    rows.length

      ? rows
          .map(
            (r,i) =>
              `
              <div class="rank-row">

                <div class="rank-num">
                  ${i+1}
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

  $('#topProducts') &&
    (
      $('#topProducts').innerHTML =
        html
    );

  $('#reportProducts') &&
    (
      $('#reportProducts').innerHTML =
        html
    );
}


/* =========================================================
   SALES CHART
   ========================================================= */

function drawChart(){

  const c =
    $('#salesChart');

  if(!c)return;

  const rect =
    c.getBoundingClientRect();

  const w =
    Math.max(
      280,
      Math.floor(
        rect.width || 500
      )
    );

  const h = 180;

  const dpr =
    window.devicePixelRatio ||
    1;

  c.width =
    w * dpr;

  c.height =
    h * dpr;

  const ctx =
    c.getContext(
      '2d'
    );

  if(!ctx)return;

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

  const vals=[];
  const labels=[];

  for(
    let i=6;
    i>=0;
    i--
  ){

    const d =
      new Date();

    d.setDate(
      d.getDate()-i
    );

    const key =
      d.toISOString()
        .slice(
          0,
          10
        );

    vals.push(
      state.sales
        .filter(
          s =>
            s.date ===
            key
        )
        .reduce(
          (a,s)=>
            a +
            Number(
              s.total || 0
            ),
          0
        )
    );

    labels.push(
      i===0
        ? 'Today'
        : d.toLocaleDateString(
            'en-PH',
            {
              month:'short',
              day:'numeric'
            }
          )
    );

  }

  const max =
    Math.max(
      100,
      Math.max(
        ...vals
      ) * 1.2
    );

  ctx.strokeStyle =
    '#e9edf4';

  ctx.lineWidth = 1;

  for(
    let y=25;
    y<h-24;
    y+=31
  ){

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

  ctx.beginPath();

  vals.forEach(
    (v,i)=>{

      const x =
        16 +
        i *
        (w-32)/6;

      const y =
        h-24 -
        (v/max) *
        (h-55);

      if(i){

        ctx.lineTo(
          x,
          y
        );

      }else{

        ctx.moveTo(
          x,
          y
        );

      }

    }
  );

  ctx.strokeStyle =
    '#0d6efd';

  ctx.lineWidth = 3;
  ctx.lineCap =
    'round';
  ctx.lineJoin =
    'round';

  ctx.stroke();

  vals.forEach(
    (v,i)=>{

      const x =
        16 +
        i *
        (w-32)/6;

      const y =
        h-24 -
        (v/max) *
        (h-55);

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        4,
        0,
        Math.PI*2
      );

      ctx.fillStyle =
        '#fff';

      ctx.fill();

      ctx.strokeStyle =
        '#0d6efd';

      ctx.lineWidth = 2;

      ctx.stroke();

      ctx.fillStyle =
        '#8793a7';

      ctx.font =
        '9px Inter';

      ctx.fillText(
        labels[i],
        x-12,
        h-7
      );

    }
  );
}


/* =========================================================
   INVENTORY
   ========================================================= */

function productStatus(p){

  if(
    Number(p.stock)===0
  ){

    return [
      'low',
      'Out of stock'
    ];

  }

  if(
    Number(p.stock) <=
    Number(p.reorder)
  ){

    return [
      'low',
      'Low stock'
    ];

  }

  if(
    p.expiry &&
    daysUntil(
      p.expiry
    ) >= 0 &&
    daysUntil(
      p.expiry
    ) <= 30
  ){

    return [
      'exp',
      'Expiring soon'
    ];

  }

  if(
    p.expiry &&
    daysUntil(
      p.expiry
    ) < 0
  ){

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

function renderInventory(){

  const q =
    (
      $('#inventorySearch')
        ?.value || ''
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
          productStatus(
            p
          );

        const hay =
          `
          ${p.name}
          ${p.category}
          ${p.barcode || ''}
          `.toLowerCase();

        return (
          (!q ||
            hay.includes(
              q
            )) &&
          (
            f==='all' ||
            (
              f==='low' &&
              p.stock>0 &&
              p.stock<=p.reorder
            ) ||
            (
              f==='out' &&
              p.stock===0
            ) ||
            (
              f==='expiry' &&
              k==='exp'
            )
          )
        );

      }
    );

  const table =
    $('#inventoryTable');

  if(table){

    table.innerHTML =
      list.length

        ? list
            .map(
              p => {

                const [k,s] =
                  productStatus(
                    p
                  );

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
                          type="button"
                          title="Edit"
                          onclick="editProduct(${p.id})"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </button>

                        <button
                          type="button"
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

  const mobile =
    $('#mobileProducts');

  if(mobile){

    mobile.innerHTML =
      list.length

        ? list
            .map(
              p => {

                const [k,s] =
                  productStatus(
                    p
                  );

                return `
                  <div class="product-mobile">

                    <div class="pm-top">

                      <strong>
                        ${esc(p.name)}
                      </strong>

                      <span class="status ${k}">
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
                        <b>
                          ${money(p.price)}
                        </b>
                      </div>

                      <div>
                        <span>Expiry</span>
                        <b>
                          ${p.expiry || '—'}
                        </b>
                      </div>

                    </div>

                    <div
                      class="row-actions"
                      style="margin-top:10px"
                    >

                      <button
                        type="button"
                        onclick="editProduct(${p.id})"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </button>

                      <button
                        type="button"
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

  $('#totalProducts') &&
    (
      $('#totalProducts').textContent =
        state.products.length
    );

  $('#stockValue') &&
    (
      $('#stockValue').textContent =
        money(
          state.products.reduce(
            (a,p)=>
              a +
              Number(
                p.stock || 0
              ) *
              Number(
                p.cost || 0
              ),
            0
          )
        )
    );

  $('#summaryLow') &&
    (
      $('#summaryLow').textContent =
        state.products.filter(
          p =>
            p.stock <=
            p.reorder
        ).length
    );

  $('#summaryExpiry') &&
    (
      $('#summaryExpiry').textContent =
        state.products.filter(
          p =>
            p.expiry &&
            daysUntil(
              p.expiry
            )>=0 &&
            daysUntil(
              p.expiry
            )<=30
        ).length
    );
}


/* =========================================================
   SALES CATALOG
   ========================================================= */

function renderSaleCatalog(){

  const q =
    (
      $('#saleSearch')
        ?.value ||
      ''
    )
      .trim()
      .toLowerCase();

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
          .includes(q) ||
        (
          p.barcode ||
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

  const arr=[
    ...products,

    ...services.map(
      s => ({
        id:s.id,
        name:s.name,
        category:'Service',
        price:s.price,
        stock:999,
        service:true,
        icon:s.icon
      })
    )
  ];

  const catalog =
    $('#saleCatalog');

  if(!catalog)return;

  catalog.innerHTML =
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
                  type="button"
                  class="add-to-cart"
                  ${
                    !p.service &&
                    p.stock===0
                      ? 'disabled'
                      : ''
                  }
                  onclick="addToCart(${p.id},${!!p.service})"
                >
                  <i class="fa-solid ${
                    p.stock===0
                      ? 'fa-ban'
                      : 'fa-plus'
                  }"></i>
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

  renderCart();
}

function addToCart(
  id,
  service=false
){

  const source =
    service
      ? state.services.find(
          x =>
            x.id===id
        )
      : state.products.find(
          x =>
            x.id===id
        );

  if(!source)return;

  if(
    !service &&
    source.stock<=0
  ){

    return toast(
      'Item is out of stock',
      'error'
    );

  }

  const item =
    state.cart.find(
      x =>
        x.id===id &&
        x.service===service
    );

  if(item){

    if(
      !service &&
      item.qty>=source.stock
    ){

      return toast(
        'Not enough stock',
        'error'
      );

    }

    item.qty++;

  }else{

    state.cart.push({
      id,
      name:source.name,
      price:Number(
        source.price
      ),
      qty:1,
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

function renderCart(){

  const count =
    state.cart.reduce(
      (a,x)=>
        a +
        Number(
          x.qty || 0
        ),
      0
    );

  const total =
    state.cart.reduce(
      (a,x)=>
        a +
        Number(
          x.qty || 0
        ) *
        Number(
          x.price || 0
        ),
      0
    );

  if(
    $('#cartCount')
  ){

    $('#cartCount')
      .textContent =
      `${count} item${
        count===1
          ? ''
          : 's'
      }`;

  }

  if(
    $('#cartTotal')
  ){

    $('#cartTotal')
      .textContent =
      money(total);

  }

  const cart =
    $('#cartItems');

  if(!cart)return;

  cart.innerHTML =
    !state.cart.length

      ? `
        <div class="empty-state">

          <i class="fa-solid fa-basket-shopping"></i>

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
                    ${money(x.price)}
                    each
                  </span>

                </div>

                <div class="qty-box">

                  <button
                    type="button"
                    onclick="changeQty(${x.id},-1,${x.service})"
                  >
                    −
                  </button>

                  <b>
                    ${x.qty}
                  </b>

                  <button
                    type="button"
                    onclick="changeQty(${x.id},1,${x.service})"
                  >
                    +
                  </button>

                </div>

                <strong>
                  ${money(
                    x.price *
                    x.qty
                  )}
                </strong>

              </div>
              `
          )
          .join('');
}

function changeQty(
  id,
  d,
  service=false
){

  const item =
    state.cart.find(
      x =>
        x.id===id &&
        x.service===service
    );

  if(!item)return;

  const src =
    service
      ? state.services.find(
          x =>
            x.id===id
        )
      : state.products.find(
          x =>
            x.id===id
        );

  if(!src)return;

  if(
    d>0 &&
    !service &&
    item.qty>=src.stock
  ){

    return toast(
      'Not enough stock',
      'error'
    );

  }

  if(
    d<0 &&
    item.qty===1
  ){

    state.cart =
      state.cart.filter(
        x =>
          !(
            x.id===id &&
            x.service===service
          )
      );

  }else{

    item.qty += d;

  }

  save();
  renderCart();
}

function completeSale(){

  if(
    !state.cart.length
  ){

    return toast(
      'Cart is empty',
      'error'
    );

  }

  const total =
    state.cart.reduce(
      (a,x)=>
        a +
        x.qty *
        x.price,
      0
    );

  if(
    state.pay==='Utang'
  ){

    openEntity(
      'utang',
      {
        customer:'',
        amount:total,
        mode:'sale-credit'
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
  customer=''
){

  const items =
    clone(
      state.cart
    );

  const total =
    items.reduce(
      (a,x)=>
        a +
        x.qty *
        x.price,
      0
    );

  for(
    const item of items
  ){

    if(
      item.service
    )continue;

    const p =
      state.products.find(
        x =>
          x.id===item.id
      );

    if(
      !p ||
      p.stock<
      item.qty
    ){

      return toast(
        `Not enough stock for ${item.name}`,
        'error'
      );

    }

  }

  for(
    const item of items
  ){

    if(
      item.service
    )continue;

    const p =
      state.products.find(
        x =>
          x.id===item.id
      );

    p.stock -=
      item.qty;

  }

  const sale={
    id:uid(),
    date:today(),
    time:new Date()
      .toLocaleTimeString(
        'en-PH',
        {
          hour:'2-digit',
          minute:'2-digit'
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

  state.cart=[];

  save();

  renderCart();
  renderInventory();
  renderDashboard();
  renderReports();

  toast(
    `Sale completed · ${money(total)}`
  );
}

function clearCart(){

  state.cart=[];

  save();

  renderCart();

  toast(
    'Cart cleared'
  );
}


/* =========================================================
   SERVICES
   ========================================================= */

function renderServices(){

  const container =
    $('#servicesGrid');

  if(!container)return;

  container.innerHTML =
    state.services.length

      ? state.services
          .map(
            s =>
              `
              <div class="service-card">

                <div class="head">

                  <div class="round-icon">
                    <i class="fa-solid ${
                      esc(
                        s.icon ||
                        'fa-wrench'
                      )
                    }"></i>
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
                    type="button"
                    onclick="editService(${s.id})"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button
                    type="button"
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

function renderUtang(){

  const active =
    state.utang.filter(
      u =>
        u.balance>0
    ).length;

  const overdue =
    state.utang.filter(
      u =>
        u.status==='Overdue' &&
        u.balance>0
    ).length;

  const banner =
    document.querySelector(
      '#page-utang .summary-banner'
    );

  if(banner){

    const vals =
      banner.querySelectorAll(
        'strong'
      );

    if(vals[0]){
      vals[0].textContent =
        money(
          totalUtang()
        );
    }

    if(vals[1]){
      vals[1].textContent =
        active;
    }

    if(vals[2]){
      vals[2].textContent =
        overdue;
    }

  }

  const table =
    $('#utangTable');

  if(!table)return;

  table.innerHTML =
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
                      u.status==='Overdue'
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
                      type="button"
                      onclick="collectUtang(${u.id})"
                      title="Payment"
                    >
                      <i class="fa-solid fa-hand-holding-dollar"></i>
                    </button>

                    <button
                      type="button"
                      onclick="editUtang(${u.id})"
                      title="Edit"
                    >
                      <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                      type="button"
                      onclick="deleteUtang(${u.id})"
                      title="Delete"
                    >
                      <i class="fa-solid fa-trash"></i>
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

function collectUtang(
  id
){

  const u =
    state.utang.find(
      x =>
        x.id===id
    );

  if(!u)return;

  openEntity(
    'utangPayment',
    {
      customer:u.name,
      amount:u.balance,
      utangId:id
    }
  );
}


/* =========================================================
   GCASH
   ========================================================= */

function renderGCash(){

  const card =
    $('#page-gcash .wallet-card strong');

  if(card){

    card.textContent =
      money(
        gcashBalance()
      );

  }

  const table =
    $('#gcashTable');

  if(!table)return;

  table.innerHTML =
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
                      r.type==='Cash-in'
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
                  ${esc(r.notes||'')}
                </td>

                <td>

                  <button
                    type="button"
                    class="row-delete"
                    onclick="deleteEntry('gcash',${r.id})"
                  >
                    <i class="fa-solid fa-trash"></i>
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
              <p>No GCash entries</p>
            </div>

          </td>

        </tr>
      `;
}


/* =========================================================
   E-LOAD
   ========================================================= */

function renderELoad(){

  const table =
    $('#eloadTable');

  if(!table)return;

  table.innerHTML =
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
                    r.customer||
                    '—'
                  )}
                </td>

                <td>

                  <button
                    type="button"
                    class="row-delete"
                    onclick="deleteEntry('eload',${r.id})"
                  >
                    <i class="fa-solid fa-trash"></i>
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
              <p>No E-Load entries</p>
            </div>

          </td>

        </tr>
      `;
}


/* =========================================================
   BILLS
   ========================================================= */

function dueLabel(
  date
){

  const d =
    daysUntil(
      date
    );

  if(
    d<0
  )return 'Overdue';

  if(
    d<=7
  )return 'Due soon';

  return 'Scheduled';
}

function renderBills(){

  const grid =
    $('#billsGrid');

  if(!grid)return;

  grid.innerHTML =
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
                      <i class="fa-solid ${
                        esc(
                          b.icon ||
                          'fa-receipt'
                        )
                      }"></i>
                    </div>

                    <div>

                      <strong>
                        ${esc(b.name)}
                      </strong>

                      <div class="card-meta">
                        Due ${humanDate(b.due)}
                      </div>

                    </div>

                  </div>

                  <div class="card-price">
                    ${money(b.amount)}
                  </div>

                  <span
                    class="status ${
                      status==='Overdue'
                        ? 'low'
                        : status==='Due soon'
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
                      type="button"
                      onclick="editBill(${b.id})"
                    >
                      <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                      type="button"
                      onclick="deleteBill(${b.id})"
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
          <p>No bills yet</p>
        </div>
      `;
}


/* =========================================================
   EMPLOYEES
   ========================================================= */

function initials(
  name
){

  return String(
    name||''
  )
    .split(/\s+/)
    .filter(Boolean)
    .slice(
      0,
      2
    )
    .map(
      x =>
        x[0]
    )
    .join('')
    .toUpperCase() ||
    'NA';
}

function renderEmployees(){

  const grid =
    $('#employeesGrid');

  if(!grid)return;

  grid.innerHTML =
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
                  <b>
                    ${money(e.paid)}
                  </b>
                </div>

                <div
                  class="row-actions"
                  style="margin-top:14px"
                >

                  <button
                    type="button"
                    onclick="payEmployee(${e.id})"
                  >
                    <i class="fa-solid fa-money-bill-wave"></i>
                  </button>

                  <button
                    type="button"
                    onclick="editEmployee(${e.id})"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button
                    type="button"
                    onclick="deleteEmployee(${e.id})"
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
          <p>No employees yet</p>
        </div>
      `;
}


/* =========================================================
   VAULT
   ========================================================= */

function renderVault(){

  const card =
    $('#page-vault .wallet-card strong');

  if(card){

    card.textContent =
      money(
        vaultBalance()
      );

  }

  const table =
    $('#vaultTable');

  if(!table)return;

  table.innerHTML =
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
                  ${esc(r.notes||'')}
                </td>

                <td>

                  <button
                    type="button"
                    class="row-delete"
                    onclick="deleteEntry('vault',${r.id})"
                  >
                    <i class="fa-solid fa-trash"></i>
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
              <p>No vault movements</p>
            </div>

          </td>

        </tr>
      `;
}


/* =========================================================
   REPORTS
   ========================================================= */

function renderReports(){

  const month =
    monthSalesTotal();

  const units =
    state.sales.reduce(
      (a,s) =>
        a +
        (s.items || [])
          .reduce(
            (q,i) =>
              q +
              (
                i.service
                  ? 0
                  : Number(
                      i.qty || 0
                    )
              ),
            0
          ),
      0
    );

  const profit =
    state.sales.reduce(
      (a,s) =>
        a +
        (s.items || [])
          .reduce(
            (q,i) => {

              if(
                i.service
              ){

                return (
                  q +
                  i.qty *
                  i.price
                );

              }

              const p =
                state.products.find(
                  x =>
                    x.id===i.id
                );

              return (
                q +
                i.qty *
                (
                  i.price -
                  (
                    p?.cost ||
                    0
                  )
                )
              );

            },
            0
          ),
      0
    );

  const cards =
    $$('#page-reports .report-card strong');

  if(cards[0])
    cards[0].textContent =
      money(month);

  if(cards[1])
    cards[1].textContent =
      units;

  if(cards[2])
    cards[2].textContent =
      money(
        totalUtang()
      );

  if(cards[3])
    cards[3].textContent =
      money(
        profit
      );

  renderTopProducts();
}


/* =========================================================
   SETTINGS
   ========================================================= */

function renderSettings(){

  if(
    $('#storeNameInput')
  ){

    $('#storeNameInput')
      .value =
      state.settings.store;

  }

  const inputs =
    $$('#page-settings input[type="checkbox"]');

  if(inputs[0])
    inputs[0].checked =
      state.settings.lowStock;

  if(inputs[1])
    inputs[1].checked =
      state.settings.expiry;

  if(inputs[2])
    inputs[2].checked =
      state.settings.dailySummary;
}


/* =========================================================
   PRODUCT CRUD
   ========================================================= */

function resetProductForm(){

  const form =
    $('#productForm');

  if(!form)return;

  form.reset();

  form.dataset.editId =
    '';

  const title =
    document.querySelector(
      '.modal h2'
    );

  if(title)
    title.textContent =
      'Add Product';
}

function editProduct(
  id
){

  const p =
    state.products.find(
      x =>
        x.id===id
    );

  if(!p)return;

  openModal(
    'productModal'
  );

  $('#productName') &&
    (
      $('#productName').value =
        p.name
    );

  $('#productCategory') &&
    (
      $('#productCategory').value =
        p.category
    );

  $('#productPrice') &&
    (
      $('#productPrice').value =
        p.price
    );

  $('#productCost') &&
    (
      $('#productCost').value =
        p.cost
    );

  $('#productStock') &&
    (
      $('#productStock').value =
        p.stock
    );

  $('#productReorder') &&
    (
      $('#productReorder').value =
        p.reorder
    );

  $('#productExpiry') &&
    (
      $('#productExpiry').value =
        p.expiry || ''
    );

  const form =
    $('#productForm');

  if(form)
    form.dataset.editId =
      id;

  ensureProductBarcodeField();

  $('#productBarcode') &&
    (
      $('#productBarcode').value =
        p.barcode || ''
    );

  $('.modal#productModal h2') &&
    (
      $('.modal#productModal h2')
        .textContent =
        'Edit Product'
    );
}

function ensureProductBarcodeField(){

  if(
    $('#productBarcode')
  ){

    return;

  }

  const target =
    $('#productForm .form-grid');

  if(!target)return;

  target.insertAdjacentHTML(
    'beforeend',
    `
    <label>
      Barcode
      <input
        id="productBarcode"
        inputmode="numeric"
        autocomplete="off"
        placeholder="Scan or enter barcode"
      >
    </label>
    `
  );
}

function deleteProduct(
  id
){

  const p =
    state.products.find(
      x =>
        x.id===id
    );

  if(!p)return;

  if(
    !confirm(
      `Delete ${p.name}?`
    )
  ){

    return;

  }

  state.products =
    state.products.filter(
      x =>
        x.id!==id
    );

  state.cart =
    state.cart.filter(
      x =>
        !(
          x.id===id &&
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
   ENTITY MODALS
   ========================================================= */

function fv(
  fd,
  key
){

  return (
    fd.get(key)
      ?.toString()
      .trim() ||
    ''
  );
}

function openEntity(
  type,
  data={}
){

  ensureDynamicModal();

  const modal =
    $('#entityModal');

  const form =
    $('#entityForm');

  const configs={

    service:{
      eyebrow:'SERVICES',
      title:
        data.id
          ? 'Edit Service'
          : 'Add Service',

      fields:[
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
          'textarea',
          data.description ||
            '',
          false
        ]
      ]
    },

    utang:{
      eyebrow:'UTANG',
      title:
        data.mode==='sale-credit'
          ? 'Credit Sale'
          : (
              data.id
                ? 'Edit Customer'
                : 'Add Credit Entry'
            ),

      fields:[
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
          data.mode==='sale-credit'
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

    utangPayment:{
      eyebrow:'UTANG PAYMENT',
      title:'Record Payment',

      fields:[
        [
          'amount',
          'Payment amount',
          'number',
          data.amount || '',
          true
        ],
        [
          'note',
          'Note',
          'textarea',
          'Payment received',
          false
        ]
      ]
    },

    gcash:{
      eyebrow:'GCASH',
      title:'New GCash Entry',

      fields:[
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
          'textarea',
          '',
          false
        ]
      ]
    },

    eload:{
      eyebrow:'E-LOAD',
      title:'New Load Entry',

      fields:[
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

    bill:{
      eyebrow:'BILLS',
      title:
        data.id
          ? 'Edit Bill'
          : 'Add Bill',

      fields:[
        [
          'name',
          'Bill name',
          'text',
          data.name || '',
          true
        ],
        [
          'amount',
          'Amount',
          'number',
          data.amount || '',
          true
        ],
        [
          'due',
          'Due date',
          'date',
          data.due || today(),
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

    employee:{
      eyebrow:'STAFF',
      title:
        data.id
          ? 'Edit Employee'
          : 'Add Employee',

      fields:[
        [
          'name',
          'Employee name',
          'text',
          data.name || '',
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
          data.rate || '',
          true
        ],
        [
          'paid',
          'Paid this period',
          'number',
          data.paid || 0,
          false
        ]
      ]
    },

    employeePayment:{
      eyebrow:'PAYROLL',
      title:'Record Salary Payment',

      fields:[
        [
          'amount',
          'Payment amount',
          'number',
          data.amount || '',
          true
        ]
      ]
    },

    vault:{
      eyebrow:'VAULT',
      title:'Cash Movement',

      fields:[
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
          'textarea',
          '',
          true
        ]
      ]
    },

    supplier:{
      eyebrow:'SUPPLIERS',
      title:
        data.id
          ? 'Edit Supplier'
          : 'Add Supplier',

      fields:[
        [
          'name',
          'Supplier name',
          'text',
          data.name || '',
          true
        ],
        [
          'contact',
          'Contact number',
          'tel',
          data.contact || '',
          false
        ],
        [
          'email',
          'Email',
          'email',
          data.email || '',
          false
        ],
        [
          'terms',
          'Payment terms',
          'select',
          data.terms ||
            'Cash',
          true,
          [
            'Cash',
            '7 Days',
            '15 Days',
            '30 Days',
            '60 Days'
          ]
        ],
        [
          'balance',
          'Outstanding balance',
          'number',
          data.balance || 0,
          false
        ],
        [
          'leadTime',
          'Lead time (days)',
          'number',
          data.leadTime || 1,
          false
        ],
        [
          'preferred',
          'Preferred supplier',
          'checkbox',
          Boolean(
            data.preferred
          ),
          false
        ]
      ]
    },

    note:{
      eyebrow:'NOTES',
      title:
        data.id
          ? 'Edit Note'
          : 'New Note',

      fields:[
        [
          'title',
          'Title',
          'text',
          data.title || '',
          true
        ],
        [
          'type',
          'Type',
          'select',
          data.type ||
            'note',
          true,
          [
            'note',
            'task',
            'reminder'
          ]
        ],
        [
          'body',
          'Details',
          'textarea',
          data.body || '',
          true
        ],
        [
          'due',
          'Due date',
          'date',
          data.due || '',
          false
        ],
        [
          'pinned',
          'Pin note',
          'checkbox',
          Boolean(
            data.pinned
          ),
          false
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

          const [
            name,
            label,
            kind,
            value,
            required
          ] = f;

          if(
            kind==='select'
          ){

            const options =
              f[5] || [];

            return `
              <label>

                ${esc(label)}

                <select
                  name="${esc(name)}"
                  ${
                    required
                      ? 'required'
                      : ''
                  }
                >

                  ${options
                    .map(
                      o =>
                        `
                        <option
                          value="${esc(o)}"
                          ${
                            String(o)===
                            String(value)
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

          if(
            kind==='textarea'
          ){

            return `
              <label>

                ${esc(label)}

                <textarea
                  name="${esc(name)}"
                  rows="5"
                  ${
                    required
                      ? 'required'
                      : ''
                  }
                >${esc(
                  value
                )}</textarea>

              </label>
            `;
          }

          if(
            kind==='checkbox'
          ){

            return `
              <label
                class="entity-check"
              >

                <input
                  type="checkbox"
                  name="${esc(name)}"
                  ${
                    value
                      ? 'checked'
                      : ''
                  }
                >

                <span>
                  ${esc(label)}
                </span>

              </label>
            `;
          }

          return `
            <label>

              ${esc(label)}

              <input
                name="${esc(name)}"
                type="${esc(kind)}"
                value="${esc(value)}"
                ${
                  required
                    ? 'required'
                    : ''
                }
                ${
                  kind==='number'
                    ? 'min="0" step="0.01"'
                    : ''
                }
              >

            </label>
          `;

        }
      )
      .join('') +

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

  form
    .querySelector(
      '[data-cancel]'
    )
    ?.addEventListener(
      'click',
      () =>
        closeModal(
          'entityModal'
        )
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

function handleEntitySubmit(
  type,
  data,
  fd
){

  /* SERVICE */

  if(
    type==='service'
  ){

    const obj={
      id:
        data.id ||
        uid(),

      name:
        fv(fd,'name'),

      price:
        Number(
          fv(fd,'price')
        ) || 0,

      duration:
        fv(fd,'duration'),

      icon:
        fv(fd,'icon') ||
        'fa-wrench',

      description:
        fv(fd,'description')
    };

    if(
      !obj.name
    ){

      return toast(
        'Enter a service name',
        'error'
      );

    }

    if(data.id){

      state.services =
        state.services.map(
          x =>
            x.id===data.id
              ? obj
              : x
        );

    }else{

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


  /* UTANG */

  if(
    type==='utang'
  ){

    const name =
      fv(fd,'name');

    const amount =
      Number(
        fv(fd,'amount')
      ) || 0;

    const status =
      fv(fd,'status') ||
      'Current';

    if(
      !name ||
      amount<0
    ){

      return toast(
        'Enter valid customer details',
        'error'
      );

    }

    if(
      data.mode==='sale-credit'
    ){

      const existing =
        state.utang.find(
          u =>
            u.name
              .toLowerCase()===
            name.toLowerCase()
        );

      if(existing){

        existing.balance +=
          amount;

        existing.last =
          humanDate(
            today()
          );

        existing.status =
          'Current';

      }else{

        state.utang.unshift({

          id:
            uid(),

          name,

          balance:
            amount,

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

      return;
    }

    const obj={
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

    if(data.id){

      state.utang =
        state.utang.map(
          x =>
            x.id===data.id
              ? obj
              : x
        );

    }else{

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


  /* UTANG PAYMENT */

  if(
    type==='utangPayment'
  ){

    const amount =
      Number(
        fv(fd,'amount')
      ) || 0;

    const u =
      state.utang.find(
        x =>
          x.id===
          data.utangId
      );

    if(
      !u ||
      amount<=0
    ){

      return toast(
        'Enter a valid payment',
        'error'
      );

    }

    u.balance =
      Math.max(
        0,
        Number(
          u.balance ||
          0
        ) -
        amount
      );

    u.last =
      humanDate(
        today()
      );

    if(
      u.balance===0
    ){

      u.status =
        'Current';

    }

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


  /* GCASH */

  if(
    type==='gcash'
  ){

    state.gcash.unshift({

      id:
        uid(),

      date:
        humanDate(
          today()
        ),

      type:
        fv(fd,'type'),

      customer:
        fv(fd,'customer'),

      amount:
        Number(
          fv(fd,'amount')
        ) || 0,

      fee:
        Number(
          fv(fd,'fee')
        ) || 0,

      notes:
        fv(fd,'notes')

    });

    save();

    renderGCash();
    renderDashboard();

    closeModal(
      'entityModal'
    );

    return toast(
      'GCash entry saved'
    );
  }


  /* ELOAD */

  if(
    type==='eload'
  ){

    state.eload.unshift({

      id:
        uid(),

      date:
        humanDate(
          today()
        ),

      network:
        fv(fd,'network'),

      type:
        fv(fd,'type'),

      customer:
        fv(fd,'customer'),

      amount:
        Number(
          fv(fd,'amount')
        ) || 0,

      fee:
        Number(
          fv(fd,'fee')
        ) || 0

    });

    save();

    renderELoad();

    closeModal(
      'entityModal'
    );

    return toast(
      'E-Load entry saved'
    );
  }


  /* BILL */

  if(
    type==='bill'
  ){

    const obj={
      id:
        data.id ||
        uid(),

      name:
        fv(fd,'name'),

      amount:
        Number(
          fv(fd,'amount')
        ) || 0,

      due:
        fv(fd,'due'),

      status:
        dueLabel(
          fv(fd,'due')
        ),

      icon:
        fv(fd,'icon') ||
        'fa-receipt'
    };

    if(data.id){

      state.bills =
        state.bills.map(
          x =>
            x.id===data.id
              ? obj
              : x
        );

    }else{

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


  /* EMPLOYEE */

  if(
    type==='employee'
  ){

    const obj={
      id:
        data.id ||
        uid(),

      name:
        fv(fd,'name'),

      role:
        fv(fd,'role'),

      rate:
        Number(
          fv(fd,'rate')
        ) || 0,

      paid:
        Number(
          fv(fd,'paid')
        ) || 0,

      icon:
        initials(
          fv(fd,'name')
        )
    };

    if(data.id){

      state.employees =
        state.employees.map(
          x =>
            x.id===data.id
              ? obj
              : x
        );

    }else{

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


  /* EMPLOYEE PAYMENT */

  if(
    type==='employeePayment'
  ){

    const e =
      state.employees.find(
        x =>
          x.id===
          data.employeeId
      );

    const amount =
      Number(
        fv(fd,'amount')
      ) || 0;

    if(
      !e ||
      amount<=0
    ){

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


  /* VAULT */

  if(
    type==='vault'
  ){

    state.vault.unshift({

      id:
        uid(),

      date:
        humanDate(
          today()
        ),

      type:
        fv(fd,'type'),

      amount:
        Number(
          fv(fd,'amount')
        ) || 0,

      notes:
        fv(fd,'notes')

    });

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


  /* SUPPLIER */

  if(
    type==='supplier'
  ){

    const obj={
      id:
        data.id ||
        uid(),

      name:
        fv(fd,'name'),

      contact:
        fv(fd,'contact'),

      email:
        fv(fd,'email'),

      terms:
        fv(fd,'terms') ||
        'Cash',

      balance:
        Number(
          fv(fd,'balance')
        ) || 0,

      leadTime:
        Number(
          fv(fd,'leadTime')
        ) || 0,

      preferred:
        fd.has(
          'preferred'
        )
    };

    if(
      !obj.name
    ){

      return toast(
        'Enter supplier name',
        'error'
      );

    }

    if(data.id){

      state.suppliers =
        state.suppliers.map(
          x =>
            x.id===data.id
              ? obj
              : x
        );

    }else{

      state.suppliers.unshift(
        obj
      );

    }

    save();

    renderSuppliers();

    closeModal(
      'entityModal'
    );

    return toast(
      data.id
        ? 'Supplier updated'
        : 'Supplier added'
    );
  }


  /* NOTE */

  if(
    type==='note'
  ){

    const old =
      data.id
        ? state.notes.find(
            x =>
              x.id===
              data.id
          )
        : null;

    const obj={

      id:
        data.id ||
        uid(),

      title:
        fv(fd,'title'),

      type:
        fv(fd,'type') ||
        'note',

      body:
        fv(fd,'body'),

      due:
        fv(fd,'due'),

      pinned:
        fd.has(
          'pinned'
        ),

      completed:
        old
          ? Boolean(
              old.completed
            )
          : false,

      completedAt:
        old
          ? (
              old.completedAt ||
              null
            )
          : null,

      createdAt:
        old
          ? (
              old.createdAt ||
              Date.now()
            )
          : Date.now(),

      date:
        old
          ? (
              old.date ||
              today()
            )
          : today()

    };

    if(
      !obj.title
    ){

      return toast(
        'Enter a note title',
        'error'
      );

    }

    if(data.id){

      state.notes =
        state.notes.map(
          x =>
            x.id===data.id
              ? obj
              : x
        );

    }else{

      state.notes.unshift(
        obj
      );

    }

    save();

    renderNotes();

    closeModal(
      'entityModal'
    );

    return toast(
      data.id
        ? 'Note updated'
        : 'Note created'
    );
  }

}


/* =========================================================
   SERVICE CRUD
   ========================================================= */

function editService(
  id
){

  const s =
    state.services.find(
      x =>
        x.id===id
    );

  if(s){

    openEntity(
      'service',
      s
    );

  }
}

function deleteService(
  id
){

  if(
    !confirm(
      'Delete this service?'
    )
  )return;

  state.services =
    state.services.filter(
      x =>
        x.id!==id
    );

  state.cart =
    state.cart.filter(
      x =>
        !(
          x.id===id &&
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


/* =========================================================
   UTANG CRUD
   ========================================================= */

function editUtang(
  id
){

  const u =
    state.utang.find(
      x =>
        x.id===id
    );

  if(u){

    openEntity(
      'utang',
      u
    );

  }
}

function deleteUtang(
  id
){

  if(
    !confirm(
      'Delete this credit account?'
    )
  )return;

  state.utang =
    state.utang.filter(
      x =>
        x.id!==id
    );

  save();

  renderUtang();
  renderDashboard();

  toast(
    'Credit account deleted'
  );
}


/* =========================================================
   BILL CRUD
   ========================================================= */

function editBill(
  id
){

  const b =
    state.bills.find(
      x =>
        x.id===id
    );

  if(b){

    openEntity(
      'bill',
      b
    );

  }
}

function deleteBill(
  id
){

  if(
    !confirm(
      'Delete this bill?'
    )
  )return;

  state.bills =
    state.bills.filter(
      x =>
        x.id!==id
    );

  save();

  renderBills();

  toast(
    'Bill deleted'
  );
}


/* =========================================================
   EMPLOYEE CRUD
   ========================================================= */

function editEmployee(
  id
){

  const e =
    state.employees.find(
      x =>
        x.id===id
    );

  if(e){

    openEntity(
      'employee',
      e
    );

  }
}

function deleteEmployee(
  id
){

  if(
    !confirm(
      'Delete this employee?'
    )
  )return;

  state.employees =
    state.employees.filter(
      x =>
        x.id!==id
    );

  save();

  renderEmployees();

  toast(
    'Employee deleted'
  );
}

function payEmployee(
  id
){

  const e =
    state.employees.find(
      x =>
        x.id===id
    );

  if(e){

    openEntity(
      'employeePayment',
      {
        employeeId:id,
        amount:e.rate
      }
    );

  }
}


/* =========================================================
   GENERIC DELETE
   ========================================================= */

function deleteEntry(
  collection,
  id
){

  if(
    !Array.isArray(
      state[collection]
    )
  ){

    return;

  }

  if(
    !confirm(
      'Delete this record?'
    )
  )return;

  state[collection] =
    state[collection].filter(
      x =>
        x.id!==id
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
   SUPPLIERS
   ========================================================= */

function renderSuppliers(){

  const table =
    $('#suppliersTable');

  if(!table)return;

  const suppliers =
    Array.isArray(
      state.suppliers
    )
      ? state.suppliers
      : [];

  const q =
    (
      $('#supplierSearch')
        ?.value ||
      ''
    )
      .trim()
      .toLowerCase();

  const filter =
    $('#supplierFilter')
      ?.value ||
    'all';

  const rows =
    suppliers.filter(
      s => {

        const hay =
          `
          ${s.name || ''}
          ${s.contact || ''}
          ${s.email || ''}
          ${s.terms || ''}
          `
            .toLowerCase();

        if(
          q &&
          !hay.includes(q)
        ){

          return false;

        }

        if(
          filter==='preferred' &&
          !s.preferred
        ){

          return false;

        }

        if(
          filter==='balance' &&
          Number(
            s.balance || 0
          )<=0
        ){

          return false;

        }

        return true;
      }
    );

  const payable =
    suppliers.reduce(
      (a,s)=>
        a +
        Number(
          s.balance || 0
        ),
      0
    );

  const preferred =
    suppliers.filter(
      s =>
        s.preferred
    ).length;

  const pending =
    (
      state.purchaseOrders ||
      []
    ).filter(
      x =>
        x.status===
        'Pending'
    ).length;

  if(
    $('#supplierCount')
  ){

    $('#supplierCount')
      .textContent =
      suppliers.length;

  }

  if(
    $('#supplierPayable')
  ){

    $('#supplierPayable')
      .textContent =
      money(
        payable
      );

  }

  if(
    $('#preferredSupplierCount')
  ){

    $('#preferredSupplierCount')
      .textContent =
      preferred;

  }

  if(
    $('#supplierOrdersPending')
  ){

    $('#supplierOrdersPending')
      .textContent =
      pending;

  }

  table.innerHTML =
    rows.length

      ? rows.map(
          s =>
            `
            <tr>

              <td>

                <strong>
                  ${esc(s.name)}
                </strong>

                ${
                  s.preferred
                    ? `
                      <div
                        class="supplier-preferred"
                      >
                        <i class="fa-solid fa-star"></i>
                        Preferred
                      </div>
                    `
                    : ''
                }

              </td>

              <td>

                ${esc(
                  s.contact ||
                  '—'
                )}

                <br>

                <small>
                  ${esc(
                    s.email ||
                    ''
                  )}
                </small>

              </td>

              <td>
                ${esc(
                  s.terms ||
                  'Cash'
                )}
              </td>

              <td>
                <strong>
                  ${money(
                    s.balance ||
                    0
                  )}
                </strong>
              </td>

              <td>
                ${Number(
                  s.leadTime ||
                  0
                )} days
              </td>

              <td>

                <span
                  class="supplier-status ${
                    Number(
                      s.balance ||
                      0
                    )>0
                      ? 'balance'
                      : 'active'
                  }"
                >
                  ${
                    Number(
                      s.balance ||
                      0
                    )>0
                      ? 'With Balance'
                      : 'Active'
                  }
                </span>

              </td>

              <td>

                <div class="supplier-actions">

                  <button
                    type="button"
                    onclick="editSupplier(${s.id})"
                    title="Edit"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button
                    type="button"
                    onclick="deleteSupplier(${s.id})"
                    title="Delete"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>

                </div>

              </td>

            </tr>
            `
        ).join('')

      : `
        <tr>

          <td colspan="7">

            <div class="empty-state">

              <p>
                No suppliers found
              </p>

              <span>
                Add a supplier or
                change the filter.
              </span>

            </div>

          </td>

        </tr>
      `;
}

function addSupplier(){

  openEntity(
    'supplier'
  );

}

function editSupplier(
  id
){

  const supplier =
    state.suppliers.find(
      x =>
        x.id===id
    );

  if(
    supplier
  ){

    openEntity(
      'supplier',
      supplier
    );

  }
}

function deleteSupplier(
  id
){

  const supplier =
    state.suppliers.find(
      x =>
        x.id===id
    );

  if(!supplier)return;

  if(
    !confirm(
      `Delete ${supplier.name}?`
    )
  )return;

  state.suppliers =
    state.suppliers.filter(
      x =>
        x.id!==id
    );

  save();

  renderSuppliers();

  toast(
    'Supplier deleted'
  );
}


/* =========================================================
   NOTES
   ========================================================= */

function renderNotes(){

  const grid =
    $('#notesGrid');

  if(!grid)return;

  const notes =
    Array.isArray(
      state.notes
    )
      ? state.notes
      : [];

  const q =
    (
      $('#noteSearch')
        ?.value ||
      ''
    )
      .trim()
      .toLowerCase();

  const filter =
    $('#noteFilter')
      ?.value ||
    'all';

  const rows =
    notes
      .filter(
        n => {

          const hay =
            `
            ${n.title || ''}
            ${n.body || ''}
            ${n.type || ''}
            `.toLowerCase();

          if(
            q &&
            !hay.includes(q)
          ){

            return false;

          }

          if(
            filter==='pinned' &&
            !n.pinned
          ){

            return false;

          }

          if(
            filter==='task' &&
            n.type!=='task'
          ){

            return false;

          }

          if(
            filter==='reminder' &&
            n.type!=='reminder'
          ){

            return false;

          }

          if(
            filter==='completed' &&
            !n.completed
          ){

            return false;

          }

          return true;
        }
      )
      .sort(
        (a,b)=>
          Number(
            b.pinned
          ) -
          Number(
            a.pinned
          ) ||
          Number(
            b.createdAt ||
            0
          ) -
          Number(
            a.createdAt ||
            0
          )
      );

  grid.innerHTML =
    rows.length

      ? rows.map(
          n =>
            `
            <article
              class="note-card ${
                n.pinned
                  ? 'pinned'
                  : ''
              } ${
                n.completed
                  ? 'completed'
                  : ''
              }"
            >

              ${
                n.pinned
                  ? `
                    <div class="note-pin">
                      <i class="fa-solid fa-thumbtack"></i>
                    </div>
                  `
                  : ''
              }

              <span class="note-type">
                ${esc(
                  n.type ||
                  'note'
                )}
              </span>

              <div class="note-title">
                ${esc(
                  n.title ||
                  'Untitled'
                )}
              </div>

              <div class="note-body">
                ${esc(
                  n.body ||
                  ''
                )}
              </div>

              <div class="note-date">

                ${
                  n.due
                    ? `
                      Due
                      ${humanDate(
                        n.due
                      )}
                    `
                    : `
                      Created
                      ${humanDate(
                        n.date ||
                        today()
                      )}
                    `
                }

              </div>

              <div class="note-actions">

                <button
                  type="button"
                  onclick="toggleNoteComplete(${n.id})"
                >
                  <i class="fa-solid fa-check"></i>

                  ${
                    n.completed
                      ? 'Reopen'
                      : 'Complete'
                  }

                </button>

                <button
                  type="button"
                  onclick="editNote(${n.id})"
                  title="Edit"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>

                <button
                  type="button"
                  onclick="toggleNotePin(${n.id})"
                  title="Pin"
                >
                  <i class="fa-solid fa-thumbtack"></i>
                </button>

                <button
                  type="button"
                  onclick="deleteNote(${n.id})"
                  title="Delete"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>

              </div>

            </article>
            `
        ).join('')

      : `
        <div class="empty-state">

          <p>
            No notes found
          </p>

          <span>
            Create a note,
            task, or reminder.
          </span>

        </div>
      `;
}

function addNote(){

  openEntity(
    'note'
  );

}

function editNote(
  id
){

  const note =
    state.notes.find(
      x =>
        x.id===id
    );

  if(note){

    openEntity(
      'note',
      note
    );

  }
}

function toggleNoteComplete(
  id
){

  const note =
    state.notes.find(
      x =>
        x.id===id
    );

  if(!note)return;

  note.completed =
    !note.completed;

  note.completedAt =
    note.completed
      ? Date.now()
      : null;

  save();

  renderNotes();
}

function toggleNotePin(
  id
){

  const note =
    state.notes.find(
      x =>
        x.id===id
    );

  if(!note)return;

  note.pinned =
    !note.pinned;

  save();

  renderNotes();
}

function deleteNote(
  id
){

  if(
    !confirm(
      'Delete this note?'
    )
  )return;

  state.notes =
    state.notes.filter(
      x =>
        x.id!==id
    );

  save();

  renderNotes();

  toast(
    'Note deleted'
  );
}


/* =========================================================
   MARKETPLACE
   ========================================================= */

function renderMarketplace(){

  const grid =
    $('#marketplaceGrid');

  if(!grid)return;

  const products =
    Array.isArray(
      state.marketplace
    )
      ? state.marketplace
      : [];

  const q =
    (
      $('#marketplaceSearch')
        ?.value ||
      ''
    )
      .trim()
      .toLowerCase();

  const category =
    (
      $('#marketplaceCategory')
        ?.value ||
      'all'
    )
      .trim()
      .toLowerCase();

  const sort =
    $('#marketplaceSort')
      ?.value ||
    'featured';

  let list =
    products.filter(
      p => {

        const hay =
          `
          ${p.name || ''}
          ${p.category || ''}
          `
            .toLowerCase();

        if(
          q &&
          !hay.includes(q)
        ){

          return false;

        }

        if(
          category !== 'all' &&
          String(
            p.category ||
            ''
          ).toLowerCase() !==
            category
        ){

          return false;

        }

        return true;
      }
    );

  if(
    sort==='price-low'
  ){

    list.sort(
      (a,b)=>
        Number(
          a.price || 0
        ) -
        Number(
          b.price || 0
        )
    );

  }

  if(
    sort==='price-high'
  ){

    list.sort(
      (a,b)=>
        Number(
          b.price || 0
        ) -
        Number(
          a.price || 0
        )
    );

  }

  if(
    sort==='margin'
  ){

    list.sort(
      (a,b)=>
        (
          Number(
            b.suggestedPrice ||
            0
          ) -
          Number(
            b.price ||
            0
          )
        ) -
        (
          Number(
            a.suggestedPrice ||
            0
          ) -
          Number(
            a.price ||
            0
          )
        )
    );

  }

  const wishlist =
    Array.isArray(
      state.wishlist
    )
      ? state.wishlist
      : [];

  if(
    $('#wishlistCount')
  ){

    $('#wishlistCount')
      .textContent =
      wishlist.length;

  }

  grid.innerHTML =
    list.length

      ? list.map(
          p => {

            const margin =
              Number(
                p.suggestedPrice ||
                0
              ) -
              Number(
                p.price ||
                0
              );

            const wished =
              wishlist.includes(
                p.id
              );

            return `
              <article
                class="market-card"
              >

                <div
                  class="market-image"
                >
                  <i
                    class="fa-solid ${
                      esc(
                        p.icon ||
                        'fa-box'
                      )
                    }"
                  ></i>
                </div>

                <div
                  class="market-content"
                >

                  <div
                    class="market-category"
                  >
                    ${esc(
                      p.category ||
                      'Other'
                    )}
                  </div>

                  <div
                    class="market-name"
                  >
                    ${esc(
                      p.name
                    )}
                  </div>

                  <div
                    class="market-meta"
                  >
                    Available:
                    ${Number(
                      p.stock ||
                      0
                    )}
                  </div>

                  <div
                    class="market-price"
                  >
                    ${money(
                      p.price
                    )}
                  </div>

                  <div
                    class="market-margin"
                  >
                    Suggested:
                    ${money(
                      p.suggestedPrice
                    )}
                    · Margin:
                    ${money(
                      margin
                    )}
                  </div>

                  <div
                    class="market-actions"
                  >

                    <button
                      type="button"
                      class="market-add"
                      ${
                        Number(
                          p.stock ||
                          0
                        )<=0
                          ? 'disabled'
                          : ''
                      }
                      onclick="addMarketplaceProduct(${p.id})"
                    >
                      <i class="fa-solid fa-plus"></i>
                      Add to Inventory
                    </button>

                    <button
                      type="button"
                      class="market-wishlist ${
                        wished
                          ? 'active'
                          : ''
                      }"
                      onclick="toggleWishlist(${p.id})"
                      title="Wishlist"
                    >
                      <i class="fa-solid fa-heart"></i>
                    </button>

                  </div>

                </div>

              </article>
            `;

          }
        ).join('')

      : `
        <div class="empty-state">

          <p>
            No marketplace products found
          </p>

          <span>
            Try another category
            or search term.
          </span>

        </div>
      `;
}

function toggleWishlist(
  id
){

  if(
    !Array.isArray(
      state.wishlist
    )
  ){

    state.wishlist=[];

  }

  const index =
    state.wishlist.indexOf(
      id
    );

  if(
    index>=0
  ){

    state.wishlist.splice(
      index,
      1
    );

  }else{

    state.wishlist.push(
      id
    );

  }

  save();

  renderMarketplace();
}

function addMarketplaceProduct(
  id
){

  const source =
    state.marketplace.find(
      p =>
        p.id===id
    );

  if(!source)return;

  if(
    Number(
      source.stock ||
      0
    )<=0
  ){

    return toast(
      'Marketplace item is unavailable',
      'error'
    );

  }

  const existing =
    state.products.find(
      p =>
        p.name
          .toLowerCase()===
        String(
          source.name
        ).toLowerCase()
    );

  if(existing){

    existing.stock =
      Number(
        existing.stock ||
        0
      ) +
      1;

    existing.cost =
      Number(
        source.price ||
        0
      );

    if(
      !Number(
        existing.price ||
        0
      )
    ){

      existing.price =
        Number(
          source.suggestedPrice ||
          source.price ||
          0
        );

    }

  }else{

    state.products.unshift({

      id:
        uid(),

      name:
        source.name,

      category:
        source.category ||
        'General',

      price:
        Number(
          source.suggestedPrice ||
          source.price ||
          0
        ),

      cost:
        Number(
          source.price ||
          0
        ),

      stock:1,

      reorder:5,

      expiry:'',

      barcode:''

    });

  }

  source.stock =
    Math.max(
      0,
      Number(
        source.stock ||
        0
      ) -
      1
    );

  save();

  renderMarketplace();
  renderInventory();
  renderDashboard();

  toast(
    `${source.name} added to inventory`
  );
}


/* =========================================================
   BARCODE
   ========================================================= */

async function scanBarcode(){

  if(
    !('BarcodeDetector' in window)
  ){

    const code =
      prompt(
        'Barcode scanning is not supported in this browser.\n\nEnter barcode:'
      );

    if(code){

      findBarcode(
        code.trim()
      );

    }

    return;
  }

  if(
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ){

    return toast(
      'Camera access is not available',
      'error'
    );

  }

  let stream=null;
  let stopped=false;

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
          BARCODE SCANNER
        </p>

        <h2>
          Scan Barcode
        </h2>

      </div>

      <button
        class="icon-btn"
        type="button"
        id="closeScanner"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

    </div>

    <div
      style="
        padding:18px;
        text-align:center;
      "
    >

      <div
        style="
          position:relative;
          overflow:hidden;
          border-radius:18px;
          background:#09111f;
        "
      >

        <video
          id="barcodeVideo"
          autoplay
          playsinline
          muted
          style="
            display:block;
            width:100%;
            min-height:260px;
            object-fit:cover;
          "
        ></video>

        <div
          style="
            position:absolute;
            left:12%;
            right:12%;
            top:38%;
            height:24%;
            border:2px solid #1769ff;
            border-radius:14px;
            box-shadow:
              0 0 0 9999px
              rgba(0,0,0,.20);
            pointer-events:none;
          "
        ></div>

      </div>

      <p
        class="muted"
        style="margin-top:12px"
      >
        Point your camera at a product barcode.
      </p>

    </div>
  `;

  document.body.appendChild(
    wrap
  );

  const stop =
    () => {

      if(stopped)return;

      stopped=true;

      if(stream){

        stream
          .getTracks()
          .forEach(
            track =>
              track.stop()
          );

      }

      wrap.remove();

      $('#overlay')
        ?.classList.remove(
          'open'
        );

    };

  $('#closeScanner')
    ?.addEventListener(
      'click',
      stop
    );

  openModal(
    'scannerModal'
  );

  try{

    const formats =
      await BarcodeDetector
        .getSupportedFormats();

    const detector =
      new BarcodeDetector({
        formats
      });

    stream =
      await navigator.mediaDevices
        .getUserMedia({
          video:{
            facingMode:{
              ideal:
                'environment'
            }
          },
          audio:false
        });

    const video =
      $('#barcodeVideo');

    if(!video){

      stop();

      return;

    }

    video.srcObject =
      stream;

    await video.play();

    const scan =
      async () => {

        if(
          stopped ||
          !document.body.contains(
            wrap
          )
        ){

          return;

        }

        try{

          const codes =
            await detector.detect(
              video
            );

          if(
            codes.length
          ){

            const value =
              codes[0]
                .rawValue;

            stop();

            findBarcode(
              String(
                value
              ).trim()
            );

            return;

          }

        }catch(e){

          console.warn(
            'Barcode detection error:',
            e
          );

        }

        requestAnimationFrame(
          scan
        );

      };

    requestAnimationFrame(
      scan
    );

  }catch(e){

    stop();

    toast(
      'Camera permission was not available',
      'error'
    );

    console.error(
      'Barcode scanner error:',
      e
    );

  }
}

function findBarcode(
  code
){

  const p =
    state.products.find(
      x =>
        String(
          x.barcode ||
          ''
        ) ===
        String(code)
    );

  if(!p){

    return toast(
      `No product found for ${code}`,
      'error'
    );

  }

  showPage(
    'sales'
  );

  addToCart(
    p.id,
    false
  );
}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function globalSearch(
  value
){

  const q =
    String(
      value || ''
    )
      .trim();

  if(!q)return;

  const lower =
    q.toLowerCase();

  const p =
    state.products.find(
      x =>
        `
        ${x.name}
        ${x.category}
        ${x.barcode || ''}
        `
          .toLowerCase()
          .includes(
            lower
          )
    );

  if(p){

    showPage(
      'inventory'
    );

    if(
      $('#inventorySearch')
    ){

      $('#inventorySearch')
        .value =
        q;

      renderInventory();

    }

    return;
  }

  const u =
    state.utang.find(
      x =>
        x.name
          .toLowerCase()
          .includes(
            lower
          )
    );

  if(u){

    showPage(
      'utang'
    );

    return;
  }

  const supplier =
    state.suppliers.find(
      x =>
        String(
          x.name || ''
        )
          .toLowerCase()
          .includes(
            lower
          )
    );

  if(supplier){

    showPage(
      'suppliers'
    );

    if(
      $('#supplierSearch')
    ){

      $('#supplierSearch')
        .value =
        q;

      renderSuppliers();

    }

    return;
  }

  const note =
    state.notes.find(
      x =>
        `
        ${x.title || ''}
        ${x.body || ''}
        `
          .toLowerCase()
          .includes(
            lower
          )
    );

  if(note){

    showPage(
      'notes'
    );

    if(
      $('#noteSearch')
    ){

      $('#noteSearch')
        .value =
        q;

      renderNotes();

    }

    return;
  }

  const marketplace =
    state.marketplace.find(
      x =>
        `
        ${x.name || ''}
        ${x.category || ''}
        `
          .toLowerCase()
          .includes(
            lower
          )
    );

  if(marketplace){

    showPage(
      'marketplace'
    );

    if(
      $('#marketplaceSearch')
    ){

      $('#marketplaceSearch')
        .value =
        q;

      renderMarketplace();

    }

    return;
  }

  showPage(
    'inventory'
  );

  if(
    $('#inventorySearch')
  ){

    $('#inventorySearch')
      .value =
      q;

    renderInventory();

  }
}


/* =========================================================
   SIDEBAR DROPDOWNS
   ========================================================= */

function initSidebarDropdowns(){

  $$('.nav-group-title')
    .forEach(
      button => {

        if(
          button.dataset.dropdownBound===
          'true'
        ){

          return;

        }

        button.dataset.dropdownBound =
          'true';

        let menuId =
          button.getAttribute(
            'aria-controls'
          );

        let menu =
          menuId
            ? document.getElementById(
                menuId
              )
            : button.nextElementSibling;

        if(
          !menu
        ){

          return;

        }

        if(
          !menu.id
        ){

          menu.id =
            `navGroup-${uid()}`;

        }

        button.setAttribute(
          'aria-controls',
          menu.id
        );

        if(
          !button.hasAttribute(
            'aria-expanded'
          )
        ){

          button.setAttribute(
            'aria-expanded',
            'true'
          );

        }

        const expanded =
          button.getAttribute(
            'aria-expanded'
          ) === 'true';

        menu.classList.toggle(
          'is-open',
          expanded
        );

        button.addEventListener(
          'click',
          event => {

            event.preventDefault();

            event.stopPropagation();

            const isOpen =
              button.getAttribute(
                'aria-expanded'
              ) === 'true';

            button.setAttribute(
              'aria-expanded',
              isOpen
                ? 'false'
                : 'true'
            );

            menu.classList.toggle(
              'is-open',
              !isOpen
            );

          }
        );

      }
    );
}


/* =========================================================
   BIND
   ========================================================= */

function bind(){

  load();

  ensureDynamicModal();

  ensureProductBarcodeField();

  initSidebarDropdowns();

  initFloatingSuperDog();


  /* MAIN NAVIGATION */

  $$('.nav-item[data-page], .bottom-item[data-page]')
    .forEach(
      button => {

        button.addEventListener(
          'click',
          event => {

            event.preventDefault();

            event.stopPropagation();

            showPage(
              button.dataset.page
            );

          }
        );

      }
    );


  /* DATA PAGE LINKS */

  $$('[data-page-link]')
    .forEach(
      button => {

        button.addEventListener(
          'click',
          event => {

            event.preventDefault();

            if(
              button.dataset.close
            ){

              closeModal(
                button.dataset.close
              );

            }

            showPage(
              button.dataset.pageLink
            );

          }
        );

      }
    );


  /* MOBILE MENU */

  $('#menuBtn')
    ?.addEventListener(
      'click',
      () =>
        $('#sidebar')
          ?.classList.toggle(
            'open'
          )
    );


  /* OVERLAY */

  $('#overlay')
    ?.addEventListener(
      'click',
      () => {

        $$('.modal')
          .forEach(
            m =>
              m.classList.remove(
                'open'
              )
          );

        $('#overlay')
          ?.classList.remove(
            'open'
          );

      }
    );


  /* CLOSE BUTTONS */

  $$('[data-close]')
    .forEach(
      button =>
        button.addEventListener(
          'click',
          () =>
            closeModal(
              button.dataset.close
            )
        )
    );


  /* QUICK ADD */

  $('#quickAddBtn')
    ?.addEventListener(
      'click',
      () =>
        openModal(
          'quickModal'
        )
    );


  /* SALE BUTTONS */

  $('#bottomSale')
    ?.addEventListener(
      'click',
      () =>
        showPage(
          'sales'
        )
    );

  $('#dashboardSaleBtn')
    ?.addEventListener(
      'click',
      () =>
        showPage(
          'sales'
        )
    );

  $('#newSaleBtn')
    ?.addEventListener(
      'click',
      () =>
        showPage(
          'sales'
        )
    );


  /* PRODUCT */

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


  $('#productForm')
    ?.addEventListener(
      'submit',
      e => {

        e.preventDefault();

        const form =
          e.target;

        const editId =
          Number(
            form.dataset.editId ||
            0
          );

        const p={

          id:
            editId ||
            uid(),

          name:
            $('#productName')
              ?.value
              .trim() ||
            '',

          category:
            $('#productCategory')
              ?.value
              .trim() ||
            'General',

          price:
            Number(
              $('#productPrice')
                ?.value
            ) || 0,

          cost:
            Number(
              $('#productCost')
                ?.value
            ) || 0,

          stock:
            Number(
              $('#productStock')
                ?.value
            ) || 0,

          reorder:
            Number(
              $('#productReorder')
                ?.value
            ) || 0,

          expiry:
            $('#productExpiry')
              ?.value ||
            '',

          barcode:
            $('#productBarcode')
              ?.value
              .trim() ||
            ''

        };

        if(
          !p.name ||
          p.price<0 ||
          p.stock<0
        ){

          return toast(
            'Please complete the product form',
            'error'
          );

        }

        if(editId){

          const i =
            state.products.findIndex(
              x =>
                x.id===editId
            );

          if(
            i>=0
          ){

            state.products[i]=
              p;

          }

        }else{

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


  /* INVENTORY */

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


  /* SALES SEARCH */

  $('#saleSearch')
    ?.addEventListener(
      'input',
      renderSaleCatalog
    );


  /* CART */

  $('#clearCart')
    ?.addEventListener(
      'click',
      clearCart
    );

  $$('.pay-btn')
    .forEach(
      b =>
        b.addEventListener(
          'click',
          () => {

            $$('.pay-btn')
              .forEach(
                x =>
                  x.classList.remove(
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

  $('#completeSale')
    ?.addEventListener(
      'click',
      completeSale
    );


  /* BARCODE */

  $('#scanBtn')
    ?.addEventListener(
      'click',
      scanBarcode
    );


  /* NOTIFICATION */

  $('#notifBtn')
    ?.addEventListener(
      'click',
      () => {

        if(
          $('#inventoryFilter')
        ){

          showPage(
            'inventory'
          );

          $('#inventoryFilter')
            .value =
            'low';

          renderInventory();

        }

      }
    );


  /* SETTINGS */

  $('#saveSettings')
    ?.addEventListener(
      'click',
      () => {

        state.settings.store =
          $('#storeNameInput')
            ?.value
            .trim() ||
          'My Store';

        const inputs =
          $$('#page-settings input[type="checkbox"]');

        state.settings.lowStock =
          Boolean(
            inputs[0]?.checked
          );

        state.settings.expiry =
          Boolean(
            inputs[1]?.checked
          );

        state.settings.dailySummary =
          Boolean(
            inputs[2]?.checked
          );

        save();

        renderSettings();

        toast(
          'Settings saved'
        );

      }
    );


  /* SERVICE */

  $('#addServiceBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'service'
        )
    );


  /* UTANG */

  $('#addUtangBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'utang'
        )
    );


  /* GCASH */

  $('#gcashEntryBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'gcash'
        )
    );


  /* ELOAD */

  $('#eloadBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'eload'
        )
    );


  /* BILL */

  $('#addBillBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'bill'
        )
    );


  /* EMPLOYEE */

  $('#addEmployeeBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'employee'
        )
    );


  /* VAULT */

  $('#vaultEntryBtn')
    ?.addEventListener(
      'click',
      () =>
        openEntity(
          'vault'
        )
    );


  /* STORE — SUPPLIERS */

  $('#addSupplierBtn')
    ?.addEventListener(
      'click',
      addSupplier
    );

  $('#supplierSearch')
    ?.addEventListener(
      'input',
      renderSuppliers
    );

  $('#supplierFilter')
    ?.addEventListener(
      'change',
      renderSuppliers
    );


  /* STORE — NOTES */

  $('#addNoteBtn')
    ?.addEventListener(
      'click',
      addNote
    );

  $('#noteSearch')
    ?.addEventListener(
      'input',
      renderNotes
    );

  $('#noteFilter')
    ?.addEventListener(
      'change',
      renderNotes
    );


  /* STORE — MARKETPLACE */

  $('#marketplaceSearch')
    ?.addEventListener(
      'input',
      renderMarketplace
    );

  $('#marketplaceCategory')
    ?.addEventListener(
      'change',
      renderMarketplace
    );

  $('#marketplaceSort')
    ?.addEventListener(
      'change',
      renderMarketplace
    );

  $('#marketWishlistBtn')
    ?.addEventListener(
      'click',
      () => {

        if(
          $('#marketplaceSearch')
        ){

          $('#marketplaceSearch')
            .value =
            '';

        }

        renderMarketplace();

      }
    );


  /* GLOBAL SEARCH */

  $('#globalSearch')
    ?.addEventListener(
      'keydown',
      e => {

        if(
          e.key==='Enter'
        ){

          globalSearch(
            e.target.value
          );

        }

      }
    );


  /* RESIZE */

  window.addEventListener(
    'resize',
    () => {

      if(
        state.page===
        'dashboard'
      ){

        drawChart();

      }

    }
  );


  if(
    $('#salesChart')
  ){

    setTimeout(
      drawChart,
      100
    );

  }

}


/* =========================================================
   PUBLIC FUNCTIONS
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

    scanBarcode,
    findBarcode,

    globalSearch,

    addSupplier,
    editSupplier,
    deleteSupplier,

    addNote,
    editNote,
    toggleNoteComplete,
    toggleNotePin,
    deleteNote,

    toggleWishlist,
    addMarketplaceProduct,

    renderSuppliers,
    renderNotes,
    renderMarketplace

  }
);


/* =========================================================
   PWA
   ========================================================= */

if(
  'serviceWorker' in navigator
){

  window.addEventListener(
    'load',
    () => {

      navigator.serviceWorker
        .register(
          'sw.js'
        )
        .catch(
          error =>
            console.warn(
              'Service worker registration failed:',
              error
            )
        );

    }
  );

}


/* =========================================================
   LIVE DASHBOARD SYNC
   ========================================================= */

function refreshDashboardSync(){

  if(
    document.visibilityState===
      'visible' &&
    typeof state!=='undefined'
  ){

    renderDashboard();

  }

}

window.addEventListener(
  'focus',
  refreshDashboardSync
);

window.addEventListener(
  'storage',
  event => {

    if(
      event.key===
      storageKey()
    ){

      load();

      renderPage(
        state.page
      );

    }

  }
);

document.addEventListener(
  'visibilitychange',
  () => {

    if(
      document.visibilityState===
      'visible'
    ){

      load();

      renderPage(
        state.page
      );

    }

  }
);

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

function initToolsDropdown() {

    const button =
        document.querySelector(
            '.nav-group-title[data-nav-group="tools"]'
        );

    const menu =
        document.getElementById('toolsMenu');

    if (!button || !menu) return;

    if (button.dataset.bound === 'true') return;

    button.dataset.bound = 'true';

    button.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        const isOpen =
            this.getAttribute('aria-expanded') === 'true';

        this.setAttribute(
            'aria-expanded',
            isOpen ? 'false' : 'true'
        );

    });

}

/* =========================================================
   ADVANCED CALCULATOR
   ========================================================= */

const advancedCalculator = {
  expression: '',
  current: '0',
  memory: 0,
  resetNext: false
};


/* =========================================================
   DISPLAY
   ========================================================= */

function updateAdvancedCalculator() {

  const display =
    document.getElementById('calcDisplay');

  const expression =
    document.getElementById('calcExpression');

  if (display) {
    display.textContent =
      advancedCalculator.current || '0';
  }

  if (expression) {
    expression.textContent =
      advancedCalculator.expression;
  }

}


/* =========================================================
   FORMAT
   ========================================================= */

function formatCalculatorNumber(value) {

  if (!Number.isFinite(value)) {
    return 'Error';
  }

  const rounded =
    Math.round(
      (value + Number.EPSILON) * 100000000
    ) / 100000000;

  return String(rounded);

}


/* =========================================================
   EXPRESSION CALCULATOR
   ========================================================= */

function evaluateAdvancedExpression(expression) {

  if (!expression) {
    return 0;
  }

  /*
   * Only allow calculator characters.
   */
  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    throw new Error('Invalid expression');
  }

  /*
   * Convert percentage.
   * Example:
   * 25% => 25 / 100
   */
  const normalized =
    expression.replace(
      /%/g,
      '/100'
    );

  const result =
    Function(
      `"use strict"; return (${normalized})`
    )();

  if (!Number.isFinite(result)) {
    throw new Error('Invalid calculation');
  }

  return result;

}


/* =========================================================
   CALCULATOR INPUT
   ========================================================= */

function advancedCalculatorInput(value) {

  /* NUMBER */

  if (/^\d$/.test(value)) {

    if (
      advancedCalculator.current === 'Error' ||
      advancedCalculator.resetNext
    ) {

      advancedCalculator.current = '0';
      advancedCalculator.expression = '';
      advancedCalculator.resetNext = false;

    }

    if (advancedCalculator.current === '0') {
      advancedCalculator.current = value;
    } else {
      advancedCalculator.current += value;
    }

  }


  /* DECIMAL */

  else if (value === '.') {

    if (
      advancedCalculator.current === 'Error' ||
      advancedCalculator.resetNext
    ) {

      advancedCalculator.current = '0';
      advancedCalculator.expression = '';
      advancedCalculator.resetNext = false;

    }

    if (
      !advancedCalculator.current.includes('.')
    ) {

      advancedCalculator.current += '.';

    }

  }


  /* PARENTHESES */

  else if (
    value === '(' ||
    value === ')'
  ) {

    if (
      advancedCalculator.current !== '0' &&
      advancedCalculator.current !== 'Error'
    ) {

      advancedCalculator.expression +=
        advancedCalculator.current;

      advancedCalculator.current = '0';

    }

    advancedCalculator.expression += value;

  }


  /* PERCENT */

  else if (value === '%') {

    if (
      advancedCalculator.current !== 'Error'
    ) {

      advancedCalculator.current += '%';

    }

  }


  /* OPERATORS */

  else if (
    ['+', '-', '*', '/'].includes(value)
  ) {

    if (
      advancedCalculator.current === 'Error'
    ) {
      return;
    }

    advancedCalculator.expression +=
      advancedCalculator.current + value;

    advancedCalculator.current = '0';

  }


  /* EQUALS */

  else if (value === '=') {

    try {

      const fullExpression =
        advancedCalculator.expression +
        advancedCalculator.current;

      const result =
        evaluateAdvancedExpression(
          fullExpression
        );

      advancedCalculator.expression =
        fullExpression + ' =';

      advancedCalculator.current =
        formatCalculatorNumber(result);

      advancedCalculator.resetNext =
        true;

    } catch (error) {

      advancedCalculator.expression = '';

      advancedCalculator.current = 'Error';

      advancedCalculator.resetNext = true;

    }

  }


  /* BACKSPACE */

  else if (value === 'backspace') {

    if (
      advancedCalculator.current === 'Error'
    ) {

      advancedCalculator.current = '0';
      advancedCalculator.expression = '';

    } else if (
      advancedCalculator.current.length > 1
    ) {

      advancedCalculator.current =
        advancedCalculator.current.slice(
          0,
          -1
        );

    } else {

      advancedCalculator.current = '0';

    }

  }


  /* CLEAR */

  else if (value === 'C') {

    advancedCalculator.expression = '';
    advancedCalculator.current = '0';
    advancedCalculator.resetNext = false;

  }


  /* MEMORY CLEAR */

  else if (value === 'MC') {

    advancedCalculator.memory = 0;

  }


  /* MEMORY RECALL */

  else if (value === 'MR') {

    advancedCalculator.current =
      formatCalculatorNumber(
        advancedCalculator.memory
      );

    advancedCalculator.resetNext = false;

  }


  /* MEMORY PLUS */

  else if (value === 'M+') {

    const number =
      Number(
        advancedCalculator.current
      );

    if (Number.isFinite(number)) {

      advancedCalculator.memory +=
        number;

    }

  }


  /* MEMORY MINUS */

  else if (value === 'M-') {

    const number =
      Number(
        advancedCalculator.current
      );

    if (Number.isFinite(number)) {

      advancedCalculator.memory -=
        number;

    }

  }


  updateAdvancedCalculator();

}


/* =========================================================
   MONEY FORMAT
   ========================================================= */

function calculatorMoney(value) {

  return Number(value || 0).toLocaleString(
    'en-PH',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );

}


/* =========================================================
   BUSINESS TOOL: PROFIT
   ========================================================= */

function calculateBusinessProfit() {

  const cost =
    Number(
      document.getElementById('bcCost')?.value || 0
    );

  const selling =
    Number(
      document.getElementById('bcSelling')?.value || 0
    );

  const qty =
    Math.max(
      1,
      Number(
        document.getElementById('bcQty')?.value || 1
      )
    );

  const profitPerUnit =
    selling - cost;

  const totalProfit =
    profitPerUnit * qty;

  const margin =
    selling > 0
      ? (profitPerUnit / selling) * 100
      : 0;

  const result =
    document.getElementById('bcProfitResult');

  if (!result) return;

  result.innerHTML = `
    <span>Total Profit</span>
    <strong>₱${calculatorMoney(totalProfit)}</strong>
  `;

}


/* =========================================================
   BUSINESS TOOL: MARKUP
   ========================================================= */

function calculateBusinessMarkup() {

  const cost =
    Number(
      document.getElementById('bcMarkupCost')?.value || 0
    );

  const percent =
    Number(
      document.getElementById('bcMarkupPercent')?.value || 0
    );

  const sellingPrice =
    cost +
    (cost * percent / 100);

  const result =
    document.getElementById('bcMarkupResult');

  if (!result) return;

  result.innerHTML = `
    <span>Selling Price</span>
    <strong>₱${calculatorMoney(sellingPrice)}</strong>
  `;

}


/* =========================================================
   BUSINESS TOOL: DISCOUNT
   ========================================================= */

function calculateBusinessDiscount() {

  const price =
    Number(
      document.getElementById('bcDiscountPrice')?.value || 0
    );

  const percent =
    Number(
      document.getElementById('bcDiscountPercent')?.value || 0
    );

  const discountAmount =
    price * percent / 100;

  const finalPrice =
    price - discountAmount;

  const result =
    document.getElementById('bcDiscountResult');

  if (!result) return;

  result.innerHTML = `
    <span>Final Price</span>
    <strong>₱${calculatorMoney(finalPrice)}</strong>
  `;

}


/* =========================================================
   BUSINESS TOOL: TAX
   ========================================================= */

function calculateBusinessTax() {

  const amount =
    Number(
      document.getElementById('bcTaxAmount')?.value || 0
    );

  const percent =
    Number(
      document.getElementById('bcTaxPercent')?.value || 0
    );

  const taxAmount =
    amount * percent / 100;

  const total =
    amount + taxAmount;

  const result =
    document.getElementById('bcTaxResult');

  if (!result) return;

  result.innerHTML = `
    <span>Total With Tax</span>
    <strong>₱${calculatorMoney(total)}</strong>
  `;

}


/* =========================================================
   BUSINESS TOOL: MARGIN
   ========================================================= */

function calculateBusinessMargin() {

  const cost =
    Number(
      document.getElementById('bcMarginCost')?.value || 0
    );

  const selling =
    Number(
      document.getElementById('bcMarginSelling')?.value || 0
    );

  const profit =
    selling - cost;

  const margin =
    selling > 0
      ? (profit / selling) * 100
      : 0;

  const result =
    document.getElementById('bcMarginResult');

  if (!result) return;

  result.innerHTML = `
    <span>Profit Margin</span>
    <strong>${margin.toFixed(2)}%</strong>
  `;

}


/* =========================================================
   BUSINESS TOOL: TOTAL COST
   ========================================================= */

function calculateBusinessTotal() {

  const unitCost =
    Number(
      document.getElementById('bcUnitCost')?.value || 0
    );

  const quantity =
    Math.max(
      1,
      Number(
        document.getElementById('bcTotalQty')?.value || 1
      )
    );

  const total =
    unitCost * quantity;

  const result =
    document.getElementById('bcTotalResult');

  if (!result) return;

  result.innerHTML = `
    <span>Total Cost</span>
    <strong>₱${calculatorMoney(total)}</strong>
  `;

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initAdvancedCalculator() {

  /*
   * Main calculator buttons
   */

  document
    .querySelectorAll(
      '.calculator-keypad [data-calc], .calculator-memory [data-calc]'
    )
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          advancedCalculatorInput(
            button.dataset.calc
          );

        }
      );

    });


  /*
   * Profit
   */

  document
    .getElementById('bcProfitBtn')
    ?.addEventListener(
      'click',
      calculateBusinessProfit
    );


  /*
   * Markup
   */

  document
    .getElementById('bcMarkupBtn')
    ?.addEventListener(
      'click',
      calculateBusinessMarkup
    );


  /*
   * Discount
   */

  document
    .getElementById('bcDiscountBtn')
    ?.addEventListener(
      'click',
      calculateBusinessDiscount
    );


  /*
   * Tax
   */

  document
    .getElementById('bcTaxBtn')
    ?.addEventListener(
      'click',
      calculateBusinessTax
    );


  /*
   * Margin
   */

  document
    .getElementById('bcMarginBtn')
    ?.addEventListener(
      'click',
      calculateBusinessMargin
    );


  /*
   * Total cost
   */

  document
    .getElementById('bcTotalBtn')
    ?.addEventListener(
      'click',
      calculateBusinessTotal
    );


  /*
   * Keyboard support
   */

  document.addEventListener(
    'keydown',
    event => {

      const tag =
        event.target?.tagName?.toLowerCase();

      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select'
      ) {
        return;
      }


      if (/^\d$/.test(event.key)) {

        advancedCalculatorInput(event.key);
        return;

      }


      if (
        ['+', '-', '*', '/'].includes(event.key)
      ) {

        advancedCalculatorInput(event.key);
        return;

      }


      if (
        event.key === '.'
      ) {

        advancedCalculatorInput('.');
        return;

      }


      if (
        event.key === '%'
      ) {

        advancedCalculatorInput('%');
        return;

      }


      if (
        event.key === '(' ||
        event.key === ')'
      ) {

        advancedCalculatorInput(event.key);
        return;

      }


      if (
        event.key === 'Enter' ||
        event.key === '='
      ) {

        advancedCalculatorInput('=');
        return;

      }


      if (
        event.key === 'Backspace'
      ) {

        advancedCalculatorInput(
          'backspace'
        );

        return;

      }


      if (
        event.key === 'Escape'
      ) {

        advancedCalculatorInput('C');

      }

    }
  );


  updateAdvancedCalculator();

}


/* =========================================================
   CALCULATOR PAGE RENDER
   ========================================================= */

function renderCalculator() {
  updateAdvancedCalculator();
}
initAdvancedCalculator();

/*
 * Call this once from your existing bind() function:
 *
 * initAdvancedCalculator();
 */

/* =========================================================
   FLOATING SUPERDOG
   ========================================================= */

function initFloatingSuperDog() {

    const dog =
        document.getElementById(
            'superDogCharacter'
        );

    if (!dog) return;

    if (
        dog.dataset.bound === 'true'
    ) {
        return;
    }

    dog.dataset.bound = 'true';


    /* -----------------------------------------------------
       Click interaction
       ----------------------------------------------------- */

    dog.addEventListener(
        'click',
        () => {

            dog.classList.remove(
                'superdog-bounce'
            );

            void dog.offsetWidth;

            dog.classList.add(
                'superdog-bounce'
            );

        }
    );


    /* -----------------------------------------------------
       Move slightly with pointer
       ----------------------------------------------------- */

    if (
        window.matchMedia(
            '(pointer:fine)'
        ).matches
    ) {

        document.addEventListener(
            'mousemove',
            event => {

                const float =
                    document.getElementById(
                        'superDogFloat'
                    );

                if (!float) return;

                const x =
                    (
                        event.clientX /
                        window.innerWidth
                    ) - .5;

                const y =
                    (
                        event.clientY /
                        window.innerHeight
                    ) - .5;

                float.style.setProperty(
                    '--dog-x',
                    `${x * 5}px`
                );

                float.style.setProperty(
                    '--dog-y',
                    `${y * 4}px`
                );

            }
        );

    }

}


/* =========================================================
   SUPERDOG BOUNCE STYLE
   ========================================================= */

const superDogStyle =
    document.createElement('style');

superDogStyle.textContent = `

.superdog-character.superdog-bounce {
    animation:
        superDogBounce .55s ease;
}

@keyframes superDogBounce {

    0% {
        transform:
            translateX(-50%)
            rotate(0deg)
            scale(1);
    }

    30% {
        transform:
            translateX(-50%)
            rotate(-7deg)
            scale(1.14);
    }

    60% {
        transform:
            translateX(-50%)
            rotate(6deg)
            scale(1.08);
    }

    100% {
        transform:
            translateX(-50%)
            rotate(0deg)
            scale(1);
    }

}

.superdog-float {
    margin-left: var(--dog-x, 0px);
    margin-top: var(--dog-y, 0px);
}

`;

document.head.appendChild(
    superDogStyle
);

/* =========================================================
   SUPERDOG — DRAG / ROCK WITH MOUSE OR FINGER
   ========================================================= */

function initSuperDogRock() {

    const dog = document.getElementById('superDogImage');
    const wrapper = document.getElementById('superDogFloat');

    if (!dog || !wrapper) return;

    if (dog.dataset.dragBound === 'true') return;

    dog.dataset.dragBound = 'true';

    let dragging = false;
    let startX = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let velocity = 0;
    let animationFrame = null;

    const MAX_ANGLE = 28;
    const DRAG_MULTIPLIER = 0.45;

    /* -----------------------------------------
       Keep the dog centered while changing angle
       ----------------------------------------- */

    function renderRock() {

        currentAngle +=
            (targetAngle - currentAngle) * 0.18;

        wrapper.style.transform =
            `translateX(-50%) rotate(${currentAngle}deg)`;

        if (
            Math.abs(targetAngle - currentAngle) > 0.05 ||
            Math.abs(velocity) > 0.05
        ) {

            animationFrame =
                requestAnimationFrame(renderRock);

        } else {

            animationFrame = null;

        }
    }


    function startRender() {

        if (!animationFrame) {
            animationFrame =
                requestAnimationFrame(renderRock);
        }

    }


    /* -----------------------------------------
       Pointer DOWN
       ----------------------------------------- */

    dog.addEventListener(
        'pointerdown',
        event => {

            event.preventDefault();

            dragging = true;

            startX = event.clientX;

            dog.setPointerCapture?.(
                event.pointerId
            );

            dog.style.cursor = 'grabbing';

            wrapper.style.animation =
                'none';

            velocity = 0;

        }
    );


    /* -----------------------------------------
       Pointer MOVE
       ----------------------------------------- */

    dog.addEventListener(
        'pointermove',
        event => {

            if (!dragging) return;

            event.preventDefault();

            const deltaX =
                event.clientX - startX;

            targetAngle =
                Math.max(
                    -MAX_ANGLE,
                    Math.min(
                        MAX_ANGLE,
                        deltaX * DRAG_MULTIPLIER
                    )
                );

            velocity =
                deltaX * 0.08;

            startRender();

        }
    );


    /* -----------------------------------------
       Pointer UP
       ----------------------------------------- */

    function releaseDog(event) {

        if (!dragging) return;

        dragging = false;

        dog.style.cursor = 'grab';

        try {
            dog.releasePointerCapture?.(
                event.pointerId
            );
        } catch (error) {}


        /* Convert drag movement into momentum */

        let momentum =
            Math.max(
                -14,
                Math.min(
                    14,
                    velocity
                )
            );


        function momentumAnimation() {

            momentum *= 0.92;

            targetAngle += momentum;

            targetAngle =
                Math.max(
                    -MAX_ANGLE,
                    Math.min(
                        MAX_ANGLE,
                        targetAngle
                    )
                );

            /*
             * Spring the dog slowly back toward center
             */
            targetAngle *= 0.96;

            startRender();


            if (
                Math.abs(momentum) > 0.08 ||
                Math.abs(targetAngle) > 0.15
            ) {

                requestAnimationFrame(
                    momentumAnimation
                );

            } else {

                targetAngle = 0;

                /*
                 * Restore normal hanging animation
                 */
                wrapper.style.transform =
                    'translateX(-50%)';

                wrapper.style.animation =
                    'superdog-rock 4s ease-in-out infinite';

                currentAngle = 0;

            }

        }

        requestAnimationFrame(
            momentumAnimation
        );

    }


    dog.addEventListener(
        'pointerup',
        releaseDog
    );

    dog.addEventListener(
        'pointercancel',
        releaseDog
    );

    dog.addEventListener(
        'lostpointercapture',
        event => {

            if (dragging) {
                releaseDog(event);
            }

        }
    );


    /* -----------------------------------------
       Prevent image dragging
       ----------------------------------------- */

    dog.addEventListener(
        'dragstart',
        event => {
            event.preventDefault();
        }
    );

    dog.style.cursor = 'grab';

}
