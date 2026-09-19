# Crane Service Management Web App — Demo UI Prompt

For a **demo crane-service web app**, keep it simple and focused on the actual business workflow:

**Cranes → Customers → Invoice/GST Bill → Payments → Basic Dashboard**

Design and build a **clean, professional, mobile-responsive web application for a crane service company**.

The application is a **simple demo/business management system**, not a large enterprise ERP.

---

## 1. Main Purpose

The core purpose of the application is:

- Add and manage cranes
- Add customers
- Create crane-service invoices
- Generate GST invoices/bills
- Track basic invoice/payment status
- View basic business information

Do **NOT** add unnecessary enterprise features, complicated workflows, excessive dashboards, or advanced modules.

---

## 2. Design Direction

Create a premium but practical Indian industrial-business interface.

### Visual Style

- Professional
- Clean
- Modern
- Industrial
- Easy to understand
- Minimal
- Mobile-first
- Fast-looking interface

Avoid:
- Excessive gradients
- Overly futuristic UI
- Too many cards
- Complex charts
- Gaming-style interfaces
- Excessive animations
- Unnecessary AI features

### Suggested Colors

Use a professional crane/industrial palette:

- Deep Navy: `#0F172A`
- Crane Yellow: `#F5B700`
- Steel Gray: `#64748B`
- Light Gray: `#F1F5F9`
- White: `#FFFFFF`
- Success Green: `#16A34A`
- Danger Red: `#DC2626`

Use **Crane Yellow mainly for primary actions and highlights**, not as the entire UI background.

---

## 3. Main Navigation

Desktop sidebar:

**Logo**  
CRANE SERVICE

- Dashboard
- Cranes
- Customers
- Invoices
- Payments
- Settings

Bottom/compact navigation on mobile:

**Home | Cranes | Customers | Invoices | More**

Keep navigation very simple.

---

## 4. Dashboard

Create a simple business dashboard.

### Header

"Good Morning"

**Crane Service Management**

Show today's date.

### Summary Cards

Only 4 cards:

- **Total Cranes**: 12
- **Active Cranes**: 10
- **This Month Invoices**: ₹2,45,000
- **Pending Payments**: ₹68,000

### Recent Invoices

Simple table/list:

| Invoice | Customer | Date | Amount | Status |
|---|---|---|---:|---|
| INV-001 | ABC Construction | 18 Sep | ₹25,000 | Paid |
| INV-002 | XYZ Infra | 17 Sep | ₹42,000 | Pending |

On mobile, convert each row into a clean card.

### Quick Actions

Three large buttons:

- **+ Add Crane**
- **+ Add Customer**
- **+ Create Invoice**

Do not add more dashboard widgets.

---

## 5. Cranes Module

This is one of the main modules.

### Crane List

Display:

- Crane Number
- Crane Type
- Capacity
- Registration Number
- Status
- Action

Example:

**CR-001**  
Mobile Crane  
**25 Ton**  
GJ-XX-1234  
● Available

### Add Crane

Simple form:

- **Crane Name / ID**
- **Crane Type**: Mobile Crane, Crawler Crane, Tower Crane, Hydraulic Crane, Other
- **Capacity**: Example: 25 Ton
- **Registration Number**
- **Model**
- **Year**
- **Hourly Rate**
- **Daily Rate**
- **Status**: Available, Working, Maintenance

Button:

**Save Crane**

Keep the form short.

---

## 6. Customers Module

Simple customer management.

### Customer List

Show:

- Customer Name
- Company
- Phone
- GSTIN
- City

### Add Customer

Fields:

- **Customer Name**
- **Company Name**
- **Phone Number**
- **Email**
- **Billing Address**
- **GSTIN**
- **State**

Button:

**Save Customer**

---

## 7. Invoice Module

This is the **most important part of the application**.

Create a professional GST invoice workflow.

### Invoice List

Columns:

- Invoice No.
- Customer
- Date
- Crane
- Amount
- GST
- Total
- Status

Example: `INV-2026-001`

### Create Invoice

Header:

**Create GST Invoice**

#### Customer
Select Customer

#### Crane
Select Crane

#### Service Details
Fields:
- **Service Date**
- **From Location**
- **To Location**
- **Service Description** (Example: "25T Mobile Crane rental service")

#### Billing
Add invoice items:

| Description | Qty | Rate | Amount |
|---|---:|---:|---:|
| Crane Rental | 2 Days | ₹15,000 | ₹30,000 |
| Operator Charges | 2 Days | ₹2,000 | ₹4,000 |

Automatically calculate:
- **Subtotal**
- **CGST**
- **SGST**
- **IGST**
- **Grand Total**

Do not make the tax calculation complicated.

Allow:
- **GST %**: Default `18%`
- For intra-state: `CGST 9% + SGST 9%`
- For interstate: `IGST 18%`

---

## 8. GST Invoice Preview

Create a professional printable invoice.

Header:

