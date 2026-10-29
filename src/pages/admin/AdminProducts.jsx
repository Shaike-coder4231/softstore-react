import { useEffect, useState } from 'react';
import { api, CATEGORIES } from '../../api';
import { fmt } from '../../utils/format';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [modal, setModal] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      const data = await api.listProducts({ limit: 100 });
      setProducts(data.products);
    })();
  }, []);

  const filtered = products.filter((p) =>
    (!q || p.title.toLowerCase().includes(q.toLowerCase())) && (!cat || p.category === cat)
  );

  const save = () => { showToast(modal?.id ? 'Сохранено (симуляция)' : 'Товар создан (симуляция)', 'success'); setModal(null); };
  const del = (id) => {
    if (!window.confirm('Удалить товар #' + id + '?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Удалено', 'info');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h1 style={{ fontSize: '1.3rem' }}>Товары</h1>
        <button className="btn" onClick={() => setModal({})}>+ Добавить товар</button>
      </div>
      <div className="toolbar-admin">
        <input placeholder="Поиск по названию..." value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">Все категории</option>
          {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead><tr><th>ID</th><th>Фото</th><th>Название</th><th>Категория</th><th>Цена</th><th>Типы</th><th></th></tr></thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><img src={p.thumbnail} alt="" /></td>
                <td><b>{p.title}</b><br /><small style={{ color: 'var(--muted)' }}>{p.sku}</small></td>
                <td>{p.categoryName}</td>
                <td><b>{fmt(p.price)}</b></td>
                <td>{p.licenseTypes.join(', ')}</td>
                <td>
                  <button className="btn sm ghost" onClick={() => setModal(p)}>✏️</button>
                  <button className="btn sm ghost" onClick={() => del(p.id)} style={{ color: 'var(--danger)' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.id ? 'Редактировать товар' : 'Добавить товар'}>
        <form onSubmit={(e) => { e.preventDefault(); save(); }}>
          <div className="form-group"><label>Название</label><input defaultValue={modal?.title || ''} required /></div>
          <div className="form-group"><label>Цена ($)</label><input type="number" step="0.01" defaultValue={modal?.price || ''} required /></div>
          <div className="form-group">
            <label>Категория</label>
            <select defaultValue={modal?.category || 'os'}>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
            </select>
          </div>
          <button className="btn block">Сохранить</button>
        </form>
      </Modal>
    </>
  );
}