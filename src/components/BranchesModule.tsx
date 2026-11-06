import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, MapPin, Phone, User } from 'lucide-react';

export const BranchesModule: React.FC = () => {
  const { branches, t } = useApp();

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900">{t('branches')}</h3>
        <p className="text-xs text-slate-500 mt-0.5">Manage multiple business branches across Iraq (Erbil, Baghdad, Sulaimani)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map(b => (
          <div key={b.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{b.name}</h4>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    {b.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{b.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-mono">{b.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span>Manager: <strong className="text-slate-900">{b.managerName}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
