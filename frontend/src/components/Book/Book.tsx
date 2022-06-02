import { BookStyledContainer } from './Book.styled';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import Stars from '../Stars/Stars';
import HollowStars from '../HollowStars/HollowStars';
import { AppDispatch } from '../../store/index';
import { addBookToCartRequest, toLikeBookRequest, changeCartAmountAction } from '../../store/reducers/bookReducer/thunks';
import { IBooks, IDbUser } from '../../utils/types';
import { useAppSelector } from '../../utils/hooks/useAppSelector';
import { liked, notLiked } from '../../utils/constants';

const Book: React.FC<IBooks> = ({ book }) => {
    const user = useAppSelector((state) => state.user);
    const books = useAppSelector((state) => state.books);
    const [like, setLike] = useState(notLiked);
    const [isFirstlyAdding, setIsFirstlyAdding] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const [searchParams, setSearchParams] = useSearchParams();
    const starsArr = [];
    const hollowStarsArr = [];

    const bookRating = useMemo(() => 
            {
                let ratingSum = 0;
                const computeRating = (usersArr: IDbUser[]) => {
                    usersArr.map(item => { return ratingSum += item.UserBook.rating });
                    let ratingAmount = usersArr.length;
                
                    for (let i = 0; i < usersArr.length; i++) {
                        if (usersArr[i].UserBook.rating === null) {
                            ratingAmount -= 1;
                        }
                    }
                
                    let bookRating = Math.round(ratingSum / ratingAmount);
            
                    if (isNaN(bookRating)) {
                        bookRating = 0;
                    }
            
                    return bookRating;
                };
                return computeRating(book.Users)
            }
    , [book.Users]);

    useEffect(() => {
        if (book.UserLikedBooks === undefined) { return }
        if (book.UserLikedBooks[0] !== undefined) {
            setLike(liked)
        }
      
    }, [book.UserLikedBooks]);

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
        window.location.href = `/bookPage:${book.id}`;
        searchParams.append('book', book.id.toString());
        setSearchParams(searchParams);
    };
    
    const addToCart = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const body = {
            userId: user.id,
            bookId: book.id,
        }
    
        const button = (e.target as HTMLInputElement);

        if (button.classList.contains('notAvailable')) {
            return
        }
        if (user.tokenIsValid) {
            let index = 0;
            await dispatch(addBookToCartRequest(body));
  
            for (let i = 0; i < book.CartBooks.length; i++) {
                if (book.CartBooks[i].id === user.id) {
                    index = i;
                }
            }
       
            if (book.CartBooks[index] === undefined) {
                if (isFirstlyAdding === true) {
                    dispatch(changeCartAmountAction(books.cartBooksAmount + 1));
                    setIsFirstlyAdding(false);
                }
            }

            return
        }

        window.location.href = '/authorization';
    }

    const toLikeBook = () => {
        const body = {
            userId: user.id,
            bookId: book.id.toString(),
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


    return (
        <BookStyledContainer>
            <img className='likeOnBook' src={"./assets/image/books/" + like} alt='likeOnBook' onClick={toLikeBook} />
            <img className='book' id={book.id.toString()} src={'http://localhost:4000/images/books/' + book.cover} alt='book' onClick={toBookPage} />
            <div className='bookNameAndAuthorDiv'>
                <span className='bookName'>{book.name}</span> <br/>
                <span className='author'>{book.authorname}</span>
            </div>
            <div className='books__stars'>
                {stars}
                {hollowStars}
                <span>{bookRating.toFixed(1)}</span>
            </div>
            <input className={book.status} type='button' value={'$ ' + book.price + ' USD'} onClick={addToCart} />
        </BookStyledContainer>
    );
}

export default Book;