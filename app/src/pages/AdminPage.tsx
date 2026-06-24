import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, Users, ShoppingBag, DollarSign, ArrowUpRight, Search, ChevronLeft
} from 'lucide-react';
import { products as allProducts, formatPrice } from '../data/products';

interface Order {
  id: string;
  customer: string;
  phone: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  items: number;
}

const mockOrders: Order[] = [
  { id: 'TZ87654321', customer: 'Nguyễn Văn A', phone: '0901234567', total: 28970000, status: 'pending', date: '2026-06-24', items: 3 },
  { id: 'TZ87654320', customer: 'Trần Thị B', phone: '0912345678', total: 15480000, status: 'processing', date: '2026-06-23', items: 2 },
  { id: 'TZ87654319', customer: 'Lê Văn C', phone: '0923456789', total: 42800000, status: 'shipped', date: '2026-06-22', items: 5 },
  { id: 'TZ87654318', customer: 'Phạm Thị D', phone: '0934567890', total: 9180000, status: 'delivered', date: '2026-06-21', items: 1 },
  { id: 'TZ87654317', customer: 'Hoàng Văn E', phone: '0945678901', total: 21560000, status: 'pending', date: '2026-06-20', items: 2 },
  { id: 'TZ87654316', customer: 'Đỗ Thị F', phone: '0956789012', total: 63720000, status: 'processing', date: '2026-06-19', items: 7 },
  { id: 'TZ87654315', customer: 'Vũ Văn G', phone: '0967890123', total: 12900000, status: 'delivered', date: '2026-06-18', items: 2 },
  { id: 'TZ87654314', customer: 'Bùi Thị H', phone: '0978901234', total: 34970000, status: 'shipped', date: '2026-06-17', items: 4 },
];

type TabType = 'dashboard' | 'products' | 'orders' | 'customers';

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'bg-amber-50 text-amber-600' },
  processing: { label: 'Đang xử lý', color: 'bg-blue-50 text-blue-600' },
  shipped: { label: 'Đang giao', color: 'bg-purple-50 text-purple-600' },
  delivered: { label: 'Đã giao', color: 'bg-emerald-50 text-emerald-600' },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  const stats = useMemo(() => {
    const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = mockOrders.length;
    const totalCustomers = new Set(mockOrders.map(o => o.phone)).size;
    return { totalRevenue, totalOrders, totalCustomers, totalProducts: allProducts.length };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!productSearch) return allProducts;
    const q = productSearch.toLowerCase();
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
    );
  }, [productSearch]);

  const filteredOrders = useMemo(() => {
    if (!orderSearch) return mockOrders;
    const q = orderSearch.toLowerCase();
    return mockOrders.filter(o =>
      o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.phone.includes(q)
    );
  }, [orderSearch]);

  const tabs = [
    { key: 'dashboard' as TabType, label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'products' as TabType, label: 'Sản phẩm', icon: <Package className="w-4 h-4" /> },
    { key: 'orders' as TabType, label: 'Đơn hàng', icon: <ShoppingBag className="w-4 h-4" /> },
    { key: 'customers' as TabType, label: 'Khách hàng', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/50 pt-8 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link to="/" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Trang chủ
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900">Quản trị</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-xl border border-zinc-100 p-1 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-zinc-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-zinc-500">Tổng doanh thu</p>
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-zinc-900">{formatPrice(stats.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-medium">+12.5%</span>
                  <span className="text-xs text-zinc-400">so với tháng trước</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-zinc-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-zinc-500">Tổng đơn hàng</p>
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-zinc-900">{stats.totalOrders}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-medium">+8.2%</span>
                  <span className="text-xs text-zinc-400">so với tháng trước</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-zinc-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-zinc-500">Tổng khách hàng</p>
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-zinc-900">{stats.totalCustomers}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-medium">+15.3%</span>
                  <span className="text-xs text-zinc-400">so với tháng trước</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-zinc-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-zinc-500">Tổng sản phẩm</p>
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-zinc-900">{stats.totalProducts}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-medium">+5</span>
                  <span className="text-xs text-zinc-400">sản phẩm mới</span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="font-semibold text-zinc-900">Đơn hàng gần đây</h2>
                <button onClick={() => setActiveTab('orders')} className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                  Xem tất cả
                </button>
              </div>
              <div className="divide-y divide-zinc-100">
                {mockOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{order.id}</p>
                      <p className="text-xs text-zinc-500">{order.customer} - {order.items} sản phẩm</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatPrice(order.total)}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${statusLabels[order.status].color}`}>
                        {statusLabels[order.status].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-semibold text-zinc-900">Danh sách sản phẩm</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  placeholder="Tìm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Sản phẩm</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Mã SP</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Danh mục</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Giá</th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Tồn kho</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-zinc-50/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-contain bg-zinc-50 rounded" />
                          <p className="text-sm font-medium text-zinc-900">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-zinc-500">{product.code}</td>
                      <td className="px-5 py-3 text-sm text-zinc-500">{product.subcategory}</td>
                      <td className="px-5 py-3 text-sm font-medium text-zinc-900 text-right">{formatPrice(product.price)}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          product.stock > 20 ? 'bg-emerald-50 text-emerald-600' :
                          product.stock > 10 ? 'bg-amber-50 text-amber-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-semibold text-zinc-900">Danh sách đơn hàng</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Tìm đơn hàng..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Mã đơn</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Khách hàng</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Ngày</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Tổng tiền</th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-zinc-50/50">
                      <td className="px-5 py-3 text-sm font-medium text-zinc-900">{order.id}</td>
                      <td className="px-5 py-3">
                        <p className="text-sm text-zinc-900">{order.customer}</p>
                        <p className="text-xs text-zinc-500">{order.phone}</p>
                      </td>
                      <td className="px-5 py-3 text-sm text-zinc-500">{order.date}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-zinc-900 text-right">{formatPrice(order.total)}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusLabels[order.status].color}`}>
                          {statusLabels[order.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
            <div className="p-5 border-b border-zinc-100">
              <h2 className="font-semibold text-zinc-900">Danh sách khách hàng</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Khách hàng</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Số điện thoại</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Số đơn</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-zinc-500 uppercase">Tổng chi tiêu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {Array.from(new Map(mockOrders.map(o => [o.phone, o])).entries()).map(([phone, order]) => {
                    const customerOrders = mockOrders.filter(o => o.phone === phone);
                    const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);
                    return (
                      <tr key={phone} className="hover:bg-zinc-50/50">
                        <td className="px-5 py-3 text-sm font-medium text-zinc-900">{order.customer}</td>
                        <td className="px-5 py-3 text-sm text-zinc-500">{phone}</td>
                        <td className="px-5 py-3 text-sm text-zinc-900 text-right">{customerOrders.length}</td>
                        <td className="px-5 py-3 text-sm font-semibold text-zinc-900 text-right">{formatPrice(totalSpent)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
