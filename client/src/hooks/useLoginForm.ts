import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

export function useLoginForm() {
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

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  };
}