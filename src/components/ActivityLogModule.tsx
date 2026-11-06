import React from 'react';
import { useApp } from '../context/AppContext';
import { History, ShieldUser } from 'lucide-react';

export const ActivityLogModule: React.FC = () => {
  const { activityLogs, t } = useApp();

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900">{t('activityLog')}</h3>
        <p className="text-xs text-slate-500 mt-0.5">Secure audit trail tracking employee actions, invoice modifications, and stock adjustments</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {activityLogs.map(log => (
            <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center font-bold">
                  <History className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{log.action}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md flex items-center gap-1">
                      <ShieldUser className="w-3 h-3" /> {log.employeeName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{log.details}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
