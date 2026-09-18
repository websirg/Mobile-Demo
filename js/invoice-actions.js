/**
 * Websirg Mobix - Invoice Actions Engine
 * Genuinely working Print, Download PDF, Share, WhatsApp, and Modal View functionality.
 */
const InvoiceActions = {
  // 1. Print Invoice
  printInvoice() {
    window.print();
  },

  // 2. Download PDF Invoice
  downloadPDF(invoiceOrNo) {
    let inv = invoiceOrNo;
    let invNo = typeof invoiceOrNo === 'string' ? invoiceOrNo : (inv ? inv.invoiceNo : 'WM-INV-2026');
    const filename = `Websirg-Mobix-Invoice-${invNo}.pdf`;
    const element = document.getElementById('invoice-render-card');

    if (!element) {
      Store.showToast('Invoice content not found to generate PDF', 'danger');
      return;
    }

    Store.showToast('Preparing PDF download...', 'info');

    if (typeof html2pdf !== 'undefined') {
      const opt = {
        margin: [8, 8, 8, 8],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save().then(() => {
        Store.showToast(`Downloaded ${filename}`, 'success');
      }).catch(err => {
        console.error('html2pdf error:', err);
        window.print();
      });
    } else {
      window.print();
      Store.showToast('Opening print dialog to Save as PDF', 'success');
    }
  },

  // 3. Share Invoice
  shareInvoice(invoiceOrNo) {
    let inv = invoiceOrNo;
    if (typeof invoiceOrNo === 'string') {
      inv = Store.getInvoices().find(i => i.invoiceNo === invoiceOrNo);
    }
    if (!inv) {
      Store.showToast('Invoice not found', 'danger');
      return;
    }

    const config = getSiteConfig();
    const shareData = {
      title: `${config.siteName} Tax Invoice`,
      text: `Tax Invoice: ${inv.invoiceNo}\nCustomer: ${inv.customerName}\nTotal Amount: ${Store.formatINR(inv.grandTotal)}\nThank you for choosing ${config.siteName}!`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .then(() => Store.showToast('Invoice shared successfully!', 'success'))
        .catch(() => this.openShareFallbackModal(inv));
    } else {
      this.openShareFallbackModal(inv);
    }
  },

  openShareFallbackModal(inv) {
    let modal = document.getElementById('invoice-share-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'invoice-share-modal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    const config = getSiteConfig();
    const shareText = `*${config.siteName} Tax Invoice*\nInvoice No: ${inv.invoiceNo}\nDate: ${inv.date}\nCustomer: ${inv.customerName}\nTotal Amount: ${Store.formatINR(inv.grandTotal)}\nAmount Paid: ${Store.formatINR(inv.amountPaid)}\nBalance: ${Store.formatINR(inv.balance)}\n\nThank you for shopping with ${config.siteName}!\nHelpline: ${config.phone}`;

    modal.innerHTML = `
      <div class="modal-dialog" style="max-width:500px;">
        <div class="modal-header">
          <h4 style="margin:0;">Share Invoice ${inv.invoiceNo}</h4>
          <button type="button" class="btn btn-sm btn-outline" onclick="closeModal('invoice-share-modal')" style="width:32px; height:32px; padding:0; border-radius:50%;" title="Close">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Copy formatted tax invoice summary or send directly via WhatsApp:
          </p>
          <textarea id="share-copy-text" class="form-control" rows="6" readonly style="font-family:monospace; font-size:0.85rem; margin-bottom:1.25rem;">${shareText}</textarea>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <button type="button" class="btn btn-outline" onclick="InvoiceActions.copyShareText()">
              <i class="fa-regular fa-copy"></i> Copy Text
            </button>
            <button type="button" class="btn btn-whatsapp" onclick="InvoiceActions.openWhatsApp('${inv.invoiceNo}')">
              <i class="fa-brands fa-whatsapp"></i> Open WhatsApp
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline btn-sm" onclick="closeModal('invoice-share-modal')">Close</button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  copyShareText() {
    const textEl = document.getElementById('share-copy-text');
    if (textEl) {
      textEl.select();
      navigator.clipboard.writeText(textEl.value);
      Store.showToast('Invoice details copied to clipboard!', 'success');
      window.closeModal('invoice-share-modal');
    }
  },

  // 4. WhatsApp Invoice Action
  openWhatsApp(invoiceOrNo) {
    let inv = invoiceOrNo;
    if (typeof invoiceOrNo === 'string') {
      inv = Store.getInvoices().find(i => i.invoiceNo === invoiceOrNo);
    }
    if (!inv) {
      Store.showToast('Invoice not found', 'danger');
      return;
    }

    const config = getSiteConfig();
    const cleanPhone = (inv.customerMobile || config.whatsapp).replace(/[^0-9]/g, '');
    const itemsSummary = (inv.items || []).map(i => `${i.name} (Qty: ${i.qty})`).join(', ');

    const message = `Hello ${inv.customerName},
Thank you for shopping with *${config.siteName}*.

🧾 *TAX INVOICE DETAILS*
Invoice No: *${inv.invoiceNo}*
Date: ${inv.date}
Items: ${itemsSummary}
Grand Total: *${Store.formatINR(inv.grandTotal)}*
Amount Paid: ${Store.formatINR(inv.amountPaid)}
Balance Due: *${Store.formatINR(inv.balance)}*

For official warranty and customer care:
📞 ${config.phone}
📍 ${config.shortAddress}

Thank you for your business!`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  }
};

// Global Invoice Viewer Modal
window.viewInvoiceModal = function(invoiceNo) {
  const inv = Store.getInvoices().find(i => i.invoiceNo === invoiceNo);
  if (!inv) {
    Store.showToast(`Invoice ${invoiceNo} not found`, 'danger');
    return;
  }

  const config = getSiteConfig();
  const isShop = window.location.pathname.includes('/shop/');
  const logoUrl = (isShop ? '../' : '') + (config.logo || 'images/logo/logo.svg');

  let modal = document.getElementById('global-invoice-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'global-invoice-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog" style="max-width:860px; max-height:92vh;">
      <div class="modal-header">
        <div>
          <h4 style="margin:0; font-size:1.15rem;">Tax Invoice: ${inv.invoiceNo}</h4>
          <small style="color:var(--text-muted);">${inv.date} • ${inv.customerName}</small>
        </div>
        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
          <button type="button" class="btn btn-outline btn-sm" onclick="InvoiceActions.printInvoice()" title="Print A4 Tax Invoice">
            <i class="fa-solid fa-print"></i> Print
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="InvoiceActions.downloadPDF('${inv.invoiceNo}')" title="Download PDF">
            <i class="fa-solid fa-file-pdf"></i> Download PDF
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="InvoiceActions.shareInvoice('${inv.invoiceNo}')" title="Share Invoice">
            <i class="fa-solid fa-share-nodes"></i> Share
          </button>
          <button type="button" class="btn btn-whatsapp btn-sm" onclick="InvoiceActions.openWhatsApp('${inv.invoiceNo}')" title="WhatsApp Invoice">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </button>
          <button type="button" class="btn btn-sm btn-outline btn-close-modal" onclick="closeModal('global-invoice-modal')" title="Close (Esc)" style="width:32px; height:32px; padding:0; border-radius:50%; font-size:1.1rem; line-height:1; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            ✕
          </button>
        </div>
      </div>

      <div class="modal-body" style="padding:1.5rem; background:#F1F5F9; overflow-y:auto;">
        <div id="invoice-render-card" class="invoice-wrapper" style="margin:0 auto; box-shadow:none; background:#FFFFFF;">
          <!-- Invoice Header -->
          <div class="invoice-header">
            <div class="invoice-brand">
              <img src="${logoUrl}" alt="${config.siteName}" style="height:46px; margin-bottom:0.5rem;" onerror="this.src='${isShop ? '../' : ''}images/logo/logo.svg'">
              <p style="font-size:0.8rem; color:var(--text-muted); margin:0; line-height:1.4;">
                ${config.address}<br>
                Phone: ${config.phone} | Email: ${config.email}<br>
                <strong>GSTIN: ${config.gstNumber}</strong>
              </p>
            </div>
            <div class="invoice-meta">
              <div class="invoice-title">TAX INVOICE</div>
              <p style="font-size:0.875rem; margin:0; line-height:1.5;">
                Invoice No: <strong>${inv.invoiceNo}</strong><br>
                Date: <strong>${inv.date}</strong><br>
                State: <strong>Delhi (Code: 07)</strong>
              </p>
            </div>
          </div>

          <!-- Parties Details -->
          <div class="invoice-parties">
            <div class="party-box">
              <h5>Billed To (Customer Details)</h5>
              <p>
                <strong>${inv.customerName}</strong><br>
                Phone: ${inv.customerMobile}<br>
                Address: ${inv.customerAddress || 'Delhi, India'}
              </p>
            </div>
            <div class="party-box" style="text-align:right;">
              <h5>Payment Summary</h5>
              <p>
                Payment Mode: <strong>${inv.paymentMethod || 'Cash / UPI'}</strong><br>
                Payment Status: <span class="badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-warning'}">${inv.status}</span><br>
                Amount Paid: <strong>${Store.formatINR(inv.amountPaid)}</strong><br>
                Balance Due: <strong style="color:${inv.balance > 0 ? 'var(--danger)' : 'var(--success)'};">${Store.formatINR(inv.balance)}</strong>
              </p>
            </div>
          </div>

          <!-- Items Table -->
          <table class="invoice-table">
            <thead>
              <tr>
                <th style="width:5%;">#</th>
                <th style="width:40%;">Item Description</th>
                <th style="width:20%;">IMEI / Serial / SKU</th>
                <th style="width:8%; text-align:center;">Qty</th>
                <th style="width:12%; text-align:right;">Rate</th>
                <th style="width:15%; text-align:right;">Total (INR)</th>
              </tr>
            </thead>
            <tbody>
              ${(inv.items || []).map((item, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>
                    <div style="font-weight:700; color:var(--text-main);">${item.name}</div>
                    ${item.warranty ? `<div style="font-size:0.75rem; color:#64748B; margin-top:2px;"><i class="fa-solid fa-shield-halved" style="color:#059669; font-size:0.7rem;"></i> ${item.warranty}</div>` : ""}
                  </td>
                  <td><code style="font-size:0.75rem; background:#F1F5F9; padding:0.15rem 0.4rem; border-radius:4px; word-break:break-all;">${item.imei || 'N/A'}</code></td>
                  <td style="text-align:center;">${item.qty}</td>
                  <td style="text-align:right;">${Store.formatINR(item.price)}</td>
                  <td style="text-align:right;"><strong>${Store.formatINR(item.total || (item.price * item.qty))}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Breakdown -->
          <div class="invoice-breakdown">
            <div class="invoice-terms">
              <h6>Terms & Conditions:</h6>
              <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.5;">
                ${config.termsCondition.replace(/\n/g, '<br>')}
              </p>
            </div>
            <div>
              <table class="invoice-totals-table">
                <tr>
                  <td>Subtotal:</td>
                  <td style="text-align:right;"><strong>${Store.formatINR(inv.subtotal)}</strong></td>
                </tr>
                ${inv.discount ? `
                  <tr>
                    <td>Discount:</td>
                    <td style="text-align:right; color:var(--danger);">-${Store.formatINR(inv.discount)}</td>
                  </tr>
                ` : ''}
                <tr>
                  <td>Taxable Value:</td>
                  <td style="text-align:right;">${Store.formatINR(inv.taxableAmount)}</td>
                </tr>
                <tr>
                  <td>CGST (9%):</td>
                  <td style="text-align:right;">${Store.formatINR(inv.cgst)}</td>
                </tr>
                <tr>
                  <td>SGST (9%):</td>
                  <td style="text-align:right;">${Store.formatINR(inv.sgst)}</td>
                </tr>
                <tr class="grand-total">
                  <td>Grand Total:</td>
                  <td style="text-align:right; color:var(--primary);">${Store.formatINR(inv.grandTotal)}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Signatures -->
          <div class="invoice-signatures">
            <div class="sig-box">
              <div class="sig-line">Customer Signature</div>
            </div>
            <div class="sig-box">
              <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">For ${config.siteName}</div>
              <div class="sig-line">Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prominent Modal Footer with Close Button -->
      <div class="modal-footer" style="display:flex; justify-content:space-between; align-items:center;">
        <div style="font-size:0.85rem; color:var(--text-muted);">
          Press <kbd style="background:#E2E8F0; padding:0.15rem 0.4rem; border-radius:4px; font-size:0.75rem;">Esc</kbd> or click outside to close
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button type="button" class="btn btn-outline btn-sm" onclick="InvoiceActions.printInvoice()">
            <i class="fa-solid fa-print"></i> Print
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="InvoiceActions.downloadPDF('${inv.invoiceNo}')">
            <i class="fa-solid fa-download"></i> Download PDF
          </button>
          <button type="button" class="btn btn-whatsapp btn-sm" onclick="InvoiceActions.openWhatsApp('${inv.invoiceNo}')">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="closeModal('global-invoice-modal')">
            <i class="fa-solid fa-xmark"></i> Close
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
};
