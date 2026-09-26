import React, { useState } from 'react';
import { Product, Order, InquiryMessage } from '../types';
import { BRAND_LOGO } from '../data/mockData';

interface AdminPageProps {
  products: Product[];
  orders: Order[];
  inquiries: InquiryMessage[];
  onAddProduct: (newProduct: Product) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onNavigateToStore: () => void;
}

type AdminTab = 'overview' | 'products' | 'orders' | 'analytics' | 'messages' | 'settings';

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  orders,
  inquiries,
  onAddProduct,
  onUpdateOrderStatus,
  onNavigateToStore,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'year'>('today');

  // Inspect order state
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(orders[0] || null);

  // Add Product Modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<any>('Kurtis');
  const [newProdPrice, setNewProdPrice] = useState(2490);
  const [newProdFabric, setNewProdFabric] = useState('Chanderi Silk');
  const [newProdProvenance, setNewProdProvenance] = useState('Chanderi, MP');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Settings State
  const [storeName, setStoreName] = useState('Simply Styld');
  const [tagline, setTagline] = useState('Everyday styles, simply styled.');
  const [conciergePhone, setConciergePhone] = useState('+91 98201 45890');
  const [studioAddress, setStudioAddress] = useState('42, Heritage Boulevard, Khar West, Mumbai - 400052');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(1999);
  const [isSavedSettings, setIsSavedSettings] = useState(false);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      rating: 5.0,
      reviewCount: 1,
      badge: 'NEW LAUNCH',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAKh1hf0Qc_1zf9rHQSWJKU6P3dAZnOfVr20S7uXdiGdgjPfQ1ybsoFPF-nKCv_eedtQN0pnl3iuGLrw8wmg4K45rG0LPC1COZikQqkBfzkpgoXjEmVkTr4K4YPuDTOQJz4pOMWP51sq49lfeRE9z-cW_iBJFvf_TzXfJ3JKa6gV9wzqh9UjThGg6h2zw3eHFbfIk0pFfOJNWiibVDK_kOCmXH5x9Uc8nZJ0FpmNYaLoxAiSCgRu-siz5rEPZnGH4oFSyU'
      ],
      description: newProdDesc || 'Artisanal handcrafted silhouette in breathable pure weaves.',
      provenance: newProdProvenance,
      fabric: newProdFabric,
      colors: [{ name: 'Ivory', hex: '#FAF7F0' }],
      sizes: [
        { size: 'M', stock: 5, status: 'Ready' },
        { size: 'L', stock: 5, status: 'Ready' },
        { size: 'XL', stock: 5, status: 'Ready' },
        { size: 'XXL', stock: 2, status: 'Few Left' }
      ],
      details: ['Handmade weave', 'Pure cotton lining'],
      careInstructions: ['Dry clean only']
    };

    onAddProduct(newProd);
    setShowAddProductModal(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  return (
    <div className="w-full bg-[#F7F2E9] min-h-screen text-[#171513] pb-20">
      
      {/* Top Atelier Bar */}
      <header className="sticky top-16 z-30 bg-[#F7F2E9]/95 backdrop-blur-md border-b border-[#D8C8AE]/80 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#D8C8AE] bg-[#FCFAF6] overflow-hidden flex items-center justify-center shrink-0">
            <img
              src={BRAND_LOGO}
              alt="Simply Styld Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6nU6SILkXaRsg2r4K04zrch0bHJvpK2eBDhEN1aDAhPQP1Z4FhOA53Qu-IqLhlVt_nZPAR2g2mxitYgIC9haLcAqlVaQiH_Pav3ecw_c1MmfFaYx7FhUXoLRy3Qa4S7Kzck7G74A5NLTcHcn9wY824xgI_zM-SGtrSiOZwf2mX-7n0LEro3xuqzCwwlytbHw-_Tec-UvpoPRLDb4rnFDV8TGxggk9ABBYeQGm4nGoUvDzjIQru4uktVJ9zCS-zH1MY3o';
              }}
            />
          </div>
          <div>
            <span className="font-serif font-bold text-base tracking-wider block leading-tight">
              SIMPLY STYLD
            </span>
            <span className="text-[10px] tracking-widest text-[#745a2f] uppercase font-semibold">
              Store Atelier • /admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateToStore}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>View Live Store</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#fedaa4] text-[#795e33] border border-[#D8C8AE] flex items-center justify-center font-bold text-xs">
            SS
          </div>
        </div>
      </header>

      {/* Horizontal Tab Navigation */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-[#D8C8AE]/60 bg-[#FCFAF6] overflow-x-auto whitespace-nowrap flex gap-2 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-[#171513] text-white shadow-xs'
              : 'bg-[#F7F2E9] border border-[#D8C8AE] text-[#171513] hover:bg-[#EDE4D6]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            activeTab === 'products'
              ? 'bg-[#171513] text-white shadow-xs'
              : 'bg-[#F7F2E9] border border-[#D8C8AE] text-[#171513] hover:bg-[#EDE4D6]'
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            activeTab === 'orders'
              ? 'bg-[#171513] text-white shadow-xs'
              : 'bg-[#F7F2E9] border border-[#D8C8AE] text-[#171513] hover:bg-[#EDE4D6]'
          }`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            activeTab === 'analytics'
              ? 'bg-[#171513] text-white shadow-xs'
              : 'bg-[#F7F2E9] border border-[#D8C8AE] text-[#171513] hover:bg-[#EDE4D6]'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            activeTab === 'messages'
              ? 'bg-[#171513] text-white shadow-xs'
              : 'bg-[#F7F2E9] border border-[#D8C8AE] text-[#171513] hover:bg-[#EDE4D6]'
          }`}
        >
          Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-[#171513] text-white shadow-xs'
              : 'bg-[#F7F2E9] border border-[#D8C8AE] text-[#171513] hover:bg-[#EDE4D6]'
          }`}
        >
          Boutique Settings
        </button>
      </div>

      {/* Main Container */}
      <main className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        
        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Greeting Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/70 shadow-xs">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#745a2f] font-semibold">
                  Store Atelier Console
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171513] mt-0.5">
                  Good morning, Simply Styld
                </h1>
                <p className="text-xs text-[#8C827A] mt-0.5">
                  Here is your boutique's operational overview for today.
                </p>
              </div>

              {/* Date Filters */}
              <div className="flex items-center gap-1 bg-[#F7F2E9] p-1 rounded-xl border border-[#D8C8AE]/60 text-xs">
                {(['today', '7days', '30days', 'year'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setDateRange(r)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      dateRange === r
                        ? 'bg-[#171513] text-white shadow-xs'
                        : 'text-[#171513] hover:bg-[#EDE4D6]'
                    }`}
                  >
                    {r === 'today' ? 'Today' : r === '7days' ? '7 Days' : r === '30days' ? '30 Days' : 'Year'}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70 shadow-xs">
                <div className="flex items-center justify-between text-[#8C827A] text-xs">
                  <span>Total Sales</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    +18.4%
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#171513] mt-1.5">₹1,84,650</div>
                <p className="text-[11px] text-[#8C827A] mt-1">42 orders processed</p>
              </div>

              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70 shadow-xs">
                <div className="flex items-center justify-between text-[#8C827A] text-xs">
                  <span>Total Orders</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    +8.2%
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#171513] mt-1.5">42</div>
                <p className="text-[11px] text-[#8C827A] mt-1">6 awaiting fulfillment</p>
              </div>

              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70 shadow-xs">
                <div className="flex items-center justify-between text-[#8C827A] text-xs">
                  <span>Active Catalog</span>
                  <span className="text-[#745a2f] font-semibold text-[10px]">8 Categories</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#171513] mt-1.5">
                  {products.length} SKUs
                </div>
                <p className="text-[11px] text-amber-800 font-medium mt-1">2 low-stock alerts</p>
              </div>

              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70 shadow-xs">
                <div className="flex items-center justify-between text-[#8C827A] text-xs">
                  <span>Boutique Patrons</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                    +14
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#171513] mt-1.5">389</div>
                <p className="text-[11px] text-[#8C827A] mt-1">68% repeat purchase rate</p>
              </div>

            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setShowAddProductModal(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#171513] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#745a2f] transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px] text-[#fedaa4]">add</span>
                <span>Add New Garment</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#FCFAF6] border border-[#D8C8AE] text-[#171513] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#EDE4D6] transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px] text-[#745a2f]">local_shipping</span>
                <span>Dispatch Shipments (4)</span>
              </button>
            </div>

            {/* Recent Orders & Inventory Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Orders (2 cols) */}
              <div className="lg:col-span-2 bg-[#FCFAF6] p-4 sm:p-5 rounded-2xl border border-[#D8C8AE]/70 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold text-[#171513]">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#745a2f] hover:underline font-semibold"
                  >
                    View All ({orders.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F7F2E9] text-[#8C827A] uppercase tracking-wider text-[10px] border-y border-[#D8C8AE]/60">
                      <tr>
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Items</th>
                        <th className="py-2.5 px-3">Total</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D8C8AE]/40">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#f8f3ea]/50 transition">
                          <td className="py-3 px-3 font-semibold text-[#171513]">#{ord.id}</td>
                          <td className="py-3 px-3">
                            <p className="font-semibold text-[#171513]">{ord.customerName}</p>
                            <span className="text-[10px] text-[#8C827A]">{ord.city}</span>
                          </td>
                          <td className="py-3 px-3 text-[#4c4640] truncate max-w-[160px]">
                            {ord.items.map((i) => `${i.productName} (${i.size})`).join(', ')}
                          </td>
                          <td className="py-3 px-3 font-bold text-[#171513]">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                ord.status === 'Processing'
                                  ? 'bg-amber-100 text-amber-800'
                                  : ord.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                setInspectedOrder(ord);
                                setActiveTab('orders');
                              }}
                              className="text-xs font-semibold text-[#745a2f] hover:underline"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side: Low Stock & Inquiries */}
              <div className="space-y-4">
                
                {/* Low Stock Warning */}
                <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-sm font-bold flex items-center gap-1.5 text-[#171513]">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      Low Stock Warning
                    </h3>
                    <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                      Re-order Soon
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#F7F2E9] border border-[#D8C8AE]/60 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#171513]">Gulzar Embroidered Kurti</p>
                        <p className="text-[10px] text-[#8C827A]">Size L • SKU: GZK-IV-L</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-red-600">3 left</span>
                        <p className="text-[9px] text-[#8C827A]">Min limit: 5</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#F7F2E9] border border-[#D8C8AE]/60 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#171513]">Ayla Pakistani Tunic</p>
                        <p className="text-[10px] text-[#8C827A]">Size M • SKU: AYLA-ROSE</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-red-600">2 left</span>
                        <p className="text-[9px] text-[#8C827A]">Min limit: 4</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Inquiries */}
                <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-sm font-bold text-[#171513]">Recent Inquiries</h3>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-[#745a2f] hover:underline font-semibold"
                    >
                      Inbox ({inquiries.length}) →
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    {inquiries.slice(0, 2).map((inq) => (
                      <div key={inq.id} className="p-2.5 rounded-lg bg-[#F7F2E9] border border-[#D8C8AE]/60">
                        <div className="flex justify-between items-center text-[10px] text-[#8C827A] mb-1">
                          <span className="font-bold text-[#171513]">{inq.name}</span>
                          <span>{inq.timeAgo}</span>
                        </div>
                        <p className="text-[#171513] line-clamp-1 font-medium">{inq.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PRODUCTS & INVENTORY */}
        {/* ============================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold">Garments &amp; Catalog</h2>
                <p className="text-xs text-[#8C827A]">Manage boutique cuts, prices, sizes and artisanal weaves.</p>
              </div>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#171513] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#745a2f] shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add New Product</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-[#FCFAF6] rounded-2xl border border-[#D8C8AE]/70 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F2E9] text-[#8C827A] uppercase tracking-wider text-[10px] border-b border-[#D8C8AE]/60">
                    <tr>
                      <th className="py-3 px-4">Garment</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3">Sizes</th>
                      <th className="py-3 px-3">Fabric</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8C8AE]/40">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f8f3ea]/50 transition">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="w-10 h-12 rounded bg-[#EDE4D6] overflow-hidden shrink-0">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#171513]">{p.name}</p>
                            <p className="text-[10px] text-[#8C827A]">{p.provenance}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium">{p.category}</td>
                        <td className="py-3 px-3 font-bold text-[#171513]">₹{p.price.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1">
                            {p.sizes.map((s) => (
                              <span
                                key={s.size}
                                className="px-1.5 py-0.5 rounded bg-[#F7F2E9] border border-[#D8C8AE]/70 text-[9px] font-bold"
                              >
                                {s.size}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#4c4640] max-w-[140px] truncate">{p.fabric}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: ORDERS & FULFILLMENT */}
        {/* ============================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold">Orders &amp; Dispatch</h2>
                <p className="text-xs text-[#8C827A]">Manage fulfillment, packing slips, tracking IDs, and customer shipments.</p>
              </div>
            </div>

            {/* Detailed Inspected Order Card */}
            {inspectedOrder && (
              <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-[#D8C8AE]/50 gap-2">
                  <div>
                    <span className="text-[10px] text-[#745a2f] font-bold uppercase tracking-wider">
                      Selected Order Detail
                    </span>
                    <h3 className="font-serif text-xl font-bold">Order #{inspectedOrder.id}</h3>
                    <p className="text-[11px] text-[#8C827A]">
                      Customer: {inspectedOrder.customerName} • Placed {inspectedOrder.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={inspectedOrder.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Order['status'];
                        onUpdateOrderStatus(inspectedOrder.id, newStatus);
                        setInspectedOrder({ ...inspectedOrder, status: newStatus });
                      }}
                      className="bg-[#f8f3ea] border border-[#D8C8AE] text-xs font-semibold px-3 py-1.5 rounded-lg"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => alert(`Air Waybill (AWB) generated for Order #${inspectedOrder.id}! Handed to Delhivery Express.`)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#171513] text-white text-xs font-semibold hover:bg-[#745a2f] transition-colors"
                    >
                      Generate AWB
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Shipping Address */}
                  <div className="p-3.5 bg-[#F7F2E9] rounded-xl border border-[#D8C8AE]/60 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#745a2f] block tracking-wider">
                      Shipping Address
                    </span>
                    <p className="font-bold text-[#171513]">{inspectedOrder.customerName}</p>
                    <p className="text-[#4c4640]">{inspectedOrder.address}</p>
                    <p className="text-[#4c4640]">{inspectedOrder.city}</p>
                    <p className="text-[#171513] font-medium pt-1">📞 {inspectedOrder.phone}</p>
                  </div>

                  {/* Garments in package */}
                  <div className="p-3.5 bg-[#F7F2E9] rounded-xl border border-[#D8C8AE]/60 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#745a2f] block tracking-wider">
                      Garments in Package
                    </span>
                    {inspectedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#171513]">{it.productName}</p>
                          <p className="text-[10px] text-[#8C827A]">
                            Size {it.size} • {it.color} (Qty: {it.quantity})
                          </p>
                        </div>
                        <span className="font-bold">₹{it.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Breakdown */}
                  <div className="p-3.5 bg-[#F7F2E9] rounded-xl border border-[#D8C8AE]/60 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#745a2f] block tracking-wider">
                      Payment Summary
                    </span>
                    <div className="flex justify-between text-[#8C827A]">
                      <span>Subtotal</span>
                      <span>₹{inspectedOrder.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {inspectedOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Boutique Coupon</span>
                        <span>-₹{inspectedOrder.discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#8C827A]">
                      <span>Delivery</span>
                      <span className="text-emerald-700 font-bold uppercase text-[10px]">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#171513] pt-1 border-t border-[#D8C8AE]/50 text-sm">
                      <span>Total Paid</span>
                      <span>₹{inspectedOrder.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Table */}
            <div className="bg-[#FCFAF6] rounded-2xl border border-[#D8C8AE]/70 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F2E9] text-[#8C827A] uppercase tracking-wider text-[10px] border-b border-[#D8C8AE]/60">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8C8AE]/40">
                  {orders.map((ord) => (
                    <tr
                      key={ord.id}
                      onClick={() => setInspectedOrder(ord)}
                      className={`cursor-pointer transition ${
                        inspectedOrder?.id === ord.id ? 'bg-[#fedaa4]/20' : 'hover:bg-[#f8f3ea]/50'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-[#171513]">#{ord.id}</td>
                      <td className="py-3 px-3 text-[#8C827A]">{ord.date}</td>
                      <td className="py-3 px-3 font-semibold">{ord.customerName}</td>
                      <td className="py-3 px-3 font-bold">₹{ord.total.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 text-[#8C827A]">{ord.paymentMethod}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            ord.status === 'Processing'
                              ? 'bg-amber-100 text-amber-800'
                              : ord.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-xs font-semibold text-[#745a2f] hover:underline">
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ANALYTICS & REVENUE */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold">Boutique Performance</h2>
              <p className="text-xs text-[#8C827A]">Track sales trajectory, bestsellers, and customer metrics.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70">
                <span className="text-xs text-[#8C827A]">Gross Merchandise Value</span>
                <p className="font-serif text-2xl font-bold mt-1">₹4,28,900</p>
                <span className="text-[10px] text-emerald-700 font-bold">+22.4% vs last mo</span>
              </div>
              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70">
                <span className="text-xs text-[#8C827A]">Average Order Value</span>
                <p className="font-serif text-2xl font-bold mt-1">₹3,150</p>
                <span className="text-[10px] text-emerald-700 font-bold">+₹320 improvement</span>
              </div>
              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70">
                <span className="text-xs text-[#8C827A]">Conversion Rate</span>
                <p className="font-serif text-2xl font-bold mt-1">3.8%</p>
                <span className="text-[10px] text-emerald-700 font-bold">High boutique intent</span>
              </div>
              <div className="bg-[#FCFAF6] p-4 rounded-xl border border-[#D8C8AE]/70">
                <span className="text-xs text-[#8C827A]">Return / Exchange Rate</span>
                <p className="font-serif text-2xl font-bold mt-1">1.4%</p>
                <span className="text-[10px] text-emerald-700 font-bold">Industry avg is 14%</span>
              </div>
            </div>

            {/* Category breakdown visual bars */}
            <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/70 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-base font-bold">Revenue by Category</h3>
                <span className="text-xs text-[#745a2f] font-semibold">Kurtis (48%) leads sales</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Handcrafted Kurtis</span>
                    <span>₹2,05,872 (48%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#F7F2E9] overflow-hidden border border-[#D8C8AE]/50">
                    <div className="h-full bg-[#171513] rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Co-ord Matching Sets</span>
                    <span>₹1,11,514 (26%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#F7F2E9] overflow-hidden border border-[#D8C8AE]/50">
                    <div className="h-full bg-[#745a2f] rounded-full" style={{ width: '26%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Pakistani Inspired Edit</span>
                    <span>₹68,624 (16%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#F7F2E9] overflow-hidden border border-[#D8C8AE]/50">
                    <div className="h-full bg-[#8C827A] rounded-full" style={{ width: '16%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Palazzos &amp; Bottoms</span>
                    <span>₹42,890 (10%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#F7F2E9] overflow-hidden border border-[#D8C8AE]/50">
                    <div className="h-full bg-[#D8C8AE] rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: MESSAGES & CLIENT CONCIERGE */}
        {/* ============================================================== */}
        {activeTab === 'messages' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold">Client Inquiries &amp; WhatsApp Concierge</h2>
                <p className="text-xs text-[#8C827A]">Respond to custom sizing, styling advice, and order assistance.</p>
              </div>
              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Open WhatsApp Web</span>
              </a>
            </div>

            <div className="bg-[#FCFAF6] rounded-2xl border border-[#D8C8AE]/70 divide-y divide-[#D8C8AE]/50 overflow-hidden shadow-xs">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#745a2f]"></span>
                      <h4 className="font-bold text-sm text-[#171513]">{inq.name}</h4>
                      <span className="text-[11px] text-[#8C827A]">• {inq.email} {inq.phone && `• ${inq.phone}`}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#171513]">{inq.subject}</p>
                    <p className="text-xs text-[#4c4640] italic leading-relaxed">"{inq.message}"</p>
                  </div>
                  <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                    <span className="text-[10px] text-[#8C827A]">{inq.timeAgo}</span>
                    <a
                      href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                      className="px-3 py-1 rounded-lg bg-[#171513] text-white text-xs font-semibold hover:bg-[#745a2f] transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: SETTINGS */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-5 animate-in fade-in max-w-4xl">
            <div>
              <h2 className="font-serif text-2xl font-bold">Boutique Configuration</h2>
              <p className="text-xs text-[#8C827A]">Store profile, shipping thresholds, currencies, and notifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/70 space-y-3 shadow-xs">
                <h3 className="font-serif text-base font-bold pb-2 border-b border-[#D8C8AE]/50">
                  Brand Profile
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-[#8C827A] font-bold text-[10px] uppercase mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8C827A] font-bold text-[10px] uppercase mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8C827A] font-bold text-[10px] uppercase mb-1">
                      Concierge WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={conciergePhone}
                      onChange={(e) => setConciergePhone(e.target.value)}
                      className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8C827A] font-bold text-[10px] uppercase mb-1">
                      Flagship Studio Address
                    </label>
                    <textarea
                      rows={2}
                      value={studioAddress}
                      onChange={(e) => setStudioAddress(e.target.value)}
                      className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#FCFAF6] p-5 rounded-2xl border border-[#D8C8AE]/70 space-y-3 shadow-xs">
                <h3 className="font-serif text-base font-bold pb-2 border-b border-[#D8C8AE]/50">
                  Delivery &amp; Payment Rules
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-[#8C827A] font-bold text-[10px] uppercase mb-1">
                      Complimentary Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={freeShippingThreshold}
                      onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                      className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block font-bold text-[10px] uppercase text-[#8C827A] mb-1.5">
                      Active Payment Gateways
                    </label>
                    <div className="space-y-1.5 text-xs">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-[#745a2f]" />
                        <span>Instant UPI &amp; QR (Google Pay, PhonePe, Paytm)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-[#745a2f]" />
                        <span>Credit/Debit Cards &amp; Netbanking</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="accent-[#745a2f]" />
                        <span>Cash on Delivery (COD)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsSavedSettings(true)}
                className="px-6 py-2.5 rounded-xl bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#745a2f] transition-colors"
              >
                Save Configuration
              </button>
            </div>

            {isSavedSettings && (
              <p className="text-right text-xs text-emerald-700 font-bold">
                ✓ Configuration updated successfully.
              </p>
            )}
          </div>
        )}

      </main>

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171513]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FCFAF6] rounded-2xl max-w-md w-full p-6 border border-[#D8C8AE] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8C8AE]/50 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#171513]">Add New Handcrafted Garment</h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2ede4] flex items-center justify-center text-[#171513]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                  Garment Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasauti Cotton Kurti"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                    Category
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none"
                  >
                    <option value="Kurtis">Kurtis</option>
                    <option value="Co-ords">Co-ords</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Pakistani Wear">Pakistani Wear</option>
                    <option value="Bottoms">Bottoms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                  Fabric &amp; Weave Details
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% Breathable Mulmul Cotton"
                  value={newProdFabric}
                  onChange={(e) => setNewProdFabric(e.target.value)}
                  className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                  Artisanal Provenance
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Handcrafted in Chanderi, MP"
                  value={newProdProvenance}
                  onChange={(e) => setNewProdProvenance(e.target.value)}
                  className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8C827A] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Aesthetic notes and styling recommendation..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full bg-[#F7F2E9] border border-[#D8C8AE] rounded-lg p-2.5 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#171513] text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#745a2f] transition-colors"
              >
                Publish to Catalog
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
