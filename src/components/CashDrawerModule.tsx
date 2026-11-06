import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, Lock, Unlock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const CashDrawerModule: React.FC = () => {
  const { cashShift, openShift, closeShift, t, currentTenant } = useApp();
  const [openingInput, setOpeningInput] = useState(200000);
  const [closingInput, setClosingInput] = useState(cashShift?.closingBalance || 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ' + (currentTenant?.currency || 'IQD');
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-center font-bold">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t('cashRegister')}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage daily cash shifts, drawer opening and closing balance</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
            cashShift?.status === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            Shift {cashShift?.status || 'closed'}
          </span>
        </div>

        {cashShift?.status === 'open' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-medium text-slate-500">Opening Balance</p>
                <h4 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{formatCurrency(cashShift.openingBalance)}</h4>
              </div>
              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <p className="text-xs font-medium text-emerald-800">Cash In (Sales)</p>
                <h4 className="text-2xl font-bold text-emerald-900 mt-1 tabular-nums">+{formatCurrency(cashShift.cashIn)}</h4>
              </div>
              <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-100">
                <p className="text-xs font-medium text-rose-800">Cash Out / Expenses</p>
                <h4 className="text-2xl font-bold text-rose-900 mt-1 tabular-nums">-{formatCurrency(cashShift.cashOut)}</h4>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-300">Expected Drawer Balance</p>
                <h3 className="text-3xl font-bold mt-1 tabular-nums">{formatCurrency(cashShift.openingBalance + cashShift.cashIn - cashShift.cashOut)}</h3>
              </div>
              <Unlock className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700">Enter Actual Closing Drawer Cash to Close Shift</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={closingInput}
                  onChange={e => setClosingInput(Number(e.target.value))}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-lg font-bold tabular-nums"
                />
                <button
                  onClick={() => closeShift(closingInput)}
                  className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  <Lock className="w-4 h-4 inline mr-2" /> Close Shift
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center py-8">
            <p className="text-sm text-slate-500">Cash register shift is currently closed.</p>
            <div className="max-w-xs mx-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Opening Cash Balance</label>
                <input
                  type="number"
                  value={openingInput}
                  onChange={e => setOpeningInput(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-center text-lg font-bold tabular-nums"
                />
              </div>
              <button
                onClick={() => openShift(openingInput)}
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl text-sm shadow-md"
              >
                Open New Cash Shift
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
