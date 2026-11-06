import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, UserProfile, TenantBusiness, Branch, Product, 
  Customer, Supplier, Purchase, Order, ReturnRecord, 
  CashRegisterShift, Expense, Employee, DebtRecord, 
  ActivityLogItem, NotificationItem, UserRole 
} from '../types';
import { translations, TranslationKey } from '../translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRtl: boolean;
  currentUser: UserProfile | null;
  currentTenant: TenantBusiness | null;
  branches: Branch[];
  currentBranch: Branch | null;
  switchBranch: (branchId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: Product[];
  customers: Customer[];
  suppliers: Supplier[];
  purchases: Purchase[];
  orders: Order[];
  returns: ReturnRecord[];
  cashShift: CashRegisterShift | null;
  expenses: Expense[];
  employees: Employee[];
  debts: DebtRecord[];
  activityLogs: ActivityLogItem[];
  notifications: NotificationItem[];
  
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  loadDemoData: () => void;
  
  addProduct: (product: Omit<Product, 'id' | 'tenantId' | 'branchId' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addCustomer: (customer: Omit<Customer, 'id' | 'tenantId' | 'totalPurchased' | 'outstandingBalance' | 'loyaltyPoints' | 'loyaltyTier' | 'createdAt'>) => void;
  updateCustomerBalance: (id: string, amount: number) => void;
  
  addSupplier: (supplier: Omit<Supplier, 'id' | 'tenantId' | 'outstandingDebt'>) => void;
  addPurchase: (purchase: Omit<Purchase, 'id' | 'tenantId' | 'branchId' | 'invoiceNumber' | 'createdAt'>) => void;
  
  createOrder: (orderData: Omit<Order, 'id' | 'tenantId' | 'branchId' | 'invoiceNumber' | 'createdAt'>) => void;
  processReturn: (originalInvoiceNumber: string, type: 'return' | 'exchange', items: any[], reason: string) => void;
  
  openShift: (openingBalance: number) => void;
  closeShift: (closingBalance: number) => void;
  
  addExpense: (expense: Omit<Expense, 'id' | 'tenantId' | 'branchId'>) => void;
  addEmployee: (employee: Omit<Employee, 'id' | 'tenantId' | 'branchId' | 'joinedDate'>) => void;
  payDebt: (debtId: string, amount: number) => void;
  updateBusinessSettings: (settings: Partial<TenantBusiness>) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('vexora_lang') as Language) || 'ku';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('vexora_user');
    if (saved) { try { return JSON.parse(saved); } catch { return null; } }
    return {
      uid: 'user_owner_1',
      name: 'هەڵکەوت عومەر (Halkawt Omar)',
      email: 'halkawt@vexora.iq',
      role: 'owner',
      tenantId: 'tenant_erbil_01',
      branchId: 'branch_erb_1'
    };
  });

  const [currentTenant, setCurrentTenant] = useState<TenantBusiness | null>(() => {
    const saved = localStorage.getItem('vexora_tenant');
    if (saved) { try { return JSON.parse(saved); } catch { return null; } }
    return {
      id: 'tenant_erbil_01',
      name: 'ڤێکسۆرا بێزنیس - کۆمپانیای گشتی (Vexora Enterprise)',
      ownerId: 'user_owner_1',
      currency: 'IQD',
      phone: '+964 750 123 4567',
      address: 'عەنکاوە، شەقامی گشتی، هەولێر، عێراق',
      city: 'Erbil',
      taxRate: 5,
      invoiceFooter: 'سوپاس بۆ کڕینتان! کاڵا گۆڕدراوە لە ماوەی ٣ ڕۆژدا بە مەرجی پاراستنی پاکێج.',
      createdAt: new Date().toISOString()
    };
  });

  const [branches, setBranches] = useState<Branch[]>([
    { id: 'branch_erb_1', tenantId: 'tenant_erbil_01', name: 'لقی سەرەکی - هەولێر', city: 'Erbil', address: 'عەنکاوە', phone: '+964 750 111 2233', managerName: 'هەڵکەوت عومەر' },
    { id: 'branch_bgd_1', tenantId: 'tenant_erbil_01', name: 'لقی بەغدا - کەڕادە', city: 'Baghdad', address: 'شەقامی سەرەکی کەڕادە', phone: '+964 770 444 5566', managerName: 'عومەر فارووق' }
  ]);

  const [currentBranch, setCurrentBranch] = useState<Branch | null>(branches[0]);

  const switchBranch = (branchId: string) => {
    const found = branches.find(b => b.id === branchId);
    if (found) setCurrentBranch(found);
  };

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vexora_products');
    if (saved) { try { return JSON.parse(saved); } catch { return []; } }
    return [
      { id: 'p1', tenantId: 'tenant_erbil_01', branchId: 'branch_erb_1', name: 'ایپڵ ئایفۆن ١٥ پرو مۆکس (iPhone 15 Pro Max)', sku: 'APL-IP15PM-256', barcode: '628100192831', category: 'ئەلیکترۆنیات', purchasePrice: 1450000, sellingPrice: 1650000, stockQty: 10, minStockAlert: 2, expiryDate: '2028-12-31', batchNumber: 'BATCH-A1', updatedAt: new Date().toISOString() },
      { id: 'p2', tenantId: 'tenant_erbil_01', branchId: 'branch_erb_1', name: 'سەمەرت ڤیژن سمارت تیڤی ٥٥ ئینچ (Smart TV 55")', sku: 'SAM-TV55-4K', barcode: '628100192848', category: 'شاشە', purchasePrice: 550000, sellingPrice: 650000, stockQty: 6, minStockAlert: 1, expiryDate: '2029-06-30', batchNumber: 'BATCH-B2', updatedAt: new Date().toISOString() },
      { id: 'p3', tenantId: 'tenant_erbil_01', branchId: 'branch_erb_1', name: 'گالاکسی بەد ٢ پڵەس (Galaxy Buds 2 Pro)', sku: 'SAM-BUDS2P', barcode: '628100192855', category: 'پێداویستی', purchasePrice: 120000, sellingPrice: 160000, stockQty: 15, minStockAlert: 3, expiryDate: '2027-10-15', batchNumber: 'BATCH-C3', updatedAt: new Date().toISOString() }
    ];
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('vexora_customers');
    if (saved) { try { return JSON.parse(saved); } catch { return []; } }
    return [
      { id: 'c1', tenantId: 'tenant_erbil_01', name: 'ڕێبین جەمال (Rebin Jamal)', phone: '+964 750 987 6543', address: 'سلێمانی، شەقامی سالم', totalPurchased: 1650000, outstandingBalance: 0, loyaltyPoints: 150, loyaltyTier: 'Silver', createdAt: new Date().toISOString() },
      { id: 'c2', tenantId: 'tenant_erbil_01', name: 'عومەر فارووق (Omar Farooq)', phone: '+964 770 444 3322', address: 'بەغدا، کەڕادە', totalPurchased: 850000, outstandingBalance: 150000, loyaltyPoints: 320, loyaltyTier: 'Gold', createdAt: new Date().toISOString() }
    ];
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 'sup_1', tenantId: 'tenant_erbil_01', name: 'دابینکەری تەکتۆنیک (Tectonic Tech Supplier)', contactPerson: 'سەلام احمد', phone: '+964 750 333 2211', address: 'هەولێر، پیشەسازی', outstandingDebt: 2500000 }
  ]);

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [returns, setReturns] = useState<ReturnRecord[]>([]);

  const [cashShift, setCashShift] = useState<CashRegisterShift | null>({
    id: 'shift_1',
    tenantId: 'tenant_erbil_01',
    branchId: 'branch_erb_1',
    cashierName: 'هەڵکەوت عومەر',
    openingBalance: 250000,
    cashIn: 1650000,
    cashOut: 180000,
    closingBalance: 1720000,
    discrepancy: 0,
    status: 'open',
    openedAt: new Date().toISOString()
  });

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'emp_1', tenantId: 'tenant_erbil_01', branchId: 'branch_erb_1', name: 'هەڵکەوت عومەر', email: 'halkawt@vexora.iq', phone: '+964 750 123 4567', role: 'owner', status: 'active', joinedDate: '2025-01-10' }
  ]);

  const [debts, setDebts] = useState<DebtRecord[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([
    { id: 'log_1', tenantId: 'tenant_erbil_01', employeeName: 'هەڵکەوت عومەر', action: 'SYSTEM_INIT', details: 'Vexora Business ERP successfully initialized.', timestamp: new Date().toISOString() }
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'notif_1', tenantId: 'tenant_erbil_01', type: 'low_stock', title: 'Low Stock Warning', message: 'Product iPhone 15 stock is running low.', date: new Date().toISOString(), isRead: false },
    { id: 'notif_2', tenantId: 'tenant_erbil_01', type: 'debt_due', title: 'Customer Debt Due', message: 'Omar Farooq has an outstanding balance of 150,000 IQD.', date: new Date().toISOString(), isRead: false }
  ]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('vexora_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = (language === 'ku' || language === 'ar') ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => { if (currentUser) localStorage.setItem('vexora_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { if (currentTenant) localStorage.setItem('vexora_tenant', JSON.stringify(currentTenant)); }, [currentTenant]);
  useEffect(() => { localStorage.setItem('vexora_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('vexora_customers', JSON.stringify(customers)); }, [customers]);

  const setLanguage = (lang: Language) => { setLanguageState(lang); };
  const t = (key: TranslationKey): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };
  const isRtl = language === 'ku' || language === 'ar';

  const login = (email: string, role: UserRole = 'owner') => {
    setCurrentUser({
      uid: 'user_' + Date.now(),
      name: email.split('@')[0],
      email,
      role,
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1'
    });
  };

  const logout = () => { setCurrentUser(null); };

  const logActivity = (action: string, details: string) => {
    const newLog: ActivityLogItem = {
      id: 'log_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      employeeName: currentUser?.name || 'System Operator',
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const loadDemoData = () => {
    const tenantId = currentTenant?.id || 'tenant_erbil_01';
    const branchId = currentBranch?.id || 'branch_erb_1';
    
    setProducts([
      { id: 'p1', tenantId, branchId, name: 'iPhone 15 Pro Max 256GB', sku: 'APL-IP15PM', barcode: '628100192831', category: 'Phones', purchasePrice: 1450000, sellingPrice: 1650000, stockQty: 10, minStockAlert: 2, expiryDate: '2028-12-31', batchNumber: 'B-101', updatedAt: new Date().toISOString() },
      { id: 'p2', tenantId, branchId, name: 'Samsung Galaxy S24 Ultra', sku: 'SAM-S24U', barcode: '628100192848', category: 'Phones', purchasePrice: 1300000, sellingPrice: 1480000, stockQty: 7, minStockAlert: 2, expiryDate: '2028-10-30', batchNumber: 'B-102', updatedAt: new Date().toISOString() },
      { id: 'p3', tenantId, branchId, name: 'Sony WH-1000XM5 Headphones', sku: 'SNY-WH5', barcode: '628100192855', category: 'Audio', purchasePrice: 320000, sellingPrice: 390000, stockQty: 12, minStockAlert: 3, expiryDate: '2029-01-15', batchNumber: 'B-103', updatedAt: new Date().toISOString() }
    ]);

    setCustomers([
      { id: 'c1', tenantId, name: 'Rebin Jamal (رێبین جەمال)', phone: '+964 750 987 6543', address: 'Erbil, Italian City 2', totalPurchased: 2040000, outstandingBalance: 0, loyaltyPoints: 210, loyaltyTier: 'Gold', createdAt: new Date().toISOString() },
      { id: 'c2', tenantId, name: 'Omar Farooq (عومەر فارووق)', phone: '+964 770 444 3322', address: 'Baghdad, Mansour', totalPurchased: 1480000, outstandingBalance: 150000, loyaltyPoints: 90, loyaltyTier: 'Silver', createdAt: new Date().toISOString() }
    ]);

    logActivity('DEMO_LOADED', 'Loaded comprehensive Erbil & Baghdad retail demo data.');
  };

  const addProduct = (productData: Omit<Product, 'id' | 'tenantId' | 'branchId' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1',
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    logActivity('ADD_PRODUCT', `Added product: ${newProduct.name}`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields, updatedAt: new Date().toISOString() } : p));
    logActivity('UPDATE_PRODUCT', `Updated product ID: ${id}`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    logActivity('DELETE_PRODUCT', `Deleted product ID: ${id}`);
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'tenantId' | 'totalPurchased' | 'outstandingBalance' | 'loyaltyPoints' | 'loyaltyTier' | 'createdAt'>) => {
    const newCust: Customer = {
      ...customerData,
      id: 'cust_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      totalPurchased: 0,
      outstandingBalance: 0,
      loyaltyPoints: 0,
      loyaltyTier: 'Bronze',
      createdAt: new Date().toISOString()
    };
    setCustomers(prev => [newCust, ...prev]);
    logActivity('ADD_CUSTOMER', `Registered customer: ${newCust.name}`);
  };

  const updateCustomerBalance = (id: string, amount: number) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, outstandingBalance: Math.max(0, c.outstandingBalance - amount) } : c));
    logActivity('CUSTOMER_PAYMENT', `Customer payment recorded for ID: ${id}, amount: ${amount}`);
  };

  const addSupplier = (supplierData: Omit<Supplier, 'id' | 'tenantId' | 'outstandingDebt'>) => {
    const newSup: Supplier = {
      ...supplierData,
      id: 'sup_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      outstandingDebt: 0
    };
    setSuppliers(prev => [newSup, ...prev]);
    logActivity('ADD_SUPPLIER', `Added supplier: ${newSup.name}`);
  };

  const addPurchase = (purchaseData: Omit<Purchase, 'id' | 'tenantId' | 'branchId' | 'invoiceNumber' | 'createdAt'>) => {
    const invoiceNumber = 'PUR-' + Math.floor(1000 + Math.random() * 9000);
    const newPurchase: Purchase = {
      ...purchaseData,
      id: 'pur_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1',
      invoiceNumber,
      createdAt: new Date().toISOString()
    };

    setPurchases(prev => [newPurchase, ...prev]);

    // Update inventory stock automatically
    setProducts(prev => prev.map(p => {
      const pItem = purchaseData.items.find(i => i.productId === p.id);
      if (pItem) {
        return { ...p, stockQty: p.stockQty + pItem.quantity };
      }
      return p;
    }));

    logActivity('ADD_PURCHASE', `Recorded purchase invoice ${invoiceNumber} from ${purchaseData.supplierName}`);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'tenantId' | 'branchId' | 'invoiceNumber' | 'createdAt'>) => {
    const invoiceNumber = 'INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1',
      invoiceNumber,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Decrease stock
    setProducts(prev => prev.map(p => {
      const cartItem = orderData.items.find(item => item.productId === p.id);
      if (cartItem) {
        return { ...p, stockQty: Math.max(0, p.stockQty - cartItem.quantity) };
      }
      return p;
    }));

    // Update customer total, balance, and loyalty points (+1 point per 10,000 IQD)
    if (orderData.customerId) {
      const balanceDue = orderData.total - orderData.paidAmount;
      const earnedPoints = Math.floor(orderData.total / 10000);
      setCustomers(prev => prev.map(c => {
        if (c.id === orderData.customerId) {
          const newPoints = c.loyaltyPoints + earnedPoints;
          let tier: 'Bronze' | 'Silver' | 'Gold' | 'VIP' = c.loyaltyTier;
          if (newPoints > 500) tier = 'VIP';
          else if (newPoints > 200) tier = 'Gold';
          else if (newPoints > 100) tier = 'Silver';

          return {
            ...c,
            totalPurchased: c.totalPurchased + orderData.total,
            outstandingBalance: c.outstandingBalance + balanceDue,
            loyaltyPoints: newPoints,
            loyaltyTier: tier
          };
        }
        return c;
      }));
    }

    logActivity('POS_SALE', `Invoice ${invoiceNumber} created. Total: ${orderData.total} IQD`);
  };

  const processReturn = (originalInvoiceNumber: string, type: 'return' | 'exchange', items: any[], reason: string) => {
    const refundAmount = items.reduce((sum, i) => sum + (i.unitPrice * i.quantity), 0);
    const newReturn: ReturnRecord = {
      id: 'ret_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1',
      originalInvoiceNumber,
      type,
      items,
      refundAmount,
      reason,
      createdAt: new Date().toISOString()
    };
    setReturns(prev => [newReturn, ...prev]);

    // Return stock back
    setProducts(prev => prev.map(p => {
      const match = items.find(i => i.productId === p.id);
      if (match) {
        return { ...p, stockQty: p.stockQty + match.quantity };
      }
      return p;
    }));

    logActivity('PROCESS_RETURN', `Processed ${type} for invoice ${originalInvoiceNumber}. Refund: ${refundAmount}`);
  };

  const openShift = (openingBalance: number) => {
    setCashShift({
      id: 'shift_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1',
      cashierName: currentUser?.name || 'Cashier',
      openingBalance,
      cashIn: 0,
      cashOut: 0,
      closingBalance: openingBalance,
      discrepancy: 0,
      status: 'open',
      openedAt: new Date().toISOString()
    });
    logActivity('OPEN_SHIFT', `Cash register shift opened with opening balance: ${openingBalance}`);
  };

  const closeShift = (closingBalance: number) => {
    if (cashShift) {
      const expected = cashShift.openingBalance + cashShift.cashIn - cashShift.cashOut;
      const discrepancy = closingBalance - expected;
      setCashShift({
        ...cashShift,
        closingBalance,
        discrepancy,
        status: 'closed',
        closedAt: new Date().toISOString()
      });
      logActivity('CLOSE_SHIFT', `Cash register shift closed. Discrepancy: ${discrepancy}`);
    }
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'tenantId' | 'branchId'>) => {
    const newExp: Expense = {
      ...expenseData,
      id: 'exp_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1'
    };
    setExpenses(prev => [newExp, ...prev]);
    logActivity('ADD_EXPENSE', `Recorded expense: ${newExp.title} (${newExp.amount})`);
  };

  const addEmployee = (empData: Omit<Employee, 'id' | 'tenantId' | 'branchId' | 'joinedDate'>) => {
    const newEmp: Employee = {
      ...empData,
      id: 'emp_' + Date.now(),
      tenantId: currentTenant?.id || 'tenant_erbil_01',
      branchId: currentBranch?.id || 'branch_erb_1',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setEmployees(prev => [newEmp, ...prev]);
    logActivity('ADD_EMPLOYEE', `Hired employee: ${newEmp.name}`);
  };

  const payDebt = (debtId: string, amount: number) => {
    setDebts(prev => prev.map(d => d.id === debtId ? { ...d, amount: Math.max(0, d.amount - amount), status: d.amount - amount <= 0 ? 'settled' : 'partially_paid' } : d));
    logActivity('PAY_DEBT', `Debt payment recorded. Amount: ${amount}`);
  };

  const updateBusinessSettings = (settings: Partial<TenantBusiness>) => {
    setCurrentTenant(prev => prev ? { ...prev, ...settings } : null);
    logActivity('UPDATE_SETTINGS', 'Updated business profile settings.');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, t, isRtl,
      currentUser, currentTenant,
      branches, currentBranch, switchBranch,
      activeTab, setActiveTab,
      products, customers, suppliers, purchases, orders, returns,
      cashShift, expenses, employees, debts, activityLogs, notifications,
      login, logout, loadDemoData,
      addProduct, updateProduct, deleteProduct,
      addCustomer, updateCustomerBalance,
      addSupplier, addPurchase,
      createOrder, processReturn,
      openShift, closeShift,
      addExpense, addEmployee, payDebt, updateBusinessSettings,
      markNotificationAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
