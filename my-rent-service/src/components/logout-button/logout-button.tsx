import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/authApi'; 

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default LogoutButton;
