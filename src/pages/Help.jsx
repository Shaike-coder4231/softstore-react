import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Help() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Руководство' }]} />
      <h1 style={{ marginBottom: 16, fontSize: '1.4rem' }}>📖 Руководство пользователя и оператора</h1>
      <div className="help-section">
        <h3>1. Как купить лицензию</h3>
        <ol>
          <li>Откройте <Link to="/catalog">каталог</Link> или воспользуйтесь поиском.</li>
          <li>На странице продукта выберите тип лицензии: Personal, Business или Enterprise.</li>
          <li>Нажмите «В корзину» или «Купить сейчас».</li>
          <li>Перейдите к оформлению, укажите e-mail — на него придёт ключ.</li>
          <li>Оплатите заказ. Через 30 секунд проверьте почту.</li>
        </ol>
        <div className="help-tip">💡 Ключ активации приходит моментально, доставка не нужна.</div>
      </div>
      <div className="help-section">
        <h3>2. Активация ключа</h3>
        <ol>
          <li>Скачайте ПО с официального сайта производителя.</li>
          <li>Запустите установку и введите ключ из письма.</li>
          <li>Если ключ не принимается — проверьте, что не истёк срок и совпадает тип лицензии.</li>
        </ol>
      </div>
      <div className="help-section">
        <h3>3. Руководство оператора</h3>
        <ol>
          <li>Войдите: <code>emilys</code> / <code>emilyspass</code>.</li>
          <li>Откройте <Link to="/admin/products">/admin/products</Link>.</li>
          <li>Для добавления товара нажмите «+ Добавить товар».</li>
          <li>Для заказов — <Link to="/admin/orders">/admin/orders</Link>.</li>
        </ol>
      </div>
    </>
  );
}