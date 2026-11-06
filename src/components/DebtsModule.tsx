import React from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Users, Truck } from 'lucide-react';

export const DebtsModule: React.FC = () => {
  const { customers, suppliers, t, currentTenant } = useApp();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ' + (currentTenant?.currency || 'IQD');
  };

  const customerDebts = customers.filter(c => c.outstandingBalance > 0);

  return (
    <div className="p-8 space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900">{t('debts')}</h3>
        <p className="text-xs text-slate-500 mt-0.5">Track customer receivables and supplier payables</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Debts (Receivables) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-800" /> Customer Receivables
            </h4>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
              {customerDebts.length} debtors
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {customerDebts.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">No outstanding customer debts.</p>
            ) : (
              customerDebts.map(c => (
                <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{c.phone}</p>
                  </div>
                  <span className="font-bold text-rose-700 text-base tabular-nums">{formatCurrency(c.outstandingBalance)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Supplier Debts (Payables) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-800" /> Supplier Payables
            </h4>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
              {suppliers.length} suppliers
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {suppliers.map(s => (
              <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-500">Contact: {s.contactPerson} ({s.phone})</p>
                </div>
                <span className="font-bold text-amber-700 text-base tabular-nums">{formatCurrency(s.outstandingDebt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
