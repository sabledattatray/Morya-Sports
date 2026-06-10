'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Clock, 
  ShoppingBag, 
  Plus, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  Truck,
  MapPin,
  Bell,
  CheckCircle2,
  MessageSquare,
  Zap
} from 'lucide-react';
import { PRODUCTS as initialProducts, Product } from '../../data/mockData';

const LOW_STOCK_THRESHOLD = 5;

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'timings' | 'orders' | 'delivery'>('analytics');
  
  // Product Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(0);
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdCategory, setNewProdCategory] = useState('Cricket');

  // Timings override states
  const [holidayMode, setHolidayMode] = useState(false);
  const [closingTimeOverride, setClosingTimeOverride] = useState('09:00 PM');

  // Delivery Config States
  const [deliveryRadius, setDeliveryRadius] = useState(8);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(999);
  const [deliveryWindowHours, setDeliveryWindowHours] = useState(24);
  const [deliverySaved, setDeliverySaved] = useState(false);

  // Orders Status states
  const [orders, setOrders] = useState([
    { id: 'MS-482910', customer: 'Rahul Deshmukh', items: 'SS Ton Cricket Bat (x1)', total: 3499, date: 'June 08', status: 'Shipped', phone: '9820012345' },
    { id: 'MS-103948', customer: 'Amit Sharma', items: 'Badminton Racket (x1)', total: 799, date: 'June 09', status: 'Pending', phone: '9876543210' },
    { id: 'MS-504938', customer: 'Sneha Patil', items: 'Custom Team Jersey (x2)', total: 998, date: 'June 09', status: 'Pending', phone: '9011234567' }
  ]);

  const lowStockItems = products.filter(p => p.stockCount <= LOW_STOCK_THRESHOLD && p.stockCount > 0);
  const outOfStockItems = products.filter(p => p.stockCount === 0);

  const handleUpdateStock = (id: string, delta: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const nextStock = Math.max(0, p.stockCount + delta);
        return { ...p, stockCount: nextStock, inStock: nextStock > 0 };
      }
      return p;
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const newProduct: Product = {
      id: 'prod-' + (products.length + 1),
      name: newProdName,
      category: newProdCategory,
      price: newProdPrice,
      rating: 5.0,
      reviewsCount: 0,
      ageGroup: 'All Ages',
      brand: 'Custom Brand',
      images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80'],
      inStock: newProdStock > 0,
      stockCount: newProdStock,
      description: 'Custom sports product added via Store Admin Panel.',
      specifications: { 'Origin': 'Made in India' },
      deliveryDays: 2
    };

    setProducts([...products, newProduct]);
    setNewProdName('');
    setNewProdPrice(0);
    setNewProdStock(10);
    alert('Product added successfully!');
  };

  const handleUpdateOrderStatus = (id: string, status: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleWhatsAppNotify = (order: typeof orders[0]) => {
    const msg = encodeURIComponent(
      `🏆 *Morya Sports Order Update*\n\nHi ${order.customer}! Your order *${order.id}* is now *${order.status}*.\n\nItems: ${order.items}\nTotal: ₹${order.total}\n\nFor queries call: 08104812757\nThank you for shopping with Morya Sports, Badlapur! 🏆`
    );
    window.open(`https://wa.me/91${order.phone}?text=${msg}`, '_blank');
  };

  const handleSaveDelivery = () => {
    setDeliverySaved(true);
    setTimeout(() => setDeliverySaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Low Stock Alert Banner */}
      {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 rounded-2xl flex items-start gap-3 animate-pop-in">
          <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg flex-shrink-0 mt-0.5">
            <Bell size={16} className="text-red-600 dark:text-red-400 animate-wiggle" />
          </div>
          <div className="flex-grow">
            <h4 className="font-poppins font-bold text-sm text-red-700 dark:text-red-400">
              🚨 Stock Alert — Action Required
            </h4>
            <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">
              {outOfStockItems.length > 0 && `${outOfStockItems.length} product(s) out of stock. `}
              {lowStockItems.length > 0 && `${lowStockItems.length} product(s) running low (≤${LOW_STOCK_THRESHOLD} units).`}
            </p>
            {lowStockItems.slice(0, 3).map(p => (
              <div key={p.id} className="text-[11px] text-red-500 dark:text-red-400 mt-1 font-semibold">
                • {p.name} — only {p.stockCount} unit{p.stockCount !== 1 ? 's' : ''} left
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab('products')}
            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer whitespace-nowrap"
          >
            Manage Stock →
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--border)] pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-black text-[var(--foreground)] tracking-tight">Store Manager Control Panel</h1>
          <p className="text-xs text-[var(--muted)] font-semibold uppercase tracking-wider text-primary">Secure Admin Dashboard</p>
        </div>

        {/* Tab triggers */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
          {[
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={14} /> },
            { id: 'products', label: 'Inventory', icon: <Package size={14} /> },
            { id: 'timings', label: 'Timings', icon: <Clock size={14} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag size={14} /> },
            { id: 'delivery', label: 'Delivery', icon: <Truck size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow' 
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Summary grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <TrendingUp className="text-primary" />, title: 'Total Revenue', value: '₹1,42,850', sub: '+12% this week', subColor: 'text-green-500' },
              { icon: <ShoppingBag className="text-secondary" />, title: 'Total Orders', value: '184', sub: '+8% this week', subColor: 'text-green-500' },
              { icon: <Users className="text-accent" />, title: 'Active Visitors', value: '1,248', sub: '92% in Badlapur', subColor: 'text-blue-500' },
              { icon: <AlertTriangle className="text-red-500" />, title: 'Low Stock Alerts', value: `${lowStockItems.length + outOfStockItems.length} items`, sub: lowStockItems.length > 0 ? 'Action required' : 'All stocked up', subColor: lowStockItems.length > 0 ? 'text-red-500' : 'text-green-500' }
            ].map((card, idx) => (
              <div key={idx} className="p-6 border border-[var(--border)] bg-[var(--card)] rounded-3xl card-shadow space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[var(--muted)] uppercase">{card.title}</span>
                  <div className="p-2 bg-[var(--background)] rounded-xl shadow-sm">{card.icon}</div>
                </div>
                <div className="text-2xl font-poppins font-black text-[var(--foreground)]">{card.value}</div>
                <div className={`text-[10px] font-bold ${card.subColor}`}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow space-y-4">
            <h3 className="font-poppins font-bold text-sm text-[var(--foreground)]">Weekly Orders Trend</h3>
            <div className="h-48 flex items-end justify-between gap-2.5 pt-8 px-4 border-b border-l border-[var(--border)]">
              {[
                { day: 'Mon', count: 18, height: '35%' },
                { day: 'Tue', count: 24, height: '48%' },
                { day: 'Wed', count: 22, height: '44%' },
                { day: 'Thu', count: 32, height: '64%' },
                { day: 'Fri', count: 48, height: '96%' },
                { day: 'Sat', count: 42, height: '84%' },
                { day: 'Sun', count: 45, height: '90%' }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity mb-1">{bar.count}</span>
                  <div 
                    className="w-full bg-primary hover:bg-primary-hover rounded-t-lg transition-all duration-500 cursor-pointer"
                    style={{ height: bar.height }}
                  />
                  <span className="text-[10px] font-semibold text-[var(--muted)] mt-2">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS INVENTORY TAB */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Add product form */}
          <form onSubmit={handleAddProduct} className="lg:col-span-4 border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow space-y-4">
            <h3 className="font-poppins font-bold text-base border-b border-[var(--border)] pb-2 flex items-center space-x-1.5">
              <Plus size={18} className="text-primary" />
              <span>Add New Product</span>
            </h3>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--foreground)] uppercase">Product Name</label>
              <input 
                type="text" required placeholder="Smart Sports Gear"
                value={newProdName} onChange={(e) => setNewProdName(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--foreground)] uppercase">Price (₹)</label>
                <input 
                  type="number" required value={newProdPrice || ''} onChange={(e) => setNewProdPrice(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--foreground)] uppercase">Stock Count</label>
                <input 
                  type="number" required value={newProdStock} onChange={(e) => setNewProdStock(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[var(--foreground)] uppercase">Category</label>
              <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs focus:outline-none">
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Badminton">Badminton</option>
                <option value="Jerseys & Sportswear">Jerseys & Sportswear</option>
                <option value="Kabaddi & Wrestling">Kabaddi & Wrestling</option>
                <option value="Athletics & Running">Athletics & Running</option>
                <option value="Trophies & Medals">Trophies & Medals</option>
                <option value="Gym & Fitness">Gym & Fitness</option>
                <option value="Outdoor Sports">Outdoor Sports</option>
                <option value="School Sports Kits">School Sports Kits</option>
              </select>
            </div>

            <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all">
              Save Product
            </button>
          </form>

          {/* Product table */}
          <div className="lg:col-span-8 border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow overflow-x-auto">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-4">
              <h3 className="font-poppins font-bold text-base">Stock Inventory</h3>
              {lowStockItems.length > 0 && (
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <AlertTriangle size={10} /> {lowStockItems.length} Low Stock
                </span>
              )}
            </div>
            
            <table className="w-full text-left border-collapse text-xs font-semibold">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted)] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 pr-2">Product Name</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Price</th>
                  <th className="pb-3 px-2 text-center">Stock</th>
                  <th className="pb-3 pl-2 text-right">Modify</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const isLow = p.stockCount > 0 && p.stockCount <= LOW_STOCK_THRESHOLD;
                  const isOut = p.stockCount === 0;
                  return (
                    <tr key={p.id} className={`border-b border-[var(--border)] ${isOut ? 'bg-red-50/50 dark:bg-red-950/10' : isLow ? 'bg-amber-50/50 dark:bg-amber-950/10' : ''}`}>
                      <td className="py-3.5 pr-2 font-bold text-[var(--foreground)] max-w-[150px] truncate">
                        {isLow && <span className="text-amber-500 mr-1">⚠</span>}
                        {isOut && <span className="text-red-500 mr-1">🚨</span>}
                        {p.name}
                      </td>
                      <td className="py-3.5 px-2 text-[var(--muted)]">{p.category}</td>
                      <td className="py-3.5 px-2 text-[var(--foreground)]">₹{p.price}</td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          isOut ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                          : isLow ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400'
                        }`}>
                          {isOut ? 'Out of Stock' : `${p.stockCount} units`}
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 text-right flex items-center justify-end space-x-1.5">
                        <button onClick={() => handleUpdateStock(p.id, -1)}
                          className="w-6 h-6 border border-[var(--border)] rounded flex items-center justify-center font-black hover:bg-[var(--background)] cursor-pointer">-</button>
                        <button onClick={() => handleUpdateStock(p.id, 1)}
                          className="w-6 h-6 border border-[var(--border)] rounded flex items-center justify-center font-black hover:bg-[var(--background)] cursor-pointer">+</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LIVE TIMINGS OVERRIDES TAB */}
      {activeTab === 'timings' && (
        <div className="max-w-2xl mx-auto border border-[var(--border)] bg-[var(--card)] p-8 rounded-3xl card-shadow space-y-6 animate-in fade-in duration-200">
          <h3 className="font-poppins font-bold text-lg border-b border-[var(--border)] pb-2 flex items-center space-x-2">
            <Clock size={20} className="text-primary" />
            <span>Store Timings Operations</span>
          </h3>

          <div className="flex items-center justify-between p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-sm">
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-[var(--foreground)]">Store Holiday Mode</h4>
              <p className="text-[10px] text-[var(--muted)] font-semibold">Toggles the storefront status to "Closed Now" for holidays or events.</p>
            </div>
            <input type="checkbox" checked={holidayMode} onChange={(e) => {
              setHolidayMode(e.target.checked);
              alert(e.target.checked ? 'Store status locked to Closed' : 'Store timings restored to standard schedule');
            }} className="w-4 h-4 rounded text-primary border-[var(--border)]" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--foreground)] uppercase block">Override Standard Closing Hour (Daily 9 AM - 9 PM)</label>
            <select value={closingTimeOverride} onChange={(e) => {
              setClosingTimeOverride(e.target.value);
              alert(`Closing hour updated to ${e.target.value}`);
            }} className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none">
              <option value="09:00 PM">09:00 PM (Standard)</option>
              <option value="08:00 PM">08:00 PM (Early Closing)</option>
              <option value="07:00 PM">07:00 PM (Festival Early)</option>
              <option value="10:00 PM">10:00 PM (Extended Timing)</option>
            </select>
          </div>
        </div>
      )}

      {/* ORDERS TRACKING TAB */}
      {activeTab === 'orders' && (
        <div className="border border-[var(--border)] bg-[var(--card)] p-6 rounded-3xl card-shadow overflow-x-auto animate-in fade-in duration-200">
          <h3 className="font-poppins font-bold text-base border-b border-[var(--border)] pb-2 mb-4">Active Shop Orders</h3>
          
          <table className="w-full text-left border-collapse text-xs font-semibold">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)] uppercase tracking-wider text-[10px]">
                <th className="pb-3 pr-2">Order ID</th>
                <th className="pb-3 px-2">Customer</th>
                <th className="pb-3 px-2">Items</th>
                <th className="pb-3 px-2">Total</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 pl-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id} className="border-b border-[var(--border)]">
                  <td className="py-3.5 pr-2 font-bold text-[var(--foreground)]">{ord.id}</td>
                  <td className="py-3.5 px-2 text-[var(--foreground)]">{ord.customer}</td>
                  <td className="py-3.5 px-2 text-[var(--muted)]">{ord.items}</td>
                  <td className="py-3.5 px-2 text-[var(--foreground)]">₹{ord.total}</td>
                  <td className="py-3.5 px-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      ord.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400' 
                      : ord.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                    }`}>{ord.status}</span>
                  </td>
                  <td className="py-3.5 pl-2 text-right flex items-center justify-end gap-2">
                    <select value={ord.status} onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                      className="py-1 px-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[10px] focus:outline-none">
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      onClick={() => handleWhatsAppNotify(ord)}
                      title="Notify customer via WhatsApp"
                      className="p-1.5 bg-green-100 hover:bg-green-200 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg transition-colors cursor-pointer"
                    >
                      <MessageSquare size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DELIVERY RADIUS CONFIG TAB */}
      {activeTab === 'delivery' && (
        <div className="max-w-2xl mx-auto border border-[var(--border)] bg-[var(--card)] p-8 rounded-3xl card-shadow space-y-6 animate-in fade-in duration-200">
          <h3 className="font-poppins font-bold text-lg border-b border-[var(--border)] pb-2 flex items-center space-x-2">
            <MapPin size={20} className="text-primary" />
            <span>Local Delivery Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground)] uppercase block">
                Delivery Radius (km)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range" min={1} max={30} value={deliveryRadius}
                  onChange={e => setDeliveryRadius(Number(e.target.value))}
                  className="flex-grow accent-primary"
                />
                <span className="text-sm font-black text-primary w-12 text-right">{deliveryRadius} km</span>
              </div>
              <p className="text-[10px] text-[var(--muted)]">Orders outside this radius will show "Call for availability"</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground)] uppercase block">
                Base Delivery Fee (₹)
              </label>
              <input type="number" value={deliveryFee} onChange={e => setDeliveryFee(Number(e.target.value))}
                className="w-full py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground)] uppercase block">
                Free Delivery Threshold (₹)
              </label>
              <input type="number" value={freeDeliveryThreshold} onChange={e => setFreeDeliveryThreshold(Number(e.target.value))}
                className="w-full py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
              <p className="text-[10px] text-[var(--muted)]">Orders above this value get free delivery automatically</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--foreground)] uppercase block">
                Estimated Delivery Window (hours)
              </label>
              <select value={deliveryWindowHours} onChange={e => setDeliveryWindowHours(Number(e.target.value))}
                className="w-full py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none">
                <option value={2}>2 Hours (Express)</option>
                <option value={4}>4 Hours (Same Day)</option>
                <option value={24}>24 Hours (Next Day)</option>
                <option value={48}>48 Hours (Standard)</option>
              </select>
            </div>
          </div>

          {/* Preview Card */}
          <div className="p-4 border border-primary/20 bg-primary/5 rounded-2xl space-y-1.5">
            <div className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
              <Zap size={12} /> Current Config Preview
            </div>
            <div className="text-sm text-[var(--foreground)] font-semibold">
              Delivering within <span className="text-primary">{deliveryRadius}km</span> of Badlapur.
              Base fee: <span className="text-primary">₹{deliveryFee}</span>.
              Free delivery on orders above <span className="text-primary">₹{freeDeliveryThreshold}</span>.
              Estimated window: <span className="text-primary">{deliveryWindowHours}h</span>.
            </div>
          </div>

          <button onClick={handleSaveDelivery}
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2">
            {deliverySaved ? (
              <><CheckCircle2 size={16} /> Delivery Config Saved!</>
            ) : (
              <><Truck size={16} /> Save Delivery Configuration</>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
