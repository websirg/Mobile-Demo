# Websirg Mobix - Modern Mobile Store & Shop Management / POS UI

A complete, commercial-grade Mobile Store Website + Shop Management / POS UI Demo tailored for modern Indian retail, accessories, and smartphone repair businesses.

## 🚀 Live Demo Features

### Customer Website
- **Dynamic Hero Section**: Official 2026 Flagship phone launch stage with 3D levitation, cosmic halo lighting, laser glass reflection, and live interactive model switcher.
- **Smartphones Catalog**: Filter by brand, price range, storage, RAM, and search with instant availability status.
- **Accessories Store**: Tempered glass, mobile covers, fast chargers, cables, and wireless audio with genuine product imagery.
- **Repair Booking & Tracking**: Book repairs online and track live status with token IDs (`WM-REP-9001` to `9005`).
- **Exchange Calculator**: Estimate trade-in exchange value for old smartphones.
- **Store Contact**: Complete store details, inquiry form, and working WhatsApp chat.

### Shop Management & POS System (`/shop/`)
- **POS New Sale Terminal (`new-sale.html`)**:
  - IMEI tracking for smartphones.
  - Stock auto-decrement for accessories.
  - **Other / Manual Item Billing**: Bill ANY custom or unlisted item on the fly (e.g. boAt Bluetooth neckbands, earbuds, tempered glass, repairs, old phones).
  - **Multi-Item Billing**: Bill 2, 3, or more products in one invoice.
  - **Interactive Discount Station**: Quick discount pills (`-₹50`, `-₹100`, `-₹200`, `-₹500`, `5%`, `10%`) and custom discount input.
  - **Complete Indian GST Breakdown**: Automatic 18% GST (Taxable value + CGST 9% + SGST 9%).
- **Invoices & Bills Archive (`invoices.html`)**:
  - Full billing ledger with search, filtering, and status.
  - **Quick Manual Multi-Item Invoice Generator**: Fast modal to generate multi-item tax bills directly.
  - **A4 GST Tax Invoice**: Clean print layout, PDF download (`html2pdf.js`), Web Share API, and 1-click WhatsApp formatted bill dispatch.
- **Repair Workshop Kanban Board (`repairs.html`)**: Track repair jobs across Received, In Progress, Ready, and Delivered states.
- **Products, Inventory, Purchases & Suppliers Management**: Full store administration panels with LocalStorage persistence.

## 🛠️ Technology Stack
- **HTML5 & Vanilla CSS3** (Custom properties, fluid grid, capsule pill design)
- **ES6 JavaScript** (Modular stores, controllers, calculations)
- **LocalStorage API** (Persistence without external database)
- **FontAwesome 6** & **html2pdf.js**
- **Future-Ready Architecture**: Clean separation ready to connect to PHP / Laravel, MySQL, REST APIs, and WhatsApp Cloud API.

---
© 2026 Websirg Mobix. All rights reserved.
