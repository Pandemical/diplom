import { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/user/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error('Ошибка проверки авторизации', err);
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, [token]);

  if (!token || !isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
