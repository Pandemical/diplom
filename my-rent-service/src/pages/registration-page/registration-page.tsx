import { useState } from 'react';
import { registration } from '../../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import styles from './registration-page.module.css';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const data = await registration(email, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      alert('Ошибка регистрации');
      console.error(error);
    }
  };

  return (
    <div className={styles.registrationWrapper}>
      <div className={styles.registrationForm}>
        <h2 className={styles.registrationTitle}>Создать аккаунт</h2>
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
              placeholder="Не менее 6 символов"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Подтвердите пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Повторите пароль"
            />
          </div>
          <button type="submit" className={styles.submitButton}>Зарегистрироваться</button>
        </form>
        <div className={styles.loginLink}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>

      <div className={styles.gradientBlock}>
        <h2>Добро пожаловать!</h2>
        <p>Присоединяйтесь к нам и получите доступ к эксклюзивным материалам.</p>
      </div>
    </div>
  );
}

export default RegistrationPage;
