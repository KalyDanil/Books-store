import '../../App.css';
import { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { registrationRequest } from '../../store/reducers/userReducer/thunks';
import { RegistrationForm, Picture } from './Registration.styled';

const Registration: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordReplay, setPasswordReplay] = useState('');

  const registration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = {
      email: email,
      password: password
    };

    if (password !== passwordReplay) {
      alert('Password must match password replay.')
      setPasswordReplay('');
      setPassword('');
      return
    }

    await dispatch<any>(registrationRequest(currentUser));

    if (localStorage.getItem('token') !== '') {
      setPasswordReplay('');
      setEmail('');
      setPassword('');
      window.location.href = '/main';
    } else { alert('Such emails are not exist or wrong password. Password must have at least one capital letter, one symbol from (- _ + = ! ? % / | @ # $ № . ,) or one number, and its length must be at least 6.') };

    setPasswordReplay('');
    setPassword('');
  }

  const emailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const passwordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const passwordReplayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordReplay(e.target.value);
  }

  return (
    <RegistrationForm onSubmit={registration}>
      <h1 className='registration__header'>Sing Up</h1>
      <input className='registration__input registration__email' type="email" placeholder="Email" onChange={emailInput} value={email} />
      <span>Enter your email</span>
      <input className='registration__input registration__password' type="password" placeholder="Password" onChange={passwordInput} value={password} />
      <span>Enter your password</span>
      <input className='registration__input registration__password' type="password" placeholder="Password replay" onChange={passwordReplayInput} value={passwordReplay} />
      <span>Repeat your password without errors</span>
      <input className='registration__button' type="submit" value='Sing Up' />
    </RegistrationForm>
  );
}

export default Registration;
