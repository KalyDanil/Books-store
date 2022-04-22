import '../../App.css';
import {useState} from 'react';
import {RootState} from '../../store/index';
import Authorization from '../Authorization/Authorization';
import {useDispatch, useSelector} from 'react-redux';
import {registrationRequest} from '../../store/toDoReducers/authorization';
import {RegistrationForm, Header, Picture, Footer} from './Registration.styled';


function Auth() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [registrationStarted, setRegistrationStarted] = useState(true);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registration (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentUser = {
      fullName: fullName,
      dob: dob,
      email: email,
      password: password
    };
    const res = await dispatch<any>(registrationRequest(currentUser));
    alert (res.payload.id +`\n`+ res.payload.fullName +`\n`+ res.payload.dob +`\n`+ res.payload.email+`\n` + res.payload.token);
    setFullName('');
    setDob('');
    setEmail('');
    setPassword('');
  }

  function fullNameInput (e: any) {
    setFullName(e.target.value);
  }

  function dobInput (e: any) {
    setDob(e.target.value);
  }

  function emailInput (e: any) {
    setEmail(e.target.value);
  }

  function passwordInput (e: any) {
    setPassword(e.target.value);
  }

  function show (e: any) {
    alert(localStorage.getItem('token'))
  }

  return (
    <div className="App">
      <Header>
        <img src="./assets/image/logoBlack.svg" alt='logo'></img>
        <p className='header__catalog'>Catalog</p>
        <input className='header__search' type='text' placeholder='Search'/>
        <input className='header__button' type='button' value='Log in/Sing up'/>
      </Header>
      <RegistrationForm registrationStarted={registrationStarted} onSubmit={registration}>
        <h1 className='registration__header'>Sing Up</h1>
        <input className='registration__input registration__email' type="email" placeholder="Email" onInput={emailInput} value={email}/>
        <span>Enter your email</span>
        <input className='registration__input registration__password' type="password" placeholder="Password" onInput={passwordInput} value={password}/>
        <span>Enter your password</span>
        <input className='registration__input registration__password'  type="password" placeholder="Password replay"/>
        <span>Repeat your password without errors</span>
        <input className='registration__button' type="submit" value='Sing Up'/>
      </RegistrationForm>
      <Authorization registrationStarted={registrationStarted}/>
      <Picture>
        <img className='registration__picture' src="./assets/image/registrationPicture.svg" alt='picture'></img>
      </Picture>
      <Footer>
        <div className='footer__firstDiv'>
          <img className='footer__logo' src="./assets/image/logoWhite.svg" alt='logo'></img>
          <a className='footer__email' href = "mailto: tranthuy.nute@gmail.com">tranthuy.nute@gmail.com</a>
          <a className='footer__telephone' href="tel:(480) 555-0103">(480) 555-0103</a>
        </div>
        <div className='footer__navigationDiv'>
          <a className='footer__navigation' href="/wikipedia">Home Page</a>
          <a className='footer__navigation' href="/wikipedia">Catalog</a>
          <a className='footer__navigation' href="/wikipedia">My Account</a>
          <a className='footer__navigation' href="/wikipedia">Cart</a>
        </div>
        <div className='footer__mapDiv'>
          <span>6391 Elgin St. Celina, Delaware 10299</span>
          <img className='footer__map' src="./assets/image/map.svg" alt='map'></img>
        </div>
      </Footer>
    </div>
  );
}

export default Auth;
