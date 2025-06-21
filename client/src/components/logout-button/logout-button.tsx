import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/authApi';
import styles from './logout-button.module.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Выйти
    </button>
  );
};

export default LogoutButton;