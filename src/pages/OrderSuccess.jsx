import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import Empty from '../components/Empty';

export default function OrderSuccess() {
  const { id } = useParams();
  const { getById } = useOrders();
  const order = getById(id);

  if (!order) return <Empty title="Заказ не найден"
    action={<Link to="/catalog" className="btn">В каталог</Link>} />;

  return (
    <div className="form-card wide" style={{ margin: '24px auto', textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>✅</div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Заказ оплачен!</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Номер заказа: <b style={{ color: 'var(--text)' }}>{order.id}</b></p>
      <p style={{ fontSize: '.9rem', marginBottom: 24 }}>
        Ключи активации отправлены на <b>{order.email}</b>.
      </p>
      <h3 style={{ textAlign: 'left', marginBottom: 12 }}>🔑 Ваши лицензии</h3>
      <div style={{ textAlign: 'left' }}>
        {order.items.map((i, idx) => (
          <div key={idx} style={{ background: '#f8fafc', borderRadius: 8, padding: 12, marginBottom: 8, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div><b>{i.title}</b><br /><small style={{ color: 'var(--muted)' }}>{i.licenseType} · {i.sku}</small></div>
              <code style={{ fontSize: '.85rem', background: '#fff', padding: '4px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>{i.key}</code>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
        <Link to="/profile" className="btn">Мои заказы</Link>
        <Link to="/catalog" className="btn secondary">Продолжить покупки</Link>
      </div>
    </div>
  );
}