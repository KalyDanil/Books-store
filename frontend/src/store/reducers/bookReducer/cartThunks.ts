import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBookToCart, changeBooksAmount, deleteBookFromCart, getCartBooks } from '../../../api/booksApi';
import { IAddBookToCartReq, IChangeBooksAmountReq, IDeleteBookFromCartReq, IGetCartBooksReq } from '../../../utils/types/userBooks';
import { booksSlice } from './slicer';

export const {
  getCartBooksAction,
} = booksSlice.actions;

export const addBookToCartRequest = createAsyncThunk('add-book-to-cart',
  async (body: IAddBookToCartReq) => {
    try {
      addBookToCart(body);
    } catch (err) {
      console.log((err as Error).message);
      if ((err as Error).message === 'Request failed with status code 400') {
        return alert('Missing required parameters.');
      }
      alert('No connection to server.');
    }
  });

export const changeBooksAmountRequest = createAsyncThunk('change-books-amount',
  async (body: IChangeBooksAmountReq) => {
    try {
      changeBooksAmount(body);
    } catch (err) {
      console.log((err as Error).message);
      if ((err as Error).message === 'Request failed with status code 400') {
        return alert('Missing required parameters.');
      }
      alert('No connection to server.');
    }
  });

export const deleteBookFromCartRequest = createAsyncThunk('delete-book-from-cart',
  async (body: IDeleteBookFromCartReq) => {
    try {
      deleteBookFromCart(body);
    } catch (err) {
      console.log((err as Error).message);
      if ((err as Error).message === 'Request failed with status code 400') {
        return alert('Missing required parameters.');
      }
      alert('No connection to server.');
    }
  });

export const getCartBooksRequest = createAsyncThunk('cart',
  async (params: IGetCartBooksReq, { dispatch }) => {
    try {
      const res = await getCartBooks(params);
      let booksAmount = 0;
      res.map((item) => {
        booksAmount += item.CartBook.amount;
        return booksAmount;
      });
      dispatch(getCartBooksAction({ books: res, amount: booksAmount }));
    } catch (err) {
      console.log((err as Error).message);
      if ((err as Error).message === 'Request failed with status code 400') {
        return alert('Missing required parameters.');
      }
      alert('No connection to server.');
    }
  });
