import { NavLink, Outlet } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function AdminLayout() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Админ' }]} />
      <div className="admin-layout">
        <aside className="admin-side">
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>📦 Товары</NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>🛒 Заказы</NavLink>
          <NavLink to="/profile">👤 Профиль</NavLink>
          <NavLink to="/help">📖 Справка</NavLink>
        </aside>
        <div><Outlet /></div>
      </div>
    </>
  );
}