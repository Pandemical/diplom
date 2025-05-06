import { JSX, useState } from 'react';
import { login } from '../../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import styles from './login-page.module.css';

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      alert('Ошибка входа');
      console.error(error);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Вход в систему</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введите ваш пароль"
            />
          </div>
          <button type="submit" className={styles.loginButton}>Войти</button>
        </form>
        <div className={styles.signupLink}>
          Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </div>
      </div>
      <div className={styles.loginGradient}>
        <h2>С возвращением!</h2>
        <p>Войдите в свой аккаунт, чтобы продолжить работу.</p>
      </div>
    </div>
  );
}

export default LoginPage;
