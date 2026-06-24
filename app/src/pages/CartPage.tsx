import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, formatPrice } from '../data/products';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const shippingFee = totalPrice >= 2000000 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className="min-h-screen bg-zinc-50/50 pt-8 pb-16">
      <div className="section-container">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Giỏ hàng</h1>
        <p className="text-sm text-zinc-500 mb-8">{items.length} sản phẩm trong giỏ hàng</p>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-zinc-200 mx-auto mb-4" />
            <p className="text-lg font-semibold text-zinc-900 mb-2">Giỏ hàng trống</p>
            <p className="text-sm text-zinc-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              <Package className="w-4 h-4" />
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                  <h2 className="font-semibold text-zinc-900">Sản phẩm</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Xóa tất cả
                  </button>
                </div>
                <div className="divide-y divide-zinc-100">
                  {items.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="p-5 flex gap-4">
                        <Link to={`/product/${product.id}`} className="shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-contain bg-zinc-50 rounded-lg"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <Link to={`/product/${product.id}`}>
                                <h3 className="font-medium text-zinc-900 hover:text-amber-600 transition-colors">
                                  {product.name}
                                </h3>
                              </Link>
                              <p className="text-xs text-zinc-400 mt-0.5">{product.code}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-zinc-200 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="p-2 hover:bg-zinc-50 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="p-2 hover:bg-zinc-50 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="font-semibold text-zinc-900">{formatPrice(product.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
                <h2 className="font-semibold text-zinc-900 mb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Tạm tính</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Phí vận chuyển</span>
                    <span className={shippingFee === 0 ? 'text-emerald-600 font-medium' : 'font-medium'}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-xs text-zinc-400">
                      Mua thêm {formatPrice(2000000 - totalPrice)} để được miễn phí vận chuyển
                    </p>
                  )}
                </div>
                <div className="border-t border-zinc-100 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-zinc-900">Tổng cộng</span>
                    <span className="text-xl font-bold text-zinc-900">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-accent flex items-center justify-center gap-2"
                >
                  Thanh toán
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/products"
                  className="w-full text-center text-sm text-zinc-500 hover:text-zinc-700 mt-3 block transition-colors"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
