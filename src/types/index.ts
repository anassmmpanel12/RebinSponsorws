export type Language = 'ku' | 'ar' | 'en';

export type UserRole = 'owner' | 'manager' | 'cashier';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  branchId?: string;
  avatar?: string;
}

export interface TenantBusiness {
  id: string;
  name: string;
  ownerId: string;
  currency: string; // 'IQD'
  phone: string;
  address: string;
  city: string;
  logoUrl?: string;
  taxRate: number;
  invoiceFooter: string;
  createdAt: string;
}

export interface Branch {
  id: string;
  tenantId: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  managerName: string;
}

export interface Product {
  id: string;
  tenantId: string;
  branchId: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQty: number;
  minStockAlert: number;
  expiryDate?: string;
  batchNumber?: string;
  imageUrl?: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  address: string;
  totalPurchased: number;
  outstandingBalance: number;
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'VIP';
  createdAt: string;
}

export interface Supplier {
  id: string;
  tenantId: string;
  name: string;
  contactPerson: string;
  phone: string;
  address: string;
  outstandingDebt: number;
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface Purchase {
  id: string;
  tenantId: string;
  branchId: string;
  supplierId: string;
  supplierName: string;
  invoiceNumber: string;
  items: PurchaseItem[];
  totalCost: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  dueDate: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  tenantId: string;
  branchId: string;
  invoiceNumber: string;
  customerId?: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paidAmount: number;
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'partial';
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  orderStatus: 'completed' | 'returned' | 'exchanged';
  cashierName: string;
  createdAt: string;
}

export interface ReturnRecord {
  id: string;
  tenantId: string;
  branchId: string;
  originalInvoiceNumber: string;
  type: 'return' | 'exchange';
  items: OrderItem[];
  refundAmount: number;
  reason: string;
  createdAt: string;
}

export interface CashRegisterShift {
  id: string;
  tenantId: string;
  branchId: string;
  cashierName: string;
  openingBalance: number;
  cashIn: number;
  cashOut: number;
  closingBalance: number;
  discrepancy: number;
  status: 'open' | 'closed';
  openedAt: string;
  closedAt?: string;
}

export interface Expense {
  id: string;
  tenantId: string;
  branchId: string;
  title: string;
  category: 'rent' | 'utilities' | 'salaries' | 'inventory' | 'marketing' | 'maintenance' | 'other';
  amount: number;
  date: string;
  description: string;
  recordedBy: string;
}

export interface Employee {
  id: string;
  tenantId: string;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface DebtRecord {
  id: string;
  tenantId: string;
  type: 'customer_debt' | 'supplier_debt';
  partyName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'partially_paid' | 'settled';
  referenceId: string;
}

export interface ActivityLogItem {
  id: string;
  tenantId: string;
  employeeName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  tenantId: string;
  type: 'low_stock' | 'expiry' | 'debt_due' | 'summary';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}
