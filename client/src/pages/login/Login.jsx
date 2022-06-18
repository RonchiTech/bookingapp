import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext, ACTION_TYPES } from '../../context/authContext';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { user, error, loading, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email && user?.username) {
      navigate('/');
    }
  }, [navigate, user]);

  const onChangeHandler = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onButtonClick = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      return dispatch({
        type: ACTION_TYPES.LOGIN_FAILED,
        payload: 'Empty Inputs',
      });
    }
    dispatch({ type: ACTION_TYPES.LOGIN_START });
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        credentials
      );
      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: response.data.userInfo,
      });
      navigate('/');
    } catch (err) {
      return dispatch({
        type: ACTION_TYPES.LOGIN_FAILED,
        payload: err.response.data.errorMessage,
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={onChangeHandler}
          value={credentials.username}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={onChangeHandler}
          value={credentials.password}
        />
        <button disabled={loading} className="lButton" onClick={onButtonClick}>
          Login
        </button>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
