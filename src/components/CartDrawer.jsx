import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fmt } from '../utils/format';
import Empty from './Empty';

export default function CartDrawer({ open, onClose }) {
  const { items, total, count, remove } = useCart();
  if (!open) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer-head">
          <strong>Корзина · {count} шт.</strong>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          {!items.length ? (
            <Empty
              title="Корзина пуста"
              sub="Добавьте лицензию из каталога"
              action={<Link to="/catalog" className="btn" onClick={onClose}>В каталог</Link>}
            />
          ) : (
            items.map((i) => (
              <div className="cart-item" key={i.key}>
                <img src={i.thumbnail} alt={i.title} />
                <div className="ci-info">
                  <h4>{i.title}</h4>
                  <div className="license-info">{i.licenseType} · {i.sku}</div>
                  <div>{fmt(i.price)} × {i.qty} = <b>{fmt(i.price * i.qty)}</b></div>
                </div>
                <button className="icon-btn" onClick={() => remove(i.key)}>🗑️</button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span>Итого:</span><b>{fmt(total)}</b>
            </div>
            <Link to="/cart" className="btn block" onClick={onClose}>Перейти в корзину</Link>
          </div>
        )}
      </aside>
    </>
  );
}