import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, Download, Printer, TrendingUp, DollarSign, Receipt } from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const { orders, expenses, t, currentTenant } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const grossProfit = totalRevenue * 0.25; // estimated 25% margin baseline

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ' + (currentTenant?.currency || 'IQD');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Type,Title/Invoice,Amount,Date"].join(",") + "\n"
      + orders.map(o => `Sale,${o.invoiceNumber},${o.total},${o.createdAt}`).join("\n") + "\n"
      + expenses.map(e => `Expense,${e.title},${e.amount},${e.date}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vexora_financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('reports')}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive financial summary and profit analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{t('exportCsv')}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{t('exportPdf')}</span>
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('totalSales')}</p>
          <h4 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{formatCurrency(totalRevenue)}</h4>
          <span className="text-xs text-emerald-700 font-semibold mt-2 block">Verified in orders</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('totalExpenses')}</p>
          <h4 className="text-2xl font-bold text-rose-700 mt-2 tabular-nums">{formatCurrency(totalExpenses)}</h4>
          <span className="text-xs text-rose-600 font-semibold mt-2 block">All recorded categories</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('grossProfit')}</p>
          <h4 className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">{formatCurrency(grossProfit)}</h4>
          <span className="text-xs text-blue-700 font-semibold mt-2 block">Estimated margin</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('netProfit')}</p>
          <h4 className="text-2xl font-bold text-emerald-900 mt-2 tabular-nums">{formatCurrency(netProfit)}</h4>
          <span className="text-xs text-emerald-700 font-semibold mt-2 block">Revenue minus expenses</span>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Invoices Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-bold text-slate-900 text-base">Invoices Summary ({orders.length} orders)</h4>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {orders.map(o => (
              <div key={o.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{o.invoiceNumber} - {o.customerName}</p>
                  <p className="text-[11px] text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-bold text-emerald-900 text-sm tabular-nums">{formatCurrency(o.total)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-bold text-slate-900 text-base">Expenses Summary ({expenses.length} records)</h4>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {expenses.map(e => (
              <div key={e.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{e.title}</p>
                  <p className="text-[11px] text-slate-500 uppercase">{e.category} · {e.date}</p>
                </div>
                <span className="font-bold text-rose-700 text-sm tabular-nums">{formatCurrency(e.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
