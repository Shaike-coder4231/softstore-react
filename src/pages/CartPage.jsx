import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fmt } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function CartPage() {
  const { items, count, total, updateQty, remove, clear } = useCart();

  if (!items.length) {
    return <Empty title="Корзина пуста" sub="Добавьте лицензию, чтобы оформить заказ"
      action={<Link to="/catalog" className="btn">Перейти в каталог</Link>} />;
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]} />
      <h1 style={{ marginBottom: 16, fontSize: '1.4rem' }}>Корзина</h1>
      <div className="cart-layout">
        <div>
          {items.map((i) => (
            <div className="cart-item" key={i.key}>
              <img src={i.thumbnail} alt="" />
              <div className="ci-info">
                <h4>{i.title}</h4>
                <div className="license-info">Тип: <b>{i.licenseType}</b> · {i.sku}</div>
                <div>{fmt(i.price)} × <input type="number" min="1" max="99" value={i.qty}
                  onChange={(e) => updateQty(i.key, e.target.value)} /> = <b>{fmt(i.price * i.qty)}</b></div>
              </div>
              <button className="btn ghost sm" onClick={() => remove(i.key)}>Удалить</button>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <Link to="/catalog" className="btn ghost">← Продолжить покупки</Link>
          </div>
        </div>
        <aside className="cart-summary">
          <h3>Ваш заказ</h3>
          <div className="row"><span>Товаров:</span><b>{count}</b></div>
          <div className="row"><span>Сумма:</span><b>{fmt(total)}</b></div>
          <div className="row muted"><span>Доставка:</span><b style={{ color: 'var(--success)' }}>Электронная · бесплатно</b></div>
          <div className="row total"><span>К оплате:</span><span>{fmt(total)}</span></div>
          <Link to="/checkout" className="btn block" style={{ marginTop: 16 }}>Оформить заказ →</Link>
          <button className="btn ghost block" onClick={() => window.confirm('Очистить корзину?') && clear()} style={{ marginTop: 8 }}>
            Очистить корзину
          </button>
        </aside>
      </div>
    </>
  );
}