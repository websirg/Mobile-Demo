/**
 * Websirg Mobix - POS New Sale Terminal & Invoice Generator
 * Supports Mobiles (IMEI tracked), Accessories, and Other / Manual Items (e.g. Bluetooth, Repairs, Unlisted Items)
 * Supports Multi-item billing (2-3+ items in one bill), Interactive Discounts (₹ and %), and full GST breakdown.
 */
let cart = [];
let currentCategory = "mobiles";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("pos-items-grid") || document.getElementById("pos-cart-items-container")) {
    initPOSTerminal();
  }
});

function initPOSTerminal() {
  renderPOSCatalog();
  populateCustomerDropdown();

  // Search filter listener
  const searchInput = document.getElementById("pos-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderPOSCatalog(e.target.value.toLowerCase());
    });
  }

  // Category switch buttons listener
  document.querySelectorAll(".pos-cat-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pos-cat-tab").forEach(b => {
        b.classList.remove("active");
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
      });
      btn.classList.add("active");
      btn.classList.add("btn-primary");
      btn.classList.remove("btn-outline");
      currentCategory = btn.getAttribute("data-cat");
      renderPOSCatalog();
    });
  });
}

// Switch directly to Other / Manual item billing tab
window.switchToCustomItemTab = function(presetName = "", presetCat = "Bluetooth & Audio", presetPrice = "", presetWarranty = "") {
  currentCategory = "custom";
  document.querySelectorAll(".pos-cat-tab").forEach(b => {
    if (b.getAttribute("data-cat") === "custom") {
      b.classList.add("active");
      b.classList.add("btn-primary");
      b.classList.remove("btn-outline");
    } else {
      b.classList.remove("active");
      b.classList.remove("btn-primary");
      b.classList.add("btn-outline");
    }
  });

  renderPOSCatalog();

  setTimeout(() => {
    if (presetName && document.getElementById("custom-item-name")) {
      document.getElementById("custom-item-name").value = presetName;
    }
    if (presetCat && document.getElementById("custom-item-cat")) {
      document.getElementById("custom-item-cat").value = presetCat;
    }
    if (presetPrice && document.getElementById("custom-item-price")) {
      document.getElementById("custom-item-price").value = presetPrice;
    }
    if (presetWarranty && document.getElementById("custom-item-warranty")) {
      document.getElementById("custom-item-warranty").value = presetWarranty;
    }
    const nameInput = document.getElementById("custom-item-name");
    if (nameInput) nameInput.focus();
  }, 100);
};

// Preset Quick Fill helper
window.quickFillCustom = function(name, cat, price, warranty) {
  switchToCustomItemTab(name, cat, price, warranty);
  if (typeof Store !== "undefined" && Store.showToast) {
    Store.showToast(`Selected "${name}" (₹${price}) - click Add to Bill!`, "info");
  }
};

// Quick Discount Handlers
window.applyQuickDiscount = function(amount) {
  const discountInput = document.getElementById("pos-discount");
  if (discountInput) {
    discountInput.value = amount;
    updatePOSCalculations();
    Store.showToast(`Applied ₹${amount} discount!`, "success");
  }
};

window.applyQuickDiscountPercent = function(percent) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (subtotal === 0) {
    Store.showToast("Please add items to cart before applying discount!", "info");
    return;
  }
  const discountAmount = Math.round(subtotal * (percent / 100));
  const discountInput = document.getElementById("pos-discount");
  if (discountInput) {
    discountInput.value = discountAmount;
    updatePOSCalculations();
    Store.showToast(`Applied ${percent}% discount (-₹${discountAmount})!`, "success");
  }
};

