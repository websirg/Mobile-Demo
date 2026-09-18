/**
 * Websirg Mobix - Shop Management Dashboard & Administrative Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  // Check auth if on shop page (except login.html)
  if (!window.location.pathname.endsWith('login.html')) {
    if (!Store.checkAuth()) return;
  }
  
  initSidebar();
  renderDashboardMetrics();
  renderRecentSalesTable();
  renderRecentRepairsTable();
  renderLowStockAlerts();
});

function initSidebar() {
  const navItems = document.querySelectorAll('.shop-nav-item');
  const currentPath = window.location.pathname.split('/').pop();
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
    }
  });

  // Sidebar mobile toggle
  const toggleBtn = document.getElementById('shop-sidebar-toggle');
  const sidebar = document.querySelector('.shop-sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
}

function renderDashboardMetrics() {
  const invoices = Store.getInvoices();
  const repairs = Store.getRepairs();
  const products = Store.getProducts();
  const accessories = Store.getAccessories();
  const customers = Store.getCustomers();

  // Metrics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayInvoices = invoices.filter(inv => inv.date === todayStr);
  const todaySales = invoices.reduce((acc, curr) => acc + (Number(curr.grandTotal) || 0), 0);
  const pendingRepairs = repairs.filter(r => !['Delivered', 'Cancelled'].includes(r.status)).length;
  const readyRepairs = repairs.filter(r => r.status === 'Ready').length;
  
  let lowStockCount = 0;
  products.forEach(p => { if (p.stock <= 2) lowStockCount++; });
  accessories.forEach(a => { if (a.stock <= 5) lowStockCount++; });

  // Update DOM elements if present
  const elSales = document.getElementById('metric-today-sales');
  if (elSales) elSales.textContent = Store.formatINR(todaySales);

  const elPendingRep = document.getElementById('metric-pending-repairs');
  if (elPendingRep) elPendingRep.textContent = pendingRepairs;

  const elReadyRep = document.getElementById('metric-ready-repairs');
  if (elReadyRep) elReadyRep.textContent = readyRepairs;

  const elLowStock = document.getElementById('metric-low-stock');
  if (elLowStock) elLowStock.textContent = lowStockCount;

  const elTotalCust = document.getElementById('metric-total-customers');
  if (elTotalCust) elTotalCust.textContent = customers.length;
}

function renderRecentSalesTable() {
  const tbody = document.getElementById('recent-sales-tbody');
  if (!tbody) return;

  const invoices = Store.getInvoices().slice(0, 6);
  tbody.innerHTML = invoices.map(inv => `
    <tr>
      <td><strong>${inv.invoiceNo}</strong></td>
      <td>${inv.date}</td>
      <td>${inv.customerName}</td>
      <td>${inv.items.map(i => i.name).join(', ')}</td>
      <td><strong>${Store.formatINR(inv.grandTotal)}</strong></td>
      <td><span class="badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-warning'}">${inv.status}</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="viewInvoiceModal('${inv.invoiceNo}')">View</button>
      </td>
    </tr>
  `).join('');
}

function renderRecentRepairsTable() {
  const tbody = document.getElementById('recent-repairs-tbody');
  if (!tbody) return;

  const repairs = Store.getRepairs().slice(0, 6);
  tbody.innerHTML = repairs.map(rep => {
    let badgeClass = 'badge-secondary';
    if (rep.status === 'Ready') badgeClass = 'badge-success';
    else if (rep.status === 'Repairing') badgeClass = 'badge-warning';
    else if (rep.status === 'Received') badgeClass = 'badge-info';

    return `
      <tr>
        <td><strong>${rep.jobId}</strong></td>
        <td>${rep.customer}</td>
        <td>${rep.device}</td>
        <td>${rep.problem}</td>
        <td><span class="badge ${badgeClass}">${rep.status}</span></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="openJobCardModal('${rep.jobId}')">Manage</button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderLowStockAlerts() {
  const list = document.getElementById('low-stock-list');
  if (!list) return;

  const items = [];
  Store.getProducts().forEach(p => {
    if (p.stock <= 2) items.push({ name: p.name, type: 'Smartphone', stock: p.stock, min: 3 });
  });
  Store.getAccessories().forEach(a => {
    if (a.stock <= 5) items.push({ name: a.name, type: 'Accessory', stock: a.stock, min: 10 });
  });

  list.innerHTML = items.slice(0, 5).map(item => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 0; border-bottom:1px solid var(--border-light);">
      <div>
        <h6 style="font-size:0.875rem; margin-bottom:0.15rem;">${item.name}</h6>
        <small style="color:var(--text-muted);">${item.type}</small>
      </div>
      <span class="badge badge-danger">${item.stock} left (Min: ${item.min})</span>
    </div>
  `).join('');
}
