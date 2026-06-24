import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Cpu, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px] gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Cpu className="w-7 h-7 text-amber-500" />
              <span className="text-xl font-bold text-zinc-900 tracking-tight">TechZone</span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm linh kiện..."
                  className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all"
                />
              </div>
            </form>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="nav-link">Trang chủ</Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdown(true)}
                onMouseLeave={() => setCategoryDropdown(false)}
              >
                <button className="nav-link flex items-center gap-1">
                  Danh mục
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {categoryDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-56">
                    <div className="bg-white rounded-xl shadow-xl border border-zinc-100 py-2 overflow-hidden">
                      {categories.map(cat => (
                        <Link
                          key={cat.id}
                          to={`/products?category=${cat.slug}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-amber-600 transition-colors"
                          onClick={() => setCategoryDropdown(false)}
                        >
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/build-pc" className="nav-link">Build PC</Link>
              <Link to="/products?flash=true" className="nav-link">Khuyến mãi</Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Mobile */}
              <button
                className="md:hidden p-2 text-zinc-600 hover:text-zinc-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Admin Link */}
              <Link
                to="/admin"
                className="hidden sm:block text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3 py-1.5 border border-zinc-200 rounded-lg hover:border-zinc-300 transition-all"
              >
                Admin
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-zinc-100 animate-fade-in-up">
            <div className="section-container py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="md:hidden">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm linh kiện..."
                    className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </form>

              <Link to="/" className="block py-2 text-sm font-medium text-zinc-700" onClick={() => setMobileMenuOpen(false)}>Trang chủ</Link>
              <Link to="/products" className="block py-2 text-sm font-medium text-zinc-700" onClick={() => setMobileMenuOpen(false)}>Sản phẩm</Link>
              <Link to="/build-pc" className="block py-2 text-sm font-medium text-zinc-700" onClick={() => setMobileMenuOpen(false)}>Build PC</Link>
              <Link to="/products?flash=true" className="block py-2 text-sm font-medium text-zinc-700" onClick={() => setMobileMenuOpen(false)}>Khuyến mãi</Link>
              <div className="pt-2 border-t border-zinc-100">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Danh mục</p>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="block py-1.5 text-sm text-zinc-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
}