function renderPOSCatalog(filterText = "") {
  const grid = document.getElementById("pos-items-grid");
  if (!grid) return;

  if (currentCategory === "mobiles") {
    grid.className = "pos-grid-items";
    const products = Store.getProducts();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(filterText) || p.brand.toLowerCase().includes(filterText)
    );

    if (filtered.length === 0) {
      grid.className = "";
      grid.innerHTML = `
        <div style="padding:3rem 1.5rem; text-align:center; background:#F8FAFC; border-radius:var(--radius-md); border:1px dashed var(--border-color);">
          <i class="fa-solid fa-mobile-screen-button" style="font-size:2.5rem; color:var(--text-muted); opacity:0.4; margin-bottom:1rem;"></i>
          <h5 style="margin-bottom:0.5rem;">No smartphone matches "${filterText}"</h5>
          <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:1.25rem;">
            Selling a model not registered in stock, or an unlisted phone? Bill it instantly as a manual item!
          </p>
          <button type="button" class="btn btn-pill btn-primary" onclick="switchToCustomItemTab('${filterText}', 'Smartphones / Mobile', '', 'Store Warranty')">
            <i class="fa-solid fa-bolt"></i> Bill "${filterText || 'Custom Phone'}" as Other Item
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const availImeis = (p.imeis || []).filter(i => i.status === "Available");
      const isOutOfStock = availImeis.length === 0;

      return `
        <div class="pos-item-card ${isOutOfStock ? 'opacity-50' : ''}" onclick="selectProductForSale('${p.id}')">
          <img src="${p.image}" class="pos-item-img" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80'">
          <h6 style="font-size:0.95rem; font-weight:800; margin-bottom:0.25rem;">${p.name}</h6>
          <small style="color:var(--text-muted); font-size:0.8rem;">${p.storage} • ${p.ram}</small>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.6rem;">
            <span style="font-weight:800; color:var(--primary); font-size:1.1rem;">${Store.formatINR(p.offerPrice)}</span>
            <span class="badge ${isOutOfStock ? 'badge-danger' : 'badge-success'}" style="font-size:0.75rem;">${availImeis.length} In Stock</span>
          </div>
        </div>
      `;
    }).join("");

  } else if (currentCategory === "accessories") {
    grid.className = "pos-grid-items";
    const accessories = Store.getAccessories();
    const filtered = accessories.filter(a =>
      a.name.toLowerCase().includes(filterText) || a.category.toLowerCase().includes(filterText)
    );

    if (filtered.length === 0) {
      grid.className = "";
      grid.innerHTML = `
        <div style="padding:3rem 1.5rem; text-align:center; background:#F8FAFC; border-radius:var(--radius-md); border:1px dashed var(--border-color);">
          <i class="fa-solid fa-headphones" style="font-size:2.5rem; color:var(--text-muted); opacity:0.4; margin-bottom:1rem;"></i>
          <h5 style="margin-bottom:0.5rem;">No catalog accessory matches "${filterText}"</h5>
          <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:1.25rem;">
            Selling Bluetooth neckbands, earbuds, tempered glass or chargers not yet in inventory? Bill on the fly!
          </p>
          <button type="button" class="btn btn-pill btn-primary" onclick="switchToCustomItemTab('${filterText}', 'Bluetooth & Audio', '', '1 Year Brand Warranty')">
            <i class="fa-solid fa-bolt"></i> Bill "${filterText || 'Custom Accessory'}" as Other Item
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(a => {
      const isOutOfStock = a.stock <= 0;
      return `
        <div class="pos-item-card ${isOutOfStock ? 'opacity-50' : ''}" onclick="selectAccessoryForSale('${a.id}')">
          <img src="${a.image}" class="pos-item-img" alt="${a.name}" onerror="this.src='https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400&q=80'">
          <h6 style="font-size:0.95rem; font-weight:800; margin-bottom:0.25rem;">${a.name}</h6>
          <small style="color:var(--text-muted); font-size:0.8rem;">${a.category}</small>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.6rem;">
            <span style="font-weight:800; color:var(--primary); font-size:1.1rem;">${Store.formatINR(a.offerPrice)}</span>
            <span class="badge ${isOutOfStock ? 'badge-danger' : 'badge-success'}" style="font-size:0.75rem;">${a.stock} Left</span>
          </div>
        </div>
      `;
    }).join("");

  } else if (currentCategory === "custom") {
    // Other / Manual Item Billing Studio
    grid.className = "";
    grid.innerHTML = `
      <div class="custom-pos-panel">
        <div class="custom-pos-banner">
          <i class="fa-solid fa-circle-plus"></i>
          <div>
            <h5 style="margin:0 0 0.25rem 0; color:#92400E; font-size:1.1rem; font-weight:800;">
              ➕ Other / Manual Item Option (Direct Bill)
            </h5>
            <p style="margin:0; font-size:0.875rem; color:#78350F; line-height:1.45;">
              Bill <strong>ANY item</strong> on the fly (Bluetooth neckband, wireless earbuds, unlisted charger, tempered glass, secondhand mobile, or repair service) without pre-existing inventory entry!
            </p>
          </div>
        </div>

        <!-- Quick 1-Click Preset Chips (Matching Image 1 Pill Style) -->
        <div style="margin-bottom:1rem;">
          <label style="font-size:0.85rem; font-weight:800; color:var(--text-main); display:block; margin-bottom:0.5rem;">
            ⚡ Quick 1-Click Popular Presets:
          </label>
          <div class="preset-chips-container">
            <span class="preset-chip" onclick="quickFillCustom('boAt Rockerz 255 Pro+ Bluetooth Neckband', 'Bluetooth & Audio', 1299, '1 Year Brand Warranty')">
              <i class="fa-solid fa-headphones"></i> boAt Bluetooth Neckband <span class="chip-price">₹1,299</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('OnePlus Bullets Wireless Z2 Bluetooth', 'Bluetooth & Audio', 1999, '1 Year Brand Warranty')">
              <i class="fa-solid fa-headphones"></i> OnePlus Bullets Z2 <span class="chip-price">₹1,999</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('Realme Buds T300 TWS Earbuds', 'Bluetooth & Audio', 2199, '1 Year Brand Warranty')">
              <i class="fa-solid fa-music"></i> Realme TWS Earbuds <span class="chip-price">₹2,199</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('65W SuperVOOC Fast Charger Adapter', 'Chargers & Cables', 899, '6 Months Warranty')">
              <i class="fa-solid fa-plug"></i> 65W Fast Charger <span class="chip-price">₹899</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('Braided Type-C Fast Charging Cable 1.5M', 'Chargers & Cables', 299, '3 Months Warranty')">
              <i class="fa-solid fa-link"></i> Type-C Fast Cable <span class="chip-price">₹299</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('11D Full Edge-to-Edge Tempered Glass', 'Screen Protectors & Covers', 199, 'Testing Guarantee')">
              <i class="fa-solid fa-shield"></i> 11D Tempered Glass <span class="chip-price">₹199</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('Premium Shockproof Smoke Case', 'Screen Protectors & Covers', 249, 'No Warranty')">
              <i class="fa-solid fa-mobile"></i> Smoke Back Case <span class="chip-price">₹249</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('Original Display Touch Combo Replacement', 'Repair & Service', 2500, '3 Months Service Warranty')">
              <i class="fa-solid fa-screwdriver-wrench"></i> Display Combo Repair <span class="chip-price">₹2,500</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('Original 5000mAh Battery Replacement', 'Repair & Service', 1200, '6 Months Warranty')">
              <i class="fa-solid fa-battery-full"></i> Battery Replacement <span class="chip-price">₹1,200</span>
            </span>
            <span class="preset-chip" onclick="quickFillCustom('Refurbished 4G/5G Android Smartphone', 'Second Hand / Refurbished', 5499, '1 Month Store Warranty')">
              <i class="fa-solid fa-mobile-screen"></i> Old/Used Phone <span class="chip-price">₹5,499</span>
            </span>
          </div>
        </div>

        <!-- Direct Custom Item Form -->
        <form id="pos-custom-item-form" onsubmit="handleCustomItemSubmit(event)">
          <div class="custom-form-grid">
            <div>
              <label class="form-label" style="font-size:0.85rem; font-weight:700;">
                Item Name / Description <span style="color:var(--danger);">*</span>
              </label>
              <input type="text" id="custom-item-name" class="form-control" placeholder="e.g. boAt Rockerz 255 Bluetooth Neckband" required style="font-size:1rem; padding:0.7rem 0.9rem;">
            </div>

            <div>
              <label class="form-label" style="font-size:0.85rem; font-weight:700;">
                Category / Dept
              </label>
              <select id="custom-item-cat" class="form-control" style="font-size:0.95rem; padding:0.7rem 0.9rem;">
                <option value="Bluetooth & Audio">Bluetooth & Audio</option>
                <option value="Chargers & Cables">Chargers & Cables</option>
                <option value="Mobile Accessories">Mobile Accessories</option>
                <option value="Screen Protectors & Covers">Screen Protectors & Covers</option>
                <option value="Repair & Service">Repair & Service</option>
                <option value="Second Hand / Refurbished">Second Hand / Used Mobile</option>
                <option value="General Retail Item">General Retail Item</option>
              </select>
            </div>

            <div>
              <label class="form-label" style="font-size:0.85rem; font-weight:700;">
                Selling Price (₹) <span style="color:var(--danger);">*</span>
              </label>
              <input type="number" id="custom-item-price" class="form-control" placeholder="e.g. 1299" min="1" required style="font-size:1.15rem; font-weight:800; color:var(--primary); padding:0.7rem 0.9rem;">
            </div>

            <div>
              <label class="form-label" style="font-size:0.85rem; font-weight:700;">
                Quantity
              </label>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <button type="button" class="qty-btn" style="width:34px; height:34px; font-size:1.1rem;" onclick="let q=document.getElementById('custom-item-qty'); q.value=Math.max(1, (parseInt(q.value)||1)-1)">−</button>
                <input type="number" id="custom-item-qty" class="form-control" value="1" min="1" style="text-align:center; font-weight:800; padding:0.65rem 0.5rem; font-size:1.05rem;">
                <button type="button" class="qty-btn" style="width:34px; height:34px; font-size:1.1rem;" onclick="let q=document.getElementById('custom-item-qty'); q.value=(parseInt(q.value)||1)+1">+</button>
              </div>
            </div>

            <div>
              <label class="form-label" style="font-size:0.85rem; font-weight:600;">
                Serial / IMEI / Model Ref (Optional)
              </label>
              <input type="text" id="custom-item-serial" class="form-control" placeholder="e.g. SN: BT-98124 or IMEI: 864..." style="font-size:0.9rem; padding:0.7rem 0.9rem;">
            </div>

            <div>
              <label class="form-label" style="font-size:0.85rem; font-weight:600;">
                Warranty / Guarantee Terms
              </label>
              <select id="custom-item-warranty" class="form-control" style="font-size:0.9rem; padding:0.7rem 0.9rem;">
                <option value="1 Year Brand Warranty">1 Year Brand Warranty</option>
                <option value="6 Months Brand Warranty">6 Months Brand Warranty</option>
                <option value="3 Months Store Warranty">3 Months Store Warranty</option>
                <option value="7 Days Replacement Guarantee">7 Days Replacement Guarantee</option>
                <option value="No Warranty (Testing Only)">No Warranty (Testing Only)</option>
              </select>
            </div>
          </div>

          <div style="display:flex; gap:0.75rem; margin-top:1.25rem; justify-content:flex-end;">
            <button type="button" class="btn btn-pill btn-outline" onclick="document.getElementById('pos-custom-item-form').reset()">
              Clear
            </button>
            <button type="submit" class="btn btn-pill btn-primary" style="padding:0.75rem 1.75rem; font-size:1rem; font-weight:800; box-shadow:var(--shadow-md);">
              <i class="fa-solid fa-plus-circle"></i> Add Item to Sale Cart
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

// Custom Item Form Submit Handler
window.handleCustomItemSubmit = function(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById("custom-item-name");
  const catInput = document.getElementById("custom-item-cat");
  const priceInput = document.getElementById("custom-item-price");
  const qtyInput = document.getElementById("custom-item-qty");
  const serialInput = document.getElementById("custom-item-serial");
  const warrantyInput = document.getElementById("custom-item-warranty");

  if (!nameInput || !priceInput) return;

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const qty = Math.max(1, parseInt(qtyInput ? qtyInput.value : 1) || 1);
  const category = catInput ? catInput.value : "General Item";
  const serial = serialInput ? serialInput.value.trim() : "";
  const warranty = warrantyInput ? warrantyInput.value : "Standard";

  if (!name) {
    Store.showToast("Please enter an item name or description!", "danger");
    nameInput.focus();
    return;
  }
  if (!price || price <= 0) {
    Store.showToast("Please enter a valid price for this item!", "danger");
    priceInput.focus();
    return;
  }

  // Add to POS cart (Supports multi-item billing: 2, 3, 4+ items)
  cart.push({
    type: "custom",
    productId: "cust_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    name: name,
    imei: serial || "CUSTOM-ITEM",
    price: price,
    qty: qty,
    category: category,
    warranty: warranty
  });

  renderCart();
  Store.showToast(`Added "${name}" (Qty: ${qty}) to cart!`, "success");

  // Reset name and price for fast multi-item billing
  nameInput.value = "";
  priceInput.value = "";
  if (serialInput) serialInput.value = "";
  if (qtyInput) qtyInput.value = "1";
  nameInput.focus();
};

// Select Mobile for Sale (Requires IMEI selection)
window.selectProductForSale = function(productId) {
  const p = Store.getProductById(productId);
  if (!p) return;

  const availImeis = (p.imeis || []).filter(i => i.status === "Available");
  if (availImeis.length === 0) {
    Store.showToast(`Selected model ${p.name} is currently out of stock!`, "danger");
    return;
  }

  showIMEIPickerModal(p, availImeis);
};

function showIMEIPickerModal(product, availImeis) {
  let modal = document.getElementById("imei-picker-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "imei-picker-modal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h4 style="margin:0;">Select IMEI for ${product.name}</h4>
        <button type="button" class="btn btn-sm btn-outline btn-close-modal" onclick="closeModal('imei-picker-modal')" style="width:32px; height:32px; padding:0; border-radius:50%; font-size:1.1rem; line-height:1; display:flex; align-items:center; justify-content:center;">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.25rem;">
          Select an available verified IMEI unit from store stock for billing and official warranty registration:
        </p>
        <div class="form-group">
          <label class="form-label">Available Units in Inventory (${availImeis.length})</label>
          <select id="modal-imei-select" class="form-control" style="padding:0.85rem; font-size:0.95rem;">
            ${availImeis.map(i => `
              <option value="${i.imei1}">${i.color} | IMEI 1: ${i.imei1} (Serial: ${i.serial || "N/A"})</option>
            `).join("")}
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-pill btn-outline" onclick="closeModal('imei-picker-modal')">Cancel</button>
        <button type="button" class="btn btn-pill btn-primary" onclick="confirmIMEISelection('${product.id}')">
          <i class="fa-solid fa-cart-plus"></i> Add Unit to Cart
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

window.confirmIMEISelection = function(productId) {
  const product = Store.getProductById(productId);
  const select = document.getElementById("modal-imei-select");
  if (!product || !select) return;

  const selectedIMEI = select.value;
  const imeiObj = (product.imeis || []).find(i => i.imei1 === selectedIMEI);

  // Check if already in cart
  const alreadyInCart = cart.find(item => item.imei === selectedIMEI);
  if (alreadyInCart) {
    Store.showToast("This exact IMEI unit is already added in the cart!", "danger");
    return;
  }

  cart.push({
    type: "mobile",
    productId: product.id,
    name: `${product.brand} ${product.name} (${imeiObj ? imeiObj.color : ""})`,
    imei: selectedIMEI,
    price: product.offerPrice,
    qty: 1,
    warranty: "1 Year Brand Warranty"
  });

  closeModal("imei-picker-modal");
  renderCart();
  Store.showToast(`Added ${product.name} (IMEI: ${selectedIMEI}) to cart!`, "success");
};

// Select Accessory for Sale
window.selectAccessoryForSale = function(accessoryId) {
  const acc = Store.getAccessories().find(a => a.id === accessoryId);
  if (!acc) return;

  if (acc.stock <= 0) {
    Store.showToast(`Selected accessory ${acc.name} is out of stock!`, "danger");
    return;
  }

  const existing = cart.find(item => item.productId === acc.id);
  if (existing) {
    if (existing.qty + 1 > acc.stock) {
      Store.showToast(`Cannot add more. Only ${acc.stock} units in stock!`, "danger");
      return;
    }
    existing.qty += 1;
  } else {
    cart.push({
      type: "accessory",
      productId: acc.id,
      name: acc.name,
      imei: acc.sku || "ACC-SKU",
      price: acc.offerPrice,
      qty: 1,
      warranty: acc.warranty || "6 Months Warranty"
    });
  }

  renderCart();
  Store.showToast(`Added ${acc.name} to cart!`, "success");
};

// Render Cart Items (Supports Multi-Item Billing: 2-3+ items)
function renderCart() {
  const container = document.getElementById("pos-cart-items-container");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <i class="fa-solid fa-cart-shopping" style="font-size:2.5rem; margin-bottom:0.75rem; opacity:0.3;"></i>
        <p style="font-size:1rem; margin-bottom:0.75rem; font-weight:600;">No items in sale cart.</p>
        <button type="button" class="btn btn-pill btn-outline btn-sm" onclick="switchToCustomItemTab()" style="border-color:#F59E0B; color:#D97706; font-weight:800;">
          <i class="fa-solid fa-circle-plus"></i> + Add Other / Manual Item (Bluetooth/Etc)
        </button>
      </div>
    `;
    updatePOSCalculations();
    return;
  }

  container.innerHTML = cart.map((item, idx) => {
    let tag = "";
    if (item.type === "mobile") {
      tag = `<span style="color:var(--text-muted); font-size:0.8rem;"><i class="fa-solid fa-barcode"></i> IMEI: ${item.imei}</span>`;
    } else if (item.type === "accessory") {
      tag = `<span style="color:var(--text-muted); font-size:0.8rem;"><i class="fa-solid fa-tag"></i> SKU: ${item.imei}</span>`;
    } else {
      tag = `
        <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap; margin-top:2px;">
          <span class="badge" style="background:#FEF3C7; color:#92400E; font-size:0.7rem; padding:1px 6px; font-weight:800;">⚡ Other</span>
          <span style="color:var(--text-muted); font-size:0.8rem;">${item.category || "Item"}</span>
          ${item.imei && item.imei !== "CUSTOM-ITEM" ? `<span style="color:var(--text-muted); font-size:0.75rem;">• Ref: ${item.imei}</span>` : ""}
          ${item.warranty ? `<span style="color:var(--text-muted); font-size:0.75rem;">• ${item.warranty}</span>` : ""}
        </div>
      `;
    }

    return `
      <div class="cart-item-row" style="padding:0.75rem 0; border-bottom:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
        <div class="cart-item-details" style="flex-grow:1; padding-right:0.5rem;">
          <h6 style="margin:0 0 0.2rem 0; font-size:0.95rem; font-weight:800;">${item.name}</h6>
          ${tag}
          <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.4rem;">
            ${item.type === "mobile" ? `
              <span class="badge badge-outline" style="font-size:0.75rem;">Qty: 1 (IMEI Locked)</span>
            ` : `
              <div style="display:flex; align-items:center; gap:0.35rem;">
                <button type="button" class="qty-btn" onclick="changeCartItemQty(${idx}, -1)" title="Decrease Quantity">−</button>
                <span style="font-weight:800; font-size:0.95rem; min-width:22px; text-align:center;">${item.qty}</span>
                <button type="button" class="qty-btn" onclick="changeCartItemQty(${idx}, 1)" title="Increase Quantity">+</button>
              </div>
            `}
            <span style="color:var(--text-muted); font-size:0.85rem; margin-left:0.35rem;">@ ${Store.formatINR(item.price)}</span>
          </div>
        </div>
        <div style="text-align:right; min-width:90px;">
          <div style="font-weight:800; font-size:1.1rem; color:var(--primary); margin-bottom:0.35rem;">
            ${Store.formatINR(item.price * item.qty)}
          </div>
          <button type="button" class="btn btn-sm btn-outline" style="color:var(--danger); border-color:rgba(239,68,68,0.3); padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="removeCartItem(${idx})" title="Remove item">
            ✕ Remove
          </button>
        </div>
      </div>
    `;
  }).join("");

  updatePOSCalculations();
}

