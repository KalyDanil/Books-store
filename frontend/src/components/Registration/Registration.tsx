import '../../App.css';
import {useState} from 'react';
import React from 'react';
import {useDispatch} from 'react-redux';
import {registrationRequest} from '../../store/toDoReducers/authorization';
import {RegistrationForm, Picture} from './Registration.styled';

function Registration() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordReplay, setPasswordReplay] = useState('');

    async function registration (e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      
      const currentUser = {
        email: email,
        password: password
      };

      if(password !== passwordReplay) {
        alert('Password must match password replay.')
        setPasswordReplay('');
        setPassword('');
        return
      }

      const res = await dispatch<any>(registrationRequest(currentUser));

      if(res.payload !== 'error') {
        setPasswordReplay('');
        setEmail('');
        setPassword('');
        window.location.href = '/';
        localStorage .setItem('headerButton',  '');
        localStorage .setItem('isLoggedIn', 'true');
      } else {alert('Such emails are not exist or wrong password. Password must have at least one capital letter, one symbol from (- _ + = ! ? % / | @ # $ № . ,) or one number, and its length must be at least 6.')};

      setPasswordReplay('');
      setPassword('');
    }

    function emailInput (e: any) {
      setEmail(e.target.value);
    }

    function passwordInput (e: any) {
      setPassword(e.target.value);
    }

    function passwordReplayInput (e: any) {
      setPasswordReplay(e.target.value);
    }

    return (
    <RegistrationForm onSubmit={registration}>
      <h1 className='registration__header'>Sing Up</h1>
      <input className='registration__input registration__email' type="email" placeholder="Email" onInput={emailInput} value={email}/>
      <span>Enter your email</span>
      <input className='registration__input registration__password' type="password" placeholder="Password" onInput={passwordInput} value={password}/>
      <span>Enter your password</span>
      <input className='registration__input registration__password' type="password" placeholder="Password replay" onInput={passwordReplayInput} value={passwordReplay}/>
      <span>Repeat your password without errors</span>
      <input className='registration__button' type="submit" value='Sing Up'/>
    </RegistrationForm>
    );
}

export default Registration;
