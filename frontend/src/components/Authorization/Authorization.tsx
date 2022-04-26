import '../../App.css';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { authorizationRequest} from '../../store/toDoReducers/authorization';
import {AuthorizationForm} from './Authorization.styled';

function Authorization() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function authorization (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const currentUser = {email: email, password: password};
      const res = await dispatch<any>(authorizationRequest(currentUser));
      if(res.payload !=='Wrong email or password.') {
        window.location.href = '/';
        localStorage .setItem('headerButton',  '');
        localStorage .setItem('isLoggedIn', 'true');
      } else{alert(res.payload)}
      setEmail('');
      setPassword('');
    };
  
    function emailInput (e:any) {
      setEmail(e.target.value);
    }
  
    function passwordInput (e: any) {
      setPassword(e.target.value);
    }
    
    return (
        <AuthorizationForm onSubmit={authorization}>
            <h1 className='authorization__header'>Log In</h1>
            <input className='authorization__input authorization__email' type="text" placeholder="Email" onInput={emailInput} value={email}/>
            <span>Enter your email</span>
            <input className='authorization__input authorization__password' type="password" placeholder="password" onInput={passwordInput} value={password}/>
            <span>Enter your password</span>
            <input className='authorization__button' type="submit" value='Log In'/>
        </AuthorizationForm>
    );
  }

  export default Authorization;