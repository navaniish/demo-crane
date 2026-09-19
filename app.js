/* ==========================================================================
   CRANE SERVICE MANAGEMENT & GST BILLING — APPLICATION LOGIC
   ========================================================================== */

(function () {
  'use strict';

  // LocalStorage Key
  const STORAGE_KEY = 'CRANE_ERP_APP_DATA_V3';

  // Default Demo Initial State
  const defaultState = {
    cranes: [
      { id: 'CR-001', code: 'CR-001', type: 'Mobile Crane', capacity: '25 Ton', reg: 'GJ-01-AB-1234', model: 'ACE 250', year: 2022, hourly: 1500, daily: 15000, status: 'Available' },
      { id: 'CR-002', code: 'CR-002', type: 'Mobile Crane', capacity: '40 Ton', reg: 'GJ-06-XX-5678', model: 'Escorts 40T', year: 2023, hourly: 2200, daily: 22000, status: 'Working' },
      { id: 'CR-003', code: 'CR-003', type: 'Crawler Crane', capacity: '60 Ton', reg: 'GJ-12-BB-9900', model: 'Kobelco CKE600', year: 2021, hourly: 3500, daily: 35000, status: 'Available' },
      { id: 'CR-004', code: 'CR-004', type: 'Hydraulic Crane', capacity: '30 Ton', reg: 'GJ-03-CC-4321', model: 'Sany STC300', year: 2024, hourly: 1800, daily: 18000, status: 'Maintenance' }
    ],
    customers: [
      { id: 'CUST-001', name: 'Rajesh Patel', company: 'ABC Construction Pvt. Ltd.', phone: '+91 98765 43210', email: 'rajesh@abcconst.com', address: 'Plot 42, GIDC Industrial Estate, Sanand', gstin: '24AAACB1234C1Z9', state: 'Gujarat' },
      { id: 'CUST-002', name: 'Vikram Desai', company: 'Rajkot Infrastructure Ltd.', phone: '+91 98240 55667', email: 'projects@rajkotinfra.in', address: '102 Royal Complex, Kalawad Road, Rajkot', gstin: '24BBBBR5678D1Z2', state: 'Gujarat' },
      { id: 'CUST-003', name: 'Anil Sharma', company: 'Shree BuildTech & Infra', phone: '+91 99090 11223', email: 'billing@shreebuildtech.com', address: 'Sector 11, GIDC Gandhinagar', gstin: '24CCCCS9012E1Z5', state: 'Gujarat' },
      { id: 'CUST-004', name: 'Suresh Mehta', company: 'Gujarat Industrial Works', phone: '+91 94260 77889', email: 'giworks@gmail.com', address: 'Heavy Engineering Zone, Hazira, Surat', gstin: '24DDDDG3456F1Z8', state: 'Gujarat' }
    ],
    operators: [
      {
        id: 'OP-001',
        name: 'Ramesh Kumar',
        role: 'Senior Crane Operator',
        phone: '+91 98765 11223',
        craneId: 'CR-001',
        baseSalary: 28000,
        overtime: 3500,
        allowance: 2000,
        totalSalary: 33500,
        status: 'Paid',
        paymentDate: '2026-09-05',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'OP-002',
        name: 'Dinesh Parmar',
        role: 'Crawler Crane Specialist',
        phone: '+91 98240 33445',
        craneId: 'CR-003',
        baseSalary: 35000,
        overtime: 4800,
        allowance: 2500,
        totalSalary: 42300,
        status: 'Pending',
        paymentDate: '-',
        paymentMethod: '-'
      },
      {
        id: 'OP-003',
        name: 'Suresh Bharwad',
        role: 'Rigging Master',
        phone: '+91 99090 66778',
        craneId: 'CR-002',
        baseSalary: 22000,
        overtime: 2000,
        allowance: 1500,
        totalSalary: 25500,
        status: 'Paid',
        paymentDate: '2026-09-04',
        paymentMethod: 'UPI'
      }
    ],
    invoices: [
      {
        id: 'INV-2026-001',
        customerId: 'CUST-001',
        craneId: 'CR-001',
        date: '2026-09-18',
        fromLocation: 'Ahmedabad Depot',
        toLocation: 'Sanand Site B',
        description: '25T Mobile Crane rental service for steel erection',
        sacCode: '997314',
        items: [
          { description: 'Crane Rental Service (SAC 997314)', qty: 2, rate: 15000, amount: 30000 },
          { description: 'Operator Charges', qty: 2, rate: 2000, amount: 4000 }
        ],
        subtotal: 34000,
        gstRate: 18,
        isInterstate: false,
        cgst: 3060,
        sgst: 3060,
        igst: 0,
        grandTotal: 40120,
        status: 'Paid',
        paidAmount: 40120,
        paymentMethod: 'UPI'
      },
      {
        id: 'INV-2026-002',
        customerId: 'CUST-002',
        craneId: 'CR-002',
        date: '2026-09-17',
        fromLocation: 'Rajkot Yard',
        toLocation: 'Kalawad Flyover Site',
        description: '40T Mobile Crane rental service',
        sacCode: '997314',
        items: [
          { description: 'Crane Rental Service (SAC 997314)', qty: 3, rate: 22000, amount: 66000 }
        ],
        subtotal: 66000,
        gstRate: 18,
        isInterstate: false,
        cgst: 5940,
        sgst: 5940,
        igst: 0,
        grandTotal: 77880,
        status: 'Pending',
        paidAmount: 0,
        paymentMethod: '-'
      },
      {
        id: 'INV-2026-003',
        customerId: 'CUST-003',
        craneId: 'CR-003',
        date: '2026-09-15',
        fromLocation: 'Gandhinagar Depot',
        toLocation: 'Metro Line Pier 14',
        description: '60T Crawler Crane heavy lifting setup',
        sacCode: '997314',
        items: [
          { description: 'Crawler Crane Rental (SAC 997314)', qty: 4, rate: 35000, amount: 140000 }
        ],
        subtotal: 140000,
        gstRate: 18,
        isInterstate: false,
        cgst: 12600,
        sgst: 12600,
        igst: 0,
        grandTotal: 165200,
        status: 'Paid',
        paidAmount: 165200,
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'INV-2026-004',
        customerId: 'CUST-004',
        craneId: 'CR-001',
        date: '2026-09-10',
        fromLocation: 'Surat Yard',
        toLocation: 'Hazira Plant Unit 3',
        description: '25T Mobile Crane maintenance rental support',
        sacCode: '997314',
        items: [
          { description: 'Crane Rental (SAC 997314)', qty: 1, rate: 15000, amount: 15000 }
        ],
        subtotal: 15000,
        gstRate: 18,
        isInterstate: false,
        cgst: 1350,
        sgst: 1350,
        igst: 0,
        grandTotal: 17700,
        status: 'Partially Paid',
        paidAmount: 10000,
        paymentMethod: 'Cheque'
      }
    ],
    documents: [
      {
        id: 'DOC-001',
        title: 'CR-001 RTO Registration Certificate (RC)',
        category: 'RC Book',
        craneId: 'CR-001',
        expiryDate: '2028-05-20',
        fileInfo: '1.4 MB PDF',
        notes: 'Original RC Book issued by Gujarat RTO RTO Ahmedabad.'
      },
      {
        id: 'DOC-002',
        title: 'CR-001 Comprehensive Commercial Insurance',
        category: 'Insurance',
        craneId: 'CR-001',
        expiryDate: '2026-10-15',
        fileInfo: '2.1 MB PDF',
        notes: 'ICICI Lombard Commercial Heavy Vehicle Policy.'
      },
      {
        id: 'DOC-003',
        title: 'CR-002 Third Party Lifting Stability Test (Form 10)',
        category: 'Lifting Test',
        craneId: 'CR-002',
        expiryDate: '2027-01-10',
        fileInfo: '850 KB PDF',
        notes: 'Certified by Govt Approved Safety Auditor.'
      },
      {
        id: 'DOC-004',
        title: 'CR-003 Annual Fitness Certificate',
        category: 'Fitness',
        craneId: 'CR-003',
        expiryDate: '2026-08-30',
        fileInfo: '1.1 MB PDF',
        notes: 'RTO Rajkot Annual Inspection Certificate.'
      },
      {
        id: 'DOC-005',
        title: 'Operator Ramesh Driving License (Heavy Badge)',
        category: 'Operator License',
        craneId: 'CR-001',
        expiryDate: '2029-11-12',
        fileInfo: '600 KB JPG',
        notes: 'Heavy Commercial Vehicle & Crane Operator License.'
      }
    ],
    settings: {
      companyName: 'Apex Crane Services & Logistics',
      phone: '+91 98250 12345',
      email: 'billing@apexcrane.in',
      gstin: '24AAAAA0000A1Z5',
      address: 'Plot 104, GIDC Phase II, Naroda Industrial Estate, Ahmedabad, Gujarat 382330',
      state: 'Gujarat',
      stateCode: '24',
      invoicePrefix: 'INV-2026-',
      defaultGst: '18',
      terms: '1. Payment due within 15 days of invoice date.\n2. Demurrage charges applicable after initial rental period.\n3. Subject to Ahmedabad jurisdiction.',
      language: 'en'
    },
    isLoggedIn: false
  };

  // State Manager
  let appState = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isLoggedIn === undefined) {
          parsed.isLoggedIn = false;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not load stored data, using default:', e);
    }
    const state = JSON.parse(JSON.stringify(defaultState));
    state.isLoggedIn = false;
    return state;
  }

  function checkAuthState() {
    const loginScreen = document.getElementById('login-screen');
    if (!loginScreen) return;
    if (appState.isLoggedIn === false) {
      loginScreen.classList.remove('hidden');
    } else {
      loginScreen.classList.add('hidden');
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
    checkAuthState();
    renderAllViews();
  }

  // Toast Helper
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : '⚠️'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  // Currency Formatter
  function formatINR(val) {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
  }

  // Calculate Document Expiry Status
  function getDocExpiryStatus(expiryDateStr) {
    if (!expiryDateStr) return 'Valid';
    const expiry = new Date(expiryDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays <= 30) return 'Expiring Soon';
    return 'Valid';
  }

  // Number to Indian Rupees Words Converter
  function numberToWordsINR(num) {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    num = Math.floor(Number(num) || 0);
    if (num === 0) return 'Zero Rupees Only';

    function inWords(n) {
      if ((n = n.toString()).length > 9) return 'overflow';
      let n_array = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n_array) return '';
      let str = '';
      str += (n_array[1] != 0) ? (a[Number(n_array[1])] || b[n_array[1][0]] + ' ' + a[n_array[1][1]]) + 'Crore ' : '';
      str += (n_array[2] != 0) ? (a[Number(n_array[2])] || b[n_array[2][0]] + ' ' + a[n_array[2][1]]) + 'Lakh ' : '';
      str += (n_array[3] != 0) ? (a[Number(n_array[3])] || b[n_array[3][0]] + ' ' + a[n_array[3][1]]) + 'Thousand ' : '';
      str += (n_array[4] != 0) ? (a[Number(n_array[4])] || b[n_array[4][0]] + ' ' + a[n_array[4][1]]) + 'Hundred ' : '';
      str += (n_array[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n_array[5])] || b[n_array[5][0]] + ' ' + a[n_array[5][1]]) : '';
      return str;
    }

    return (inWords(num).trim() + ' Rupees Only').replace(/\s+/g, ' ');
  }

  // NAVIGATION CONTROLLER
  function initNavigation() {
    const navItems = document.querySelectorAll('[data-view]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-view');
        switchView(targetView);
        document.getElementById('sidebar').classList.remove('mobile-open');
        document.getElementById('mobile-more-overlay').classList.remove('active');
      });
    });

    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('mobile-open');
    });

    document.getElementById('mobile-more-trigger')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('mobile-more-overlay').classList.add('active');
    });

    document.getElementById('close-mobile-drawer')?.addEventListener('click', () => {
      document.getElementById('mobile-more-overlay').classList.remove('active');
    });

    const hash = window.location.hash.replace('#', '');
    if (['dashboard', 'cranes', 'customers', 'invoices', 'operators', 'payments', 'documents', 'settings'].includes(hash)) {
      switchView(hash);
    } else {
      switchView('dashboard');
    }
  }

  function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    const titleMap = {
      dashboard: 'Dashboard',
      cranes: 'Crane Fleet Management',
      customers: 'Customer Directory',
      invoices: 'GST Invoices & Tax Breakdown',
      operators: 'Operator Payroll & Salaries',
      payments: 'Payment Tracker',
      documents: 'Document Vault & Compliance',
      settings: 'Settings & Defaults'
    };
    const headerTitleEl = document.getElementById('page-title');
    if (headerTitleEl) headerTitleEl.textContent = titleMap[viewName] || 'Dashboard';

    window.location.hash = viewName;
    renderAllViews();
  }

  // RENDER ALL VIEWS
  function renderAllViews() {
    renderDashboard();
    renderCranes();
    renderCustomers();
    renderInvoices();
    renderOperators();
    renderPayments();
    renderDocuments();
    renderSettingsValues();
  }

  // 1. DASHBOARD VIEW RENDER
  function renderDashboard() {
    const totalCranes = appState.cranes.length;
    const activeCranes = appState.cranes.filter(c => c.status === 'Available' || c.status === 'Working').length;
    
    const monthInvoicesSum = appState.invoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
    const pendingPaymentsSum = appState.invoices.reduce((sum, inv) => {
      const balance = (inv.grandTotal || 0) - (inv.paidAmount || 0);
      return sum + (balance > 0 ? balance : 0);
    }, 0);

    document.getElementById('dash-total-cranes').textContent = totalCranes;
    document.getElementById('dash-active-cranes').textContent = activeCranes;
    document.getElementById('dash-month-invoices').textContent = formatINR(monthInvoicesSum);
    document.getElementById('dash-pending-payments').textContent = formatINR(pendingPaymentsSum);

    document.getElementById('sidebar-crane-count').textContent = totalCranes;

    const recentInvoices = [...appState.invoices].reverse().slice(0, 5);
    const tbody = document.getElementById('dash-recent-invoices-list');
    tbody.innerHTML = '';

    if (recentInvoices.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 2rem;">No recent invoices recorded.</td></tr>`;
      return;
    }

    recentInvoices.forEach(inv => {
      const customer = appState.customers.find(c => c.id === inv.customerId);
      const custName = customer ? (customer.company || customer.name) : 'Unknown Customer';
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${inv.id}</strong></td>
        <td>${custName}</td>
        <td>${inv.date}</td>
        <td class="text-right"><strong>${formatINR(inv.grandTotal)}</strong></td>
        <td><span class="status-badge ${inv.status.toLowerCase().replace(' ', '')}"><span class="status-dot"></span>${inv.status}</span></td>
        <td class="text-center">
          <div class="action-btn-group">
            <button class="btn btn-sm btn-outline btn-view-inv" data-id="${inv.id}">View / Print</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-view-inv').forEach(btn => {
      btn.addEventListener('click', () => openInvoicePreview(btn.getAttribute('data-id')));
    });
  }

  // 2. CRANES MODULE RENDER
  function renderCranes() {
    const grid = document.getElementById('cranes-grid');
    const emptyState = document.getElementById('cranes-empty-state');
    
    const searchVal = (document.getElementById('crane-search-input')?.value || '').toLowerCase();
    const statusVal = document.getElementById('crane-status-filter')?.value || 'ALL';

    const filtered = appState.cranes.filter(crane => {
      const matchesSearch = crane.code.toLowerCase().includes(searchVal) ||
                            crane.type.toLowerCase().includes(searchVal) ||
                            crane.capacity.toLowerCase().includes(searchVal) ||
                            crane.reg.toLowerCase().includes(searchVal);
      const matchesStatus = statusVal === 'ALL' || crane.status === statusVal;
      return matchesSearch && matchesStatus;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    filtered.forEach(crane => {
      const card = document.createElement('div');
      card.className = 'crane-card';
      card.innerHTML = `
        <div class="crane-card-header">
          <span class="crane-id">${crane.code}</span>
          <span class="status-badge ${crane.status.toLowerCase()}"><span class="status-dot"></span>${crane.status}</span>
        </div>
        <div class="crane-specs">
          <div><strong>${crane.type}</strong> • ${crane.model || 'Standard'}</div>
          <div class="crane-capacity-tag">${crane.capacity} Lifting</div>
          <div class="text-muted" style="font-size:0.82rem;">Reg: <strong>${crane.reg}</strong> (${crane.year || '2023'})</div>
        </div>
        <div class="crane-rates">
          <span>Hourly: <strong>${formatINR(crane.hourly)}</strong></span>
          <span>Daily: <strong>${formatINR(crane.daily)}</strong></span>
        </div>
        <div style="display:flex; gap:0.5rem; margin-top:0.3rem;">
          <button class="btn btn-sm btn-outline btn-edit-crane" data-id="${crane.id}" style="flex:1;">Edit</button>
          <button class="btn btn-sm btn-outline text-danger btn-delete-crane" data-id="${crane.id}">✕</button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-edit-crane').forEach(btn => {
      btn.addEventListener('click', () => editCrane(btn.getAttribute('data-id')));
    });
    grid.querySelectorAll('.btn-delete-crane').forEach(btn => {
      btn.addEventListener('click', () => deleteCrane(btn.getAttribute('data-id')));
    });
  }

  // 3. CUSTOMERS MODULE RENDER
  function renderCustomers() {
    const tbody = document.getElementById('customers-table-body');
    const emptyState = document.getElementById('customers-empty-state');
    const searchVal = (document.getElementById('customer-search-input')?.value || '').toLowerCase();

    const filtered = appState.customers.filter(cust => {
      return cust.name.toLowerCase().includes(searchVal) ||
             cust.company.toLowerCase().includes(searchVal) ||
             cust.gstin.toLowerCase().includes(searchVal) ||
             cust.phone.includes(searchVal);
    });

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      document.querySelector('#view-customers .table-card').classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    document.querySelector('#view-customers .table-card').classList.remove('hidden');
    emptyState.classList.add('hidden');

    filtered.forEach(cust => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${cust.name}</strong></td>
        <td>${cust.company}</td>
        <td>${cust.phone}</td>
        <td><code>${cust.gstin || 'N/A'}</code></td>
        <td>${cust.state}</td>
        <td class="text-center">
          <div class="action-btn-group">
            <button class="btn btn-sm btn-outline btn-edit-cust" data-id="${cust.id}">Edit</button>
            <button class="btn btn-sm btn-outline text-danger btn-delete-cust" data-id="${cust.id}">✕</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit-cust').forEach(btn => {
      btn.addEventListener('click', () => editCustomer(btn.getAttribute('data-id')));
    });
    tbody.querySelectorAll('.btn-delete-cust').forEach(btn => {
      btn.addEventListener('click', () => deleteCustomer(btn.getAttribute('data-id')));
    });
  }

  // 4. INVOICES & GST TAX BREAKDOWN RENDER
  function renderInvoices() {
    const tbody = document.getElementById('invoices-table-body');
    const emptyState = document.getElementById('invoices-empty-state');
    const searchVal = (document.getElementById('invoice-search-input')?.value || '').toLowerCase();
    const statusVal = document.getElementById('invoice-status-filter')?.value || 'ALL';

    // Calculate GST Tax Totals
    let totalTaxable = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    appState.invoices.forEach(inv => {
      totalTaxable += (inv.subtotal || 0);
      totalCGST += (inv.cgst || 0);
      totalSGST += (inv.sgst || 0);
      totalIGST += (inv.igst || 0);
    });

    document.getElementById('gst-taxable-total').textContent = formatINR(totalTaxable);
    document.getElementById('gst-cgst-total').textContent = formatINR(totalCGST);
    document.getElementById('gst-sgst-total').textContent = formatINR(totalSGST);
    document.getElementById('gst-igst-total').textContent = formatINR(totalIGST);

    const filtered = appState.invoices.filter(inv => {
      const customer = appState.customers.find(c => c.id === inv.customerId);
      const custName = customer ? (customer.company + ' ' + customer.name).toLowerCase() : '';
      const matchesSearch = inv.id.toLowerCase().includes(searchVal) || custName.includes(searchVal);
      const matchesStatus = statusVal === 'ALL' || inv.status === statusVal;
      return matchesSearch && matchesStatus;
    });

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      document.querySelector('#view-invoices .table-card').classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    document.querySelector('#view-invoices .table-card').classList.remove('hidden');
    emptyState.classList.add('hidden');

    filtered.forEach(inv => {
      const customer = appState.customers.find(c => c.id === inv.customerId);
      const custCompany = customer ? customer.company : 'N/A';
      const crane = appState.cranes.find(c => c.id === inv.craneId);
      const craneName = crane ? `${crane.code} (${crane.capacity})` : 'N/A';

      const taxAmount = (inv.cgst || 0) + (inv.sgst || 0) + (inv.igst || 0);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${inv.id}</strong></td>
        <td>${custCompany}</td>
        <td>${inv.date}</td>
        <td>${craneName}</td>
        <td class="text-right">${formatINR(inv.subtotal)}</td>
        <td class="text-right text-success">${formatINR(taxAmount)}</td>
        <td class="text-right"><strong>${formatINR(inv.grandTotal)}</strong></td>
        <td><span class="status-badge ${inv.status.toLowerCase().replace(' ', '')}"><span class="status-dot"></span>${inv.status}</span></td>
        <td class="text-center">
          <div class="action-btn-group">
            <button class="btn btn-sm btn-primary btn-view-inv" data-id="${inv.id}">View / Print</button>
            ${inv.status !== 'Paid' ? `<button class="btn btn-sm btn-outline btn-pay-inv" data-id="${inv.id}">+ Pay</button>` : ''}
            <button class="btn btn-sm btn-outline text-danger btn-delete-inv" data-id="${inv.id}">✕</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-view-inv').forEach(btn => {
      btn.addEventListener('click', () => openInvoicePreview(btn.getAttribute('data-id')));
    });
    tbody.querySelectorAll('.btn-pay-inv').forEach(btn => {
      btn.addEventListener('click', () => openRecordPaymentModal(btn.getAttribute('data-id')));
    });
    tbody.querySelectorAll('.btn-delete-inv').forEach(btn => {
      btn.addEventListener('click', () => deleteInvoice(btn.getAttribute('data-id')));
    });
  }

  // 5. OPERATOR PAYROLL RENDER
  function renderOperators() {
    const tbody = document.getElementById('operators-table-body');
    const emptyState = document.getElementById('operators-empty-state');
    const searchVal = (document.getElementById('op-search-input')?.value || '').toLowerCase();

    appState.operators = appState.operators || [];

    // Calculate Summary Stats
    const totalCount = appState.operators.length;
    let totalPayroll = 0;
    let pendingPayroll = 0;

    appState.operators.forEach(op => {
      const payable = (op.baseSalary || 0) + (op.overtime || 0) + (op.allowance || 0);
      op.totalSalary = payable;
      totalPayroll += payable;
      if (op.status === 'Pending') pendingPayroll += payable;
    });

    document.getElementById('op-total-count').textContent = totalCount;
    document.getElementById('op-total-payroll').textContent = formatINR(totalPayroll);
    document.getElementById('op-pending-payroll').textContent = formatINR(pendingPayroll);

    const filtered = appState.operators.filter(op => {
      return op.name.toLowerCase().includes(searchVal) ||
             op.role.toLowerCase().includes(searchVal) ||
             op.phone.includes(searchVal);
    });

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      document.querySelector('#view-operators .table-card').classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    document.querySelector('#view-operators .table-card').classList.remove('hidden');
    emptyState.classList.add('hidden');

    filtered.forEach(op => {
      const crane = appState.cranes.find(c => c.id === op.craneId);
      const craneTag = crane ? `${crane.code} (${crane.type})` : 'Floating / Unassigned';
      const overtimeAllow = (op.overtime || 0) + (op.allowance || 0);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <strong>${op.name}</strong>
          <div class="text-muted" style="font-size:0.8rem;">Phone: ${op.phone}</div>
        </td>
        <td>${op.role}</td>
        <td>${craneTag}</td>
        <td class="text-right">${formatINR(op.baseSalary)}</td>
        <td class="text-right text-muted">+${formatINR(overtimeAllow)}</td>
        <td class="text-right"><strong>${formatINR(op.totalSalary)}</strong></td>
        <td><span class="status-badge ${op.status.toLowerCase()}"><span class="status-dot"></span>${op.status}</span></td>
        <td class="text-center">
          <div class="action-btn-group">
            ${op.status !== 'Paid' ? `<button class="btn btn-sm btn-primary btn-pay-op" data-id="${op.id}">Pay Salary</button>` : '<span class="text-success" style="font-weight:600;">✓ Settled</span>'}
            <button class="btn btn-sm btn-outline btn-edit-op" data-id="${op.id}">Edit</button>
            <button class="btn btn-sm btn-outline text-danger btn-delete-op" data-id="${op.id}">✕</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-pay-op').forEach(btn => {
      btn.addEventListener('click', () => payOperatorSalary(btn.getAttribute('data-id')));
    });
    tbody.querySelectorAll('.btn-edit-op').forEach(btn => {
      btn.addEventListener('click', () => editOperator(btn.getAttribute('data-id')));
    });
    tbody.querySelectorAll('.btn-delete-op').forEach(btn => {
      btn.addEventListener('click', () => deleteOperator(btn.getAttribute('data-id')));
    });
  }

  // 6. PAYMENTS MODULE RENDER
  function renderPayments() {
    const tbody = document.getElementById('payments-table-body');
    const activeTab = document.querySelector('#view-payments .tab-filters .tab-btn.active')?.getAttribute('data-pay-filter') || 'ALL';

    const filtered = appState.invoices.filter(inv => {
      if (activeTab === 'ALL') return true;
      return inv.status === activeTab;
    });

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding: 2rem;">No matching payment records found.</td></tr>`;
      return;
    }

    filtered.forEach(inv => {
      const customer = appState.customers.find(c => c.id === inv.customerId);
      const custCompany = customer ? customer.company : 'N/A';
      const balance = (inv.grandTotal || 0) - (inv.paidAmount || 0);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${inv.id}</strong></td>
        <td>${custCompany}</td>
        <td class="text-right"><strong>${formatINR(inv.grandTotal)}</strong></td>
        <td class="text-right text-success">${formatINR(inv.paidAmount || 0)}</td>
        <td class="text-right ${balance > 0 ? 'text-danger' : ''}"><strong>${formatINR(balance > 0 ? balance : 0)}</strong></td>
        <td><span class="status-badge ${inv.status.toLowerCase().replace(' ', '')}"><span class="status-dot"></span>${inv.status}</span></td>
        <td>${inv.paymentMethod || 'Pending'}</td>
        <td class="text-center">
          <div class="action-btn-group">
            ${inv.status !== 'Paid' ? `<button class="btn btn-sm btn-primary btn-record-pay-now" data-id="${inv.id}">Record Payment</button>` : '<span class="text-success" style="font-weight:600;">✓ Settled</span>'}
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-record-pay-now').forEach(btn => {
      btn.addEventListener('click', () => openRecordPaymentModal(btn.getAttribute('data-id')));
    });
  }

  // 7. DOCUMENT VAULT MODULE RENDER
  function renderDocuments() {
    const grid = document.getElementById('documents-grid');
    const emptyState = document.getElementById('documents-empty-state');

    const activeCat = document.querySelector('#view-documents .tab-filters .tab-btn.active')?.getAttribute('data-doc-cat') || 'ALL';
    const searchVal = (document.getElementById('doc-search-input')?.value || '').toLowerCase();
    const craneFilter = document.getElementById('doc-crane-filter')?.value || 'ALL';

    const docCraneSelectFilter = document.getElementById('doc-crane-filter');
    if (docCraneSelectFilter) {
      docCraneSelectFilter.innerHTML = '<option value="ALL">All Cranes</option>';
      appState.cranes.forEach(c => {
        docCraneSelectFilter.innerHTML += `<option value="${c.id}" ${c.id === craneFilter ? 'selected' : ''}>${c.code} (${c.type})</option>`;
      });
    }

    let expiringCount = 0;
    appState.documents.forEach(d => {
      const st = getDocExpiryStatus(d.expiryDate);
      if (st === 'Expired' || st === 'Expiring Soon') expiringCount++;
    });

    const sidebarAlertBadge = document.getElementById('sidebar-doc-alert-count');
    const docAlertBanner = document.getElementById('doc-alert-banner');

    if (expiringCount > 0) {
      if (sidebarAlertBadge) sidebarAlertBadge.classList.remove('hidden');
      if (docAlertBanner) {
        docAlertBanner.classList.remove('hidden');
        document.getElementById('doc-alert-message').textContent = `Attention: You have ${expiringCount} certificate(s) expiring within 30 days or expired. Please update compliance records.`;
      }
    } else {
      if (sidebarAlertBadge) sidebarAlertBadge.classList.add('hidden');
      if (docAlertBanner) docAlertBanner.classList.add('hidden');
    }

    const filtered = appState.documents.filter(doc => {
      const crane = appState.cranes.find(c => c.id === doc.craneId);
      const craneCode = crane ? crane.code.toLowerCase() : '';

      const matchesSearch = doc.title.toLowerCase().includes(searchVal) ||
                            doc.category.toLowerCase().includes(searchVal) ||
                            craneCode.includes(searchVal);
      const matchesCat = activeCat === 'ALL' || doc.category === activeCat;
      const matchesCrane = craneFilter === 'ALL' || doc.craneId === craneFilter;

      return matchesSearch && matchesCat && matchesCrane;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    filtered.forEach(doc => {
      const crane = appState.cranes.find(c => c.id === doc.craneId);
      const craneTag = crane ? `${crane.code} (${crane.capacity})` : 'General / Fleet Wide';
      const status = getDocExpiryStatus(doc.expiryDate);
      const statusClass = status.toLowerCase().replace(' ', '');

      const card = document.createElement('div');
      card.className = 'doc-card';
      card.innerHTML = `
        <div>
          <div class="doc-card-header">
            <div class="doc-type-icon">📜</div>
            <div class="doc-card-header-info">
              <h4 class="doc-card-title">${doc.title}</h4>
              <span class="category-badge">${doc.category}</span>
            </div>
          </div>
          <div class="doc-card-meta">
            <div class="doc-crane-row">
              <span class="text-muted">Assigned Crane:</span>
              <strong>${craneTag}</strong>
            </div>
            <div class="doc-expiry-row">
              <div class="expiry-date-box">
                <span class="text-muted">Expires:</span>
                <strong>${doc.expiryDate}</strong>
              </div>
              <span class="status-badge ${statusClass}"><span class="status-dot"></span>${status}</span>
            </div>
          </div>
        </div>
        <div class="doc-card-actions">
          <button class="btn btn-sm btn-primary btn-view-doc" data-id="${doc.id}">View Vault</button>
          <button class="btn btn-sm btn-outline btn-edit-doc" data-id="${doc.id}">Edit</button>
          <button class="btn btn-sm btn-outline text-danger btn-delete-doc" data-id="${doc.id}">✕</button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-view-doc').forEach(btn => {
      btn.addEventListener('click', () => openViewDocumentModal(btn.getAttribute('data-id')));
    });
    grid.querySelectorAll('.btn-edit-doc').forEach(btn => {
      btn.addEventListener('click', () => editDocument(btn.getAttribute('data-id')));
    });
    grid.querySelectorAll('.btn-delete-doc').forEach(btn => {
      btn.addEventListener('click', () => deleteDocument(btn.getAttribute('data-id')));
    });
  }

  // 8. SETTINGS VIEW VALUES
  function renderSettingsValues() {
    const set = appState.settings || defaultState.settings;
    document.getElementById('sidebar-company-name').textContent = set.companyName;

    const setCompName = document.getElementById('set-comp-name');
    if (setCompName) setCompName.value = set.companyName;
    const setCompPhone = document.getElementById('set-comp-phone');
    if (setCompPhone) setCompPhone.value = set.phone;
    const setCompEmail = document.getElementById('set-comp-email');
    if (setCompEmail) setCompEmail.value = set.email;
    const setCompGstin = document.getElementById('set-comp-gstin');
    if (setCompGstin) setCompGstin.value = set.gstin;
    const setCompAddr = document.getElementById('set-comp-address');
    if (setCompAddr) setCompAddr.value = set.address;
    const setCompState = document.getElementById('set-comp-state');
    if (setCompState) setCompState.value = set.state;
    const setCompCode = document.getElementById('set-comp-state-code');
    if (setCompCode) setCompCode.value = set.stateCode;

    const setInvPrefix = document.getElementById('set-inv-prefix');
    if (setInvPrefix) setInvPrefix.value = set.invoicePrefix;
    const setInvGst = document.getElementById('set-inv-gst');
    if (setInvGst) setInvGst.value = set.defaultGst;
    const setInvTerms = document.getElementById('set-inv-terms');
    if (setInvTerms) setInvTerms.value = set.terms;
    const setAppLang = document.getElementById('set-app-language');
    if (setAppLang) setAppLang.value = set.language || 'en';
  }

  // MODALS & ACTIONS HANDLERS

  // --- OPERATOR MODAL ---
  function openAddOperatorModal(opObj = null) {
    const modal = document.getElementById('modal-add-operator');
    const form = document.getElementById('form-add-operator');
    form.reset();

    const craneSelect = document.getElementById('op-crane-select');
    craneSelect.innerHTML = '<option value="">-- Fleet Floating / Unassigned --</option>';
    appState.cranes.forEach(c => {
      craneSelect.innerHTML += `<option value="${c.id}">${c.code} (${c.capacity} - ${c.type})</option>`;
    });

    if (opObj) {
      document.getElementById('op-modal-title').textContent = 'Edit Operator Record';
      document.getElementById('op-form-id').value = opObj.id;
      document.getElementById('op-name').value = opObj.name;
      document.getElementById('op-role').value = opObj.role;
      document.getElementById('op-phone').value = opObj.phone;
      document.getElementById('op-crane-select').value = opObj.craneId || '';
      document.getElementById('op-base-salary').value = opObj.baseSalary;
      document.getElementById('op-overtime').value = opObj.overtime || 0;
      document.getElementById('op-allowance').value = opObj.allowance || 0;
      document.getElementById('op-status').value = opObj.status || 'Pending';
    } else {
      document.getElementById('op-modal-title').textContent = 'Add New Operator / Staff';
      document.getElementById('op-form-id').value = '';
    }

    modal.classList.remove('hidden');
  }

  function closeAddOperatorModal() {
    document.getElementById('modal-add-operator').classList.add('hidden');
  }

  function editOperator(id) {
    const op = appState.operators.find(o => o.id === id);
    if (op) openAddOperatorModal(op);
  }

  function deleteOperator(id) {
    if (confirm('Are you sure you want to delete this operator record?')) {
      appState.operators = appState.operators.filter(o => o.id !== id);
      saveState();
      showToast('Operator removed.', 'danger');
    }
  }

  function payOperatorSalary(id) {
    const op = appState.operators.find(o => o.id === id);
    if (op) {
      op.status = 'Paid';
      op.paymentDate = new Date().toISOString().split('T')[0];
      op.paymentMethod = 'Bank Transfer';
      saveState();
      showToast(`Salary voucher of ${formatINR(op.totalSalary)} settled for ${op.name}!`);
    }
  }

  // --- GST REPORT EXPORTER ---
  function exportGSTR1Report() {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Invoice Number,Invoice Date,Customer Company,Customer GSTIN,SAC Code,Taxable Value,CGST (9%),SGST (9%),IGST (18%),Grand Total,Status\n';

    appState.invoices.forEach(inv => {
      const cust = appState.customers.find(c => c.id === inv.customerId) || {};
      const line = `"${inv.id}","${inv.date}","${cust.company || ''}","${cust.gstin || ''}","997314",${inv.subtotal || 0},${inv.cgst || 0},${inv.sgst || 0},${inv.igst || 0},${inv.grandTotal || 0},"${inv.status}"\n`;
      csvContent += line;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GSTR1_Crane_Services_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('GSTR-1 Tax Report CSV Downloaded!');
  }

  // --- CRANE MODAL ---
  function openAddCraneModal(craneObj = null) {
    const modal = document.getElementById('modal-add-crane');
    const form = document.getElementById('form-add-crane');
    form.reset();

    if (craneObj) {
      document.getElementById('crane-modal-title').textContent = 'Edit Crane';
      document.getElementById('crane-form-id').value = craneObj.id;
      document.getElementById('crane-code').value = craneObj.code;
      document.getElementById('crane-type').value = craneObj.type;
      document.getElementById('crane-capacity').value = craneObj.capacity;
      document.getElementById('crane-reg').value = craneObj.reg;
      document.getElementById('crane-model').value = craneObj.model || '';
      document.getElementById('crane-year').value = craneObj.year || 2023;
      document.getElementById('crane-hourly').value = craneObj.hourly || '';
      document.getElementById('crane-daily').value = craneObj.daily || '';
      document.getElementById('crane-status').value = craneObj.status;
    } else {
      document.getElementById('crane-modal-title').textContent = 'Add New Crane';
      document.getElementById('crane-form-id').value = '';
      const nextCode = 'CR-00' + (appState.cranes.length + 1);
      document.getElementById('crane-code').value = nextCode;
    }

    modal.classList.remove('hidden');
  }

  function closeAddCraneModal() {
    document.getElementById('modal-add-crane').classList.add('hidden');
  }

  function editCrane(id) {
    const crane = appState.cranes.find(c => c.id === id);
    if (crane) openAddCraneModal(crane);
  }

  function deleteCrane(id) {
    if (confirm('Are you sure you want to delete this crane?')) {
      appState.cranes = appState.cranes.filter(c => c.id !== id);
      saveState();
      showToast('Crane removed successfully.', 'danger');
    }
  }

  // --- CUSTOMER MODAL ---
  function openAddCustomerModal(custObj = null) {
    const modal = document.getElementById('modal-add-customer');
    const form = document.getElementById('form-add-customer');
    form.reset();

    if (custObj) {
      document.getElementById('customer-modal-title').textContent = 'Edit Customer';
      document.getElementById('cust-form-id').value = custObj.id;
      document.getElementById('cust-name').value = custObj.name;
      document.getElementById('cust-company').value = custObj.company;
      document.getElementById('cust-phone').value = custObj.phone;
      document.getElementById('cust-email').value = custObj.email || '';
      document.getElementById('cust-address').value = custObj.address || '';
      document.getElementById('cust-gstin').value = custObj.gstin || '';
      document.getElementById('cust-state').value = custObj.state || 'Gujarat';
    } else {
      document.getElementById('customer-modal-title').textContent = 'Add New Customer';
      document.getElementById('cust-form-id').value = '';
    }

    modal.classList.remove('hidden');
  }

  function closeAddCustomerModal() {
    document.getElementById('modal-add-customer').classList.add('hidden');
  }

  function editCustomer(id) {
    const cust = appState.customers.find(c => c.id === id);
    if (cust) openAddCustomerModal(cust);
  }

  function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
      appState.customers = appState.customers.filter(c => c.id !== id);
      saveState();
      showToast('Customer deleted.', 'danger');
    }
  }

  // --- CREATE INVOICE MODAL ---
  function openCreateInvoiceModal() {
    const modal = document.getElementById('modal-create-invoice');
    const form = document.getElementById('form-create-invoice');
    form.reset();

    const custSelect = document.getElementById('inv-select-customer');
    custSelect.innerHTML = '<option value="">-- Select Customer --</option>';
    appState.customers.forEach(c => {
      custSelect.innerHTML += `<option value="${c.id}">${c.company} (${c.name})</option>`;
    });

    const craneSelect = document.getElementById('inv-select-crane');
    craneSelect.innerHTML = '<option value="">-- Select Crane --</option>';
    appState.cranes.forEach(c => {
      craneSelect.innerHTML += `<option value="${c.id}">${c.code} — ${c.type} (${c.capacity})</option>`;
    });

    document.getElementById('inv-service-date').value = new Date().toISOString().split('T')[0];

    const itemsBody = document.getElementById('invoice-items-body');
    itemsBody.innerHTML = '';
    addLineItemRow('Crane Rental Service (SAC 997314)', 2, 15000);
    addLineItemRow('Operator Charges', 2, 2000);

    recalculateInvoiceTax();
    modal.classList.remove('hidden');
  }

  function closeCreateInvoiceModal() {
    document.getElementById('modal-create-invoice').classList.add('hidden');
  }

  function addLineItemRow(desc = '', qty = 1, rate = 0) {
    const tbody = document.getElementById('invoice-items-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="input-control item-desc" placeholder="Service description..." value="${desc}" required></td>
      <td><input type="number" class="input-control item-qty" value="${qty}" min="1" step="1" style="text-align:center;" required></td>
      <td><input type="number" class="input-control item-rate" value="${rate}" step="100" style="text-align:right;" required></td>
      <td style="text-align:right;"><strong class="item-amount">${formatINR(qty * rate)}</strong></td>
      <td><button type="button" class="icon-btn text-danger btn-remove-item">✕</button></td>
    `;
    tbody.appendChild(tr);

    const qtyInput = tr.querySelector('.item-qty');
    const rateInput = tr.querySelector('.item-rate');
    const removeBtn = tr.querySelector('.btn-remove-item');

    [qtyInput, rateInput].forEach(inp => {
      inp.addEventListener('input', () => {
        const q = parseFloat(qtyInput.value) || 0;
        const r = parseFloat(rateInput.value) || 0;
        tr.querySelector('.item-amount').textContent = formatINR(q * r);
        recalculateInvoiceTax();
      });
    });

    removeBtn.addEventListener('click', () => {
      if (tbody.querySelectorAll('tr').length > 1) {
        tr.remove();
        recalculateInvoiceTax();
      }
    });

    recalculateInvoiceTax();
  }

  function recalculateInvoiceTax() {
    const rows = document.querySelectorAll('#invoice-items-body tr');
    let subtotal = 0;

    rows.forEach(tr => {
      const q = parseFloat(tr.querySelector('.item-qty')?.value) || 0;
      const r = parseFloat(tr.querySelector('.item-rate')?.value) || 0;
      subtotal += (q * r);
    });

    const gstRate = parseFloat(document.getElementById('inv-gst-rate')?.value || 18);
    const isInterstate = document.getElementById('inv-is-interstate')?.checked || false;

    let cgst = 0, sgst = 0, igst = 0;
    if (isInterstate) {
      igst = subtotal * (gstRate / 100);
      document.getElementById('row-cgst').classList.add('hidden');
      document.getElementById('row-sgst').classList.add('hidden');
      document.getElementById('row-igst').classList.remove('hidden');
    } else {
      cgst = subtotal * (gstRate / 200);
      sgst = subtotal * (gstRate / 200);
      document.getElementById('row-cgst').classList.remove('hidden');
      document.getElementById('row-sgst').classList.remove('hidden');
      document.getElementById('row-igst').classList.add('hidden');
    }

    const grandTotal = subtotal + cgst + sgst + igst;

    document.getElementById('calc-subtotal').textContent = formatINR(subtotal);
    document.getElementById('calc-cgst').textContent = formatINR(cgst);
    document.getElementById('calc-sgst').textContent = formatINR(sgst);
    document.getElementById('calc-igst').textContent = formatINR(igst);
    document.getElementById('calc-grand-total').textContent = formatINR(grandTotal);
  }

  // --- DOCUMENT MODALS ---
  function openAddDocumentModal(docObj = null) {
    const modal = document.getElementById('modal-add-document');
    const form = document.getElementById('form-add-document');
    form.reset();

    const craneSelect = document.getElementById('doc-crane-select');
    craneSelect.innerHTML = '<option value="">-- General / Unassigned --</option>';
    appState.cranes.forEach(c => {
      craneSelect.innerHTML += `<option value="${c.id}">${c.code} (${c.capacity} - ${c.type})</option>`;
    });

    if (docObj) {
      document.getElementById('doc-modal-title').textContent = 'Edit Document';
      document.getElementById('doc-form-id').value = docObj.id;
      document.getElementById('doc-title').value = docObj.title;
      document.getElementById('doc-category').value = docObj.category;
      document.getElementById('doc-crane-select').value = docObj.craneId || '';
      document.getElementById('doc-expiry-date').value = docObj.expiryDate;
      document.getElementById('doc-file-info').value = docObj.fileInfo || '1.2 MB PDF';
      document.getElementById('doc-notes').value = docObj.notes || '';
    } else {
      document.getElementById('doc-modal-title').textContent = 'Upload Compliance Document';
      document.getElementById('doc-form-id').value = '';
      document.getElementById('doc-expiry-date').value = new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0];
    }

    modal.classList.remove('hidden');
  }

  function closeAddDocumentModal() {
    document.getElementById('modal-add-document').classList.add('hidden');
  }

  function editDocument(id) {
    const doc = appState.documents.find(d => d.id === id);
    if (doc) openAddDocumentModal(doc);
  }

  function deleteDocument(id) {
    if (confirm('Are you sure you want to delete this document from the vault?')) {
      appState.documents = appState.documents.filter(d => d.id !== id);
      saveState();
      showToast('Document deleted from vault.', 'danger');
    }
  }

  function openViewDocumentModal(docId) {
    const doc = appState.documents.find(d => d.id === docId);
    if (!doc) return;

    const crane = appState.cranes.find(c => c.id === doc.craneId);
    const craneTag = crane ? `${crane.code} (${crane.capacity} - ${crane.type})` : 'General Fleet';
    const status = getDocExpiryStatus(doc.expiryDate);
    const statusClass = status.toLowerCase().replace(' ', '');

    document.getElementById('v-doc-name').textContent = doc.title;
    document.getElementById('v-doc-cat').textContent = doc.category;
    document.getElementById('v-doc-status').className = `status-badge ${statusClass}`;
    document.getElementById('v-doc-status').innerHTML = `<span class="status-dot"></span>${status}`;
    document.getElementById('v-doc-crane').textContent = craneTag;
    document.getElementById('v-doc-expiry').textContent = doc.expiryDate;
    document.getElementById('v-doc-size').textContent = doc.fileInfo || '1.2 MB PDF';
    document.getElementById('v-doc-notes').textContent = doc.notes || 'No extra notes provided.';

    document.getElementById('modal-view-document').classList.remove('hidden');
  }

  function closeViewDocumentModal() {
    document.getElementById('modal-view-document').classList.add('hidden');
  }

  // --- RECORD PAYMENT MODAL ---
  function openRecordPaymentModal(invoiceId) {
    const inv = appState.invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const customer = appState.customers.find(c => c.id === inv.customerId);
    const dueAmount = (inv.grandTotal || 0) - (inv.paidAmount || 0);

    document.getElementById('pay-inv-id').value = inv.id;
    document.getElementById('pay-summary-inv-no').textContent = inv.id;
    document.getElementById('pay-summary-cust').textContent = customer ? customer.company : 'Customer';
    document.getElementById('pay-summary-total').textContent = formatINR(inv.grandTotal);
    document.getElementById('pay-summary-due').textContent = 'Due: ' + formatINR(dueAmount);

    document.getElementById('pay-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('pay-amount').value = dueAmount > 0 ? dueAmount : 0;

    document.getElementById('modal-record-payment').classList.remove('hidden');
  }

  function closeRecordPaymentModal() {
    document.getElementById('modal-record-payment').classList.add('hidden');
  }

  // --- PRINT PREVIEW MODAL ---
  function openInvoicePreview(invoiceId) {
    const inv = appState.invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const customer = appState.customers.find(c => c.id === inv.customerId) || {};
    const crane = appState.cranes.find(c => c.id === inv.craneId) || {};
    const company = appState.settings || defaultState.settings;

    document.getElementById('p-comp-name').textContent = company.companyName || 'APEX CRANE SERVICES';
    document.getElementById('p-comp-address').textContent = company.address;
    document.getElementById('p-comp-phone').textContent = company.phone;
    document.getElementById('p-comp-email').textContent = company.email;
    document.getElementById('p-comp-gstin').textContent = company.gstin;

    document.getElementById('p-cust-company').textContent = customer.company || 'Customer Company';
    document.getElementById('p-cust-name').textContent = 'Attn: ' + (customer.name || '-');
    document.getElementById('p-cust-address').textContent = customer.address || '-';
    document.getElementById('p-cust-gstin').textContent = customer.gstin || 'N/A';
    document.getElementById('p-cust-phone').textContent = customer.phone || '-';

    document.getElementById('p-inv-number').textContent = inv.id;
    document.getElementById('p-inv-date').textContent = inv.date;
    document.getElementById('p-inv-place').textContent = (customer.state || 'Gujarat') + ' (24)';

    document.getElementById('p-crane-info').textContent = `${crane.code || 'CRANE'} (${crane.type || 'Mobile Crane'} - ${crane.capacity || ''})`;
    document.getElementById('p-crane-reg').textContent = crane.reg || '-';
    document.getElementById('p-crane-route').textContent = `${inv.fromLocation || 'Depot'} → ${inv.toLocation || 'Site'}`;

    const itemsTbody = document.getElementById('p-items-list');
    itemsTbody.innerHTML = '';
    (inv.items || []).forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${item.description}</strong></td>
        <td><code>997314</code></td>
        <td style="text-align: center;">${item.qty} Days</td>
        <td style="text-align: right;">${formatINR(item.rate)}</td>
        <td style="text-align: right;"><strong>${formatINR(item.amount)}</strong></td>
      `;
      itemsTbody.appendChild(tr);
    });

    document.getElementById('p-subtotal').textContent = formatINR(inv.subtotal);
    if (inv.isInterstate) {
      document.getElementById('p-row-cgst').classList.add('hidden');
      document.getElementById('p-row-sgst').classList.add('hidden');
      document.getElementById('p-row-igst').classList.remove('hidden');
      document.getElementById('p-igst').textContent = formatINR(inv.igst);
    } else {
      document.getElementById('p-row-cgst').classList.remove('hidden');
      document.getElementById('p-row-sgst').classList.remove('hidden');
      document.getElementById('p-row-igst').classList.add('hidden');
      document.getElementById('p-cgst').textContent = formatINR(inv.cgst);
      document.getElementById('p-sgst').textContent = formatINR(inv.sgst);
    }

    document.getElementById('p-grand-total').textContent = formatINR(inv.grandTotal);
    document.getElementById('p-amount-words').textContent = numberToWordsINR(inv.grandTotal);

    document.getElementById('p-terms-text').innerText = company.terms || 'Standard terms apply.';
    document.getElementById('p-sig-comp').textContent = 'For ' + (company.companyName || 'APEX CRANE SERVICES');

    document.getElementById('modal-invoice-preview').classList.remove('hidden');
  }

  function closeInvoicePreview() {
    document.getElementById('modal-invoice-preview').classList.add('hidden');
  }

  function deleteInvoice(id) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      appState.invoices = appState.invoices.filter(i => i.id !== id);
      saveState();
      showToast('Invoice deleted.', 'danger');
    }
  }

  // ATTACH EVENT LISTENERS
  function initEventListeners() {
    // Quick Actions
    document.getElementById('qa-add-crane')?.addEventListener('click', () => openAddCraneModal());
    document.getElementById('qa-add-customer')?.addEventListener('click', () => openAddCustomerModal());
    document.getElementById('qa-create-invoice')?.addEventListener('click', () => openCreateInvoiceModal());
    document.getElementById('global-create-invoice-btn')?.addEventListener('click', () => openCreateInvoiceModal());

    document.getElementById('btn-open-add-crane-modal')?.addEventListener('click', () => openAddCraneModal());
    document.getElementById('empty-add-crane-btn')?.addEventListener('click', () => openAddCraneModal());
    document.getElementById('close-modal-add-crane')?.addEventListener('click', closeAddCraneModal);
    document.getElementById('cancel-crane-modal')?.addEventListener('click', closeAddCraneModal);

    document.getElementById('btn-open-add-customer-modal')?.addEventListener('click', () => openAddCustomerModal());
    document.getElementById('empty-add-customer-btn')?.addEventListener('click', () => openAddCustomerModal());
    document.getElementById('close-modal-add-customer')?.addEventListener('click', closeAddCustomerModal);
    document.getElementById('cancel-cust-modal')?.addEventListener('click', closeAddCustomerModal);

    document.getElementById('btn-open-create-invoice-modal')?.addEventListener('click', () => openCreateInvoiceModal());
    document.getElementById('empty-create-invoice-btn')?.addEventListener('click', () => openCreateInvoiceModal());
    document.getElementById('close-modal-create-invoice')?.addEventListener('click', closeCreateInvoiceModal);
    document.getElementById('cancel-inv-modal')?.addEventListener('click', closeCreateInvoiceModal);

    document.getElementById('btn-export-gst-report')?.addEventListener('click', exportGSTR1Report);

    // Operator Listeners
    document.getElementById('btn-open-add-op-modal')?.addEventListener('click', () => openAddOperatorModal());
    document.getElementById('empty-add-op-btn')?.addEventListener('click', () => openAddOperatorModal());
    document.getElementById('close-modal-add-op')?.addEventListener('click', closeAddOperatorModal);
    document.getElementById('cancel-op-modal')?.addEventListener('click', closeAddOperatorModal);

    // Document Listeners
    document.getElementById('btn-open-add-doc-modal')?.addEventListener('click', () => openAddDocumentModal());
    document.getElementById('empty-add-doc-btn')?.addEventListener('click', () => openAddDocumentModal());
    document.getElementById('close-modal-add-doc')?.addEventListener('click', closeAddDocumentModal);
    document.getElementById('cancel-doc-modal')?.addEventListener('click', closeAddDocumentModal);

    document.getElementById('close-modal-view-doc')?.addEventListener('click', closeViewDocumentModal);
    document.getElementById('close-view-doc-btn')?.addEventListener('click', closeViewDocumentModal);
    document.getElementById('btn-download-doc-file')?.addEventListener('click', () => {
      showToast('Downloading compliance document...', 'success');
      closeViewDocumentModal();
    });

    const fileDropArea = document.getElementById('file-drop-area');
    const fileInput = document.getElementById('doc-file-input');
    if (fileDropArea && fileInput) {
      fileDropArea.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          document.getElementById('file-upload-text').textContent = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`;
          document.getElementById('doc-file-info').value = `${(file.size / 1024 / 1024).toFixed(1)} MB ${file.name.split('.').pop().toUpperCase()}`;
        }
      });
    }

    document.getElementById('close-modal-record-payment')?.addEventListener('click', closeRecordPaymentModal);
    document.getElementById('cancel-pay-modal')?.addEventListener('click', closeRecordPaymentModal);

    document.getElementById('close-modal-invoice-preview')?.addEventListener('click', closeInvoicePreview);
    document.getElementById('btn-print-invoice')?.addEventListener('click', () => window.print());

    document.getElementById('btn-add-line-item')?.addEventListener('click', () => addLineItemRow());
    document.getElementById('inv-gst-rate')?.addEventListener('change', recalculateInvoiceTax);
    document.getElementById('inv-is-interstate')?.addEventListener('change', recalculateInvoiceTax);

    // Filter Inputs
    document.getElementById('crane-search-input')?.addEventListener('input', renderCranes);
    document.getElementById('crane-status-filter')?.addEventListener('change', renderCranes);
    document.getElementById('customer-search-input')?.addEventListener('input', renderCustomers);
    document.getElementById('invoice-search-input')?.addEventListener('input', renderInvoices);
    document.getElementById('invoice-status-filter')?.addEventListener('change', renderInvoices);
    document.getElementById('op-search-input')?.addEventListener('input', renderOperators);

    document.getElementById('doc-search-input')?.addEventListener('input', renderDocuments);
    document.getElementById('doc-crane-filter')?.addEventListener('change', renderDocuments);

    // Tab Filters
    document.querySelectorAll('#view-payments .tab-filters .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#view-payments .tab-filters .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPayments();
      });
    });

    document.querySelectorAll('#view-documents .tab-filters .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#view-documents .tab-filters .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDocuments();
      });
    });

    // Form Submissions
    // 1. Operator Form
    document.getElementById('form-add-operator')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const opId = document.getElementById('op-form-id').value;
      const baseSalary = parseFloat(document.getElementById('op-base-salary').value) || 0;
      const overtime = parseFloat(document.getElementById('op-overtime').value) || 0;
      const allowance = parseFloat(document.getElementById('op-allowance').value) || 0;

      const opData = {
        id: opId || ('OP-' + Date.now().toString().slice(-4)),
        name: document.getElementById('op-name').value.trim(),
        role: document.getElementById('op-role').value,
        phone: document.getElementById('op-phone').value.trim(),
        craneId: document.getElementById('op-crane-select').value,
        baseSalary,
        overtime,
        allowance,
        totalSalary: baseSalary + overtime + allowance,
        status: document.getElementById('op-status').value,
        paymentDate: document.getElementById('op-status').value === 'Paid' ? new Date().toISOString().split('T')[0] : '-',
        paymentMethod: document.getElementById('op-status').value === 'Paid' ? 'Bank Transfer' : '-'
      };

      if (opId) {
        const index = appState.operators.findIndex(o => o.id === opId);
        if (index !== -1) appState.operators[index] = opData;
        showToast('Operator payroll record updated!');
      } else {
        appState.operators.push(opData);
        showToast('New operator added!');
      }

      saveState();
      closeAddOperatorModal();
    });

    // 2. Crane Form
    document.getElementById('form-add-crane')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const craneId = document.getElementById('crane-form-id').value;
      const craneData = {
        id: craneId || ('CR-' + Date.now().toString().slice(-4)),
        code: document.getElementById('crane-code').value.trim(),
        type: document.getElementById('crane-type').value,
        capacity: document.getElementById('crane-capacity').value.trim(),
        reg: document.getElementById('crane-reg').value.trim(),
        model: document.getElementById('crane-model').value.trim(),
        year: parseInt(document.getElementById('crane-year').value) || 2023,
        hourly: parseFloat(document.getElementById('crane-hourly').value) || 0,
        daily: parseFloat(document.getElementById('crane-daily').value) || 0,
        status: document.getElementById('crane-status').value
      };

      if (craneId) {
        const index = appState.cranes.findIndex(c => c.id === craneId);
        if (index !== -1) appState.cranes[index] = craneData;
        showToast('Crane details updated!');
      } else {
        appState.cranes.push(craneData);
        showToast('New crane added to fleet!');
      }

      saveState();
      closeAddCraneModal();
    });

    // 3. Customer Form
    document.getElementById('form-add-customer')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const custId = document.getElementById('cust-form-id').value;
      const custData = {
        id: custId || ('CUST-' + Date.now().toString().slice(-4)),
        name: document.getElementById('cust-name').value.trim(),
        company: document.getElementById('cust-company').value.trim(),
        phone: document.getElementById('cust-phone').value.trim(),
        email: document.getElementById('cust-email').value.trim(),
        address: document.getElementById('cust-address').value.trim(),
        gstin: document.getElementById('cust-gstin').value.trim(),
        state: document.getElementById('cust-state').value.trim()
      };

      if (custId) {
        const index = appState.customers.findIndex(c => c.id === custId);
        if (index !== -1) appState.customers[index] = custData;
        showToast('Customer profile updated!');
      } else {
        appState.customers.push(custData);
        showToast('New customer added!');
      }

      saveState();
      closeAddCustomerModal();
    });

    // 4. Invoice Form
    document.getElementById('form-create-invoice')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const customerId = document.getElementById('inv-select-customer').value;
      const craneId = document.getElementById('inv-select-crane').value;

      if (!customerId || !craneId) {
        alert('Please select both a Customer and a Crane.');
        return;
      }

      const rows = document.querySelectorAll('#invoice-items-body tr');
      const items = [];
      let subtotal = 0;

      rows.forEach(tr => {
        const desc = tr.querySelector('.item-desc')?.value.trim();
        const qty = parseFloat(tr.querySelector('.item-qty')?.value) || 0;
        const rate = parseFloat(tr.querySelector('.item-rate')?.value) || 0;
        const amount = qty * rate;

        if (desc) {
          items.push({ description: desc, qty, rate, amount });
          subtotal += amount;
        }
      });

      if (items.length === 0) {
        alert('Please add at least one line item for billing.');
        return;
      }

      const gstRate = parseFloat(document.getElementById('inv-gst-rate').value) || 18;
      const isInterstate = document.getElementById('inv-is-interstate').checked;

      let cgst = 0, sgst = 0, igst = 0;
      if (isInterstate) {
        igst = subtotal * (gstRate / 100);
      } else {
        cgst = subtotal * (gstRate / 200);
        sgst = subtotal * (gstRate / 200);
      }

      const grandTotal = subtotal + cgst + sgst + igst;

      const prefix = appState.settings?.invoicePrefix || 'INV-2026-';
      const invId = prefix + String(appState.invoices.length + 1).padStart(3, '0');

      const newInv = {
        id: invId,
        customerId,
        craneId,
        date: document.getElementById('inv-service-date').value,
        fromLocation: document.getElementById('inv-from-loc').value.trim(),
        toLocation: document.getElementById('inv-to-loc').value.trim(),
        description: document.getElementById('inv-service-desc').value.trim(),
        sacCode: '997314',
        items,
        subtotal,
        gstRate,
        isInterstate,
        cgst,
        sgst,
        igst,
        grandTotal,
        status: 'Pending',
        paidAmount: 0,
        paymentMethod: '-'
      };

      appState.invoices.push(newInv);
      saveState();
      closeCreateInvoiceModal();
      showToast(`Invoice ${newInv.id} created!`);

      openInvoicePreview(newInv.id);
    });

    // 5. Document Form
    document.getElementById('form-add-document')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const docId = document.getElementById('doc-form-id').value;
      const docData = {
        id: docId || ('DOC-' + Date.now().toString().slice(-4)),
        title: document.getElementById('doc-title').value.trim(),
        category: document.getElementById('doc-category').value,
        craneId: document.getElementById('doc-crane-select').value,
        expiryDate: document.getElementById('doc-expiry-date').value,
        fileInfo: document.getElementById('doc-file-info').value.trim() || '1.2 MB PDF',
        notes: document.getElementById('doc-notes').value.trim()
      };

      if (docId) {
        const index = appState.documents.findIndex(d => d.id === docId);
        if (index !== -1) appState.documents[index] = docData;
        showToast('Document details updated!');
      } else {
        appState.documents.push(docData);
        showToast('New document uploaded to vault!');
      }

      saveState();
      closeAddDocumentModal();
    });

    // 6. Payment Form
    document.getElementById('form-record-payment')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const invId = document.getElementById('pay-inv-id').value;
      const amountReceived = parseFloat(document.getElementById('pay-amount').value) || 0;
      const method = document.getElementById('pay-method').value;

      const inv = appState.invoices.find(i => i.id === invId);
      if (inv) {
        const currentPaid = (inv.paidAmount || 0) + amountReceived;
        inv.paidAmount = currentPaid;
        inv.paymentMethod = method;

        if (currentPaid >= inv.grandTotal) {
          inv.status = 'Paid';
        } else if (currentPaid > 0) {
          inv.status = 'Partially Paid';
        }

        saveState();
        showToast(`Payment recorded for ${inv.id}`);
      }

      closeRecordPaymentModal();
    });

    // 7. Settings Forms
    document.getElementById('company-settings-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.settings = appState.settings || {};
      appState.settings.companyName = document.getElementById('set-comp-name').value.trim();
      appState.settings.phone = document.getElementById('set-comp-phone').value.trim();
      appState.settings.email = document.getElementById('set-comp-email').value.trim();
      appState.settings.gstin = document.getElementById('set-comp-gstin').value.trim();
      appState.settings.address = document.getElementById('set-comp-address').value.trim();
      appState.settings.state = document.getElementById('set-comp-state').value.trim();
      appState.settings.stateCode = document.getElementById('set-comp-state-code').value.trim();
      saveState();
      showToast('Company Settings Saved!');
    });

    document.getElementById('invoice-settings-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.settings = appState.settings || {};
      appState.settings.invoicePrefix = document.getElementById('set-inv-prefix').value.trim();
      appState.settings.defaultGst = document.getElementById('set-inv-gst').value;
      appState.settings.terms = document.getElementById('set-inv-terms').value.trim();
      saveState();
      showToast('Invoice Defaults Saved!');
    });

    document.getElementById('language-settings-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.settings = appState.settings || {};
      const chosenLang = document.getElementById('set-app-language')?.value || 'en';
      appState.settings.language = chosenLang;
      saveState();

      const langNames = {
        'en': 'English',
        'gu': 'ગુજરાતી (Gujarati)',
        'hi': 'हिन्दी (Hindi)',
        'mr': 'मराठी (Marathi)'
      };

      showToast(`Language preference set to ${langNames[chosenLang] || chosenLang}`);
    });

    // Auth & Session Listeners
    document.getElementById('btn-instant-demo-login')?.addEventListener('click', () => {
      appState.isLoggedIn = true;
      saveState();
      showToast('⚡ Live Demo Session Activated! Welcome to Apex Crane ERP.');
    });

    document.getElementById('form-login')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value.trim() || '';
      const pass = document.getElementById('login-password')?.value.trim() || '';

      if (!email || !pass) {
        showToast('Please enter email and password.', 'warning');
        return;
      }

      appState.isLoggedIn = true;
      saveState();
      showToast('Signed in successfully! Welcome to Apex Crane ERP.');
    });

    document.getElementById('btn-fill-demo-credentials')?.addEventListener('click', () => {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput) emailInput.value = 'admin@apexcrane.in';
      if (passInput) passInput.value = '12345678';
      showToast('Demo credentials filled');
    });

    const logoutBtns = ['btn-user-logout', 'btn-header-logout', 'btn-drawer-logout'];
    logoutBtns.forEach(btnId => {
      document.getElementById(btnId)?.addEventListener('click', (e) => {
        e.preventDefault();
        appState.isLoggedIn = false;
        saveState();
        showToast('Session logged out.');
        if (typeof closeMobileDrawer === 'function') closeMobileDrawer();
      });
    });

    // Reset Demo Data
    document.getElementById('btn-reset-demo-data')?.addEventListener('click', () => {
      if (confirm('Reset all demo data back to default state?')) {
        appState = JSON.parse(JSON.stringify(defaultState));
        appState.isLoggedIn = true;
        saveState();
        showToast('Demo data reset to factory defaults.');
      }
    });
  }

  // Initialize App
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initEventListeners();
    checkAuthState();
    renderAllViews();
  });

})();
