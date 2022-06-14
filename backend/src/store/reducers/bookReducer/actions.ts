import { PayloadAction } from '@reduxjs/toolkit';
import {
  TBooksResponse,
  IBook,
  IComment,
  TGenresResponse,
  IState,
  TCartBooksResponse
} from '../../../utils/types';

export const getBooksAction = (state: IState, action: PayloadAction<TBooksResponse>) => {
  state.books = action.payload
};

export const getBooksCountAction = (state: IState, action: PayloadAction<number>) => {
  state.booksCount = action.payload
};

export const getPageAction = (state: IState, action: PayloadAction<number>) => {
  state.page = action.payload
};

export const selectFilterButtonAction = (state: IState, action: PayloadAction<string>) => {
  state.selectedFilterButton = action.payload
};

export const getMinMaxPriceAction = (state: IState, action: PayloadAction<{ minPrice: number, maxPrice: number }>) => {
  state.minPrice = action.payload.minPrice;
  state.maxPrice = action.payload.maxPrice;
};

export const getAllGenresAction = (state: IState, action: PayloadAction<TGenresResponse>) => {
  state.genres = action.payload
};

export const getRatingAction = (state: IState, action: PayloadAction<{ index: number, rating: number }>) => {
  state.books[action.payload.index].rating = action.payload.rating;
};

export const addGenreAction = (state: IState, action: PayloadAction<string>) => {
  state.selectedGenres.push(action.payload)
};

export const removeGenreAction = (state: IState, action: PayloadAction<string>) => {
  const index = state.selectedGenres.indexOf(action.payload)
  state.selectedGenres.splice(index, 1);
};

export const getSelectedBookAction = (state: IState, action: PayloadAction<IBook>) => {
  state.selectedBook = action.payload
};

export const getUserRatingAction = (state: IState, action: PayloadAction<number | undefined>) => {
  if (action.payload !== undefined) {
    state.userRating = action.payload;
  }
};

export const changeLikeAction = (state: IState, action: PayloadAction<string>) => {
  state.selectedBookLike = action.payload;
};

export const getCommentsAction = (state: IState, action: PayloadAction<IComment[]>) => {
  state.comments = action.payload
};

export const getCartBooksAction = (state: IState, action: PayloadAction<{ books: TCartBooksResponse, amount: number }>) => {
  state.cartBooks = action.payload.books;
  state.cartBooksAmount = action.payload.amount;
};

export const changeCartAmountAction = (state: IState, action: PayloadAction<number>) => {
  state.cartBooksAmount = action.payload;
};

export const changeCartLengthAction = (state: IState, action: PayloadAction<number>) => {
  state.cartBooksLength -= action.payload;
};

export const changeTotalPriceAction = (state: IState, action: PayloadAction<number>) => {
  state.totalPrice += action.payload
};