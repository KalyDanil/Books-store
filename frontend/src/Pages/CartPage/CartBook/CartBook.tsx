import { CartBookStyle } from './CartBook.styled';
import React, { useState, useEffect } from 'react';
import { addBookToCartRequest, changeBooksAmountRequest, changeCartAmountAction, changeCartLengthAction, changeTotalPriceAction, deleteBookFromCartRequest } from '../../../store/reducers/bookReducer/thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/index';
import { IBooks, ICartBooks } from '../../../utils/types';
import { useAppSelector } from '../../../utils/hooks/useAppSelector';

const CartBook: React.FC<ICartBooks> = ({ book }) => {
    const user = useAppSelector((state) => state.user);
    const books = useAppSelector((state) => state.books);
    const [bookAmount, setBookAmount] = useState(book.CartBook.amount);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(changeTotalPriceAction(book.price * book.CartBook.amount));
    }, []);

    const plus = () => {
        const body = {
            userId: user.id,
            bookId: book.id,
            amount: bookAmount + 1,
        };
        dispatch(addBookToCartRequest(body));
        dispatch(changeBooksAmountRequest(body));
        dispatch(changeTotalPriceAction(+(book.price).toFixed(2)));
        dispatch(changeCartAmountAction(books.cartBooksAmount + 1));
        setBookAmount(bookAmount + 1);
    }

    const minus = () => {
        const body = {
            userId: user.id,
            bookId: book.id,
            amount: bookAmount - 1,
        };

        if (bookAmount === 1) {
            return
        }

        dispatch(addBookToCartRequest(body));
        dispatch(changeBooksAmountRequest(body));
        dispatch(changeTotalPriceAction(-(+(book.price).toFixed(2))));
        dispatch(changeCartAmountAction(books.cartBooksAmount - 1));
        setBookAmount(bookAmount - 1);
    }

    const deleteBook = () => {
        const body = {
            userId: user.id,
            bookId: book.id,
        };
        dispatch(changeCartLengthAction(1));
        dispatch(changeTotalPriceAction(-(book.price * bookAmount)));
        dispatch(deleteBookFromCartRequest(body));
        dispatch(changeCartAmountAction(books.cartBooksAmount - bookAmount));
    }

    return (
        <CartBookStyle>
            <img className='cartBook__cover' src={'http://localhost:4000/images/books/' + book.cover} alt='book' />
            <div className='cartBook__info'>
                <h1>{book.name}</h1>
                <h2>{book.authorname}</h2>
                <div className='cartBook__info-number'>
                    <div className='circle' onClick={minus}>
                        <img src="./assets/image/minus.svg" alt='minus' />
                    </div>
                    <span>{bookAmount}</span>
                    <div className='circle' onClick={plus}>
                        <img src="./assets/image/plus.svg" alt='plus' />
                    </div>
                    <img src="./assets/image/delete.svg" alt='delete' onClick={deleteBook} />
                </div>
                <p className='cartBook__info-price'>$ {(book.price * bookAmount).toFixed(2)} USD </p>
            </div>
            <img className='cartBook__line' src="./assets/image/cartLine.svg" alt='line' />
        </CartBookStyle>
    );
}

export default React.memo(CartBook);