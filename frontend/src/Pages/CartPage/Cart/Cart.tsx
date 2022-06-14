import { CartStyle } from './Cart.styled';
import CartBook from '../CartBook/CartBook';
import { getCartBooksRequest } from '../../../store/reducers/bookReducer/thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/index';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../utils/hooks/useAppSelector';
import EmptyCart from '../EmptyCart/EmptyCart';

const Cart: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const books = useAppSelector((state) => state.books);
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getCartBooks = async () => {
      const params = {
        userId: user.id
      }
      await dispatch(getCartBooksRequest(params));
      if (books.cartBooks.length !== 0) {
        setIsEmpty(false);
      }
      if (books.cartBooks.length === 0) {
        setIsEmpty(true);
      }
    }
    getCartBooks();
  }, [books.cartBooks, dispatch, user.id]);

  const cartBooks = (books.cartBooks).map((item) => {
    return (<CartBook book={item} key={item.id} />);
  });

  const toMain = () => {
    window.location.href = '/main?page=1';
  }

  return (
    <CartStyle cartIsEmpty={isEmpty}>
      {cartBooks}
      <div className='total'>
        <h1><span>Total:</span> $ {(books.totalPrice).toFixed(2)} USD</h1>
        <div className='total__button'>
          <input className='total__button-1' type='button' value='Continue shopping' onClick={toMain} />
          <input className='total__button-2' type='button' value='Chekout' />
        </div>
      </div>
      <EmptyCart cartIsEmpty={isEmpty} />
    </CartStyle>
  );
}

export default Cart;