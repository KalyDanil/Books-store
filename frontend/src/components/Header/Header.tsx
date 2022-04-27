import {HeaderStyled} from './Header.styled';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';

function Header() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    
    function nameChanger() {
        if(localStorage .getItem('headerButton') !=='') {
            
            localStorage .setItem('headerButton',  '');
            return window.location.href = '/registration';
        }
        localStorage .setItem('headerButton',  'Sing Up');
        window.location.href = '/authorization';

    }

    function toProfile() {
        window.location.href = '/profile';
    }

    function toMainPage() {
        localStorage .setItem('headerButton',  ''); 
        window.location.href = '/main';
    }

    return (
        <HeaderStyled isLoggedIn={localStorage .getItem('isLoggedIn')} headerButton={localStorage .getItem('headerButton')}>
            <img src="./assets/image/logoBlack.svg" alt='logo'></img>
            <p className='header__catalog' onClick={toMainPage}>Catalog</p>
            <input className='header__search' type='text' placeholder='Search'/>
            <input type='button' className='header__button logIn' onClick={nameChanger} value='Log In'/>
            <input type='button' className='header__button singUp' onClick={nameChanger} value='Sing Up'/>
            <div className='header__menu'>
                <img src="./assets/image/basket.svg" alt='basket'></img>
                <img src="./assets/image/like.svg" alt='like'></img>
                <img src="./assets/image/profileLink.svg" alt='profileLink' onClick={toProfile}></img>
            </div>
        </HeaderStyled>
    );
  }

  export default Header;