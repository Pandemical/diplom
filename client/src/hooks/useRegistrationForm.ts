import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registration } from '../api/authApi';

export function useRegistrationForm() {
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

  return {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  };
}