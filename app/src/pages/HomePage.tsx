import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, Cpu, ChevronRight, Star, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories, getFeaturedProducts, getFlashSaleProducts } from '../data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const flashSaleProducts = getFlashSaleProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Tech background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
        </div>
        <div className="section-container relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Giảm giá lên đến 30% linh kiện Gaming
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Build Your
              <span className="block text-amber-400">Dream Machine</span>
            </h1>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed max-w-lg">
              Khám phá linh kiện PC hàng đầu - GPU, CPU, RAM hiệu năng cao. 
              Xây dựng cấu hình gaming hoàn hảo với giá tốt nhất.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/build-pc" className="btn-accent flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Build PC ngay
              </Link>
              <Link to="/products" className="px-6 py-3 border border-zinc-600 text-white rounded-lg font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                Xem sản phẩm
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold text-white">30+</p>
                <p className="text-sm text-zinc-400">Sản phẩm</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-sm text-zinc-400">Danh mục</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-sm text-zinc-400">Hỗ trợ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-b border-zinc-100">
        <div className="section-container py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Truck className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">Giao hàng nhanh</p>
                <p className="text-xs text-zinc-500">Miễn phí đơn từ 2 triệu</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">Bảo hành chính hãng</p>
                <p className="text-xs text-zinc-500">Từ 12-120 tháng</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">Chất lượng đảm bảo</p>
                <p className="text-xs text-zinc-500">Sản phẩm chính hãng 100%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-zinc-50/50">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Danh mục nổi bật</h2>
              <p className="text-sm text-zinc-500 mt-1">Khám phá các dòng sản phẩm chính</p>
            </div>
            <Link to="/products" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.slice(0, 12).map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group bg-white rounded-xl p-4 border border-zinc-100 hover:border-amber-200 hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden bg-zinc-50">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-amber-600 transition-colors">{cat.name}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">{cat.count} sản phẩm</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                <h2 className="text-2xl font-bold text-zinc-900">Flash Sale</h2>
              </div>
              <span className="px-2.5 py-0.5 bg-red-50 text-red-500 text-xs font-semibold rounded-full">
                Đang diễn ra
              </span>
            </div>
            <Link to="/products?flash=true" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {flashSaleProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-zinc-50/50">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Sản phẩm nổi bật</h2>
              <p className="text-sm text-zinc-500 mt-1">Linh kiện được yêu thích nhất</p>
            </div>
            <Link to="/products" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Build PC CTA */}
      <section className="py-20 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500 rounded-full blur-[150px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Cpu className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Chưa biết chọn linh kiện nào?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
              Sử dụng công cụ Build PC thông minh của chúng tôi. Tự động kiểm tra tương thích,
              tính tổng giá và ước tính hiệu năng.
            </p>
            <Link
              to="/build-pc"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all active:scale-[0.98]"
            >
              <Cpu className="w-5 h-5" />
              Build PC ngay
              <ChevronRight className="w-5 h-5" />
            </Link>

            {/* Example Config */}
            <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-lg mx-auto">
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-3">Cấu hình Gaming 2K phổ biến</p>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="text-sm">
                  <span className="text-zinc-500">CPU:</span>
                  <span className="text-zinc-200 ml-1">Ryzen 7 7800X3D</span>
                </div>
                <div className="text-sm">
                  <span className="text-zinc-500">GPU:</span>
                  <span className="text-zinc-200 ml-1">RTX 4070 Super</span>
                </div>
                <div className="text-sm">
                  <span className="text-zinc-500">RAM:</span>
                  <span className="text-zinc-200 ml-1">32GB DDR5 6000</span>
                </div>
                <div className="text-sm">
                  <span className="text-zinc-500">Tổng:</span>
                  <span className="text-amber-400 font-semibold ml-1">~45 triệu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="bg-zinc-50 rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Nhận thông tin khuyến mãi</h3>
            <p className="text-sm text-zinc-500 mb-6">Đăng ký để nhận thông báo về deal hot và sản phẩm mới</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
              />
              <button type="submit" className="btn-accent px-6 whitespace-nowrap">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
