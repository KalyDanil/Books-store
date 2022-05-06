import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../api/index';

type BooksResponse = Array<{
    id: number
    name: string,
    authorname: string,
    price: number,
    rating: number,
    dateofissue: string,
    cover: string,
    status: string,
    genre: string
}>

type GenresResponse = Array<{
    id: number,
    name: string,
}>

interface Books {
    booksArr: BooksResponse,
    genres: GenresResponse,
    selectedGenres: string[]
}

export const getBooksRequest = createAsyncThunk
('main/allBooks',
    async (params:{genres: string[]},{ dispatch, getState }) => {
        try {
        const res: BooksResponse = await api.get('http://localhost:4000/main/', {params});
        dispatch(getBooksAction(res))
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

export const getAllGenresRequest = createAsyncThunk
('main/allBooks',
    async (params,{ dispatch, getState }) => {
        try {
        const res: GenresResponse = await api.get('http://localhost:4000/main/genres');
        dispatch(getAllGenresAction(res))
        } catch(err: any) {
        console.log(err)
        }
    
    }
);
  
const initialState: Books = {
    booksArr: [{id: 0, name: '', authorname: '', price: 0, rating: 0, dateofissue: '', cover: '', status: '', genre: ''}],
    genres: [{id:0, name:''}],
    selectedGenres: []
}


export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getBooksAction: (state, action: PayloadAction<BooksResponse>) => {
            state.booksArr= action.payload
        },
        getAllGenresAction: (state, action: PayloadAction<GenresResponse>) => {
            state.genres= action.payload
        },
        addGenreAction: (state, action: PayloadAction<string>) => {
            state.selectedGenres.push(action.payload)
        },
        removeGenreAction: (state, action: PayloadAction<string>) => {
            const index = state.selectedGenres.indexOf(action.payload)
            state.selectedGenres.splice(index, 1);
        },
    },
})

export const {getBooksAction, getAllGenresAction, addGenreAction, removeGenreAction} = booksSlice.actions

export default booksSlice.reducer