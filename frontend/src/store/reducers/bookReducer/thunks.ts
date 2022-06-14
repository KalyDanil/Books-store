import { createAsyncThunk } from '@reduxjs/toolkit';
import { booksSlice } from './slicer';
import { addBookToCart, changeBooksAmount, changeRating, deleteBookFromCart, getBooks, getCartBooks, getLikedBooks, getRecommendations, getSelectedBook, makeComment, toLikeBook } from '../../../api/books.api';
import { IAddBookToCartReq, IChangeBooksAmountReq, IChangeRatingReq, IDeleteBookFromCartReq, IGetBooksReq, IGetCartBooksReq, IGetLikedBooksReq, IGetRecommendationsReq, IGetSelectedBookReq, IMakeCommentReq, IToLikeBookReq } from '../../../utils/types';

export const {
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
} = booksSlice.actions

export const getBooksRequest = createAsyncThunk
    ('main/all-books',
        async (params: IGetBooksReq, { dispatch, getState }) => {
            try {
                const res = await getBooks(params);
                dispatch(getBooksAction(res.books));
                dispatch(getBooksCountAction(res.booksCount));
                dispatch(getMinMaxPriceAction(res));
                dispatch(getAllGenresAction(res.genres))
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const getLikedBooksRequest = createAsyncThunk
    ('main/liked-books',
        async (params: IGetLikedBooksReq, { dispatch, getState }) => {
            try {
                const res = await getLikedBooks(params);
                dispatch(getBooksAction(res.books));
                dispatch(getBooksCountAction(res.booksCount));
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const getSelectedBookRequest = createAsyncThunk
    ('book-page',
        async (params: IGetSelectedBookReq, { dispatch, getState }) => {
            try {
                const res = await getSelectedBook(params);
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
        async (params: IGetRecommendationsReq, { dispatch, getState }) => {
            try {
                const res = await getRecommendations(params);
                dispatch(getBooksAction(res));
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const changeRatingRequest = createAsyncThunk
    ('book-page/change-rating',
        async (body: IChangeRatingReq, { dispatch, getState }) => {
            try {
                changeRating(body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const makeCommentRequest = createAsyncThunk
    ('book-page/make-comment',
        async (body: IMakeCommentReq, { dispatch, getState }) => {
            try {
                makeComment(body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const addBookToCartRequest = createAsyncThunk
    ('add-book-to-cart',
        async (body: IAddBookToCartReq, { dispatch, getState }) => {
            try {
                addBookToCart(body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const changeBooksAmountRequest = createAsyncThunk
    ('change-books-amount',
        async (body: IChangeBooksAmountReq, { dispatch, getState }) => {
            try {
                changeBooksAmount(body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const deleteBookFromCartRequest = createAsyncThunk
    ('delete-book-from-cart',
        async (body: IDeleteBookFromCartReq, { dispatch, getState }) => {
            try {
                deleteBookFromCart(body);
            } catch (err: any) {
                console.log(err)
            }

        }
    );

export const toLikeBookRequest = createAsyncThunk
    ('to-like-book',
        async (body: IToLikeBookReq, { dispatch, getState }) => {
            try {
                toLikeBook(body);
            } catch (err: any) {
                console.log(err)
            }
        }
    );

export const getCartBooksRequest = createAsyncThunk
    ('cart',
        async (params: IGetCartBooksReq, { dispatch, getState }) => {
            try {
                const res = await getCartBooks(params);
                let booksAmount = 0;
                res.map((item) => { return booksAmount += item.CartBook.amount });
                dispatch(getCartBooksAction({ books: res, amount: booksAmount }));
            } catch (err: any) {
                console.log(err)
            }
        }
    );