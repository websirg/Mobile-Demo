/**
 * Websirg Mobix - LocalStorage Store & State Engine
 */
const Store = {
  // Initialization
  init() {
    if (!localStorage.getItem('wm_products')) {
      localStorage.setItem('wm_products', JSON.stringify(typeof INITIAL_PRODUCTS !== 'undefined' ? INITIAL_PRODUCTS : []));
    }
    if (!localStorage.getItem('wm_accessories')) {
      localStorage.setItem('wm_accessories', JSON.stringify(typeof INITIAL_ACCESSORIES !== 'undefined' ? INITIAL_ACCESSORIES : []));
    } else if (typeof INITIAL_ACCESSORIES !== 'undefined') {
      try {
        const cur = JSON.parse(localStorage.getItem('wm_accessories') || '[]');
        if (cur.length > 0 && cur[0].image && cur[0].image.includes('photo-1584438784894-089d6a62b8fa')) {
          localStorage.setItem('wm_accessories', JSON.stringify(INITIAL_ACCESSORIES));
        }
      } catch(e){}
    }
    if (!localStorage.getItem('wm_customers')) {
      localStorage.setItem('wm_customers', JSON.stringify(typeof INITIAL_CUSTOMERS !== 'undefined' ? INITIAL_CUSTOMERS : []));
    }
    if (!localStorage.getItem('wm_repairs')) {
      localStorage.setItem('wm_repairs', JSON.stringify(typeof INITIAL_REPAIRS !== 'undefined' ? INITIAL_REPAIRS : []));
    }
    if (!localStorage.getItem('wm_invoices')) {
      localStorage.setItem('wm_invoices', JSON.stringify(typeof INITIAL_INVOICES !== 'undefined' ? INITIAL_INVOICES : []));
    }
    if (!localStorage.getItem('wm_suppliers')) {
      localStorage.setItem('wm_suppliers', JSON.stringify(typeof INITIAL_SUPPLIERS !== 'undefined' ? INITIAL_SUPPLIERS : []));
    }
    if (!localStorage.getItem('wm_site_config')) {
      localStorage.setItem('wm_site_config', JSON.stringify(typeof DEFAULT_SITE_CONFIG !== 'undefined' ? DEFAULT_SITE_CONFIG : {}));
    }
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.renderShopInfo());
      } else {
        this.renderShopInfo();
      }
    }
  },

  // Products
  getProducts() {
    try {
      return JSON.parse(localStorage.getItem('wm_products')) || [];
    } catch(e) { return []; }
  },
  saveProducts(products) {
    localStorage.setItem('wm_products', JSON.stringify(products));
  },
  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  },

  // Accessories
  getAccessories() {
    try {
      return JSON.parse(localStorage.getItem('wm_accessories')) || [];
    } catch(e) { return []; }
  },
  saveAccessories(accessories) {
    localStorage.setItem('wm_accessories', JSON.stringify(accessories));
  },

  // Customers
  getCustomers() {
    try {
      return JSON.parse(localStorage.getItem('wm_customers')) || [];
    } catch(e) { return []; }
  },
  saveCustomers(customers) {
    localStorage.setItem('wm_customers', JSON.stringify(customers));
  },
  addCustomer(customer) {
    const list = this.getCustomers();
    if (!customer.id) customer.id = 'cust-' + String(list.length + 1).padStart(2, '0');
    list.unshift(customer);
    this.saveCustomers(list);
    return customer;
  },

  // Repairs
  getRepairs() {
    try {
      return JSON.parse(localStorage.getItem('wm_repairs')) || [];
    } catch(e) { return []; }
  },
  saveRepairs(repairs) {
    localStorage.setItem('wm_repairs', JSON.stringify(repairs));
  },
  addRepair(repair) {
    const list = this.getRepairs();
    const count = list.length + 1;
    repair.jobId = repair.jobId || `WM-REP-2026-${String(count).padStart(4, '0')}`;
    repair.dateCreated = repair.dateCreated || new Date().toISOString().split('T')[0];
    repair.dateUpdated = new Date().toISOString().split('T')[0];
    list.unshift(repair);
    this.saveRepairs(list);
    return repair;
  },
  updateRepair(jobId, updates) {
    const list = this.getRepairs();
    const idx = list.findIndex(r => r.jobId === jobId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates, dateUpdated: new Date().toISOString().split('T')[0] };
      this.saveRepairs(list);
      return list[idx];
    }
    return null;
  },

  // Invoices
  getInvoices() {
    try {
      return JSON.parse(localStorage.getItem('wm_invoices')) || [];
    } catch(e) { return []; }
  },
  saveInvoices(invoices) {
    localStorage.setItem('wm_invoices', JSON.stringify(invoices));
  },
  getNextInvoiceNumber() {
    const list = this.getInvoices();
    const nextNum = list.length + 1;
    return `WM-INV-2026-${String(nextNum).padStart(4, '0')}`;
  },
  addInvoice(invoice) {
    const list = this.getInvoices();
    invoice.invoiceNo = invoice.invoiceNo || this.getNextInvoiceNumber();
    invoice.date = invoice.date || new Date().toISOString().split('T')[0];
    list.unshift(invoice);
    this.saveInvoices(list);
    return invoice;
  },

  // Suppliers
  getSuppliers() {
    try {
      return JSON.parse(localStorage.getItem('wm_suppliers')) || [];
    } catch(e) { return []; }
  },
  saveSuppliers(suppliers) {
    localStorage.setItem('wm_suppliers', JSON.stringify(suppliers));
  },

  // Auth / Session
  getAuth() {
    try {
      return JSON.parse(localStorage.getItem('wm_auth'));
    } catch(e) { return null; }
  },
  getShop() {
    try {
      return JSON.parse(localStorage.getItem('wm_shop'));
    } catch(e) { return null; }
  },

  async login(emailOrUserId, password) {
    try {
      const apiUrl = (typeof window !== 'undefined' && window.API_BASE_URL) || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: emailOrUserId, password: password })
      });

      const res = await response.json();

      if (res.success && res.data) {
        const auth = {
          name: res.data.user.name,
          email: res.data.user.email,
          userId: res.data.user.user_id,
          role: res.data.user.role,
          token: res.data.token,
          shop: res.data.shop,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('wm_auth', JSON.stringify(auth));
        if (res.data.shop) {
          localStorage.setItem('wm_shop', JSON.stringify(res.data.shop));
          // Synchronize business name reactively across portal
          const siteConf = this.getSiteConfig ? this.getSiteConfig() : {};
          if (siteConf) {
            siteConf.siteName = res.data.shop.name;
            siteConf.shortName = res.data.shop.name;
            if (res.data.shop.address) siteConf.shortAddress = res.data.shop.address;
            if (res.data.shop.contact_phone) siteConf.phone = res.data.shop.contact_phone;
            localStorage.setItem('wm_site_config', JSON.stringify(siteConf));
          }
        }
        return { success: true, user: auth };
      } else {
        // Fallback for offline demo credentials
        if (emailOrUserId === 'admin@websirg.in' && password === '123456') {
          const auth = {
            name: 'Shop Owner',
            email: emailOrUserId,
            role: 'Administrator',
            loginTime: new Date().toISOString()
          };
          localStorage.setItem('wm_auth', JSON.stringify(auth));
          return { success: true, user: auth };
        }
        return { success: false, message: res.message || 'Invalid credentials.' };
      }
    } catch (err) {
      // Offline fallback
      if (emailOrUserId === 'admin@websirg.in' && password === '123456') {
        const auth = {
          name: 'Shop Owner',
          email: emailOrUserId,
          role: 'Administrator',
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('wm_auth', JSON.stringify(auth));
        return { success: true, user: auth };
      }
      return { success: false, message: 'Could not reach Super Admin backend at http://127.0.0.1:8000.' };
    }
  },

  renderShopInfo() {
    const auth = this.getAuth();
    const shop = this.getShop();
    if (!auth) return;

    // Sidebar user / shop identity
    const userNameEl = document.getElementById('sidebar-user-name');
    if (userNameEl) {
      userNameEl.textContent = auth.name || 'Shop Admin';
      if (auth.userId) {
        userNameEl.title = `User ID: ${auth.userId}`;
      }
    }

    const userEmailEl = document.querySelector('.shop-sidebar-user .user-info span');
    if (userEmailEl) {
      userEmailEl.textContent = (shop && shop.name) ? `${shop.name} (${shop.shop_number})` : (auth.email || 'admin@websirg.in');
    }

    const userAvatarEl = document.querySelector('.shop-sidebar-user .user-avatar');
    if (userAvatarEl && auth.name) {
      const initials = auth.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      userAvatarEl.textContent = initials || 'SA';
    }

    // Topbar brand / shop indicator
    const topbarHeading = document.querySelector('.shop-topbar h3');
    if (topbarHeading && shop) {
      topbarHeading.innerHTML = `<span style="color:#2563EB; font-weight:700;">${shop.name}</span> <span style="font-size:0.75rem; background:#EFF6FF; color:#1E40AF; border:1px solid #BFDBFE; padding:2px 8px; border-radius:12px; margin-left:8px;">${shop.shop_number}</span>`;
    }
  },
  logout() {
    localStorage.removeItem('wm_auth');
    window.location.href = window.location.pathname.includes('/shop/') ? 'login.html' : 'shop/login.html';
  },
  checkAuth() {
    const auth = this.getAuth();
    if (!auth) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  // Reset Demo Data
  resetDemoData() {
    if (confirm('Are you sure you want to reset all demo data to initial factory state? This will clear new sales, bookings and changes.')) {
      localStorage.removeItem('wm_products');
      localStorage.removeItem('wm_accessories');
      localStorage.removeItem('wm_customers');
      localStorage.removeItem('wm_repairs');
      localStorage.removeItem('wm_invoices');
      localStorage.removeItem('wm_suppliers');
      localStorage.removeItem('wm_site_config');
      this.init();
      if (typeof applySiteConfig === 'function') applySiteConfig();
      this.showToast('Demo data reset successfully to initial state!', 'success');
      setTimeout(() => window.location.reload(), 800);
    }
  },

  // Helpers
  formatINR(num) {
    const n = Number(num) || 0;
    return '₹' + n.toLocaleString('en-IN');
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('wm-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'wm-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `wm-toast show toast-${type}`;
    const icon = type === 'success' ? '✓' : (type === 'danger' ? '✕' : 'ℹ');
    toast.innerHTML = `<span style="font-size:1.1rem; font-weight:bold;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
};

// Initialize store on script load
Store.init();


// ==========================================================================
// Global Modal Controller (Available on every page)
// ==========================================================================
window.closeModal = function(idOrEl) {
  if (!idOrEl) {
    document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
    return;
  }
  let modal = null;
  if (typeof idOrEl === 'string') {
    modal = document.getElementById(idOrEl);
  } else if (idOrEl && idOrEl.closest) {
    modal = idOrEl.closest('.modal-backdrop');
  }
  if (modal) {
    modal.classList.remove('active');
  } else {
    document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
  }
};

// Global event listeners for backdrop click and Escape key
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Backdrop click outside dialog closes modal
    document.addEventListener('click', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('modal-backdrop') && e.target.classList.contains('active')) {
        e.target.classList.remove('active');
      }
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        window.closeModal();
      }
    });
  });
}
