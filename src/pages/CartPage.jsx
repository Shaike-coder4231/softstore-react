import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fmt } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function CartPage() {
  const { items, count, total, updateQty, remove, clear } = useCart();
  const { showToast } = useToast();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  if (!items.length) {
    return <Empty title="Корзина пуста" sub="Добавьте лицензию, чтобы оформить заказ" action={<Link to="/catalog" className="btn">В каталог</Link>} />;
  }

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'SOFT10') {
      setDiscount(total * 0.1);
      showToast('Промокод применён: скидка 10%', 'success');
    } else {
      setDiscount(0);
      showToast('Неверный промокод', 'error');
    }
  };

  const finalTotal = total - discount;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]} />
      <h1 style={{ marginBottom: 24 }}>Корзина</h1>
      <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div>
          {items.map((i) => (
            <div key={i.key} style={{ display: 'flex', gap: 16, padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', marginBottom: 12 }}>
              <img src={i.thumbnail} alt="" style={{ width: 80, height: 80, objectFit: 'contain', background: 'var(--bg-body)', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: 4 }}>{i.title}</h4>
                <div style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>Тип: {i.licenseType} · {i.sku}</div>
                <div>{fmt(i.price)} × <input type="number" min="1" max="99" value={i.qty} onChange={(e) => updateQty(i.key, e.target.value)} style={{ width: 60, padding: 4, textAlign: 'center', border: '1px solid var(--border)', borderRadius: 6 }} /> = <b>{fmt(i.price * i.qty)}</b></div>
              </div>
              <button className="btn ghost" onClick={() => remove(i.key)}>Удалить</button>
            </div>
          ))}
        </div>
        
        <aside style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 'var(--radius-lg)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: 16 }}>Ваш заказ</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Товаров:</span><b>{count}</b></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Сумма:</span><b>{fmt(total)}</b></div>
          {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--success)' }}><span>Скидка:</span><b>-{fmt(discount)}</b></div>}
          
          <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
            <input type="text" placeholder="Промокод (SOFT10)" value={promo} onChange={(e) => setPromo(e.target.value)} style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8 }} />
            <button className="btn secondary" onClick={applyPromo}>ОК</button>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
            <span>Итого:</span><span>{fmt(finalTotal)}</span>
          </div>
          <Link to="/checkout" className="btn block" style={{ marginTop: 16 }}>Оформить заказ</Link>
        </aside>
      </div>
    </>
  );
}
