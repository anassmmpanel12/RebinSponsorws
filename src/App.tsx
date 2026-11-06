/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardModule } from './components/DashboardModule';
import { ProductsModule } from './components/ProductsModule';
import { CustomersModule } from './components/CustomersModule';
import { SalesModule } from './components/SalesModule';
import { PurchasesModule } from './components/PurchasesModule';
import { CashDrawerModule } from './components/CashDrawerModule';
import { LoyaltyModule } from './components/LoyaltyModule';
import { ReturnsModule } from './components/ReturnsModule';
import { BranchesModule } from './components/BranchesModule';
import { DebtsModule } from './components/DebtsModule';
import { ActivityLogModule } from './components/ActivityLogModule';
import { ExpensesModule } from './components/ExpensesModule';
import { ReportsModule } from './components/ReportsModule';
import { EmployeesModule } from './components/EmployeesModule';
import { SettingsModule } from './components/SettingsModule';

const MainLayout: React.FC = () => {
  const { activeTab, isRtl } = useApp();

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardModule />;
      case 'sales': return <SalesModule />;
      case 'products': return <ProductsModule />;
      case 'customers': return <CustomersModule />;
      case 'purchases': return <PurchasesModule />;
      case 'cashRegister': return <CashDrawerModule />;
      case 'loyalty': return <LoyaltyModule />;
      case 'returns': return <ReturnsModule />;
      case 'branches': return <BranchesModule />;
      case 'debts': return <DebtsModule />;
      case 'activityLog': return <ActivityLogModule />;
      case 'expenses': return <ExpensesModule />;
      case 'reports': return <ReportsModule />;
      case 'employees': return <EmployeesModule />;
      case 'settings': return <SettingsModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <div className={`min-h-screen flex bg-slate-50 text-slate-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
