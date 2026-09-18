/**
 * Websirg Mobix - Customer Site Controller & Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSearch();
  initExchangeCalculator();
  renderFeaturedProducts();
  renderBrandFilters();
});

// Mobile Hamburger Menu
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggleBtn && menu) {
    if (!menu.querySelector('.nav-item-shop-pos')) {
      const isShopSubdir = window.location.pathname.includes('/shop/');
      const posHref = isShopSubdir ? 'login.html' : 'shop/login.html';
      const posLi = document.createElement('li');
      posLi.className = 'nav-item-shop-pos';
      posLi.style.cssText = 'margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-color);';
      posLi.innerHTML = `<a href="${posHref}" class="btn btn-primary btn-sm" style="width:100%; justify-content:center; padding:0.65rem 1rem; border-radius:9999px; font-weight:800; font-size:0.9rem;"><i class="fa-solid fa-cash-register"></i> Open Shop POS & Admin</a>`;
      menu.appendChild(posLi);
    }
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        menu.classList.remove('active');
      }
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
}

// Global Search
function initSearch() {
  const searchInputs = document.querySelectorAll('.global-search-input');
  searchInputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          window.location.href = `mobiles.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  });
}

// Render Featured Smartphones on Homepage
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-phones-grid');
  if (!grid) return;

  const products = Store.getProducts().filter(p => p.featured || p.isDeal).slice(0, 8);
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      ${p.isDeal ? `<span class="product-card-badge">${p.discount}</span>` : ''}
      <div class="product-card-wish" onclick="Store.showToast('Added to wishlist!', 'success')">
        <i class="fa-regular fa-heart"></i>
      </div>
      <a href="product-details.html?id=${p.id}" class="product-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80'">
      </a>
      <div class="product-card-body">
        <span class="product-card-brand">${p.brand}</span>
        <h4 class="product-card-title">
          <a href="product-details.html?id=${p.id}">${p.name}</a>
        </h4>
        <div class="product-card-specs">
          <span class="spec-pill">${p.ram} RAM</span>
          <span class="spec-pill">${p.storage}</span>
          <span class="spec-pill">5G</span>
        </div>
        <div class="product-card-pricing">
          <span class="price-current">${Store.formatINR(p.offerPrice)}</span>
          <span class="price-original">${Store.formatINR(p.price)}</span>
        </div>
        <div class="product-card-stock">
          ${p.stock > 0 
            ? `<span class="stock-in">● In Stock (${p.stock} units available)</span>`
            : `<span class="stock-out">● Out of Stock</span>`}
        </div>
        <div class="product-card-actions">
          <a href="product-details.html?id=${p.id}" class="btn btn-outline btn-sm">View Details</a>
          <button class="btn btn-primary btn-sm" onclick="openEnquiryModal('${p.name}', '${Store.formatINR(p.offerPrice)}')">Enquire</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Brand Filter Linking
function renderBrandFilters() {
  document.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const brand = card.getAttribute('data-brand');
      if (brand) {
        window.location.href = `mobiles.html?brand=${encodeURIComponent(brand)}`;
      }
    });
  });
}

// Exchange Value Calculator
function initExchangeCalculator() {
  const brandSelect = document.getElementById('calc-brand');
  const modelInput = document.getElementById('calc-model');
  const conditionSelect = document.getElementById('calc-condition');
  const targetPhoneSelect = document.getElementById('calc-target-phone');
  const estimateDisplay = document.getElementById('calc-estimate-val');
  const diffDisplay = document.getElementById('calc-diff-val');
  const diffBox = document.getElementById('calc-diff-box');

  if (!brandSelect || !estimateDisplay) return;

  // Populate target phones dropdown
  if (targetPhoneSelect) {
    const phones = Store.getProducts();
    targetPhoneSelect.innerHTML = '<option value=\"\">-- Select Target Phone --</option>' + 
      phones.map(p => `<option value=\"${p.offerPrice}\">${p.name} - ${Store.formatINR(p.offerPrice)}</option>`).join('');
  }

  function calculate() {
    const brand = brandSelect.value;
    const condition = conditionSelect ? conditionSelect.value : 'good';
    
    if (!brand) {
      estimateDisplay.textContent = '₹0';
      if (diffBox) diffBox.style.display = 'none';
      return;
    }

    let baseVal = 10000;
    if (brand === 'Apple') baseVal = 24000;
    else if (brand === 'Samsung') baseVal = 18000;
    else if (brand === 'OnePlus') baseVal = 15000;
    else if (brand === 'Google') baseVal = 14000;
    else baseVal = 8000;

    let multiplier = 1.0;
    if (condition === 'flawless') multiplier = 1.25;
    else if (condition === 'good') multiplier = 1.0;
    else if (condition === 'average') multiplier = 0.75;
    else if (condition === 'broken') multiplier = 0.4;

    const estimatedVal = Math.round(baseVal * multiplier);
    estimateDisplay.textContent = Store.formatINR(estimatedVal);

    if (targetPhoneSelect && targetPhoneSelect.value) {
      const targetPrice = Number(targetPhoneSelect.value) || 0;
      const difference = Math.max(0, targetPrice - estimatedVal);
      if (diffDisplay && diffBox) {
        diffDisplay.textContent = Store.formatINR(difference);
        diffBox.style.display = 'block';
      }
    } else if (diffBox) {
      diffBox.style.display = 'none';
    }
  }

  brandSelect.addEventListener('change', calculate);
  if (conditionSelect) conditionSelect.addEventListener('change', calculate);
  if (targetPhoneSelect) targetPhoneSelect.addEventListener('change', calculate);
}

// Global Enquiry Modal Trigger
window.openEnquiryModal = function(productName, price) {
  const config = getSiteConfig();
  const cleanPhone = (config.rawWhatsapp || config.whatsapp).replace(/[^0-9]/g, '');
  const msg = `Hello ${config.siteName}, I am interested in purchasing ${productName} priced at ${price}. Is it available in store?`;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
};

// Interactive Hero Launch Phone Switcher
window.switchLaunchPhone = function(modelKey, btnEl) {
  document.querySelectorAll(".launch-model-pill").forEach(btn => btn.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const phoneData = {
    iphone16: {
      img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      chip: "A18 Pro • 3nm SoC",
      cam: "48MP Fusion Camera",
      batt: "All-Day Battery Life",
      price: "From ₹1,19,900"
    },
    s25ultra: {
      img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      chip: "Snapdragon 8 Elite (4.3GHz)",
      cam: "200MP Periscope OIS",
      batt: "5,000mAh • 45W Fast",
      price: "From ₹1,29,999"
    },
    oneplus13: {
      img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      chip: "Snapdragon 8 Elite 3nm",
      cam: "50MP Sony LYT-808",
      batt: "6,000mAh • 100W Flash",
      price: "From ₹69,999"
    }
  };

  const data = phoneData[modelKey];
  if (!data) return;

  const phoneImg = document.getElementById("launch-phone-img");
  const chipEl = document.getElementById("launch-spec-chip");
  const camEl = document.getElementById("launch-spec-cam");
  const battEl = document.getElementById("launch-spec-batt");
  const priceEl = document.getElementById("launch-spec-price");

  if (phoneImg) {
    phoneImg.style.opacity = "0.2";
    phoneImg.style.transform = "scale(0.92) rotateY(15deg)";
    setTimeout(() => {
      phoneImg.src = data.img;
      phoneImg.style.opacity = "1";
      phoneImg.style.transform = "";
      if (chipEl) chipEl.textContent = data.chip;
      if (camEl) camEl.textContent = data.cam;
      if (battEl) battEl.textContent = data.batt;
      if (priceEl) priceEl.textContent = data.price;
    }, 200);
  }
};
