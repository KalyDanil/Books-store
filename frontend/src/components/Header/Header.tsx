import {HeaderStyled} from './Header.styled';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';
import {useState} from 'react';
import {refusalAction} from '../../store/reducers/user';
import {Link} from "react-router-dom";

function Header() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [headerButton, setHeaderButton] = useState('LogIn');
    
    function nameChanger() {
        if(headerButton === 'LogIn') {
            setHeaderButton('SingUp')
            return
        }
        setHeaderButton('LogIn')
    }

    function logOut() {
        dispatch(refusalAction());
        localStorage.setItem('token', '');
    }

    function toProfile() {
        window.location.href = '/profile';
    }

    function toMainPage() {
        localStorage .setItem('headerButton',  '');
        window.location.href = '/main';
    }

    return (
        <HeaderStyled isLoggedIn={user.tokenIsValid} headerButton={headerButton}>
            <img src="./assets/image/logoBlack.svg" alt='logo'/>
            <input type='button' className='logOut' onClick={logOut} value='Log Out'/>
            <p className='header__catalog' onClick={toMainPage}>Catalog</p>
            <div className='header__search-div'>
                <img src="./assets/image/search.svg" alt='basket'/>
                <input className='header__search' type='text' placeholder='Search'/>
            </div>
            <Link to='/authorization' className='header__button logIn' onClick={nameChanger}>Log In</Link>
            <Link to='/registration' className='header__button singUp' onClick={nameChanger}>Sing Up</Link>
            <div className='header__menu'>
                <img src="./assets/image/basket.svg" alt='basket'/>
                <img src="./assets/image/like.svg" alt='like'/>
                <img src="./assets/image/profileLink.svg" alt='profileLink' onClick={toProfile}/>
            </div>
        </HeaderStyled>
    );
  }

  export default Header;