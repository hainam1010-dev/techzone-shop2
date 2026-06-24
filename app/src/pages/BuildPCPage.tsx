import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu, Monitor, HardDrive, Fan, Zap, Box, MemoryStick, CircuitBoard,
  ChevronDown, Check, AlertTriangle, TrendingUp, DollarSign, ShoppingCart, Trash2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, formatPrice } from '../data/products';
import type { Product } from '../data/products';

type ComponentSlot = 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'ssd' | 'psu' | 'case' | 'cooler';

interface SlotConfig {
  key: ComponentSlot;
  label: string;
  icon: React.ReactNode;
  required: boolean;
}

const slots: SlotConfig[] = [
  { key: 'cpu', label: 'CPU (Bộ vi xử lý)', icon: <Cpu className="w-5 h-5" />, required: true },
  { key: 'motherboard', label: 'Mainboard (Bo mạch chủ)', icon: <CircuitBoard className="w-5 h-5" />, required: true },
  { key: 'gpu', label: 'Card màn hình (GPU)', icon: <Monitor className="w-5 h-5" />, required: false },
  { key: 'ram', label: 'RAM (Bộ nhớ)', icon: <MemoryStick className="w-5 h-5" />, required: true },
  { key: 'ssd', label: 'SSD (Ổ cứng)', icon: <HardDrive className="w-5 h-5" />, required: true },
  { key: 'psu', label: 'PSU (Nguồn)', icon: <Zap className="w-5 h-5" />, required: true },
  { key: 'case', label: 'Case (Vỏ máy)', icon: <Box className="w-5 h-5" />, required: false },
  { key: 'cooler', label: 'Tản nhiệt', icon: <Fan className="w-5 h-5" />, required: false },
];

