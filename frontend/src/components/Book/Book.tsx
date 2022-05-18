import { BookStyledContainer } from './Book.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Stars from '../Stars/Stars';
import HollowStars from '../HollowStars/HollowStars';
import { RootState } from '../../store/index';
import { addBookToCartRequest, toLikeBookRequest, changeTotalPriceAction } from '../../store/reducers/bookReducer/thunks';
import { IBooks } from '../../utils/types';

const Book: React.FC<IBooks> = ({ book }) => {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const [like, setLike] = useState('likeOnBook.svg');
    const dispatch = useDispatch();
    const cover = useRef<HTMLImageElement>(null);
    let ratingSum = 0;
    book.Users.map(item => { ratingSum += item.UserBook.rating });
    const ratingAmount = book.Users.length;
    let bookRating = Math.round(ratingSum / ratingAmount);
    if (isNaN(bookRating)) {
        bookRating = 0;
    }
    const [searchParams, setSearchParams] = useSearchParams();
    const starsArr = [];
    const hollowStarsArr = [];

    useEffect(() => {
        if (book.UserLikedBooks[0] !== undefined) {
            setLike('activeLikeOnBook.svg')
        }
    }, []);

    for (let i = 0; i < bookRating; i++) {
        starsArr.push([])
    }

    for (let i = 0; i < (books.maxRating - bookRating); i++) {
        hollowStarsArr.push([])
    }

    const stars = starsArr.map((item, index) => {
        return (<Stars key={index} />);
    });

    const hollowStars = hollowStarsArr.map((item, index) => {
        return (<HollowStars key={index} />);
    });

    const toBookPage = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (cover.current !== null) {
            window.location.href = `/bookPage:${cover.current.id}`;
            searchParams.append('book', cover.current.id);
            setSearchParams(searchParams);
        }
    };

    const addToCart = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const body = {
            userId: user.id,
            bookId: cover.current?.id,
        }
        const button = (e.target as HTMLInputElement);


        if (button.classList.contains('notAvailable')) {
            return
        }

        if (user.tokenIsValid) {
            await dispatch<any>(addBookToCartRequest(body));
            dispatch(changeTotalPriceAction(books.totalPrice + 1));
            return
        }

        window.location.href = '/authorization';
    }

    const toLikeBook = () => {
        const body = {
            userId: user.id,
            bookId: cover.current?.id,
            like: false,
        }

        if (!user.tokenIsValid) {
            window.location.href = '/authorization';
            return;
        }

        if (like === 'likeOnBook.svg' && user.id !== 0) {
            body.like = true;
            setLike('activeLikeOnBook.svg');
            dispatch<any>(toLikeBookRequest(body));
        }

        if (like === 'activeLikeOnBook.svg' && user.id !== 0) {
            setLike('likeOnBook.svg');
            dispatch<any>(toLikeBookRequest(body))
        }
    }


    return (
        <BookStyledContainer>
            <img className='likeOnBook' src={"./assets/image/books/" + like} alt='likeOnBook' onClick={toLikeBook} />
            <img className='book' id={book.id.toString()} ref={cover} src={'http://localhost:4000/images/books/' + book.cover} alt='book' onClick={toBookPage} />
            <span className='bookName'>{book.name}</span>
            <span className='author'>{book.authorname}</span>
            <div className='books__stars'>
                {stars}
                {hollowStars}
                <span>{bookRating}</span>
            </div>
            <input className={book.status} type='button' value={'$ ' + book.price + ' USD'} onClick={addToCart} />
        </BookStyledContainer>
    );
}

export default Book;