import React, { useState } from 'react';
import axios from 'axios';

const Register = props => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const updateValues = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    if(!values.username || !values.password) return false;
    let res = await axios.post('http://localhost:5000/api/register', values);
    console.log(res);
    if(!res) return false;
    props.history.push('/');
  };

  return (
    <div>
      <form name='register'>
        <h4>Register</h4>
        <input type='text' name='username' value={values.username} onChange={updateValues} />
        <input type='password' name='password' value={values.password} onChange={updateValues} />
        <button onClick={submit}>Register</button>
      </form>
    </div>
  );
};

export default Register;