import {CartBookStyle} from './CartBook.styled';
import {useState, useEffect, useRef} from 'react';
import {addBookToCartRequest, changeTotalPriceAction, getCartBooksRequest} from '../../store/reducers/books';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';

interface Book {
    book: {
        id: number
        name: string,
        authorname: string,
        description1: string,
        description2: string,
        description3: string,
        price: number,
        paperBackPrice: number,
        rating: number,
        dateofissue: string,
        cover: string,
        status: string,
        genre: string,
        UserBook: UserBook,
    }
}

interface UserBook {
    rating: number,
    inCart: number
}

function CartBook({book}: Book) {
    const user = useSelector((state: RootState) => state.user);
    const [bookAmount, setBookAmount] = useState(book.UserBook.inCart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeTotalPriceAction(book.price * book.UserBook.inCart / 2));
    },[]);

    const plus = () => {
        const body = {
            userId: user.id,
            bookId: book.id,
            amount: bookAmount + 1,
        };
        dispatch<any>(addBookToCartRequest(body));
        dispatch(changeTotalPriceAction(book.price));
        setBookAmount(bookAmount + 1);
    }

    const minus = () => {
        const body = {
            userId: user.id,
            bookId: book.id,
            amount: bookAmount - 1,
        };
          
        if(bookAmount === 1 ) {
            return
        }
        
        dispatch<any>(addBookToCartRequest(body));
        dispatch(changeTotalPriceAction(-book.price));
        setBookAmount(bookAmount - 1);
    }

    const deleteBook = () => {
        const body = {
            userId: user.id,
            bookId: book.id,
            amount: 0,
        }; 
        dispatch<any>(addBookToCartRequest(body));
        dispatch(changeTotalPriceAction(-(book.price * bookAmount)));
    }

    return (
        <CartBookStyle cartIsEmpty={false}>
            <img className='cartBook__cover' src={'http://localhost:4000/images/books/'+book.cover} alt='book'/>
            <div className='cartBook__info'>
                <h1>{book.name}</h1>
                <h2>{book.authorname}</h2>
                <div className='cartBook__info-number'>
                    <div className='circle' onClick={minus}>
                        <img src="./assets/image/minus.svg" alt='minus'/>
                    </div>
                    <span>{bookAmount}</span>
                    <div className='circle' onClick={plus}>
                        <img src="./assets/image/plus.svg" alt='plus'/>
                    </div>
                    <img src="./assets/image/delete.svg" alt='delete' onClick={deleteBook}/>
                </div>
                <p className='cartBook__info-price'>$ {(book.price * bookAmount).toFixed(2)} USD </p>
            </div>
            <img className='cartBook__line' src="./assets/image/cartLine.svg" alt='line'/>
        </CartBookStyle>
    );
}

export default CartBook;