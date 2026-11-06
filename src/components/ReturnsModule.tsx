import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RotateCcw, Plus, X } from 'lucide-react';

export const ReturnsModule: React.FC = () => {
  const { returns, processReturn, orders, t, currentTenant } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [type, setType] = useState<'return' | 'exchange'>('return');
  const [reason, setReason] = useState('');
  const [returnQty, setReturnQty] = useState(1);

  const matchedOrder = orders.find(o => o.invoiceNumber === invoiceNumber);

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedOrder || matchedOrder.items.length === 0) return;

    const returnItems = matchedOrder.items.map(item => ({
      ...item,
      quantity: Math.min(item.quantity, returnQty),
      total: Math.min(item.quantity, returnQty) * item.unitPrice
    }));

    processReturn(invoiceNumber, type, returnItems, reason);
    setIsModalOpen(false);
    setInvoiceNumber('');
    setReason('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ' + (currentTenant?.currency || 'IQD');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('returns')}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Process product returns and exchanges, refund payments, and auto-update stock</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-sm font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Return / Exchange</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-6">Original Invoice</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Refund Amount</th>
                <th className="py-3.5 px-6">Reason</th>
                <th className="py-3.5 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {returns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">No returns or exchanges registered.</td>
                </tr>
              ) : (
                returns.map(ret => (
                  <tr key={ret.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{ret.originalInvoiceNumber}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase ${
                        ret.type === 'return' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {ret.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      {ret.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}
                    </td>
                    <td className="py-4 px-6 font-bold text-rose-700 tabular-nums">{formatCurrency(ret.refundAmount)}</td>
                    <td className="py-4 px-6 text-slate-600">{ret.reason}</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{new Date(ret.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">Process Return / Exchange</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Original Invoice Number</label>
                <input
                  type="text"
                  required
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono"
                  placeholder="e.g. INV-2026-001"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Transaction Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                >
                  <option value="return">Return (Refund)</option>
                  <option value="exchange">Exchange</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity to Return</label>
                <input
                  type="number"
                  min={1}
                  value={returnQty}
                  onChange={e => setReturnQty(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Return</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                  placeholder="e.g. Defective item or wrong size"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-sm font-bold shadow-md"
                >
                  Process Return & Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