// Adjust quantity of items inside cart
window.changeCartItemQty = function(idx, delta) {
  if (!cart[idx]) return;

  if (cart[idx].type === "mobile") {
    Store.showToast("Each phone has a unique IMEI unit. Add another unit from inventory if needed.", "info");
    return;
  }

  // Accessory stock check
  if (cart[idx].type === "accessory" && delta > 0) {
    const acc = Store.getAccessories().find(a => a.id === cart[idx].productId);
    if (acc && cart[idx].qty + delta > acc.stock) {
      Store.showToast(`Cannot add more. Only ${acc.stock} units available in stock!`, "danger");
      return;
    }
  }

  cart[idx].qty += delta;

  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }

  renderCart();
};

window.removeCartItem = function(idx) {
  cart.splice(idx, 1);
  renderCart();
};

function updatePOSCalculations() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const discountInput = document.getElementById("pos-discount");
  const discount = discountInput ? (Number(discountInput.value) || 0) : 0;

  const grandTotal = Math.max(0, subtotal - discount);
  const taxableAmount = Math.round((grandTotal / 1.18) * 100) / 100;
  const totalTax = Math.round((grandTotal - taxableAmount) * 100) / 100;
  const cgst = Math.round((totalTax / 2) * 100) / 100;
  const sgst = Math.round((totalTax / 2) * 100) / 100;

  const paidInput = document.getElementById("pos-amount-paid");
  if (paidInput && !paidInput.dataset.manual) {
    paidInput.value = grandTotal;
  }
  const amountPaid = paidInput ? (Number(paidInput.value) || 0) : grandTotal;
  const balance = Math.max(0, grandTotal - amountPaid);

  if (document.getElementById("pos-subtotal-val")) document.getElementById("pos-subtotal-val").textContent = Store.formatINR(subtotal);
  if (document.getElementById("pos-discount-disp")) document.getElementById("pos-discount-disp").textContent = discount > 0 ? `-${Store.formatINR(discount)}` : "₹0";
  if (document.getElementById("pos-taxable-val")) document.getElementById("pos-taxable-val").textContent = Store.formatINR(taxableAmount);
  if (document.getElementById("pos-cgst-val")) document.getElementById("pos-cgst-val").textContent = Store.formatINR(cgst);
  if (document.getElementById("pos-sgst-val")) document.getElementById("pos-sgst-val").textContent = Store.formatINR(sgst);
  if (document.getElementById("pos-grandtotal-val")) document.getElementById("pos-grandtotal-val").textContent = Store.formatINR(grandTotal);
  if (document.getElementById("pos-balance-val")) document.getElementById("pos-balance-val").textContent = Store.formatINR(balance);
  if (document.getElementById("pos-items-count")) document.getElementById("pos-items-count").textContent = `${totalItemsCount} units (${cart.length} items)`;
}

