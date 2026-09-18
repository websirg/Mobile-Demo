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
  login(email, password) {
    if (email === 'admin@websirg.in' && password === '123456') {
      const auth = {
        name: 'Shop Owner',
        email: email,
        role: 'Administrator',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('wm_auth', JSON.stringify(auth));
      return { success: true, user: auth };
    }
    return { success: false, message: 'Invalid credentials. Use admin@websirg.in / 123456' };
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
