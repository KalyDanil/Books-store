import {HeaderStyled} from './Header.styled';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';
import {headerButtonChangerAction} from '../../store/toDoReducers/authorization';

function Header() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    function nameChanger() {
        dispatch(headerButtonChangerAction(!user.headerButtonIsLogIn))
    }
    return (
        <HeaderStyled isLoggedIn={true} headerButton={user.headerButtonIsLogIn}>
            <img src="./assets/image/logoBlack.svg" alt='logo'></img>
            <p className='header__catalog'>Catalog</p>
            <input className='header__search' type='text' placeholder='Search'/>
            <Link className='header__button logIn' to='/authorization' onClick={nameChanger}>Log In</Link>
            <Link className='header__button singUp' to='/registration' onClick={nameChanger}>Sing Up</Link>
            <div className='header__menu'>
                <img src="./assets/image/basket.svg" alt='logo'></img>
                <img src="./assets/image/like.svg" alt='logo'></img>
                <img src="./assets/image/profileLink.svg" alt='logo'></img>
            </div>
        </HeaderStyled>
    );
  }

  export default Header;