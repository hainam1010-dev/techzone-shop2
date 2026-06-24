import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Shield, Truck, ChevronRight, Minus, Plus, Star, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductById, products, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart, getItemCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-900 mb-2">Sản phẩm không tồn tại</p>
          <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const itemCount = getItemCount(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pt-8 pb-16">
      <div className="section-container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link to="/" className="hover:text-zinc-900">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-zinc-900">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/products?category=${product.category}`} className="hover:text-zinc-900">{product.subcategory}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-900 font-medium truncate">{product.name}</span>
        </div>

        {/* Back Button - Mobile */}
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        {/* Product Main */}
        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-zinc-50 p-8 lg:p-12 flex items-center justify-center">
              <div className="relative">
                {product.badge && (
                  <span className="absolute top-0 left-0 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-0 right-0 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    -{discount}%
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md object-contain"
                />
              </div>
            </div>

            {/* Info */}
            <div className="p-8 lg:p-12">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-2">
                Mã: {product.code} | {product.subcategory}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-600">{product.rating}</span>
                <span className="text-sm text-zinc-400">({product.reviews} đánh giá)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-zinc-900">{formatPrice(product.price)}</span>
                {discount > 0 && (
                  <span className="text-lg text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {discount > 0 && (
                  <span className="px-2 py-0.5 bg-red-50 text-red-500 text-xs font-semibold rounded-full">
                    Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-zinc-600 leading-relaxed mb-6">{product.description}</p>

              {/* Warranty & Stock */}
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-lg">
                  <Check className="w-4 h-4" />
                  Còn hàng ({product.stock})
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg">
                  <Shield className="w-4 h-4" />
                  Bảo hành {product.warranty}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-zinc-700">Số lượng:</span>
                <div className="flex items-center border border-zinc-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-zinc-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2.5 hover:bg-zinc-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {itemCount > 0 && (
                  <span className="text-sm text-emerald-600 font-medium">
                    Đã có {itemCount} trong giỏ
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3.5 rounded-xl font-medium transition-all active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3.5 rounded-xl font-medium transition-all active:scale-[0.98]"
                >
                  <Zap className="w-5 h-5" />
                  Mua ngay
                </button>
              </div>

              {/* Shipping */}
              <div className="mt-6 pt-6 border-t border-zinc-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Truck className="w-4 h-4" />
                  <span>Miễn phí giao hàng cho đơn từ 2 triệu VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-zinc-100">
            <div className="flex border-b border-zinc-100">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-8 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'specs'
                    ? 'text-zinc-900 border-b-2 border-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                Thông số kỹ thuật
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-8 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-zinc-900 border-b-2 border-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                Đánh giá ({product.reviews})
              </button>
            </div>
            <div className="p-8 lg:p-12">
              {activeTab === 'specs' ? (
                <div className="max-w-2xl">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} className="border-b border-zinc-100 last:border-0">
                          <td className="py-3 text-sm text-zinc-500 w-1/3">{key}</td>
                          <td className="py-3 text-sm font-medium text-zinc-900">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= Math.round(product.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg font-semibold text-zinc-900">{product.rating}/5</p>
                  <p className="text-sm text-zinc-500 mt-1">Dựa trên {product.reviews} đánh giá từ khách hàng</p>
                  <p className="text-sm text-zinc-400 mt-4">Hệ thống đánh giá chi tiết sẽ sớm được cập nhật.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
