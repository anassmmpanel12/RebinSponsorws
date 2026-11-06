import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldUser, Plus, Phone, Mail, X } from 'lucide-react';
import { UserRole } from '../types';

export const EmployeesModule: React.FC = () => {
  const { employees, addEmployee, t } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('cashier');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({
      name,
      email,
      phone,
      role,
      status: 'active'
    });
    setName('');
    setEmail('');
    setPhone('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t('employees')}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Manage team roles and system access permissions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-sm font-bold shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addEmployee')}</span>
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-6">{t('employeeName')}</th>
                <th className="py-3.5 px-6">{t('email')}</th>
                <th className="py-3.5 px-6">{t('phone')}</th>
                <th className="py-3.5 px-6">{t('role')}</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">No employees added yet.</td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <ShieldUser className="w-4 h-4 text-emerald-800" />
                      {emp.name}
                    </td>
                    <td className="py-4 px-6 text-slate-600 flex items-center gap-1.5 font-mono text-xs">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {emp.email}
                    </td>
                    <td className="py-4 px-6 text-slate-600 flex items-center gap-1.5 font-mono text-xs">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {emp.phone}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase ${
                        emp.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                        emp.role === 'manager' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{emp.joinedDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900">{t('addEmployee')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('employeeName')}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  placeholder="e.g. Aram Bakhtiyar"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('email')}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 font-mono"
                  placeholder="aram@vexora.iq"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('phone')}</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 font-mono"
                  placeholder="+964 770 ..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t('role')}</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 capitalize"
                >
                  <option value="owner">Owner (Full Permissions)</option>
                  <option value="manager">Manager (Operations & Reports)</option>
                  <option value="cashier">Cashier (POS & Sales)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-sm font-bold shadow-md transition-all"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
