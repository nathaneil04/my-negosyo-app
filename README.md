# MyNegosyo

A mobile-first HTML/CSS/JavaScript negosyo manager for small Philippine businesses.

## Functional modules

- Dashboard with live sales, stock, alerts, cash and GCash balances
- Inventory: add, edit, delete, search, filters, stock/reorder levels, expiry and barcode
- Sales: product/service catalog, cart quantities, Cash/GCash/Utang payment modes, stock deduction and sales history
- Services: add, edit and delete services; automatically available at checkout
- Utang: credit accounts, payments, overdue/current status, edit/delete
- GCash: cash-in/cash-out records, fees, customer and notes
- E-Load: network/type/amount/fee/customer tracking
- Bills: add/edit/delete and automatic due-status calculation
- Employee Salary: add/edit/delete employees and salary payments
- Cash on Vault: cash-in/cash-out ledger and balance
- Reports: live monthly sales, units sold, utang and estimated gross profit
- Settings: store name and notification preferences
- LocalStorage persistence so the app works without a backend
- Responsive desktop/mobile layout and PWA service worker
- Barcode detection using the browser BarcodeDetector API where available, with manual fallback

## Run

Open `index.html` in a browser, or serve the folder through VS Code Live Server, XAMPP, GitHub Pages, or Vercel.

For camera barcode scanning, run from HTTPS or localhost and allow camera access.

## Deploy to Vercel

This is a static site. Upload the folder/repository and deploy with no build command required.
