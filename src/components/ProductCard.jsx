import { Link } from 'react-router-dom';
import { LICENSE_MULT } from '../api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fmt } from '../utils/format';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { showToast } = useToast();
  const minPrice = product.price * (LICENSE_MULT[product.licenseTypes[0]] || 1);

  const handleAdd = () => {
    add(product, product.licenseTypes[0], 1);
    showToast('Лицензия добавлена в корзину', 'success');
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="thumb">
        <span className="license-tag">{product.licenseTypes[0]}</span>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </Link>
      <div className="info">
        <div className="title"><Link to={`/product/${product.id}`}>{product.title}</Link></div>
        <div className="brand">{product.brand} · {product.categoryName}</div>
        <div className="rating">★ {product.rating.toFixed(1)} · <span style={{ color: 'var(--muted)' }}>мгновенно</span></div>
        <div className="price">от {fmt(minPrice)}</div>
        <button className="btn" onClick={handleAdd}>В корзину</button>
      </div>
    </div>
  );
}