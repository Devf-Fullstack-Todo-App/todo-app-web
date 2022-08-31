import { useState, useEffect } from 'react';
import api from '../api';

function useAuth() {
  const [token, setTokenState] = useState(localStorage.getItem('tk'))

  const setToken = (_token) => {
    if (!_token) {
      localStorage.removeItem('tk');
    } else { 
      localStorage.setItem('tk', _token);
    }
    setTokenState(_token)
  }

  useEffect(() => {
    // Refresh token every 10 minutes in miliseconds
    const milisecondsToRefreshToken = 10 * 60 * 1000;
    let timeout = null;
    if (token) {
      timeout = setTimeout(async () => {
        const { token: newToken } = await api.auth.refresh(token);
        setToken(newToken);
      }, milisecondsToRefreshToken)
    }
    return () => {
      if (token) {
        clearTimeout(timeout)
      }
    }
  }, [token])


  return [token, setToken]
}

export default useAuth;