export default function BuildPCPage() {
  const { addToCart } = useCart();
  const [selectedComponents, setSelectedComponents] = useState<Partial<Record<ComponentSlot, Product>>>({});
  const [activeSlot, setActiveSlot] = useState<ComponentSlot | null>(null);

  const availableProducts = useMemo(() => {
    if (!activeSlot) return [];
    return products.filter(p => p.category === activeSlot);
  }, [activeSlot]);

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, p) => sum + (p?.price || 0), 0);
  }, [selectedComponents]);

  const estimatedWattage = useMemo(() => {
    let watts = 150; // Base system
    const cpu = selectedComponents.cpu;
    const gpu = selectedComponents.gpu;
    if (cpu) {
      const tdpMatch = cpu.specs['TDP'] || cpu.specs['Hiệu suất'] || '';
      const tdp = parseInt(tdpMatch.match(/\d+/)?.[0] || '65');
      watts += tdp;
    }
    if (gpu) {
      const tdpMatch = gpu.specs['TDP'] || '';
      const tdp = parseInt(tdpMatch.match(/\d+/)?.[0] || '200');
      watts += tdp;
    }
    return watts;
  }, [selectedComponents]);

  const selectedCount = Object.values(selectedComponents).filter(Boolean).length;
  const requiredSelected = slots.filter(s => s.required && selectedComponents[s.key]).length;
  const requiredTotal = slots.filter(s => s.required).length;

  const selectProduct = (slot: ComponentSlot, product: Product) => {
    setSelectedComponents(prev => ({ ...prev, [slot]: product }));
    setActiveSlot(null);
  };

  const clearSlot = (slot: ComponentSlot) => {
    setSelectedComponents(prev => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  };

  const addAllToCart = () => {
    Object.values(selectedComponents).forEach(p => {
      if (p) addToCart(p.id);
    });
  };

  // Simple compatibility check
  const compatibilityIssues: string[] = [];
  const cpu = selectedComponents.cpu;
  const mb = selectedComponents.motherboard;
  const ram = selectedComponents.ram;
  if (cpu && mb) {
    const cpuSocket = cpu.specs['Socket'] || '';
    const mbSocket = mb.specs['Socket'] || '';
    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      compatibilityIssues.push(`CPU (${cpuSocket}) không tương thích với Mainboard (${mbSocket})`);
    }
  }
  if (ram && mb) {
    const ramType = ram.specs['Bus'] || '';
    const mbRam = mb.specs['RAM'] || '';
    if (ramType.includes('DDR5') && mbRam.includes('DDR4')) {
      compatibilityIssues.push('RAM DDR5 không tương thích với Mainboard chỉ hỗ trợ DDR4');
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pt-8 pb-16">
      <div className="section-container">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Build PC Theo Nhu Cầu</h1>
          <p className="text-sm text-zinc-500">Chọn linh kiện và kiểm tra tương thích tự động</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Component Picker */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress */}
            <div className="bg-white rounded-xl border border-zinc-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">Tiến độ</p>
                  <p className="text-xs text-zinc-500">{selectedCount}/{slots.length} linh kiện đã chọn</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">Bắt buộc</p>
                <p className={`text-sm font-semibold ${requiredSelected === requiredTotal ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {requiredSelected}/{requiredTotal}
                </p>
              </div>
            </div>

            {/* Compatibility Warnings */}
            {compatibilityIssues.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <p className="font-semibold text-red-700 text-sm">Cảnh báo tương thích</p>
                </div>
                {compatibilityIssues.map((issue, i) => (
                  <p key={i} className="text-sm text-red-600 ml-7">{issue}</p>
                ))}
              </div>
            )}

            {/* Component Slots */}
            <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
              {slots.map((slot, index) => {
                const selected = selectedComponents[slot.key];
                const isActive = activeSlot === slot.key;
                return (
                  <div key={slot.key} className={`${index > 0 ? 'border-t border-zinc-100' : ''}`}>
                    <button
                      onClick={() => setActiveSlot(isActive ? null : slot.key)}
                      className="w-full flex items-center gap-4 p-5 hover:bg-zinc-50/50 transition-colors text-left"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selected ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        {selected ? <Check className="w-5 h-5" /> : slot.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-zinc-900">{slot.label}</p>
                          {slot.required && (
                            <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded font-medium">Bắt buộc</span>
                          )}
                        </div>
                        {selected ? (
                          <p className="text-sm text-zinc-600 truncate">{selected.name}</p>
                        ) : (
                          <p className="text-sm text-zinc-400">Chọn {slot.label.toLowerCase()}</p>
                        )}
                      </div>
                      {selected && (
                        <div className="text-right mr-2">
                          <p className="text-sm font-semibold text-zinc-900">{formatPrice(selected.price)}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {selected && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              clearSlot(slot.key);
                            }}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {/* Product Selection Panel */}
                    {isActive && (
                      <div className="border-t border-zinc-100 bg-zinc-50/50 p-4 animate-fade-in-up">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                          {availableProducts.map(product => (
                            <button
                              key={product.id}
                              onClick={() => selectProduct(slot.key, product)}
                              className={`flex items-center gap-3 p-3 bg-white rounded-xl border-2 transition-all text-left hover:shadow-md ${
                                selected?.id === product.id
                                  ? 'border-amber-500 ring-1 ring-amber-500/20'
                                  : 'border-zinc-100 hover:border-zinc-200'
                              }`}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 object-contain bg-zinc-50 rounded-lg shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-900 truncate">{product.name}</p>
                                <p className="text-sm font-semibold text-amber-600">{formatPrice(product.price)}</p>
                                <p className="text-xs text-zinc-400">{product.specs[Object.keys(product.specs)[0]]}</p>
                              </div>
                              {selected?.id === product.id && <Check className="w-4 h-4 text-amber-500 shrink-0" />}
                            </button>
                          ))}
                          {availableProducts.length === 0 && (
                            <p className="col-span-2 text-center text-sm text-zinc-500 py-4">
                              Không có sản phẩm phù hợp trong danh mục này
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
              <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-500" />
                Tổng quan
              </h2>

              {/* Wattage Estimate */}
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-1">Công suất ước tính</p>
                <p className="text-2xl font-bold text-blue-700">{estimatedWattage}W</p>
                <p className="text-xs text-blue-400 mt-1">
                  Nên dùng PSU {Math.ceil(estimatedWattage * 1.3 / 50) * 50}W trở lên
                </p>
              </div>

              {/* Selected Components */}
              <div className="space-y-2 mb-4">
                {slots.map(slot => {
                  const selected = selectedComponents[slot.key];
                  return (
                    <div key={slot.key} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">{slot.label.split(' ')[0]}</span>
                      <span className={`font-medium ${selected ? 'text-zinc-900' : 'text-zinc-300'}`}>
                        {selected ? formatPrice(selected.price) : '---'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-zinc-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-zinc-900">Tổng cộng</span>
                  <span className="text-2xl font-bold text-zinc-900">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={addAllToCart}
                disabled={selectedCount === 0}
                className="w-full btn-accent flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm tất cả vào giỏ
              </button>

              {selectedCount > 0 && (
                <div className="mt-4 space-y-2">
                  {Object.entries(selectedComponents).map(([key, product]) => {
                    if (!product) return null;
                    return (
                      <Link
                        key={key}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-lg transition-colors"
                      >
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain bg-zinc-50 rounded" />
                        <p className="text-xs text-zinc-600 truncate flex-1">{product.name}</p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
