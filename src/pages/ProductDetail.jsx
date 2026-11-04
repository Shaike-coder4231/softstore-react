import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, LICENSE_MULT } from '../api';
import { db } from '../utils/db';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFav } from '../context/FavContext';
import { useToast } from '../context/ToastContext';
import { fmt, fmtDate } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { user } = useAuth();
  const { toggle, has } = useFav();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [license, setLicense] = useState('Personal');
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const p = await api.getProduct(id);
        setProduct(p);
        setLicense(p.licenseTypes[0]);
        setReviews(db.getReviews().filter(r => r.productId === p.id));
      } catch (e) { setError(e.message); }
    })();
  }, [id]);

  if (error) return <Empty title="Товар не найден" sub={error} action={<Link to="/catalog" className="btn">В каталог</Link>} />;
  if (!product) return <div className="skeleton" style={{ height: 400 }} />;

  const price = product.price * LICENSE_MULT[license];
  const fav = has(product.id);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!user) return showToast('Войдите, чтобы оставить отзыв', 'error');
    db.addReview({ productId: product.id, userName: user.firstName || user.username, rating: +rating, text: comment });
    setReviews(db.getReviews().filter(r => r.productId === product.id));
    setComment(''); setRating(5);
    showToast('Спасибо за отзыв!', 'success');
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: product.title }]} />
      <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 'var(--radius-lg)' }}>
          <img src={product.images[0]} alt={product.title} style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>{product.title}</h1>
          <div style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{product.brand} · Артикул: {product.sku}</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 24 }}>{fmt(price)}</div>
          
          <div style={{ marginBottom: 24 }}>
            {product.licenseTypes.map(t => (
              <div key={t} onClick={() => setLicense(t)} style={{ border: `2px solid ${t === license ? 'var(--primary)' : 'var(--border)'}`, background: t === license ? 'var(--primary-light)' : 'white', padding: 16, borderRadius: 12, cursor: 'pointer', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <b>{t}</b><span>{fmt(product.price * LICENSE_MULT[t])}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <button className="btn" style={{ flex: 1 }} onClick={() => { add(product, license, qty); showToast('Добавлено в корзину', 'success'); }}>В корзину</button>
            <button className="btn secondary" style={{ flex: 1 }} onClick={() => { add(product, license, qty); navigate('/checkout'); }}>Купить сейчас</button>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Отзывы ({reviews.length})</h3>
          <div style={{ background: 'var(--bg-body)', padding: 20, borderRadius: 12, marginBottom: 24 }}>
            {user ? (
              <form onSubmit={handleAddReview}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                  {[1, 2, 3, 4, 5].map(s => <button type="button" key={s} onClick={() => setRating(s)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: s <= rating ? 'var(--warn)' : '#cbd5e1' }}>★</button>)}
                </div>
                <textarea value={comment} onChange={e => setComment(e.target.value)} required placeholder="Ваш отзыв..." style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid var(--border)', marginBottom: 12 }} />
                <button type="submit" className="btn">Отправить</button>
              </form>
            ) : <p>Войдите, чтобы оставить отзыв. <Link to="/login">Войти</Link></p>}
          </div>

          {reviews.map(r => (
            <div key={r.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><b>{r.userName}</b><span style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{fmtDate(r.date)}</span></div>
              <div style={{ color: 'var(--warn)', marginBottom: 8 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <p style={{ color: 'var(--text-muted)' }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
