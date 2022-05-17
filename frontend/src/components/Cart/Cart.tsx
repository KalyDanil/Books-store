import {CartStyle} from './Cart.styled';
import CartBook from '../CartBook/CartBook';
import {getCartBooksRequest} from '../../store/reducers/books';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';
import {useState, useEffect, useRef} from 'react';
import Book from '../Book/Book';  

interface IBooks {
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

interface UserBook {
    rating: number,
    inCart: number
}

function Cart() {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const [totalPrice, setTotalPrice] = useState(books.totalPrice);
    const [isEmpty, setIsEmpty] = useState(true);
    const dispatch = useDispatch();  
    
    const getCartBooks = async () => {
        const params ={
            userId: user.id
        }
        await dispatch<any>(getCartBooksRequest(params));

        if(books.cartBooks.length !== 0) {
            setIsEmpty(false);
        }
    }
     
    useEffect(() => {
        getCartBooks();
    },[]);

    useEffect(() => {
        getCartBooks();
    },[totalPrice]);

    useEffect(() => {
        setTotalPrice(books.totalPrice);
    },[books.totalPrice]);

    const cartBooks = (books.cartBooks).map((item) => {
        return (<CartBook book={item} key={item.id}/>);
    });

    const toMain = () => {
        window.location.href = '/main?page=1';
    }

    return (
        <CartStyle cartIsEmpty={isEmpty}>
            <div className='cart'>
                {cartBooks}
                <div className='total'>
                    <h1><span>Total:</span> $ {(totalPrice).toFixed(2)} USD</h1>
                    <div className='total__button'>
                        <input className='total__button-1' type='button' value='Continue shopping' onClick={toMain}/>
                        <input className='total__button-2' type='button' value='Chekout'/>
                    </div>
                </div>
            </div>
            <div className='emptyCart'>
                <img src="./assets/image/cartBackground.svg" alt='cartBackground'/>
                <div>
                    <h1>Your cart is empty</h1>
                    <p>Add items to cart to make a purchase. Go to the catalogue no.</p>
                    <input type='button' value='Go to catalog'onClick={toMain}/>
                </div>
            </div>
        </CartStyle>
    );
}

export default Cart;