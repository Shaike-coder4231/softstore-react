import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { fmt, fmtDate } from '../utils/format';
import Breadcrumbs from '../components/Breadcrumbs';
import Empty from '../components/Empty';

export default function Profile() {
  const { user, logout, login } = useAuth();
  const { orders } = useOrders();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'orders';
  const [first, setFirst] = useState(user.firstName || '');
  const [last, setLast] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');

  const setTab = (t) => setParams({ tab: t });

  const saveProfile = (e) => {
    e.preventDefault();
    login({ ...user, firstName: first, lastName: last, email });
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Личный кабинет' }]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h1 style={{ fontSize: '1.4rem' }}>Привет, {user.firstName || user.username} 👋</h1>
        <button className="btn ghost sm" onClick={logout}>Выйти</button>
      </div>
      <div className="tabs">
        <div className={`tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>📦 Мои заказы</div>
        <div className={`tab ${tab === 'licenses' ? 'active' : ''}`} onClick={() => setTab('licenses')}>🔑 Лицензии</div>
        <div className={`tab ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>⚙️ Настройки</div>
      </div>

      {tab === 'orders' && (
        !orders.length
          ? <Empty title="Заказов пока нет" sub="Самое время купить первую лицензию"
              action={<Link to="/catalog" className="btn">В каталог</Link>} />
          : orders.map((o) => (
            <div key={o.id} style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <div><b>{o.id}</b> <span className={`status ${o.status}`}>{o.status}</span></div>
                <div style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{fmtDate(o.createdAt)}</div>
              </div>
              <div style={{ fontSize: '.85rem', color: 'var(--muted)', marginBottom: 8 }}>
                {o.items.length} поз. · {fmt(o.total)} · {o.paymentMethod}{o.phone ? ` · ${o.phone}` : ''}
              </div>
              <details>
                <summary style={{ cursor: 'pointer', fontSize: '.85rem', color: 'var(--primary)' }}>Показать состав</summary>
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                  {o.items.map((i, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '.85rem' }}>
                      <span>{i.title} ({i.licenseType}) ×{i.qty}</span>
                      <b>{fmt(i.price * i.qty)}</b>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ))
      )}

      {tab === 'licenses' && (
        !orders.length
          ? <Empty title="Лицензий пока нет" />
          : orders.flatMap((o) => o.items.map((i, idx) => (
              <div key={o.id + idx} style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <b>{i.title}</b>
                  <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{fmtDate(o.createdAt)}</span>
                </div>
                <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: 8 }}>
                  {i.licenseType} · {i.sku} · заказ {o.id}
                </div>
                <code style={{ background: '#f8fafc', padding: '6px 10px', borderRadius: 6, fontSize: '.85rem', border: '1px solid var(--border)', display: 'inline-block' }}>{i.key}</code>
              </div>
            )))
      )}

      {tab === 'settings' && (
        <form className="form-card" style={{ margin: 0 }} onSubmit={saveProfile}>
          <h2>Настройки профиля</h2>
          <div className="form-group"><label>Имя</label><input value={first} onChange={(e) => setFirst(e.target.value)} /></div>
          <div className="form-group"><label>Фамилия</label><input value={last} onChange={(e) => setLast(e.target.value)} /></div>
          <div className="form-group"><label>E-mail</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="form-group"><label>Логин</label><input value={user.username} disabled /></div>
          <button className="btn">Сохранить</button>
        </form>
      )}
    </>
  );
}