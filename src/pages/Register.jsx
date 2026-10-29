import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [form, setForm] = useState({ first: '', last: '', email: '', user: '', pass: '' });
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (form.pass.length < 6) return showToast('Пароль должен быть не менее 6 символов', 'error');
    const user = {
      id: Date.now(),
      username: form.user,
      email: form.email,
      firstName: form.first,
      lastName: form.last,
      role: 'customer',
      accessToken: 'fake-' + Math.random().toString(36),
    };
    login(user);
    showToast('Аккаунт создан', 'success');
    navigate('/profile', { replace: true });
  };

  return (
    <div className="form-card">
      <h2>Регистрация</h2>
      <p className="sub">Создайте аккаунт для покупки лицензий</p>
      <form onSubmit={submit}>
        <div className="form-group"><label>Имя</label><input required value={form.first} onChange={set('first')} /></div>
        <div className="form-group"><label>Фамилия</label><input required value={form.last} onChange={set('last')} /></div>
        <div className="form-group"><label>E-mail</label><input type="email" required value={form.email} onChange={set('email')} /></div>
        <div className="form-group"><label>Логин</label><input required minLength={3} value={form.user} onChange={set('user')} /></div>
        <div className="form-group"><label>Пароль (мин. 6 символов)</label><input type="password" required minLength={6} value={form.pass} onChange={set('pass')} /></div>
        <button className="btn block" type="submit">Зарегистрироваться</button>
      </form>
      <p className="form-note">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </div>
  );
}