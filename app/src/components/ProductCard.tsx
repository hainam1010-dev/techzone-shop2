import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, getItemCount } = useCart();
  const itemCount = getItemCount(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div
      className="product-card group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-zinc-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-full object-contain p-4"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500 text-white">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>
        {/* Quick Add - Hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product.id);
            }}
            className="p-2.5 bg-white rounded-full shadow-lg hover:bg-zinc-900 hover:text-white transition-all active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium mb-1">{product.subcategory}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-zinc-900 leading-snug mb-2 hover:text-amber-600 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="price-current text-base">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <span className="price-original text-xs">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Stock & Cart Status */}
        <div className="flex items-center justify-between">
          <span className="stock-badge text-[10px]">Còn hàng ({product.stock})</span>
          {itemCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <Check className="w-3 h-3" />
              {itemCount} trong giỏ
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
