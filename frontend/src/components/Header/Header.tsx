import { HeaderStyled } from './Header.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { RootState } from '../../store/index';
import { refusalAction, nameChangerAction } from '../../store/reducers/userReducer/thunks';
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getBooksRequest, getCartBooksRequest } from '../../store/reducers/bookReducer/thunks';

const Header: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch();
    const searchInput = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    let bookAmount = 0;

    (books.cartBooks).map((item) => {
        bookAmount += item.UserBook.inCart;
    });

    const getBooks = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = {
            genres: searchParams.getAll("genre"),
            minPrice: searchParams.get("minPrice") == null ? books.minPrice : searchParams.get("minPrice"),
            maxPrice: searchParams.get("maxPrice") == null ? books.maxPrice : searchParams.get("maxPrice"),
            sortBy: searchParams.get("sortBy"),
            search: searchInput.current?.value,
        };
        await dispatch<any>(getBooksRequest(params));
    }

    const getCartBooks = () => {
        const params = {
            userId: user.id
        }
        if (user.id !== 0) {
            dispatch<any>(getCartBooksRequest(params));
        }
    }

    useEffect(() => {
        getCartBooks();
    }, []);

    useEffect(() => {
        getCartBooks();
    }, [books.totalPrice]);

    const nameChanger = () => {
        if (user.headerButton === 'LogIn') {
            dispatch(nameChangerAction('SingUp'))
            return
        }

        dispatch(nameChangerAction('LogIn'))
    }

    const logOut = () => {
        dispatch(refusalAction());
        localStorage.setItem('token', '');
    }

    const toProfile = () => {
        window.location.href = '/profile';
    }

    const toMainPage = () => {
        window.location.href = '/main?page=1';
    }

    const toCart = () => {
        window.location.href = '/cart';
    }

    const toLikedBooks = () => {
        window.location.href = '/liked-books?page=1';
    }

    return (
        <HeaderStyled isLoggedIn={user.tokenIsValid} headerButton={user.headerButton}>
            <img src="./assets/image/logoBlack.svg" alt='logo' />
            <input type='button' className='logOut' onClick={logOut} value='Log Out' />
            <p className='header__catalog' onClick={toMainPage}>Catalog</p>
            <form className='header__search-div' onSubmit={getBooks}>
                <img src="./assets/image/search.svg" alt='search' />
                <input className='header__search' ref={searchInput} type='text' placeholder='Search' />
            </form>
            <Link to='/authorization' className='header__button logIn' onClick={nameChanger}>Log In</Link>
            <Link to='/registration' className='header__button singUp' onClick={nameChanger}>Sing Up</Link>
            <div className='header__menu'>
                <img src="./assets/image/basket.svg" alt='basket' onClick={toCart} />
                <div className='header__menu-basketCounter'>
                    {bookAmount}
                </div>
                <img src="./assets/image/like.svg" alt='like' onClick={toLikedBooks} />
                <img className='header__menu-profileLink' src={'http://localhost:4000/uploads/' + user.avatar} alt='profileLink' onClick={toProfile} />
            </div>
        </HeaderStyled>
    );
}

export default Header;