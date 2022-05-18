import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { Banner } from './BannerOfAuthorization.styled';

const BannerOfAuthorization: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    const toAuthorization = () => {
        window.location.href = '/authorization';
    }

    return (
        <Banner isLoggedIn={user.tokenIsValid}>
            <img className='bannerKingdome' src="./assets/image/bannerKingdome.svg" alt='bannerKingdome' />
            <img className='bannerFay' src="./assets/image/bannerFay.svg" alt='bannerFay' />
            <div className='banner__text'>
                <h1>Authorize now</h1>
                <span>Authorize now and discover the fabulous <br /> world of books</span>
                <input type='button' value='Log In' onClick={toAuthorization} />
            </div>
        </Banner>
    );
}

export default BannerOfAuthorization;