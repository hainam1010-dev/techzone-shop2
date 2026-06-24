import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, formatPrice } from '../data/products';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-zinc-700" />
            <h2 className="text-lg font-semibold text-zinc-900">Giỏ hàng</h2>
            <span className="text-sm text-zinc-500">({items.length} sản phẩm)</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-zinc-200 mb-4" />
              <p className="text-zinc-500 font-medium">Giỏ hàng trống</p>
              <p className="text-sm text-zinc-400 mt-1">Hãy thêm sản phẩm vào giỏ hàng</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary mt-6 text-sm"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            items.map(item => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="flex gap-4 p-3 bg-zinc-50 rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-contain bg-white rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm font-medium text-zinc-900 truncate block hover:text-amber-600 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm font-semibold text-zinc-900 mt-1">{formatPrice(product.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-200 rounded transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-200 rounded transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-500">Tổng cộng</span>
              <span className="text-xl font-bold text-zinc-900">{formatPrice(totalPrice)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary w-full text-center block"
            >
              Thanh toán
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-sm text-zinc-500 hover:text-zinc-700 mt-3 transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </>
  );
}
