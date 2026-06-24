import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronLeft, CreditCard, Truck, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, formatPrice } from '../data/products';

type PaymentMethod = 'cod' | 'bank' | 'ewallet';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    note: '',
  });

  const shippingFee = totalPrice >= 2000000 ? 0 : 30000;
  const finalTotal = totalPrice + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-zinc-50/50 pt-8 pb-16">
        <div className="section-container max-w-lg">
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Đặt hàng thành công!</h1>
            <p className="text-zinc-500 mb-6">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thờ gian sớm nhất để xác nhận đơn hàng.
            </p>
            <div className="bg-zinc-50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-500">Mã đơn hàng:</span>
                <span className="font-medium">TZ{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-500">Tổng tiền:</span>
                <span className="font-bold">{formatPrice(finalTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Thanh toán:</span>
                <span className="font-medium">
                  {paymentMethod === 'cod' ? 'COD' : paymentMethod === 'bank' ? 'Chuyển khoản' : 'Ví điện tử'}
                </span>
              </div>
            </div>
            <Link to="/" className="btn-primary inline-block">
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pt-8 pb-16">
      <div className="section-container">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại giỏ hàng
        </button>

        <h1 className="text-2xl font-bold text-zinc-900 mb-8">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Info */}
              <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-500" />
                  Thông tin giao hàng
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                      placeholder="0901234567"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Địa chỉ *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                      placeholder="Số nhà, đường, phường/xã"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Tỉnh/Thành phố *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                      placeholder="Hà Nội"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Ghi chú</label>
                    <input
                      type="text"
                      value={formData.note}
                      onChange={e => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                      placeholder="Ghi chú cho đơn hàng"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-500" />
                  Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-zinc-900">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-xs text-zinc-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                    </div>
                    {paymentMethod === 'cod' && <Check className="w-5 h-5 text-amber-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-zinc-900">Chuyển khoản ngân hàng</p>
                      <p className="text-xs text-zinc-500">Chuyển khoản qua tài khoản ngân hàng</p>
                    </div>
                    {paymentMethod === 'bank' && <Check className="w-5 h-5 text-amber-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ewallet')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'ewallet'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-zinc-100 hover:border-zinc-200'
                    }`}
                  >
                    <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-zinc-900">Ví điện tử</p>
                      <p className="text-xs text-zinc-500">Momo, ZaloPay, VNPay</p>
                    </div>
                    {paymentMethod === 'ewallet' && <Check className="w-5 h-5 text-amber-500" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full btn-accent py-4 text-lg">
                Đặt hàng - {formatPrice(finalTotal)}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
              <h2 className="font-semibold text-zinc-900 mb-4">Đơn hàng</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => {
                  const product = products.find(p => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-contain bg-zinc-50 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 truncate">{product.name}</p>
                        <p className="text-xs text-zinc-500">SL: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(product.price * item.quantity)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-zinc-100 pt-4 space-y-2">
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
              </div>
              <div className="border-t border-zinc-100 mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-zinc-900">Tổng cộng</span>
                  <span className="text-xl font-bold text-zinc-900">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
