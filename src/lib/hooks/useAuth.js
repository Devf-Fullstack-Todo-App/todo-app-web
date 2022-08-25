import { useState } from "react";

function useAuth() {
  const [token, setTokenState] = useState(localStorage.getItem('tk'))

  const setToken =(_token) => {
    if (!_token) {
      localStorage.removeItem('tk');
    } else {
      localStorage.setItem('tk', _token);
    }
    setTokenState(_token);
  }

  return [token, setToken]
}

export default useAuth;
