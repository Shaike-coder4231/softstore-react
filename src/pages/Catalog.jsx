import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, CATEGORIES } from '../api';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { SkeletonGrid } from '../components/Skeleton';
import Empty from '../components/Empty';

const LIMIT = 12;

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const license = params.get('license') || '';
  const price = params.get('price') || '';
  const rating = params.get('rating') || '';
  const sort = params.get('sort') || '';
  const page = +params.get('page') || 1;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const [sortBy, order] = sort ? sort.split('-') : ['', ''];
        const res = await api.listProducts({ limit: LIMIT, skip: (page - 1) * LIMIT, q, category, sortBy, order, license });
        let list = res.products;
        if (price) {
          const [min, max] = price.split('-').map(Number);
          list = list.filter((p) => p.price >= min && p.price <= max);
        }
        if (rating) list = list.filter((p) => (p.rating || 0) >= +rating);
        if (active) setData({ ...res, products: list });
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [q, category, license, price, rating, sort, page]);

  const setParam = (k, v) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    if (k !== 'page') next.delete('page');
    setParams(next);
  };

  const reset = () => {
    const next = new URLSearchParams();
    if (q) next.set('q', q);
    setParams(next);
  };

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]} />
      <h1 style={{ fontSize: '1.4rem', marginBottom: 16 }}>
        {q ? `Поиск: «${q}»` : 'Каталог лицензий и ПО'}
      </h1>
      <div className="catalog-layout">
        <aside className="filters-panel">
          <h3>Фильтры</h3>
          <div className="filter-group">
            <label>Категория</label>
            <select value={category} onChange={(e) => setParam('category', e.target.value)}>
              <option value="">Все категории</option>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Тип лицензии</label>
            <select value={license} onChange={(e) => setParam('license', e.target.value)}>
              <option value="">Любой</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Цена</label>
            <select value={price} onChange={(e) => setParam('price', e.target.value)}>
              <option value="">Любая</option>
              <option value="0-50">до $50</option>
              <option value="50-150">$50–$150</option>
              <option value="150-500">$150–$500</option>
              <option value="500-99999">от $500</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Рейтинг</label>
            <select value={rating} onChange={(e) => setParam('rating', e.target.value)}>
              <option value="">Любой</option>
              <option value="4">4★ и выше</option>
              <option value="4.5">4.5★ и выше</option>
            </select>
          </div>
          <button className="btn ghost block" onClick={reset}>Сбросить</button>
        </aside>

        <div>
          <div className="toolbar">
            <span className="info">{loading ? 'Загрузка...' : `Найдено: ${data?.products.length || 0}`}</span>
            <select value={sort} onChange={(e) => setParam('sort', e.target.value)}>
              <option value="">По умолчанию</option>
              <option value="price-asc">Цена ↑</option>
              <option value="price-desc">Цена ↓</option>
              <option value="rating-desc">Рейтинг ↓</option>
              <option value="title-asc">Название А–Я</option>
            </select>
          </div>

          {error ? <Empty title="Ошибка" sub={error} />
            : loading ? <SkeletonGrid n={8} />
            : !data?.products.length ? <Empty title="Ничего не найдено"
                sub="Попробуйте изменить фильтры"
                action={<button className="btn" onClick={reset}>Сбросить фильтры</button>} />
            : <div className="grid">{data.products.map((p) => <ProductCard key={p.id} product={p} />)}</div>}

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map((n) => (
                <button key={n} className={n === page ? 'active' : ''}
                  onClick={() => setParam('page', String(n))}>{n}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}