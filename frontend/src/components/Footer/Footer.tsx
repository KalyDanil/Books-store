import {FooterStyled} from './Footer.styled';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';

function Footer() {
    return (
        <FooterStyled>
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
        </FooterStyled>
    );
  }

  export default Footer;