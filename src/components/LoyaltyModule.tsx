import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Star } from 'lucide-react';

export const LoyaltyModule: React.FC = () => {
  const { customers, t, currentTenant } = useApp();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ' + (currentTenant?.currency || 'IQD');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900">{t('loyalty')}</h3>
        <p className="text-xs text-slate-500 mt-0.5">Track customer reward points, tier status (Bronze, Silver, Gold, VIP), and redeem discounts</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-6">{t('customerName')}</th>
                <th className="py-3.5 px-6">{t('phone')}</th>
                <th className="py-3.5 px-6">Total Purchased</th>
                <th className="py-3.5 px-6">{t('points')}</th>
                <th className="py-3.5 px-6">Loyalty Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    {c.name}
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono text-xs">{c.phone}</td>
                  <td className="py-4 px-6 font-bold text-slate-900 tabular-nums">{formatCurrency(c.totalPurchased)}</td>
                  <td className="py-4 px-6 font-bold text-emerald-900 tabular-nums">{c.loyaltyPoints} pts</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      c.loyaltyTier === 'VIP' ? 'bg-purple-100 text-purple-800' :
                      c.loyaltyTier === 'Gold' ? 'bg-amber-100 text-amber-800' :
                      c.loyaltyTier === 'Silver' ? 'bg-slate-200 text-slate-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {c.loyaltyTier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
