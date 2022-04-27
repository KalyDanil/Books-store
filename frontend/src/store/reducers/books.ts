import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../api/index';

export interface Books {
id: string,
title: string,
author: string,
price: number,
rating: number,
dateOfIssue: string,
cover: string,
status: string,
some?: Array<{}>
}

export const getAllBooksRequest = createAsyncThunk
('users/authorization',
    async (p,{ dispatch, getState }) => {
        try {
        const res: Array<{}> = await api.get('http://localhost:4000/main/');
        dispatch(getAllBooksAction(res));
        } catch(err: any) {
        console.log(err)
        }
    
    }
);


const initialState: Books = {
    id: '',
    title: '',
    author: '',
    price: 0,
    rating: 0,
    dateOfIssue: '',
    cover: '',
    status: '',
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getAllBooksAction: (state, action: PayloadAction<Array<{}>> ) => {
            state.some = action.payload
        },
    },
})

export const {getAllBooksAction} = booksSlice.actions

export default booksSlice.reducer