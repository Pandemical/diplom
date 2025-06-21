import { Link } from 'react-router-dom';
import styles from './login-page.module.css';
import { useLoginForm } from '../../hooks/useLoginForm';

function LoginPage() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginForm();

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
        <img src="image/LoginPage.png" alt="login" />
        <p>Войдите в свой аккаунт, чтобы продолжить работу.</p>
      </div>
    </div>
  );
}

export default LoginPage;
