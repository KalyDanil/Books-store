import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookStyledContainer } from './Book.styled';
import Stars from '../Stars/Stars';
import HollowStars from '../HollowStars/HollowStars';
import { toLikeBookRequest, changeCartAmountAction } from '../../store/reducers/bookReducer/thunks';
import { IBooks } from '../../utils/types/book';
import { useAppSelector } from '../../utils/hooks/useAppSelector';
import { liked, notLiked } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { addBookToCartRequest } from '../../store/reducers/bookReducer/cartThunks';

const Book: React.FC<IBooks> = ({ book }) => {
  const user = useAppSelector((state) => state.user);
  const books = useAppSelector((state) => state.books);
  const [like, setLike] = useState(notLiked);
  const [isFirstlyAdding, setIsFirstlyAdding] = useState(true);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const starsArr = [];
  const hollowStarsArr = [];

  useEffect(() => {
    if (book.UserLikedBooks === undefined) { return; }
    if (book.UserLikedBooks[0] !== undefined) {
      setLike(liked);
    }
  }, [book.UserLikedBooks]);

  for (let i = 0; i < book.rating; i++) {
    starsArr.push([]);
  }

  for (let i = 0; i < (books.maxRating - book.rating); i++) {
    hollowStarsArr.push([]);
  }

  const stars = starsArr.map((item, index) => {
    return (<Stars key={index} />);
  });

  const hollowStars = hollowStarsArr.map((item, index) => {
    return (<HollowStars key={index} />);
  });

  const toBookPage = () => {
    window.location.href = `/bookPage:${book.id}`;
    searchParams.append('book', book.id.toString());
    setSearchParams(searchParams);
  };

  const addToCart = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const body = {
      userId: user.id,
      bookId: book.id,
    };

    const button = (e.target as HTMLInputElement);

    if (button.classList.contains('notAvailable')) {
      return;
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

      return;
    }

    window.location.href = '/authorization';
  };

  const toLikeBook = () => {
    const body = {
      userId: user.id,
      bookId: book.id.toString(),
      like: false,
    };

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
      dispatch(toLikeBookRequest(body));
    }
  };

  return (
    <BookStyledContainer>
      <img className='likeOnBook' src={`http://localhost:4000/images/books/${like}`} alt='likeOnBook' onClick={toLikeBook} />
      <img className='book' id={book.id.toString()} src={`http://localhost:4000/images/books/${book.cover}`} alt='book' onClick={toBookPage} />
      <div className='bookNameAndAuthorDiv'>
        <span className='bookName'>{book.name}</span> <br />
        <span className='author'>{book.authorname}</span>
      </div>
      <div className='books__stars'>
        {stars}
        {hollowStars}
        <span>{book.rating.toFixed(1)}</span>
      </div>
      <input className={book.status} type='button' value={`$ ${book.price} USD`} onClick={addToCart} />
    </BookStyledContainer>
  );
};

export default Book;
