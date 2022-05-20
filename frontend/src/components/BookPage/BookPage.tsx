import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { RootState, AppDispatch } from '../../store/index';
import { BookPageStyle } from './BookPage.styled';
import BannerOfAuthorization from '../BannerOfAuthorization/BannerOfAuthorization';
import Book from '../Book/Book';
import Comment from '../Comment/Comment';
import {
    getSelectedBookRequest,
    makeCommentRequest,
    addBookToCartRequest,
    toLikeBookRequest,
    changeTotalPriceAction,
    getRecommendationsRequest
} from '../../store/reducers/bookReducer/thunks';
import { useSearchParams, useParams } from "react-router-dom";
import StarsToRating from '../StarsToRating/StarsToRating';
import HollowStarsToRating from '../HollowStarsToRating/HollowStarsToRating';

const BookPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch<AppDispatch>();
    const [like, setLike] = useState('likeOnBook.svg');
    const newComment = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const id = params.id;
    let ratingSum = 0;
    books.selectedBook.Users.map(item => { ratingSum += item.UserBook.rating });
    const ratingAmount = books.selectedBook.Users.length;
    let bookRating = Math.round(ratingSum / ratingAmount);
    if (isNaN(bookRating)) {
        bookRating = 0;
    }

    const getSelectedBook = async () => {
        const reqParams = {
            bookId: id?.slice(1),
            userId: user.id,
        }
        await dispatch(getSelectedBookRequest(reqParams));

        if (books.selectedBook.UserLikedBooks[0] !== undefined) {
            setLike('activeLikeOnBook.svg')
        }
    }

    const getRecommendations = async () => {
        const params = {
            limit: books.limit,
            userId: user.id,
            bookId: id?.slice(1),
        }
        dispatch(getRecommendationsRequest(params))
    }

    useEffect(() => {
        getRecommendations()
        setSearchParams(searchParams);
    }, []);

    useEffect(() => {
        getSelectedBook();
    }, [books.userRating, bookRating]);

    const booksArr = (books.books).map((item) => {
        return (<Book book={item} />);
    });

    const addToCart = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const body = {
            userId: user.id,
            bookId: books.selectedBook.id,
        }
        const button = (e.target as HTMLInputElement);

        if (button.classList.contains('notAvailable')) {
            return
        }

        if (user.tokenIsValid) {
            await dispatch(addBookToCartRequest(body));
            dispatch(changeTotalPriceAction(books.totalPrice + 1));
            return
        }

        window.location.href = '/authorization';
    }

    const toLikeBook = () => {
        const body = {
            userId: user.id,
            bookId: id?.slice(1),
            like: false,
        }

        if (!user.tokenIsValid) {
            window.location.href = '/authorization';
            return;
        }

        if (like === 'likeOnBook.svg' && user.id !== 0) {
            body.like = true;
            setLike('activeLikeOnBook.svg');
            dispatch(toLikeBookRequest(body));
        }

        if (like === 'activeLikeOnBook.svg' && user.id !== 0) {
            setLike('likeOnBook.svg');
            dispatch(toLikeBookRequest(body))
        }
    }

    const submitComment = async () => {
        const body = {
            userId: user.id,
            bookId: books.selectedBook.id,
            comment: newComment.current?.value,
            commentDate: new Date(),
        }
        await dispatch(makeCommentRequest(body));
    }

    const starsArr = [];
    const hollowStarsArr = [];
    const defaultHollowStarsArr = [];

    for (let i = 0; i < books.userRating; i++) {
        starsArr.push([])
    }

    for (let i = 0; i < (books.maxRating - books.userRating); i++) {
        hollowStarsArr.push([])
    }

    const stars = starsArr.map((item, index) => {
        return (<StarsToRating value={index} />);
    });

    const hollowStars = hollowStarsArr.map((item, index) => {
        return (<HollowStarsToRating value={index + starsArr.length} />);
    });

    defaultHollowStarsArr.length = hollowStarsArr.length + starsArr.length;
    const defaultHollowStars = hollowStarsArr.map((item, index) => {
        return (<HollowStarsToRating value={0} />);
    });

    const commentsArr = (books.comments).map((item, index) => {
        return (<Comment comment={item} key={index} />);
    });

    return (
        <BookPageStyle isLoggedIn={user.tokenIsValid}>
            <div className='bookDiv'>
                <div className='bookCoverDiv'>
                    <img className='bookLike' src={"./assets/image/books/" + like} alt='likeOnBook' onClick={toLikeBook} />
                    <img className='bookCover' src={'http://localhost:4000/images/books/' + books.selectedBook.cover} alt='book' />
                </div>
                <div className='bookInformation'>
                    <h1 className='bookInformation__name'>{books.selectedBook.name}</h1>
                    <span className='bookInformation__author'>{books.selectedBook.authorname}</span>
                    <div className='bookStars'>
                        <div className='bookRating'>
                            <img src="./assets/image/books/star.svg" alt='star' />
                            <span>{bookRating}</span>
                        </div>
                        <div className='makingRatingDiv'>
                            <div className='starsToRate'>
                                {stars}
                                {hollowStars}
                            </div>
                            <div className='defaultStarsToRate'>
                                {defaultHollowStars}
                            </div>
                            <div className='rateThisBook'>
                                <img src="./assets/image/ratingArrow.svg" alt='ratingArrow' />
                                <span>Rate this book</span>
                            </div>
                        </div>
                    </div>
                    <div className='bookDesctiptionAndButton'>
                        <h2 className='bookDescription__h'>Description</h2>
                        <div className='bookDescription'>
                            <p>{books.selectedBook.description1} </p>
                            <p>{books.selectedBook.description2}</p>
                            <p>{books.selectedBook.description3}</p>
                        </div>
                        <div className='buyingButton'>
                            <div>
                                <span>Paperback</span>
                                <input className={books.selectedBook.status} type='button' value={'$ ' + books.selectedBook.price + ' USD'} onClick={addToCart} />
                            </div>
                            <div>
                                <span>Hardcover</span>
                                <input className={books.selectedBook.status} type='button' value={'$ ' + books.selectedBook.price + ' USD'} onClick={addToCart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='commentsDiv'>
                <h1>Comments</h1>
                {commentsArr}
                <form className='makingComments' onSubmit={submitComment}>
                    <input type='text' ref={newComment} className='makingComments__text' placeholder='Share a comment' />
                    <input type='submit' className='makingComments__button' value='Post a comment' />
                </form>
            </div>
            <BannerOfAuthorization />
            <div className='recommendations'>
                <h1 className='recommendations__h1'>Recommendations</h1>
                {booksArr}
            </div>
        </BookPageStyle>
    );
}

export default BookPage;