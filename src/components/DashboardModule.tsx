import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, TrendingUp, ShoppingBag, Users, 
  Receipt, AlertTriangle, ArrowUpRight, ArrowDownRight, Sparkles 
} from 'lucide-react';

export const DashboardModule: React.FC = () => {
  const { orders, products, customers, expenses, t, currentTenant, loadDemoData } = useApp();

  // Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalSales - totalExpenses;
  const totalCustomersCount = customers.length;
  const totalOrdersCount = orders.length;
  const lowStockCount = products.filter(p => p.stockQty <= p.minStockAlert).length;

  // Today's sales
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysSales = orders
    .filter(o => o.createdAt.startsWith(todayStr))
    .reduce((sum, o) => sum + o.total, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ' + (currentTenant?.currency || 'IQD');
  };

  return (
    <div className="p-8 space-y-8">
      {/* Welcome & Quick Demo Bar if empty */}
      {orders.length === 0 && (
        <div className="p-6 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Vexora Business Erbil & Baghdad Hub
            </div>
            <h2 className="text-2xl font-bold">Welcome to your multi-tenant sales system</h2>
            <p className="text-emerald-100 text-sm max-w-xl">
              Get started instantly by loading sample data with pre-configured products, customers, and transactions across Iraq.
            </p>
          </div>
          <button
            onClick={loadDemoData}
            className="px-6 py-3 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow-lg transition-all"
          >
            {t('loadDemoData')}
          </button>
        </div>
      )}

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('totalSales')}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{formatCurrency(totalSales)}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% this month
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Today's Sales */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('todaysSales')}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{formatCurrency(todaysSales)}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> Active today
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('totalExpenses')}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{formatCurrency(totalExpenses)}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 mt-2">
              <ArrowDownRight className="w-3.5 h-3.5" /> Rent & Utilities
            </span>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center font-bold">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('netProfit')}</p>
            <h3 className="text-2xl font-bold text-emerald-800 mt-1 tabular-nums">{formatCurrency(netProfit)}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-2">
              <Sparkles className="w-3.5 h-3.5" /> Healthy margin
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-xl flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Secondary Metrics & Low Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">{t('totalCustomers')}</p>
            <h4 className="text-xl font-bold text-slate-900 tabular-nums">{totalCustomersCount} active profiles</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">{t('totalOrders')}</p>
            <h4 className="text-xl font-bold text-slate-900 tabular-nums">{totalOrdersCount} invoices issued</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">{t('lowStockAlerts')}</p>
            <h4 className="text-xl font-bold text-rose-700 tabular-nums">{lowStockCount} items need restock</h4>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">{t('recentTransactions')}</h3>
          <span className="text-xs text-slate-500 font-medium">Showing latest orders</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-6">Invoice #</th>
                <th className="py-3 px-6">{t('customerName')}</th>
                <th className="py-3 px-6">{t('total')}</th>
                <th className="py-3 px-6">{t('paymentStatus')}</th>
                <th className="py-3 px-6">{t('date')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">No transactions recorded yet. Load demo data or create a sale.</td>
                </tr>
              ) : (
                orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">{o.invoiceNumber}</td>
                    <td className="py-4 px-6 text-slate-700">{o.customerName || 'Walk-in Customer'}</td>
                    <td className="py-4 px-6 font-bold text-emerald-900 tabular-nums">{formatCurrency(o.total)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${
                        o.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                        o.paymentStatus === 'partial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {o.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
