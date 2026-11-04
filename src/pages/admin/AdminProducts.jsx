import { useEffect, useState } from 'react';
import { api, CATEGORIES } from '../../api';
import { db } from '../../utils/db';
import { fmt } from '../../utils/format';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [modal, setModal] = useState(null);
  const { showToast } = useToast();

  const loadData = async () => {
    const data = await api.listProducts({ limit: 100 });
    setProducts(data.products);
  };

  useEffect(() => { loadData(); }, []);

  const filtered = products.filter((p) =>
    (!q || p.title.toLowerCase().includes(q.toLowerCase())) && (!cat || p.category === cat)
  );

  const save = () => { showToast(modal?.id ? 'Сохранено (симуляция)' : 'Товар создан (симуляция)', 'success'); setModal(null); };
  const del = (id) => {
    if (!window.confirm('Удалить товар #' + id + '?')) return;
    const newProducts = db.getProducts().filter(p => p.id !== id);
    db.saveProducts(newProducts);
    loadData();
    showToast('Удалено', 'info');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h1 style={{ fontSize: '1.3rem' }}>Товары</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn ghost" onClick={() => window.confirm('Сбросить все данные к исходным?') && db.reset()}>
            🔄 Сбросить БД
          </button>
          <button className="btn" onClick={() => setModal({})}>+ Добавить товар</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input placeholder="Поиск..." value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1, padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} />
        <select value={cat} onChange={(e) => setCat(e.target.value)} style={{ padding: 10, border: '1px solid var(--border)', borderRadius: 8 }}>
          <option value="">Все категории</option>
          {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
        </select>
      </div>
      <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--bg-body)', fontSize: '.85rem', color: 'var(--text-muted)' }}>
            <tr><th style={{ padding: 12 }}>ID</th><th>Название</th><th>Категория</th><th>Цена</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12 }}>{p.id}</td>
                <td style={{ fontWeight: 600 }}>{p.title}</td>
                <td>{p.categoryName}</td>
                <td style={{ fontWeight: 700 }}>{fmt(p.price)}</td>
                <td style={{ textAlign: 'right', padding: 12 }}>
                  <button className="btn ghost" onClick={() => setModal(p)}>✏️</button>
                  <button className="btn ghost" onClick={() => del(p.id)} style={{ color: 'var(--danger)' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.id ? 'Редактировать' : 'Добавить'}>
        <form onSubmit={(e) => { e.preventDefault(); save(); }}>
          <div className="form-group"><label>Название</label><input defaultValue={modal?.title || ''} required /></div>
          <div className="form-group"><label>Цена ($)</label><input type="number" step="0.01" defaultValue={modal?.price || ''} required /></div>
          <button className="btn block">Сохранить</button>
        </form>
      </Modal>
    </>
  );
}
