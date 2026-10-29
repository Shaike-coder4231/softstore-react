import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';
import { SkeletonGrid } from '../components/Skeleton';
import Empty from '../components/Empty';

export default function Home() {
  const [popular, setPopular] = useState(null);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, c] = await Promise.all([
          api.listProducts({ limit: 8, sortBy: 'rating', order: 'desc' }),
          api.getCategories(),
        ]);
        setPopular(p.products);
        setCats(c);
      } catch (e) { setError(e.message); }
    })();
  }, []);

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg,#4f46e5,#06b6d4)', color: '#fff',
        padding: '44px 24px', borderRadius: 16, marginBottom: 28,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, fontSize: '12rem', opacity: .08 }}>💾</div>
        <h1 style={{ fontSize: '1.9rem', marginBottom: 8, lineHeight: 1.2 }}>
          Цифровые лицензии<br />с мгновенной выдачей
        </h1>
        <p style={{ marginBottom: 20, opacity: .95, maxWidth: 520 }}>
          Официальное ПО: операционные системы, офисные пакеты, антивирусы, IDE, облачные сервисы. Ключ активации приходит на e-mail сразу после оплаты.
        </p>
        <Link to="/catalog" className="btn" style={{ background: '#fff', color: '#4f46e5' }}>
          Перейти в каталог →
        </Link>
      </section>

      <h2 style={{ marginBottom: 16, fontSize: '1.3rem' }}>Популярные продукты</h2>
      {error ? (
        <Empty title="Не удалось загрузить каталог" sub={error}
          action={<button className="btn" onClick={() => window.location.reload()}>Повторить</button>} />
      ) : !popular ? <SkeletonGrid n={8} /> : (
        <div className="grid">
          {popular.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      <h2 style={{ margin: '32px 0 16px', fontSize: '1.3rem' }}>Категории</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))' }}>
        {cats.map((c) => (
          <Link key={c.key} to={`/catalog?category=${c.key}`} style={{
            background: '#fff', borderRadius: 12, padding: '20px 12px',
            textAlign: 'center', boxShadow: 'var(--shadow)',
            color: 'var(--text)', fontWeight: 600, fontSize: '.85rem',
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{c.icon}</div>
            {c.name}
          </Link>
        ))}
      </div>
    </>
  );
}