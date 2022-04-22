import '../../App.css';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { authorizationRequest} from '../../store/toDoReducers/authorization';
import {AuthorizationForm} from './Authorization.styled';
import { propsToClassKey } from '@mui/styles';

interface Prop {
  registrationStarted: boolean;
}

function Authorization(props: Prop) {
    const dispatch = useDispatch();
    const [authorizationStarted, setAuthorizationStarted] = useState(true);
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    
    async function authorization (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const currentUser = {fullName: fullName, password: password};
      const res = await dispatch<any>(authorizationRequest(currentUser));
      alert(res.payload.id);
      setFullName('');
      setPassword('');
    };
  
    function fullNameInput (e:any) {
      setFullName(e.target.value);
    }
  
    function passwordInput (e: any) {
      setPassword(e.target.value);
    }
    return (
        <AuthorizationForm registrationStarted={props.registrationStarted}  onSubmit={authorization}>
            <h1 className='authorization__header'>Log In</h1>
            <input className='authorization__input authorization__email' type="text" placeholder="Email" onInput={fullNameInput} value={fullName}/>
            <span>Enter your email</span>
            <input className='authorization__input authorization__password' type="password" placeholder="password" onInput={passwordInput} value={password}/>
            <span>Enter your password</span>
            <input className='authorization__button' type="submit" value='Log In'/>
        </AuthorizationForm>
    );
  }

  export default Authorization;