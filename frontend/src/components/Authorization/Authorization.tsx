import '../../App.css';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { authorizationRequest, nameChangerAction} from '../../store/reducers/user';
import {AuthorizationForm} from './Authorization.styled';

function Authorization() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      dispatch(nameChangerAction('SingUp'));
    },[]);
    
    async function authorization (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const currentUser = {email: email, password: password};
      await dispatch<any>(authorizationRequest(currentUser));
      
      if(localStorage.getItem('token') !== '') {
        window.location.href = '/main';
      } else{alert('Wrong password or email.')}

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