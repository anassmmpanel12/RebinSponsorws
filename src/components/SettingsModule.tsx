import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store, Save, Sparkles } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const { currentTenant, updateBusinessSettings, loadDemoData, t } = useApp();

  const [name, setName] = useState(currentTenant?.name || '');
  const [phone, setPhone] = useState(currentTenant?.phone || '');
  const [address, setAddress] = useState(currentTenant?.address || '');
  const [city, setCity] = useState(currentTenant?.city || 'Erbil');
  const [taxRate, setTaxRate] = useState(currentTenant?.taxRate || 5);
  const [invoiceFooter, setInvoiceFooter] = useState(currentTenant?.invoiceFooter || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessSettings({
      name,
      phone,
      address,
      city,
      taxRate,
      invoiceFooter
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{t('settings')}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Manage your business profile, currency (IQD), and invoice receipts</p>
          </div>
        </div>
        <button
          onClick={loadDemoData}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition-all border border-emerald-200"
        >
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>{t('loadDemoData')}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <span>✓ Settings successfully updated!</span>
        </div>
      )}

      {/* Settings Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t('businessName')}</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Business City / Hub</label>
              <input
                type="text"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t('phone')}</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Currency</label>
              <input
                type="text"
                disabled
                value="Iraqi Dinar (IQD)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t('address')}</label>
            <input
              type="text"
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Invoice Footer Note</label>
            <textarea
              rows={3}
              value={invoiceFooter}
              onChange={e => setInvoiceFooter(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-sm font-bold shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{t('save')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
