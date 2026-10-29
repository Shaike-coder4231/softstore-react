import { Link } from 'react-router-dom';
import Empty from '../components/Empty';

export default function NotFound() {
  return <Empty title="Страница не найдена" sub="Проверьте адрес или вернитесь в каталог"
    action={<Link to="/" className="btn">На главную</Link>} />;
}