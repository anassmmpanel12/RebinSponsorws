import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderItem } from '../types';
import { ShoppingCart, Plus, Minus, Trash2, Printer, CheckCircle, Search, X } from 'lucide-react';

export const SalesModule: React.FC = () => {
  const { products, customers, createOrder, orders, t, currentTenant, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'partial' | 'unpaid'>('paid');
  const [recentOrderForPrint, setRecentOrderForPrint] = useState<any | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => item.productId === product.id ? {
          ...item,
          quantity: item.quantity + 1,
          total: (item.quantity + 1) * item.unitPrice
        } : item);
      } else {
        return [...prev, {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.sellingPrice,
          total: product.sellingPrice
        }];
      }
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, total: newQty * item.unitPrice };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const customer = customers.find(c => c.id === selectedCustomerId);
    const amountPaid = paymentStatus === 'paid' ? finalTotal : paidAmount;

    createOrder({
      customerId: selectedCustomerId || undefined,
      customerName: customer ? customer.name : 'Walk-in Customer',
      items: cart,
      subtotal,
      discount,
      tax: 0,
      total: finalTotal,
      paidAmount: amountPaid,
      paymentMethod: 'cash',
      paymentStatus,
      orderStatus: 'completed',
      cashierName: currentUser?.name || 'Halkawt Omar'
    });

    // Reset cart
    setCart([]);
    setDiscount(0);
    setPaidAmount(0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' ' + (currentTenant?.currency || 'IQD');
  };

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Product Catalog & POS Search */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products for POS..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
          {filteredProducts.map(p => (
            <div 
              key={p.id}
              onClick={() => p.stockQty > 0 && addToCart(p)}
              className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                p.stockQty > 0 ? 'border-slate-200 hover:border-emerald-800 hover:shadow-md' : 'opacity-60 border-slate-200 cursor-not-allowed bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{p.category}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.stockQty > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {p.stockQty > 0 ? `${p.stockQty} in stock` : 'Out of stock'}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 mt-2 line-clamp-1">{p.name}</h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{p.sku}</p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{formatCurrency(p.sellingPrice)}</span>
                <span className="p-2 bg-emerald-50 text-emerald-900 rounded-lg text-xs font-bold">
                  + Add
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Cart & Checkout */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between h-[720px]">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-800" />
              {t('cart')} ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
            {cart.length > 0 && (
              <button onClick={() => setCart([])} className="text-xs font-semibold text-rose-700 hover:underline">
                Clear Cart
              </button>
            )}
          </div>

          {/* Customer Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Customer</label>
            <select
              value={selectedCustomerId}
              onChange={e => setSelectedCustomerId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            >
              <option value="">Walk-in Customer (General)</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>
          </div>

          {/* Cart Items List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Your cart is empty. Click products from catalog to add.
              </div>
            ) : (
              cart.map(item => (
                <div key={item.productId} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-1 pr-2">
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.productName}</p>
                    <p className="text-xs text-emerald-900 font-bold mt-0.5 tabular-nums">{formatCurrency(item.unitPrice)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.productId, -1)} className="p-1 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-100">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-6 text-center tabular-nums">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 1)} className="p-1 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-100">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeFromCart(item.productId)} className="p-1 text-rose-600 hover:bg-rose-50 rounded-md ml-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Totals & Checkout Actions */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>{t('subtotal')}</span>
              <span className="font-semibold tabular-nums">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>{t('discount')}</span>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(Number(e.target.value))}
                className="w-28 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right text-xs tabular-nums font-bold"
              />
            </div>
            <div className="flex justify-between text-slate-900 font-bold text-base pt-2 border-t border-slate-200">
              <span>{t('total')}</span>
              <span className="text-emerald-900 text-lg tabular-nums">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          {/* Payment Status */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => { setPaymentStatus('paid'); setPaidAmount(finalTotal); }}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${paymentStatus === 'paid' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
            >
              {t('paid')}
            </button>
            <button
              type="button"
              onClick={() => { setPaymentStatus('partial'); setPaidAmount(finalTotal / 2); }}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${paymentStatus === 'partial' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
            >
              {t('partial')}
            </button>
            <button
              type="button"
              onClick={() => { setPaymentStatus('unpaid'); setPaidAmount(0); }}
              className={`py-2 text-xs font-bold rounded-xl border transition-all ${paymentStatus === 'unpaid' ? 'bg-rose-700 text-white border-rose-700' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
            >
              {t('unpaid')}
            </button>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
              cart.length > 0 ? 'bg-emerald-900 hover:bg-emerald-950 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Complete Order & Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
