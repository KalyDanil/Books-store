import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { changeCartAmountAction, changeTotalPriceAction } from "../../../store/reducers/bookReducer/thunks";
import { addBookToCartRequest } from "../../../store/reducers/bookReducer/thunks";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { BookDesctiptionAndButtonStyle } from "./BookDescriptionAndButton.styled";

const BookDesctiptionAndButton: React.FC = () => {
    const books = useAppSelector((state) => state.books);
    const user = useAppSelector((state) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isFirstlyAdding, setIsFirstlyAdding] = useState(true);

    const addToCart = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const body = {
            userId: user.id,
            bookId: books.selectedBook.id
        }
        const button = (e.target as HTMLInputElement);

        if (button.classList.contains('notAvailable')) {
            return
        }

        if (user.tokenIsValid) {
            await dispatch(addBookToCartRequest(body));
            dispatch(changeTotalPriceAction(books.totalPrice + 1));
            let index = 0;

            for (let i = 0; i < books.selectedBook.CartBooks.length; i++) {
                if (books.selectedBook.CartBooks[i].id === user.id) {
                    index = i;
                }
            }
       
            if (books.selectedBook.CartBooks[index] === undefined) {
                if (isFirstlyAdding === true) {
                    dispatch(changeCartAmountAction(books.cartBooksAmount + 1));
                    setIsFirstlyAdding(false);
                }
            }

            return
        }

        window.location.href = '/authorization';
    }

    return (
        <BookDesctiptionAndButtonStyle isLoggedIn={user.tokenIsValid}>
            <h2 className='bookDescription__h'>Description</h2>
            <div className='bookDescription'>
                <pre>{books.selectedBook.description}</pre>
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
        </BookDesctiptionAndButtonStyle>
    );
}

export default BookDesctiptionAndButton;