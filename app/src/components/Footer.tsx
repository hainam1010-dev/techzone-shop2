import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Cpu className="w-6 h-6 text-amber-500" />
              <span className="text-lg font-bold text-white">TechZone</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Chuyên cung cấp linh kiện máy tính và thiết bị công nghệ cao cấp với giá tốt nhất thị trường.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Phone className="w-4 h-4" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="w-4 h-4" />
                <span>support@techzone.vn</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <MapPin className="w-4 h-4" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Cửa hàng</h3>
            <ul className="space-y-2.5">
              <li><Link to="/products?category=gpu" className="text-sm text-zinc-400 hover:text-white transition-colors">Card màn hình</Link></li>
              <li><Link to="/products?category=cpu" className="text-sm text-zinc-400 hover:text-white transition-colors">CPU</Link></li>
              <li><Link to="/products?category=motherboard" className="text-sm text-zinc-400 hover:text-white transition-colors">Mainboard</Link></li>
              <li><Link to="/products?category=ram" className="text-sm text-zinc-400 hover:text-white transition-colors">RAM</Link></li>
              <li><Link to="/products?category=ssd" className="text-sm text-zinc-400 hover:text-white transition-colors">SSD</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Hỗ trợ</h3>
            <ul className="space-y-2.5">
              <li><Link to="/build-pc" className="text-sm text-zinc-400 hover:text-white transition-colors">Build PC</Link></li>
              <li><Link to="/products" className="text-sm text-zinc-400 hover:text-white transition-colors">Tìm sản phẩm</Link></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Hướng dẫn thanh toán</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Vận chuyển & Giao hàng</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Công ty</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog công nghệ</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; 2026 TechZone. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
