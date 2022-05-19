import { createSlice } from '@reduxjs/toolkit';
import { 
    TBooksResponse, 
    IBook,  
    IComment, 
    TGenresResponse, 
    IState 
} from '../../../utils/types';

import {
    getBooksAction,
    getBooksCountAction,
    getPageAction,
    getAllGenresAction,
    addGenreAction,
    getMinMaxPriceAction,
    removeGenreAction,
    getSelectedBookAction,
    getUserRatingAction,
    getCommentsAction,
    getCartBooksAction,
    changeTotalPriceAction,
} from './actions';

const initialState: IState = {
    books: [],
    booksCount: 0,
    limit: 4,
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
        description1: '',
        description2: '',
        description3: '',
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
        Users: [],
        UserLikedBooks: []
    },
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
        getMinMaxPriceAction,
        getAllGenresAction,
        addGenreAction,
        removeGenreAction,
        getSelectedBookAction,
        getUserRatingAction,
        getCommentsAction,
        getCartBooksAction,
        changeTotalPriceAction,
        // getBooksAction: (state, action: PayloadAction<TBooksResponse>) => {
        //     state.books = action.payload
        // },
        // getBooksCountAction: (state, action: PayloadAction<number>) => {
        //     state.booksCount = action.payload
        // },
        // getPageAction: (state, action: PayloadAction<number>) => {
        //     state.page = action.payload
        // },
        // getMinMaxPriceAction: (state, action: PayloadAction<{ minPrice: number, maxPrice: number }>) => {
        //     state.minPrice = action.payload.minPrice;
        //     state.maxPrice = action.payload.maxPrice;
        // },
        // getAllGenresAction: (state, action: PayloadAction<TGenresResponse>) => {
        //     state.genres = action.payload
        // },
        // addGenreAction: (state, action: PayloadAction<string>) => {
        //     state.selectedGenres.push(action.payload)
        // },
        // removeGenreAction: (state, action: PayloadAction<string>) => {
        //     const index = state.selectedGenres.indexOf(action.payload)
        //     state.selectedGenres.splice(index, 1);
        // },
        // getSelectedBookAction: (state, action: PayloadAction<IBook>) => {
        //     state.selectedBook = action.payload
        // },
        // getUserRatingAction: (state, action: PayloadAction<number | undefined>) => {
        //     if (action.payload !== undefined) {
        //         state.userRating = action.payload;
        //     }
        // },
        // getCommentsAction: (state, action: PayloadAction<IComment[]>) => {
        //     state.comments = action.payload
        // },
        // getCartBooksAction: (state, action: PayloadAction<TBooksResponse>) => {
        //     state.cartBooks = action.payload
        // },
        // changeTotalPriceAction: (state, action: PayloadAction<number>) => {
        //     state.totalPrice += action.payload
        // },
    },
});

// export const {
//     getBooksAction,
//     getBooksCountAction,
//     getPageAction,
//     getAllGenresAction,
//     addGenreAction,
//     getMinMaxPriceAction,
//     removeGenreAction,
//     getSelectedBookAction,
//     getUserRatingAction,
//     getCommentsAction,
//     getCartBooksAction,
//     changeTotalPriceAction,
// } = booksSlice.actions

export default booksSlice.reducer