import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const updateValue = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    if(!values.username || !values.password) return false;
    let res = await axios.post('http://localhost:5000/api/login', values);
    console.log(res);
    if(!res) return false;
    props.history.push('/');
  };

  return (
    <div>
      <form name='login'>
        <h4>Login</h4>
        <input type='text' value={values.username} name='username' onChange={updateValue} />
        <input type='password' value={values.password} name='password' onChange={updateValue} />
        <button onClick={submit}>Login</button>
      </form>
    </div>
  );
};

export default Login;