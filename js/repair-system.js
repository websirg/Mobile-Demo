/**
 * Websirg Mobix - Repair Booking, Tracking, Job Cards & Billing Engine
 */

// Public Repair Booking
document.addEventListener('DOMContentLoaded', () => {
  const repairBookingForm = document.getElementById('repair-booking-form');
  if (repairBookingForm) {
    repairBookingForm.addEventListener('submit', handleRepairBooking);
  }

  const repairTrackForm = document.getElementById('repair-track-form');
  if (repairTrackForm) {
    repairTrackForm.addEventListener('submit', handleRepairTracking);
  }
});

function handleRepairBooking(e) {
  e.preventDefault();
  const name = document.getElementById('rep-name').value.trim();
  const phone = document.getElementById('rep-phone').value.trim();
  const brand = document.getElementById('rep-brand').value;
  const model = document.getElementById('rep-model').value.trim();
  const problem = document.getElementById('rep-problem').value;
  const details = document.getElementById('rep-details')?.value.trim() || '';

  if (!name || !phone || !brand || !model) {
    Store.showToast('Please fill in all required booking fields.', 'warning');
    return;
  }

  const count = Store.getRepairs().length + 1;
  const jobId = `WM-REP-2026-${String(count).padStart(4, '0')}`;

  const newRepair = {
    jobId: jobId,
    customer: name,
    phone: phone,
    device: `${brand} ${model}`,
    imei: 'Pending Verification',
    problem: `${problem}: ${details}`,
    deviceCondition: 'Received for diagnosis',
    accessoriesReceived: 'Device only',
    technician: 'Senior Repair Specialist',
    estimatedCost: 2500,
    advancePaid: 0,
    balanceAmount: 2500,
    status: 'Received',
    partsUsed: [],
    labourCharge: 500,
    notes: 'Booked online via Websirg Mobix customer portal.',
    dateCreated: new Date().toISOString().split('T')[0],
    dateUpdated: new Date().toISOString().split('T')[0]
  };

  Store.addRepair(newRepair);

  // Show Success Modal with Job ID
  showRepairSuccessModal(jobId, name, phone, newRepair.device);
}

