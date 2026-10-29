import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, LICENSE_MULT } from '../api';
import { useCart } from '../context/CartContext';
import { useFav } from '../context/FavContext';
import { useToast } from '../context/ToastContext';
import { fmt } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { toggle, has } = useFav();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [license, setLicense] = useState('Personal');
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const p = await api.getProduct(id);
        setProduct(p);
        setLicense(p.licenseTypes[0]);
      } catch (e) { setError(e.message); }
    })();
  }, [id]);

  if (error) return <Empty title="Товар не найден" sub={error}
    action={<Link to="/catalog" className="btn">В каталог</Link>} />;
  if (!product) return <div className="skeleton" style={{ height: 400 }} />;

  const price = product.price * LICENSE_MULT[license];
  const fav = has(product.id);

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Каталог', to: '/catalog' },
        { label: product.categoryName, to: `/catalog?category=${product.category}` },
        { label: product.title },
      ]} />
      <div className="product-detail">
        <div className="gallery">
          <div className="gallery-main"><img src={product.images[0]} alt={product.title} /></div>
        </div>
        <div className="detail-info">
          <h1>{product.title}</h1>
          <div className="detail-brand">{product.brand} · Артикул: {product.sku} · {product.categoryName}</div>
          <div style={{ color: 'var(--warn)', fontSize: '.9rem' }}>★ {product.rating.toFixed(1)} / 5</div>
          <div className="detail-price">{fmt(price)}</div>
          <div className="digital-note">
            <b>⚡ Цифровая доставка:</b> ключ активации придёт на e-mail сразу после оплаты. Срок лицензии: {product.term}.
          </div>
          <div style={{ margin: '16px 0' }}>
            <label style={{ fontSize: '.85rem', fontWeight: 600, marginBottom: 6, display: 'block' }}>Тип лицензии:</label>
            <div className="license-options">
              {product.licenseTypes.map((t) => (
                <div key={t} className={`license-opt ${t === license ? 'active' : ''}`} onClick={() => setLicense(t)}>
                  <div>
                    <b>{t}</b>
                    <small>
                      {t === 'Personal' ? '1 устройство, для личного использования'
                        : t === 'Business' ? '5 устройств, для компании'
                        : 'Неограниченно, корпоративная'}
                    </small>
                  </div>
                  <span className="opt-price">{fmt(product.price * LICENSE_MULT[t])}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="qty-row">
            <label style={{ fontSize: '.85rem', fontWeight: 600 }}>Кол-во лицензий:</label>
            <input type="number" min="1" max="99" value={qty} onChange={(e) => setQty(+e.target.value || 1)} />
          </div>
          <div className="actions-row">
            <button className="btn" onClick={() => { add(product, license, qty); showToast('Лицензия добавлена в корзину', 'success'); }}>🛒 В корзину</button>
            <button className="btn secondary" onClick={() => { add(product, license, qty); navigate('/checkout'); }}>⚡ Купить сейчас</button>
            <button className="btn ghost" onClick={() => { toggle(product.id); showToast(fav ? 'Удалено из избранного' : 'Добавлено в избранное', 'success'); }}>
              {fav ? '♥' : '♡'} В избранное
            </button>
          </div>
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>Описание</h3>
            <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>{product.description}</p>
            <h3 style={{ fontSize: '1rem', margin: '20px 0 8px' }}>Характеристики</h3>
            <table className="specs">
              <tbody>
                <tr><td>Артикул</td><td>{product.sku}</td></tr>
                <tr><td>Тип поставки</td><td>{product.activation}</td></tr>
                <tr><td>Доставка</td><td>{product.delivery}</td></tr>
                <tr><td>Срок действия</td><td>{product.term}</td></tr>
                <tr><td>Типы лицензий</td><td>{product.licenseTypes.join(', ')}</td></tr>
                <tr><td>Поддержка</td><td>24/7 по e-mail</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}