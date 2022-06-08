import { createSlice } from '@reduxjs/toolkit';
import { notLiked } from '../../../utils/constants';
import { 
    IState 
} from '../../../utils/types';

import {
    getBooksAction,
    getBooksCountAction,
    getPageAction,
    selectFilterButtonAction,
    getAllGenresAction,
    getRatingAction,
    addGenreAction,
    getMinMaxPriceAction,
    removeGenreAction,
    getSelectedBookAction,
    changeLikeAction,
    getUserRatingAction,
    getCommentsAction,
    getCartBooksAction,
    changeCartAmountAction,
    changeCartLengthAction,
    changeTotalPriceAction,
} from './actions';

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
        UserBook: {
            rating: 0,
            inCart: 0,
            isLiked: false,
        },
        CartBooks: [],
        Users: [],
        UserLikedBooks: []
    },
    selectedBookLike: notLiked,
    comments: [
        {
            comment: '',
            createdAt: {},
            User: {
                fullName: '',
                avatar: '',
            }
        }
    ],
    userRating: 0,
    totalPrice: 0,
}

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

export default booksSlice.reducer