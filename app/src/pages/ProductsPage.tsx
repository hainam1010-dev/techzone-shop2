import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutList, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products as allProducts, categories, formatPrice } from '../data/products';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const flashParam = searchParams.get('flash') === 'true';
  const searchQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Flash sale
    if (flashParam) {
      result = result.filter(p => p.originalPrice > p.price);
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
      );
    }

    // Price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    return result;
  }, [selectedCategory, flashParam, searchQuery, priceRange, sortBy]);

  const updateCategory = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    params.delete('flash');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pt-8 pb-16">
      <div className="section-container">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
            <span>Trang chủ</span>
            <span>/</span>
            <span>Sản phẩm</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-zinc-900 font-medium">
                  {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
            {searchQuery && (
              <>
                <span>/</span>
                <span className="text-zinc-900 font-medium">Tìm: "{searchQuery}"</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">
            {flashParam ? 'Flash Sale' :
             selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name :
             searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` :
             'Tất cả sản phẩm'}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">{filteredProducts.length} sản phẩm</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-xl border border-zinc-100 p-5 sticky top-24">
              <h3 className="font-semibold text-zinc-900 mb-4">Bộ lọc</h3>

              {/* Categories */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Danh mục</p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => updateCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    Tất cả sản phẩm
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => updateCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.slug ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Khoảng giá</p>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={50000000}
                    step={1000000}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex items-center justify-between text-sm text-zinc-600">
                    <span>{formatPrice(0)}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Bộ lọc
            </button>
            {showFilters && (
              <div className="mt-3 bg-white rounded-xl border border-zinc-100 p-4 animate-fade-in-up">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-sm">Danh mục</p>
                  <button onClick={() => setShowFilters(false)}><X className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateCategory('')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      !selectedCategory ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    Tất cả
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => updateCategory(cat.slug)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        selectedCategory === cat.slug ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort & View */}
            <div className="flex items-center justify-between mb-6">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name">Tên: A-Z</option>
              </select>
              <div className="hidden sm:flex items-center gap-1 bg-white border border-zinc-200 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-zinc-500 text-lg font-medium">Không tìm thấy sản phẩm</p>
                <p className="text-sm text-zinc-400 mt-1">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
