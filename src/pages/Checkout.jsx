import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { fmt } from '../utils/format';
import { formatPhone } from '../utils/phone';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const { add } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '');
  const [phone, setPhone] = useState('');
  const [pay, setPay] = useState('card');
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!items.length) {
    return <Empty title="Корзина пуста" sub="Сначала добавьте лицензию"
      action={<Link to="/catalog" className="btn">В каталог</Link>} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return showToast('Заполните обязательные поля', 'error');
    if (!terms) return showToast('Примите условия лицензионного соглашения', 'error');
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const order = add({
      email, customerName: name, phone, paymentMethod: pay,
      items: items.map((i) => ({
        title: i.title, licenseType: i.licenseType, qty: i.qty, price: i.price, sku: i.sku,
        key: 'XXXX-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' +
             Math.random().toString(36).slice(2, 6).toUpperCase(),
      })),
      total,
    });
    clear();
    navigate(`/order/${order.id}`);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Корзина', to: '/cart' }, { label: 'Оформление' }]} />
      <h1 style={{ marginBottom: 16, fontSize: '1.4rem' }}>Оформление заказа</h1>
      <div className="steps">
        <div className="step active">1. Контакты</div>
        <div className="step">2. Оплата</div>
        <div className="step">3. Подтверждение</div>
      </div>
      <div className="cart-layout">
        <form className="form-card wide" style={{ margin: 0 }} onSubmit={handleSubmit}>
          <h2>Контактные данные</h2>
          <p className="sub">Ключ активации придёт на этот e-mail</p>
          <div className="form-group">
            <label>E-mail *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Имя и фамилия *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Петров" />
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input
              type="tel"
              value={phone}
              placeholder="7(___)___-__-__"
              maxLength={16}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onFocus={() => { if (!phone) setPhone('7'); }}
            />
          </div>
          <h2 style={{ marginTop: 24 }}>Способ оплаты</h2>
          <div className="form-group">
            <label>Выберите способ</label>
            <select value={pay} onChange={(e) => setPay(e.target.value)}>
              <option value="card">Банковская карта</option>
              <option value="sbp">СБП</option>
              <option value="wallet">Электронный кошелёк</option>
            </select>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <label htmlFor="terms" style={{ fontSize: '.85rem', color: 'var(--text)', margin: 0 }}>
              Я согласен с условиями лицензионного соглашения и обработкой персональных данных
            </label>
          </div>
          <button className="btn block" type="submit" disabled={submitting}>
            {submitting ? 'Обработка...' : `Оплатить ${fmt(total)}`}
          </button>
          <p className="form-note">После оплаты ключ активации будет отправлен на e-mail в течение 30 секунд</p>
        </form>
        <aside className="cart-summary">
          <h3>Ваш заказ</h3>
          {items.map((i) => (
            <div className="row" key={i.key}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.title} ×{i.qty}</span>
              <b>{fmt(i.price * i.qty)}</b>
            </div>
          ))}
          <div className="row total"><span>Итого:</span><span>{fmt(total)}</span></div>
        </aside>
      </div>
    </>
  );
}