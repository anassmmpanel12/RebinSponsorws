import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Bell, AlertTriangle, UserCircle, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t, activeTab, currentUser, products, isRtl } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const lowStockProducts = products.filter(p => p.stockQty <= p.minStockAlert);

  const getPageTitle = () => {
    switch(activeTab) {
      case 'dashboard': return t('dashboard');
      case 'products': return t('products');
      case 'customers': return t('customers');
      case 'sales': return t('sales');
      case 'expenses': return t('expenses');
      case 'reports': return t('reports');
      case 'employees': return t('employees');
      case 'settings': return t('settings');
      default: return t('appName');
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 shadow-xs">
      {/* Left: Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{getPageTitle()}</h2>
        <span className="hidden md:inline-block px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-md border border-emerald-100">
          Live SaaS Workspace
        </span>
      </div>

      {/* Right: Language switcher, notifications & user */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>{language === 'ku' ? 'کوردی' : language === 'ar' ? 'العربية' : 'English'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30`}>
              <button 
                onClick={() => { setLanguage('ku'); setShowLangMenu(false); }}
                className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 ${language === 'ku' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-700'}`}
              >
                کوردی (Sorani)
              </button>
              <button 
                onClick={() => { setLanguage('ar'); setShowLangMenu(false); }}
                className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 ${language === 'ar' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-700'}`}
              >
                العربية (Arabic)
              </button>
              <button 
                onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 ${language === 'en' ? 'text-emerald-800 font-bold bg-emerald-50' : 'text-slate-700'}`}
              >
                English
              </button>
            </div>
          )}
        </div>

        {/* Low Stock Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Low Stock Alerts"
          >
            <Bell className="w-5 h-5" />
            {lowStockProducts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {lowStockProducts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-30`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {t('lowStockAlerts')}
                </span>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                  {lowStockProducts.length}
                </span>
              </div>
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {lowStockProducts.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">All product stocks are at healthy levels.</p>
                ) : (
                  lowStockProducts.map(p => (
                    <div key={p.id} className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{p.name}</p>
                        <p className="text-[11px] text-rose-700 font-medium">Stock remaining: {p.stockQty} (Min: {p.minStockAlert})</p>
                      </div>
                      <span className="px-2 py-1 bg-rose-600 text-white text-[10px] font-bold rounded-md">Restock</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            <UserCircle className="w-6 h-6 text-emerald-800" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{currentUser?.name || 'Halkawt Omar'}</p>
            <p className="text-xs text-emerald-700 capitalize font-medium">{currentUser?.role || 'owner'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
