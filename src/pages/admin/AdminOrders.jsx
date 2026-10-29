import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';
import { fmt, fmtDate } from '../../utils/format';
import Modal from '../../components/Modal';

export default function AdminOrders() {
  const [remote, setRemote] = useState([]);
  const { orders: local, updateStatus } = useOrders();
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      try { setRemote(await api.getOrders(30)); } catch { setRemote([]); }
    })();
  }, []);

  const all = [
    ...local.map((o) => ({ ...o, userId: '-', totalProducts: o.items.length, products: o.items, _local: true })),
    ...remote,
  ];

  const filtered = all.filter((o) =>
    (!status || o.status === status) && (!q || o.id.toLowerCase().includes(q.toLowerCase()) || (o.email || '').toLowerCase().includes(q.toLowerCase()))
  );

  const changeStatus = (id) => {
    const newStatus = document.getElementById('new-status').value;
    updateStatus(id, newStatus);
    showToast('Статус обновлён', 'success');
    setModal(null);
  };

  return (
    <>
      <h1 style={{ fontSize: '1.3rem', marginBottom: 16 }}>Заказы</h1>
      <div className="toolbar-admin">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Все статусы</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input placeholder="Поиск по ID или e-mail..." value={q} onChange={(e) => setQ(e.target.value)} />
        <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>Всего: {all.length}</span>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead><tr><th>ID</th><th>Клиент</th><th>E-mail</th><th>Телефон</th><th>Позиций</th><th>Сумма</th><th>Статус</th><th>Дата</th><th></th></tr></thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td><b>{o.id}</b>{o._local ? ' 📍' : ''}</td>
                <td>{o.userId !== '-' ? 'user #' + o.userId : '—'}</td>
                <td>{o.email || '—'}</td>
                <td>{o.phone || '—'}</td>
                <td>{o.totalProducts || o.products?.length || 0}</td>
                <td><b>{fmt(o.total)}</b></td>
                <td><span className={`status ${o.status}`}>{o.status}</span></td>
                <td>{fmtDate(o.createdAt)}</td>
                <td><button className="btn sm ghost" onClick={() => setModal(o)}>👁️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={`Заказ ${modal?.id || ''}`}>
        {modal && (
          <>
            <p style={{ fontSize: '.85rem', marginBottom: 6 }}><b>E-mail:</b> {modal.email || '—'}</p>
            <p style={{ fontSize: '.85rem', marginBottom: 6 }}><b>Телефон:</b> {modal.phone || '—'}</p>
            <p style={{ fontSize: '.85rem', marginBottom: 6 }}><b>Дата:</b> {fmtDate(modal.createdAt)}</p>
            <p style={{ fontSize: '.85rem', marginBottom: 12 }}><b>Статус:</b> <span className={`status ${modal.status}`}>{modal.status}</span></p>
            <h3 style={{ fontSize: '.95rem', marginBottom: 8 }}>Состав:</h3>
            {(modal.items || modal.products || []).map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: '.85rem' }}>
                <span>{p.title} {p.qty || p.quantity ? `×${p.qty || p.quantity}` : ''}</span>
                <b>{fmt(p.price * (p.qty || p.quantity || 1))}</b>
              </div>
            ))}
            <p style={{ textAlign: 'right', fontSize: '1rem', marginTop: 12 }}><b>Итого: {fmt(modal.total)}</b></p>
            {modal._local && (
              <>
                <div className="form-group" style={{ marginTop: 16 }}>
                  <label>Изменить статус</label>
                  <select id="new-status" defaultValue={modal.status}>
                    <option value="paid">paid</option>
                    <option value="active">active</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
                <button className="btn block" onClick={() => changeStatus(modal.id)}>Сохранить статус</button>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}