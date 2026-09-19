---
name: crane-service-app
description: Standard instructions and design patterns for building clean, mobile-first Crane Service Management & GST Billing Web Applications. Use when creating or modifying industrial crane rental, customer management, GST billing, operator payroll, document vault, and payment tracking systems.
---

# Crane Service Management & GST Billing Skill

This skill provides domain-specific guidelines, data schemas, design tokens, and component patterns for building **Crane Service Management Web Applications**.

## 1. Domain Overview & Philosophy
Crane service businesses operate in heavy industry, logistics, and construction. The app must prioritize:
- **Simplicity & Speed**: Business owners are non-technical; forms must be minimal and ultra-clear.
- **Mobile-First UX**: Field operators and managers rely on mobile devices (360px–430px targets).
- **Indian Industrial GST Compliance**: Auto-calculating CGST (9%), SGST (9%), or IGST (18%) under **SAC Code 997314** (Rental services of cranes with operator) with GSTR-1 exportable tax reports.
- **Operator Salaries & Payroll**: Managing monthly base salaries, shift overtime pay, and trip allowances for crane operators and riggers.
- **Document Vault & Compliance**: Storing RC Books, Fitness Certificates, Commercial Insurance, Operator Licenses, and Form 10 Lifting Test Reports with automated expiry tracking.

Do **NOT** bloat with complex ERP modules (no CRM, AI, fleet GPS tracking, or accounting double-entry).

---

## 2. Design System & Custom Scrollbars

### Industrial Palette
- **Deep Navy** (`#0F172A`): Dominant headers, sidebars, dark card accents.
- **Crane Yellow** (`#F5B700`): Primary actions, active highlights, key CTAs.
- **Steel Gray** (`#64748B`): Secondary text, borders, labels.
- **Light Gray** (`#F1F5F9`): App background, card subtle backgrounds.
- **White** (`#FFFFFF`): Main container/card surfaces.
- **Success Green** (`#16A34A`): Available status, Valid badges.
- **Danger Red** (`#DC2626`): Expired certificates, Overdue/Pending badges.

### Custom Sleek Scrollbars
```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #F1F5F9;
}
::-webkit-scrollbar-thumb {
  background: #94A3B8;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #F5B700;
}
.sidebar ::-webkit-scrollbar-track {
  background: #0F172A;
}
.sidebar ::-webkit-scrollbar-thumb {
  background: #1E293B;
}
```

---

## 3. Data Schema Specifications

### Crane Object
```json
{
  "id": "CR-001",
  "code": "CR-001",
  "type": "Mobile Crane",
  "capacity": "25 Ton",
  "reg": "GJ-01-AB-1234",
  "model": "ACE 250",
  "year": 2022,
  "hourly": 1500,
  "daily": 15000,
  "status": "Available"
}
```

### Operator Salary Object
```json
{
  "id": "OP-001",
  "name": "Ramesh Kumar",
  "role": "Senior Crane Operator",
  "phone": "+91 98765 11223",
  "craneId": "CR-001",
  "baseSalary": 28000,
  "overtime": 3500,
  "allowance": 2000,
  "totalSalary": 33500,
  "status": "Paid",
  "paymentDate": "2026-09-05",
  "paymentMethod": "Bank Transfer"
}
```

### Document Vault Object
```json
{
  "id": "DOC-001",
  "title": "CR-001 RTO Registration Certificate (RC)",
  "category": "RC Book",
  "craneId": "CR-001",
  "expiryDate": "2028-05-20",
  "fileInfo": "1.4 MB PDF",
  "notes": "Original RC Book issued by Gujarat RTO."
}
```

### GST Invoice Object
```json
{
  "id": "INV-2026-001",
  "customerId": "CUST-001",
  "craneId": "CR-001",
  "date": "2026-09-18",
  "fromLocation": "Ahmedabad Depot",
  "toLocation": "Sanand Site B",
  "description": "25T Mobile Crane rental service",
  "sacCode": "997314",
  "items": [
    { "description": "Crane Rental (SAC 997314)", "qty": 2, "rate": 15000, "amount": 30000 },
    { "description": "Operator Charges", "qty": 2, "rate": 2000, "amount": 4000 }
  ],
  "subtotal": 34000,
  "gstRate": 18,
  "isInterstate": false,
  "cgst": 3060,
  "sgst": 3060,
  "igst": 0,
  "grandTotal": 40120,
  "status": "Paid",
  "paidAmount": 40120
}
```

---

## 4. Key Workflows & UI Requirements

### 1. Central Workflow
`Add Crane` → `Add Customer` → `Assign Operator & Salary` → `Upload Compliance Docs` → `Create Invoice (SAC 997314)` → `GST Tax Calculation` → `Printable Preview` → `Export GSTR-1 Report`

### 2. GST SAC Code & Reporting Rules
- **SAC Code 997314**: Rental services of machinery and equipment including cranes with operator.
- **Tax Breakdown**: Displays Total Taxable Value, CGST (9%), SGST (9%), and IGST (18%) breakdown banner.
- **Export GSTR-1 CSV**: Downloads formatted GSTR-1 report for tax filing.

### 3. Operator Payroll Rules
- `Total Payable = Base Salary + Overtime Pay + Trip/Batta Allowance`.
- Supports one-click salary payout settlement and payment method tracking.

### 4. Navigation & Mobile Layout
- **Desktop**: Left vertical navigation bar (`Deep Navy` background, `Crane Yellow` active links).
- **Mobile**: Sticky bottom navigation bar (`Home | Cranes | Invoices | Operators | Docs | More`).
