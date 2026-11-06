import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, ShoppingCart, Package, Users, Truck, 
  Wallet, Award, RotateCcw, Building2, CreditCard, History, 
  Receipt, BarChart3, ShieldUser, Settings, Sparkles, LogOut 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, currentTenant, loadDemoData, logout, isRtl, branches, currentBranch, switchBranch } = useApp();

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'sales', label: t('sales'), icon: ShoppingCart },
    { id: 'products', label: t('products'), icon: Package },
    { id: 'customers', label: t('customers'), icon: Users },
    { id: 'purchases', label: t('purchases'), icon: Truck },
    { id: 'cashRegister', label: t('cashRegister'), icon: Wallet },
    { id: 'loyalty', label: t('loyalty'), icon: Award },
    { id: 'returns', label: t('returns'), icon: RotateCcw },
    { id: 'branches', label: t('branches'), icon: Building2 },
    { id: 'debts', label: t('debts'), icon: CreditCard },
    { id: 'activityLog', label: t('activityLog'), icon: History },
    { id: 'expenses', label: t('expenses'), icon: Receipt },
    { id: 'reports', label: t('reports'), icon: BarChart3 },
    { id: 'employees', label: t('employees'), icon: ShieldUser },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside className={`w-72 bg-white border-${isRtl ? 'l' : 'r'} border-slate-200 flex flex-col h-screen sticky top-0 shadow-xs z-20`}>
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-bold text-xl shadow-md">
          V
        </div>
        <div>
          <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight">{t('appName')}</h1>
          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[160px]">
            ERP & POS Platform Iraq
          </p>
        </div>
      </div>

      {/* Branch Selector */}
      <div className="p-3 border-b border-slate-100 bg-slate-50">
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Active Branch</label>
        <select
          value={currentBranch?.id}
          onChange={e => switchBranch(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-800"
        >
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name} ({b.city})</option>
          ))}
        </select>
      </div>

      {/* Demo data quick loader banner */}
      <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-900">Iraq Retail Setup</span>
        </div>
        <button 
          onClick={loadDemoData}
          className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
        >
          {t('loadDemoData')}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive 
                  ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/10 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};
