import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { notLiked } from '../../../utils/constants';
import {
  TBooksResponse,
  IBook,
  TGenresResponse,
  IState,
} from '../../../utils/types/book';
import { IComment, TCartBooksResponse } from '../../../utils/types/userBooks';

const getBooksAction = (state: IState, action: PayloadAction<TBooksResponse>) => {
  state.books = action.payload;
};

const getBooksCountAction = (state: IState, action: PayloadAction<number>) => {
  state.booksCount = action.payload;
};

const getPageAction = (state: IState, action: PayloadAction<number>) => {
  state.page = action.payload;
};

const selectFilterButtonAction = (
  state: IState, action: PayloadAction<string>,
) => {
  state.selectedFilterButton = action.payload;
};

const getMinMaxPriceAction = (
  state: IState, action: PayloadAction<{ minPrice: number, maxPrice: number }>,
) => {
  state.minPrice = action.payload.minPrice;
  state.maxPrice = action.payload.maxPrice;
};

const getAllGenresAction = (state: IState, action: PayloadAction<TGenresResponse>) => {
  state.genres = action.payload;
};

const getRatingAction = (
  state: IState, action: PayloadAction<{ index: number, rating: number }>,
) => {
  state.books[action.payload.index].rating = action.payload.rating;
};

const addGenreAction = (state: IState, action: PayloadAction<string>) => {
  state.selectedGenres.push(action.payload);
};

const removeGenreAction = (state: IState, action: PayloadAction<string>) => {
  const index = state.selectedGenres.indexOf(action.payload);
  state.selectedGenres.splice(index, 1);
};

const getSelectedBookAction = (state: IState, action: PayloadAction<IBook>) => {
  state.selectedBook = action.payload;
};

const getUserRatingAction = (state: IState, action: PayloadAction<number | undefined>) => {
  if (action.payload !== undefined) {
    state.userRating = action.payload;
  }
};

const changeLikeAction = (state: IState, action: PayloadAction<string>) => {
  state.selectedBookLike = action.payload;
};

const getCommentsAction = (
  state: IState, action: PayloadAction<IComment[]>,
) => {
  state.comments = action.payload;
};

const getCartBooksAction = (
  state: IState, action: PayloadAction<{ books: TCartBooksResponse, amount: number }>,
) => {
  state.cartBooks = action.payload.books;
  state.cartBooksAmount = action.payload.amount;
};

const changeCartAmountAction = (state: IState, action: PayloadAction<number>) => {
  state.cartBooksAmount = action.payload;
};

const changeCartLengthAction = (state: IState, action: PayloadAction<number>) => {
  state.cartBooksLength -= action.payload;
};

const changeTotalPriceAction = (state: IState, action: PayloadAction<number>) => {
  state.totalPrice += action.payload;
};

const initialState: IState = {
  books: [],
  booksCount: 0,
  cartBooksAmount: 0,
  cartBooksLength: 0,
  limit: 4,
  selectedFilterButton: '',
  cartBooks: [],
  page: 1,
  maxRating: 5,
  minPrice: 0,
  maxPrice: 1000,
  genres: [{ id: 0, name: '', genre: '' }],
  selectedGenres: [],
  idBook: 0,
  selectedBook: {
    id: 0,
    name: '',
    authorname: '',
    description: '',
    price: 0,
    paperBackPrice: 0,
    rating: 0,
    dateofissue: '',
    cover: '',
    status: '',
    genre: '',
    selectStatus: false,
    CartBooks: [],
    UserLikedBooks: [],
  },
  selectedBookLike: notLiked,
  comments: [
    {
      comment: '',
      createdAt: {},
      User: {
        fullName: '',
        avatar: '',
      },
    },
  ],
  userRating: 0,
  totalPrice: 0,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooksAction,
    getBooksCountAction,
    getPageAction,
    selectFilterButtonAction,
    getMinMaxPriceAction,
    getAllGenresAction,
    getRatingAction,
    addGenreAction,
    removeGenreAction,
    getSelectedBookAction,
    changeLikeAction,
    getUserRatingAction,
    getCommentsAction,
    getCartBooksAction,
    changeCartAmountAction,
    changeCartLengthAction,
    changeTotalPriceAction,
  },
});

export default booksSlice.reducer;
