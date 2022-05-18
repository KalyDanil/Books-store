import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/index';
import {booksSlice} from './slicer';
import { 
    TBooksResponse, 
    IBook,  
    IComment, 
    TGenresResponse, 
    IState 
} from '../../../utils/types';

export const {
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
} = booksSlice.actions

export const getBooksRequest = createAsyncThunk
    ('main/all-books',
        async (params: { genres: string[] }, { dispatch, getState }) => {
            try {
                const res: { books: TBooksResponse, booksCount: number } = await api.get('http://localhost:4000/main/', { params });
                dispatch(getBooksAction(res.books));
                dispatch(getBooksCountAction(res.booksCount));
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const getLikedBooksRequest = createAsyncThunk
    ('main/liked-books',
        async (params: {}, { dispatch, getState }) => {
            try {
                const res: { books: TBooksResponse, booksCount: number } = await api.get('http://localhost:4000/main/liked-books', { params });
                dispatch(getBooksAction(res.books));
                dispatch(getBooksCountAction(res.booksCount));
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const getAllGenresRequest = createAsyncThunk
    ('main/all-genres',
        async (params, { dispatch, getState }) => {
            try {
                const res: TGenresResponse = await api.get('http://localhost:4000/main/genres');
                dispatch(getAllGenresAction(res))
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const getMinMaxPriceRequest = createAsyncThunk
    ('main/price-slider',
        async (params, { dispatch, getState }) => {
            try {
                const res: { minPrice: number, maxPrice: number } = await api.get('http://localhost:4000/main/price-slider');
                dispatch(getMinMaxPriceAction(res));
            } catch (err: any) {
                console.log(err)
            }
        }
    );

export const getSelectedBookRequest = createAsyncThunk
    ('book-page',
        async (params: {}, { dispatch, getState }) => {
            try {
                const res: { book: IBook, comments: IComment[], userRating: number | undefined } = await api.get('http://localhost:4000/main/book-page', { params });
                dispatch(getSelectedBookAction(res.book));
                dispatch(getCommentsAction(res.comments));
                dispatch(getUserRatingAction(res.userRating))
            } catch (err: any) {
                console.log(err)
            }
        }
    );

export const getRecommendationsRequest = createAsyncThunk
    ('book-page/recommendations',
        async (params: {}, { dispatch, getState }) => {
            try {
                const res: TBooksResponse = await api.get('http://localhost:4000/main/book-page/recommendations', { params });
                dispatch(getBooksAction(res));
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const changeRatingRequest = createAsyncThunk
    ('book-page/change-rating',
        async (body: {}, { dispatch, getState }) => {
            try {
                await api.put('http://localhost:4000/main/book-page/change-rating', body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const makeCommentRequest = createAsyncThunk
    ('book-page/make-comment',
        async (body: {}, { dispatch, getState }) => {
            try {
                await api.post('http://localhost:4000/main/book-page/comment', body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const addBookToCartRequest = createAsyncThunk
    ('add-book-to-cart',
        async (body: {}, { dispatch, getState }) => {
            try {
                await api.put('http://localhost:4000/main/book-page/add-to-cart', body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const toLikeBookRequest = createAsyncThunk
    ('to-like-book',
        async (body: {}, { dispatch, getState }) => {
            try {
                api.put('http://localhost:4000/main/book-page/to-like', body);
            } catch (err: any) {
                console.log(err)
            }
        }
    );

export const getCartBooksRequest = createAsyncThunk
    ('cart',
        async (params: {}, { dispatch, getState }) => {
            try {
                const res: TBooksResponse = await api.get('http://localhost:4000/main/cart', { params });
                dispatch(getCartBooksAction(res));
            } catch (err: any) {
                console.log(err)
            }
        }
    );