function populateCustomerDropdown() {
  const select = document.getElementById("pos-customer-select");
  if (!select) return;

  const customers = Store.getCustomers();
  select.innerHTML = "<option value=\"\">-- Walk-in Retail Customer --</option>" +
    customers.map(c => `<option value="${c.id}">${c.name} (${c.phone})</option>`).join("") +
    "<option value=\"new\">+ Add New Customer</option>";

  select.addEventListener("change", (e) => {
    if (e.target.value === "new") {
      openNewCustomerModal();
    }
  });
}

function openNewCustomerModal() {
  let modal = document.getElementById("pos-new-cust-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "pos-new-cust-modal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h4 style="margin:0;">Register New Customer</h4>
        <button type="button" class="btn btn-sm btn-outline btn-close-modal" onclick="closeModal('pos-new-cust-modal')" style="width:32px; height:32px; padding:0; border-radius:50%; font-size:1.1rem; line-height:1; display:flex; align-items:center; justify-content:center;">✕</button>
      </div>
      <div class="modal-body">
        <form id="pos-fast-cust-form" onsubmit="saveFastCustomer(event)">
          <div class="form-group">
            <label class="form-label">Customer Name *</label>
            <input type="text" id="fcust-name" class="form-control" required placeholder="e.g. Rahul Sharma">
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number *</label>
            <input type="tel" id="fcust-phone" class="form-control" required placeholder="e.g. +91 98765 43210">
          </div>
          <div class="form-group">
            <label class="form-label">Address / City</label>
            <input type="text" id="fcust-addr" class="form-control" placeholder="e.g. Sector 18, Noida">
          </div>
          <div class="modal-footer" style="padding-right:0; padding-left:0; padding-bottom:0;">
            <button type="button" class="btn btn-pill btn-outline" onclick="closeModal('pos-new-cust-modal')">Cancel</button>
            <button type="submit" class="btn btn-pill btn-primary">Save & Select</button>
          </div>
        </form>
      </div>
    </div>
  `;
  modal.classList.add("active");
}

window.saveFastCustomer = function(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("fcust-name").value.trim();
  const phone = document.getElementById("fcust-phone").value.trim();
  const addr = document.getElementById("fcust-addr").value.trim() || "New Delhi";

  if (!name || !phone) return;

  const newC = {
    id: "cust_" + Date.now(),
    name: name,
    phone: phone,
    email: name.toLowerCase().replace(/\\s+/g, "") + "@example.com",
    address: addr,
    totalPurchases: 0,
    pendingAmount: 0,
    lastPurchaseDate: new Date().toISOString().split("T")[0]
  };

  const customers = Store.getCustomers();
  customers.unshift(newC);
  Store.saveCustomers(customers);

  populateCustomerDropdown();
  const sel = document.getElementById("pos-customer-select");
  if (sel) sel.value = newC.id;

  closeModal("pos-new-cust-modal");
  Store.showToast(`Customer ${name} registered and selected!`, "success");
};

// Generate Bill Engine (Supports Multi-Item 2-3+ items & Discount)
window.generatePOSBill = function() {
  if (cart.length === 0) {
    Store.showToast("Please add at least one product or other item to the sale cart!", "danger");
    return;
  }

  const custSelect = document.getElementById("pos-customer-select");
  const custId = custSelect ? custSelect.value : "";
  let customer = Store.getCustomers().find(c => c.id === custId);

  if (!customer) {
    customer = {
      name: "Walk-in Retail Customer",
      phone: "+91 98111 00000",
      address: "Store Walk-in, New Delhi"
    };
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountInput = document.getElementById("pos-discount");
  const discount = discountInput ? (Number(discountInput.value) || 0) : 0;
  const grandTotal = Math.max(0, subtotal - discount);
  const taxableAmount = Math.round((grandTotal / 1.18) * 100) / 100;
  const totalTax = Math.round((grandTotal - taxableAmount) * 100) / 100;
  const cgst = Math.round((totalTax / 2) * 100) / 100;
  const sgst = Math.round((totalTax / 2) * 100) / 100;

  const paidInput = document.getElementById("pos-amount-paid");
  const amountPaid = paidInput ? (Number(paidInput.value) || 0) : grandTotal;
  const balance = Math.max(0, grandTotal - amountPaid);
  const paymentMethod = document.querySelector("input[name='payment-method']:checked")?.value || "Cash";

  const invoiceNo = Store.getNextInvoiceNumber();

  // Create invoice object with all multi-items
  const newInvoice = {
    invoiceNo: invoiceNo,
    date: new Date().toISOString().split("T")[0],
    customerName: customer.name,
    customerMobile: customer.phone,
    customerAddress: customer.address || "New Delhi, India",
    items: cart.map(i => ({
      name: i.name,
      imei: i.imei && i.imei !== "CUSTOM-ITEM" ? i.imei : (i.category || "General Retail Item"),
      qty: i.qty,
      price: i.price,
      discount: 0,
      taxable: Math.round(((i.price * i.qty) / 1.18) * 100) / 100,
      taxRate: 18,
      total: i.price * i.qty,
      warranty: i.warranty || "Standard"
    })),
    subtotal: subtotal,
    discount: discount,
    taxableAmount: taxableAmount,
    cgst: cgst,
    sgst: sgst,
    grandTotal: grandTotal,
    paymentMethod: paymentMethod,
    amountPaid: amountPaid,
    balance: balance,
    status: balance === 0 ? "Paid" : "Partial"
  };

  // 1. Mark IMEIs as Sold in products
  const products = Store.getProducts();
  cart.forEach(cartItem => {
    if (cartItem.type === "mobile") {
      const p = products.find(prod => prod.id === cartItem.productId);
      if (p && p.imeis) {
        const targetImei = p.imeis.find(im => im.imei1 === cartItem.imei);
        if (targetImei) {
          targetImei.status = "Sold";
          targetImei.soldDate = newInvoice.date;
          targetImei.invoiceNo = invoiceNo;
        }
        p.stock = Math.max(0, (p.stock || 1) - 1);
      }
    }
  });
  Store.saveProducts(products);

  // 2. Decrement Accessory Stock
  const accessories = Store.getAccessories();
  cart.forEach(cartItem => {
    if (cartItem.type === "accessory") {
      const acc = accessories.find(a => a.id === cartItem.productId);
      if (acc) {
        acc.stock = Math.max(0, acc.stock - cartItem.qty);
      }
    }
  });
  Store.saveAccessories(accessories);

  // 3. Save Invoice
  Store.addInvoice(newInvoice);

  // 4. Update Customer Ledger
  if (customer.id) {
    const customers = Store.getCustomers();
    const c = customers.find(x => x.id === customer.id);
    if (c) {
      c.totalPurchases = (c.totalPurchases || 0) + grandTotal;
      c.pendingAmount = (c.pendingAmount || 0) + balance;
      c.lastPurchaseDate = newInvoice.date;
      Store.saveCustomers(customers);
    }
  }

  // Clear Cart
  cart = [];
  renderCart();
  renderPOSCatalog();

  Store.showToast(`Tax Invoice ${invoiceNo} generated for ${newInvoice.items.length} items!`, "success");

  // Open Invoice Preview Modal
  setTimeout(() => {
    if (typeof viewInvoiceModal === "function") {
      viewInvoiceModal(invoiceNo);
    }
  }, 400);
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("active");
};
