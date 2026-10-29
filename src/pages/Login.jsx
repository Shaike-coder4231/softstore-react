import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api.login({ username, password, expiresInMins: 60 });
      if (!user.accessToken) throw new Error('Неверный логин или пароль');
      login(user);
      showToast('Добро пожаловать, ' + (user.firstName || user.username), 'success');
      const redirect = sessionStorage.getItem('redirectAfterLogin') || '/profile';
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirect, { replace: true });
    } catch (err) {
      showToast('Ошибка входа: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Вход в аккаунт</h2>
      <p className="sub">Для доступа к истории заказов и лицензиям</p>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Логин</label>
          <input required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn block" type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
      <p className="form-note">Тестовый аккаунт: <code>emilys</code> / <code>emilyspass</code></p>
      <p className="form-note">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
    </div>
  );
}