**COMPANY LOGO**  
**CRANE SERVICE COMPANY**  
Address  
Phone  
Email  
GSTIN

---

### TAX INVOICE

**Invoice No:** INV-2026-001  
**Invoice Date:** 19/09/2026

### Bill To

Customer Name  
Company Name  
Address  
GSTIN

### Crane Details

Crane: Mobile Crane  
Capacity: 25 Ton  
Registration: GJ-XX-1234

### Service

| Description | Qty | Rate | Amount |
|---|---:|---:|---:|
| Crane Rental Service | 2 Days | ₹15,000 | ₹30,000 |
| Operator Charges | 2 Days | ₹2,000 | ₹4,000 |

Subtotal: ₹34,000  
CGST 9%: ₹3,060  
SGST 9%: ₹3,060  
**Grand Total: ₹40,120**

Amount in words:  
**Forty Thousand One Hundred Twenty Rupees Only**

Footer:  
**Terms & Conditions**  
Thank you for your business.  
Authorized Signature

---

## 9. Invoice Actions

On every invoice:

- **View**
- **Edit**
- **Print**
- **Download PDF**
- **Mark as Paid**

Do not add complicated accounting features.

---

## 10. Payments

Keep this module extremely simple.

Show:

- **Paid**
- **Pending**
- **Partially Paid**

Payment information:

- Invoice Number
- Customer
- Invoice Amount
- Paid Amount
- Balance
- Payment Date
- Payment Method

Payment methods:

- Cash
- UPI
- Bank Transfer
- Cheque

No complex accounting system.

---

## 11. Settings

Only include basic company settings.

### Company Information

- Company Name
- Logo
- Address
- Phone
- Email
- GSTIN
- State
- State Code

### Invoice Settings

- Invoice Prefix
- Default GST %
- Invoice Terms

### User

- Name
- Email
- Change Password
- Logout

---

## 12. Mobile Responsiveness

The application MUST be designed mobile-first.

### Mobile screen

Optimize for: **360px – 430px width**

Do not simply shrink the desktop interface.

Use:

- Bottom navigation
- Full-width buttons
- Large touch targets
- Collapsible sections
- Stacked invoice fields
- Horizontal scrolling only where absolutely necessary
- Mobile-friendly invoice preview
- Sticky "Create Invoice" button where useful

### Mobile Invoice Creation

Instead of a huge form, use sections:

1. **Customer**
2. **Crane**
3. **Service**
4. **Charges**
5. **GST**
6. **Preview**

**Generate Invoice**

Make each section easy to understand.

---

## 13. Desktop Layout

For desktop:

Left sidebar:

```
CRANE SERVICE

Dashboard
Cranes
Customers
Invoices
Payments
Settings
```

Main content:  
Large content area with clean spacing.  
Use cards only where they provide useful information.

---

## 14. Empty States

When there are no records:

### No Cranes
"No cranes added yet."  
**+ Add Your First Crane**

### No Customers
"No customers added yet."  
**+ Add Customer**

### No Invoices
"No invoices created yet."  
**+ Create Invoice**

Keep empty states simple.

---

## 15. Demo Data

Populate the demo application with realistic sample data.

### Cranes

- CR-001 — Hydraulic Mobile Crane — 25 Ton
- CR-002 — Mobile Crane — 40 Ton
- CR-003 — Crawler Crane — 60 Ton

### Customers

- ABC Construction Pvt. Ltd.
- Rajkot Infrastructure
- Shree BuildTech
- Gujarat Industrial Works

### Invoices

Create 4–5 realistic sample invoices with different statuses.

---

## 16. Important UX Rules

The user should be able to perform this complete workflow easily:

**Add Crane**  
↓  
**Add Customer**  
↓  
**Create Invoice**  
↓  
**Select Crane**  
↓  
**Select Customer**  
↓  
**Enter Service**  
↓  
**Calculate GST**  
↓  
**Preview Invoice**  
↓  
**Download / Print Invoice**

This should be the central workflow of the entire application.

---

## 17. Do NOT Add

For this demo, DO NOT add:

- Payroll
- Employee management
- Inventory
- CRM
- Advanced accounting
- AI chatbot
- Fleet GPS tracking
- Live crane tracking
- Complex analytics
- Multi-company management
- Subscription management
- Marketplace
- Advanced permissions
- Complex reports
- Warehouse management
- Maintenance automation
- Fuel management
- Banking integration
- Payment gateway
- WhatsApp automation

These can be added later if the product grows.

---

## 18. Overall Product Philosophy

The application should feel like:

**"A simple digital billing and crane management tool for a crane business."**

Not:

**"A huge ERP system."**

The first version should solve one important problem extremely well:

### Manage cranes + customers + GST invoices.

Make the interface so simple that a crane business owner who is not highly technical can understand it immediately.

Prioritize:

**Simplicity → Speed → GST Billing → Invoice Management → Mobile Usability**
