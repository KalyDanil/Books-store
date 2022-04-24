import '../../App.css';
import {useState} from 'react';
import {RootState} from '../../store/index';
import Authorization from '../Authorization/Authorization';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';
import Profile from '../Profile/Profile';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registrationRequest, headerMenuShowAction} from '../../store/toDoReducers/authorization';
import {RegistrationForm, Picture} from './Registration.styled';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function Registration() {
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
      email: email,
      password: password
    };
    const res = await dispatch<any>(registrationRequest(currentUser));
    if(res.payload !== 'error') {
      window.location.href = '/';
    } else {alert('Such emails are not exist or wrong password. Password must have at least one capital letter, one symbol from (- _ + = ! ? % / | @ # $ № . ,) or one number, and its length must be at least 6.')};
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

  function startLogIn (e: any) {
    setRegistrationStarted(false);
    dispatch(headerMenuShowAction(false));
  }

  return (
    // <div className="App">
    //   <Profile></Profile>
    //   <MainPage></MainPage>
      // <Header isLoggedIn={user.headerIsHidden}>
      //   <img src="./assets/image/logoBlack.svg" alt='logo'></img>
      //   <p className='header__catalog'>Catalog</p>
      //   <input className='header__search' type='text' placeholder='Search'/>
      //   <input className='header__button' type='button' value='Log in/Sing up' onClick={startLogIn}/>
      //   <div className='header__menu'>
      //     <img src="./assets/image/basket.svg" alt='logo'></img>
      //     <img src="./assets/image/like.svg" alt='logo'></img>
      //     <img src="./assets/image/profileLink.svg" alt='logo'></img>
      //   </div>
      // </Header>
      <RegistrationForm registrationStarted={registrationStarted} onSubmit={registration}>
        <h1 className='registration__header'>Sing Up</h1>
        <input className='registration__input registration__email' type="email" placeholder="Email" onInput={emailInput} value={email}/>
        <span>Enter your email</span>
        <input className='registration__input registration__password' type="password" placeholder="Password" onInput={passwordInput} value={password}/>
        <span>Enter your password</span>
        <input className='registration__input registration__password' type="password" placeholder="Password replay"/>
        <span>Repeat your password without errors</span>
        <input className='registration__button' type="submit" value='Sing Up'/>
      </RegistrationForm>
    //   <Authorization registrationStarted={registrationStarted}/>
    //   <Picture>
    //     <img className='registration__picture' src="./assets/image/registrationPicture.svg" alt='picture'></img>
    //   </Picture>
    //   <Footer>
    //     <div className='footer__firstDiv'>
    //       <img className='footer__logo' src="./assets/image/logoWhite.svg" alt='logo'></img>
    //       <a className='footer__email' href = "mailto: tranthuy.nute@gmail.com">tranthuy.nute@gmail.com</a>
    //       <a className='footer__telephone' href="tel:(480) 555-0103">(480) 555-0103</a>
    //     </div>
    //     <div className='footer__navigationDiv'>
    //       <a className='footer__navigation' href="/wikipedia">Home Page</a>
    //       <a className='footer__navigation' href="/wikipedia">Catalog</a>
    //       <a className='footer__navigation' href="/wikipedia">My Account</a>
    //       <a className='footer__navigation' href="/wikipedia">Cart</a>
    //     </div>
    //     <div className='footer__mapDiv'>
    //       <span>6391 Elgin St. Celina, Delaware 10299</span>
    //       <img className='footer__map' src="./assets/image/map.svg" alt='map'></img>
    //     </div>
    //   </Footer>
    // </div>
    // <Router>
    // <Header/>
    //   <Routes>
    //     <Route path="/" element={<MainPage/>} />
    //     {/* <Route path="/registration" element={<RegistrationForm/>}/> */}
    //     <Route path="/authorization" element={<Authorization />}/>
    //     <Route path="/profile" element={<Profile/>}/>
    //   </Routes>
    // </Router>
  );
}

export default Registration;