function showRepairSuccessModal(jobId, name, phone, device) {
  let modal = document.getElementById('repair-success-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'repair-success-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const config = getSiteConfig();
  const cleanPhone = (config.rawWhatsapp || config.whatsapp).replace(/[^0-9]/g, '');
  const waMsg = `Hello ${config.siteName}, I have submitted a repair request for my ${device}. My Job ID is ${jobId}.`;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`;

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h4 style="color:var(--success);">✓ Repair Request Received!</h4>
        <button class="btn btn-sm btn-outline" onclick="closeModal('repair-success-modal')">✕</button>
      </div>
      <div class="modal-body" style="text-align:center; padding:2rem 1.5rem;">
        <div style="width:64px; height:64px; border-radius:50%; background:var(--success-light); color:var(--success); display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem;">
          ✓
        </div>
        <h3>Booking Confirmed</h3>
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">Your device service request has been registered in our workshop queue.</p>
        
        <div style="background:#F8FAFC; border:2px dashed var(--primary); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem;">
          <small style="color:var(--text-muted); text-transform:uppercase; font-weight:700;">Your Repair Tracking Job ID</small>
          <div style="font-size:1.75rem; font-weight:900; color:var(--primary); font-family:var(--font-heading);">${jobId}</div>
        </div>

        <p style="font-size:0.85rem; color:#475569; margin-bottom:1.5rem;">
          Save this Job ID to track live diagnostic and repair status online, or send it to our technician via WhatsApp.
        </p>

        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <a href=\"${waUrl}\" target=\"_blank\" class=\"btn btn-whatsapp\">
            <i class=\"fa-brands fa-whatsapp\"></i> Share Job ID on WhatsApp
          </a>
          <a href=\"repair-track.html?job=${jobId}\" class=\"btn btn-primary\">
            <i class=\"fa-solid fa-magnifying-glass\"></i> Track Repair Now
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// Public Repair Tracking
function handleRepairTracking(e) {
  if (e) e.preventDefault();
  const searchInput = document.getElementById('track-input');
  if (!searchInput) return;

  const query = searchInput.value.trim().toUpperCase();
  const resultsContainer = document.getElementById('track-result-container');
  if (!resultsContainer) return;

  const repairs = Store.getRepairs();
  const record = repairs.find(r => 
    r.jobId.toUpperCase() === query || (r.phone && r.phone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, '')))
  );

  if (!record) {
    resultsContainer.innerHTML = `
      <div style="text-align:center; padding:3rem; background:#FFFFFF; border-radius:var(--radius-lg); border:1px solid var(--border-color);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2.5rem; color:var(--warning); margin-bottom:1rem;"></i>
        <h4>No Job Card Found</h4>
        <p style="color:var(--text-muted);">We could not find any active repair record matching \"${query}\". Please verify your Job ID (e.g. WM-REP-2026-0001) or mobile number.</p>
      </div>
    `;
    return;
  }

  // Define 8 stages
  const stages = [
    'Received',
    'Diagnosis',
    'Waiting for Approval',
    'Waiting for Parts',
    'Repairing',
    'Quality Check',
    'Ready',
    'Delivered'
  ];

  const currentIdx = stages.indexOf(record.status);

  resultsContainer.innerHTML = `
    <div style="background:#FFFFFF; border:1px solid var(--border-color); border-radius:var(--radius-xl); padding:2rem; margin-top:2rem; box-shadow:var(--shadow-md);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; border-bottom:1px solid var(--border-color); padding-bottom:1.5rem; margin-bottom:2rem;">
        <div>
          <span class="badge badge-info" style="font-size:0.85rem; margin-bottom:0.4rem;">Job ID: ${record.jobId}</span>
          <h2>${record.device}</h2>
          <p style="color:var(--text-muted);">Customer: <strong>${record.customer}</strong> • Technician: <strong>${record.technician || 'Workshop Lead'}</strong></p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Current Status</div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--primary); font-family:var(--font-heading);">${record.status}</div>
          <small style="color:var(--text-muted);">Est. Delivery: ${record.expectedDelivery || 'Tomorrow'}</small>
        </div>
      </div>

      <!-- 8-Stage Timeline -->
      <div class="timeline-container">
        ${stages.map((stage, idx) => {
          let stateClass = '';
          if (idx < currentIdx) stateClass = 'completed';
          else if (idx === currentIdx) stateClass = 'active';

          return `
            <div class=\"timeline-step ${stateClass}\">
              <div class=\"timeline-icon\">
                ${idx < currentIdx ? '✓' : idx + 1}
              </div>
              <div style=\"flex-grow:1;\">
                <h5 style=\"font-size:1rem; margin-bottom:0.2rem;\">${stage}</h5>
                <p style=\"font-size:0.825rem; color:var(--text-muted); margin:0;\">
                  ${idx === currentIdx ? (record.notes || 'In progress at workstation') : (idx < currentIdx ? 'Step completed' : 'Pending next stage')}
                </p>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Financial Snapshot -->
      <div style="background:#F8FAFC; border-radius:var(--radius-md); padding:1.25rem; display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; text-align:center; margin-top:2rem;">
        <div>
          <small style="color:var(--text-muted); font-weight:600;">Estimated Cost</small>
          <div style="font-size:1.25rem; font-weight:800; color:var(--text-main);">${Store.formatINR(record.estimatedCost)}</div>
        </div>
        <div>
          <small style="color:var(--text-muted); font-weight:600;">Advance Paid</small>
          <div style="font-size:1.25rem; font-weight:800; color:var(--success);">${Store.formatINR(record.advancePaid)}</div>
        </div>
        <div>
          <small style="color:var(--text-muted); font-weight:600;">Balance Due</small>
          <div style="font-size:1.25rem; font-weight:800; color:var(--danger);">${Store.formatINR(record.balanceAmount)}</div>
        </div>
      </div>
    </div>
  `;
}

// Shop Job Card Modal
window.openJobCardModal = function(jobId) {
  const repair = Store.getRepairs().find(r => r.jobId === jobId);
  if (!repair) return;

  let modal = document.getElementById('shop-jobcard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'shop-jobcard-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const stages = [
    'Received', 'Diagnosis', 'Waiting for Approval', 'Waiting for Parts',
    'Repairing', 'Quality Check', 'Ready', 'Delivered', 'Cancelled'
  ];

  modal.innerHTML = `
    <div class="modal-dialog" style="max-width:700px;">
      <div class="modal-header">
        <div>
          <h4 style="margin:0;">Job Card: ${repair.jobId}</h4>
          <small style="color:var(--text-muted);">${repair.device} (${repair.customer})</small>
        </div>
        <button class="btn btn-sm btn-outline" onclick="closeModal('shop-jobcard-modal')">✕</button>
      </div>
      <div class="modal-body">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;">
          <div class="form-group">
            <label class="form-label">Service Status</label>
            <select id="job-status-select" class="form-control">
              ${stages.map(st => `<option value=\"${st}\" ${st === repair.status ? 'selected' : ''}>${st}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Assigned Technician</label>
            <input type="text" id="job-tech-input" class="form-control" value="${repair.technician || 'Rajesh Kumar'}">
          </div>
        </div>

        <div class="form-group" style="margin-bottom:1.5rem;">
          <label class="form-label">Diagnostic Notes & Update</label>
          <textarea id="job-notes-input" class="form-control" rows="2">${repair.notes || ''}</textarea>
        </div>

        <!-- Parts & Labour Table -->
        <h5 style="margin-bottom:0.75rem;">Parts Used & Labour</h5>
        <div id="job-parts-list" style="margin-bottom:1rem;">
          ${(repair.partsUsed || []).map((pt, i) => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.4rem 0; border-bottom:1px solid var(--border-light); font-size:0.875rem;">
              <span>${pt.name}</span>
              <strong>${Store.formatINR(pt.cost)}</strong>
            </div>
          `).join('')}
        </div>

        <div style="display:grid; grid-template-columns:1.5fr 1fr auto; gap:0.5rem; margin-bottom:1.5rem;">
          <input type="text" id="new-part-name" class="form-control" placeholder="Add spare part name">
          <input type="number" id="new-part-cost" class="form-control" placeholder="Cost (₹)">
          <button class="btn btn-secondary btn-sm" onclick="addPartToRepair('${repair.jobId}')">+ Add Part</button>
        </div>

        <div style="background:#F8FAFC; padding:1.25rem; border-radius:var(--radius-md); display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">Labour Charge (₹)</label>
            <input type="number" id="job-labour-input" class="form-control" value="${repair.labourCharge || 500}">
          </div>
          <div class="form-group">
            <label class="form-label">Advance Paid (₹)</label>
            <input type="number" id="job-advance-input" class="form-control" value="${repair.advancePaid || 0}">
          </div>
        </div>
      </div>
      <div class="modal-footer" style="justify-content:space-between;">
        <button class="btn btn-whatsapp" onclick="generateRepairBill('${repair.jobId}')">
          <i class="fa-solid fa-file-invoice"></i> Generate Repair Bill
        </button>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-outline" onclick="closeModal('shop-jobcard-modal')">Close</button>
          <button class="btn btn-primary" onclick="saveJobCardChanges('${repair.jobId}')">Save Changes</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
};

window.addPartToRepair = function(jobId) {
  const nameInput = document.getElementById('new-part-name');
  const costInput = document.getElementById('new-part-cost');
  if (!nameInput || !costInput || !nameInput.value || !costInput.value) {
    Store.showToast('Enter part name and cost', 'warning');
    return;
  }

  const repairs = Store.getRepairs();
  const rep = repairs.find(r => r.jobId === jobId);
  if (rep) {
    rep.partsUsed = rep.partsUsed || [];
    rep.partsUsed.push({ name: nameInput.value.trim(), cost: Number(costInput.value) || 0 });
    Store.saveRepairs(repairs);
    openJobCardModal(jobId);
    Store.showToast('Part added to repair sheet', 'success');
  }
};

window.saveJobCardChanges = function(jobId) {
  const status = document.getElementById('job-status-select').value;
  const tech = document.getElementById('job-tech-input').value;
  const notes = document.getElementById('job-notes-input').value;
  const labour = Number(document.getElementById('job-labour-input').value) || 0;
  const advance = Number(document.getElementById('job-advance-input').value) || 0;

  const repairs = Store.getRepairs();
  const rep = repairs.find(r => r.jobId === jobId);
  if (rep) {
    const partsTotal = (rep.partsUsed || []).reduce((s, p) => s + p.cost, 0);
    const totalCost = partsTotal + labour;
    const balance = Math.max(0, totalCost - advance);

    rep.status = status;
    rep.technician = tech;
    rep.notes = notes;
    rep.labourCharge = labour;
    rep.advancePaid = advance;
    rep.estimatedCost = totalCost;
    rep.balanceAmount = balance;

    Store.saveRepairs(repairs);
    closeModal('shop-jobcard-modal');
    Store.showToast(`Job Card ${jobId} updated successfully!`, 'success');
    if (typeof renderRecentRepairsTable === 'function') renderRecentRepairsTable();
    if (typeof renderRepairsPageTable === 'function') renderRepairsPageTable();
  }
};

// Generate Repair Bill
window.generateRepairBill = function(jobId) {
  const rep = Store.getRepairs().find(r => r.jobId === jobId);
  if (!rep) return;

  const partsTotal = (rep.partsUsed || []).reduce((s, p) => s + p.cost, 0);
  const totalAmount = partsTotal + (rep.labourCharge || 0);
  const balance = Math.max(0, totalAmount - (rep.advancePaid || 0));

  const items = [];
  (rep.partsUsed || []).forEach(pt => {
    items.push({
      name: `Part: ${pt.name}`,
      imei: `REP-${rep.jobId}`,
      qty: 1,
      price: pt.cost,
      discount: 0,
      taxable: Math.round((pt.cost / 1.18) * 100) / 100,
      taxRate: 18,
      total: pt.cost
    });
  });

  if (rep.labourCharge) {
    items.push({
      name: `Service / Labour: ${rep.problem}`,
      imei: `LABOUR-SVC`,
      qty: 1,
      price: rep.labourCharge,
      discount: 0,
      taxable: Math.round((rep.labourCharge / 1.18) * 100) / 100,
      taxRate: 18,
      total: rep.labourCharge
    });
  }

  const taxableAmount = Math.round((totalAmount / 1.18) * 100) / 100;
  const totalTax = Math.round((totalAmount - taxableAmount) * 100) / 100;

  const invoiceNo = `WM-REP-INV-${rep.jobId.split('-').pop()}`;

  const repairInvoice = {
    invoiceNo: invoiceNo,
    date: new Date().toISOString().split('T')[0],
    customerName: rep.customer,
    customerMobile: rep.phone,
    customerAddress: 'Repair Customer, New Delhi',
    items: items,
    subtotal: totalAmount,
    discount: 0,
    taxableAmount: taxableAmount,
    cgst: Math.round((totalTax / 2) * 100) / 100,
    sgst: Math.round((totalTax / 2) * 100) / 100,
    grandTotal: totalAmount,
    paymentMethod: 'Workshop Counter',
    amountPaid: rep.advancePaid || 0,
    balance: balance,
    status: balance === 0 ? 'Paid' : 'Partial'
  };

  Store.addInvoice(repairInvoice);
  closeModal('shop-jobcard-modal');
  Store.showToast(`Repair Bill ${invoiceNo} generated!`, 'success');

  if (typeof viewInvoiceModal === 'function') {
    viewInvoiceModal(invoiceNo);
  }
};
