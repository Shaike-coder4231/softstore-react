import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useFav } from '../context/FavContext';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { SkeletonGrid } from '../components/Skeleton';
import Empty from '../components/Empty';

export default function Favorites() {
  const { ids } = useFav();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const list = await Promise.all(ids.map((id) => api.getProduct(id).catch(() => null)));
      setProducts(list.filter(Boolean));
    })();
  }, [ids]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Избранное' }]} />
      <h1 style={{ marginBottom: 16, fontSize: '1.4rem' }}>Избранное</h1>
      {!ids.length ? (
        <Empty title="В избранном пусто" sub="Добавляйте лицензии, чтобы не потерять"
          action={<Link to="/catalog" className="btn">В каталог</Link>} />
      ) : !products ? <SkeletonGrid n={4} /> : (
        <div className="grid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </>
  );
}