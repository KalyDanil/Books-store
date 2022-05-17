import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs';
import {api} from '../../api/index';

type Books = Array<Book>

type BooksResponse = Array<Book>

type LikedBooksResponse = Array<LikedBook>

interface Book {
    id: number,
    name: string,
    authorname: string,
    description1: string,
    description2: string,
    description3: string,
    price: number,
    paperBackPrice: number,
    rating: number,
    dateofissue: string,
    cover: string,
    status: string,
    genre: string,
    selectStatus: boolean,
    UserBook: {
        rating: number,
        inCart: number,
        isLiked: boolean,
    },
    Users: Array<DbUser>,
    UserLikedBooks: Array<{id: number} | undefined>
}

interface LikedBook {
    id: number,
    name: string,
    authorname: string,
    description1: string,
    description2: string,
    description3: string,
    price: number,
    paperBackPrice: number,
    rating: number,
    dateofissue: string,
    cover: string,
    status: string,
    genre: string,
    selectStatus: boolean,
}

interface DbUser {
    UserBook: {
        rating: number,
        inCart: number,
        isLiked: boolean,
    }
    comment: string,
    createdAt: {},
    // User: {
    //     fullName: string,
    //     avatar: string
    // },
}

interface Comment {
    comment: string,
    createdAt: {},
    User: {
        fullName: string,
        avatar: string
    }
}

type GenresResponse = Array<{
    id: number,
    name: string,
}>

interface State {
    books: BooksResponse,
    booksCount: number,
    limit: number,
    cartBooks: BooksResponse,
    maxRating: number,
    page: number,
    minPrice: number,
    maxPrice: number,
    genres: GenresResponse,
    selectedGenres: string[],
    idBook: number,
    selectedBook: Book,
    comments: Comment[],
    userRating: number,
    totalPrice: number
}

export const getBooksRequest = createAsyncThunk
('main/allBooks',
    async (params:{genres: string[]},{ dispatch, getState }) => {
        try {
        const res: {books: BooksResponse, booksCount: number} = await api.get('http://localhost:4000/main/', {params});
        dispatch(getBooksAction(res.books)); 
        dispatch(getBooksCountAction(res.booksCount));
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

export const getLikedBooksRequest = createAsyncThunk
('main/allBooks',
    async (params:{},{ dispatch, getState }) => {
        try {
        const res: {books: BooksResponse, booksCount: number} = await api.get('http://localhost:4000/main/liked-books', {params});
        dispatch(getBooksAction(res.books)); 
        dispatch(getBooksCountAction(res.booksCount));
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

export const getMinMaxPriceRequest = createAsyncThunk
('main/price-slider',
    async (params,{ dispatch, getState }) => {
        try {
        const res: {minPrice:number, maxPrice:number}  = await api.get('http://localhost:4000/main/price-slider');
        dispatch(getMinMaxPriceAction(res));
        } catch(err: any) {
        console.log(err)
        }
    }
);

export const getSelectedBookRequest = createAsyncThunk
('bookPage',
    async (params: {},{ dispatch, getState }) => {
        try {
        const res: {book:Book, comments:Comment[], userRating: number | undefined}  = await api.get('http://localhost:4000/main/bookPage', {params});
        dispatch(getSelectedBookAction(res.book));
        dispatch(getCommentsAction(res.comments));
        dispatch(getUserRatingAction(res.userRating))
        } catch(err: any) {
        console.log(err)
        }
    }
);

export const getRecommendationsRequest = createAsyncThunk
('bookPage/recommendations',
    async (params: {},{ dispatch, getState }) => {
        try {
        const res: BooksResponse = await api.get('http://localhost:4000/main/bookPage/recommendations', {params});
        dispatch(getBooksAction(res));
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

export const changeRatingRequest = createAsyncThunk
('bookPage/change-rating',
    async (body: {},{ dispatch, getState }) => {
        try {
        await api.put('http://localhost:4000/main/bookPage/changeRating', body);
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

export const makeCommentRequest = createAsyncThunk
('bookPage/makeComment',
    async (body: {},{ dispatch, getState }) => {
        try {
        await api.post('http://localhost:4000/main/bookPage/comment', body);
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

export const addBookToCartRequest = createAsyncThunk
('add-book-to-cart',
    async (body: {},{ dispatch, getState }) => {
        try {
        await api.put('http://localhost:4000/main/bookPage/add-to-cart', body);
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

export const toLikeBookRequest = createAsyncThunk
('to-like-book',
    async (body: {},{ dispatch, getState }) => {
        try {
        api.put('http://localhost:4000/main/bookPage/to-like', body);
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

export const getCartBooksRequest = createAsyncThunk
('cart',
    async (params: {},{ dispatch, getState }) => {
        try {
        const res: BooksResponse = await api.get('http://localhost:4000/main/cart', {params});
        dispatch(getCartBooksAction(res));
        } catch(err: any) {
        console.log(err)
        }
    
    }
);

const initialState: State = {
    books: [],
    booksCount: 0,
    limit: 4,
    cartBooks: [],
    page: 1,
    maxRating: 5,
    minPrice: 0,
    maxPrice: 1000,
    genres: [{id:0, name:''}],
    selectedGenres: [],
    idBook: 0,
    selectedBook:  {
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
        {comment: '',
        createdAt: {},
        User: {
            fullName: '',
            avatar: '',
        }}
    ],
    userRating: 0,
    totalPrice: 0,
}


export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getBooksAction: (state, action: PayloadAction<BooksResponse>) => {
            state.books = action.payload
        },
        getBooksCountAction: (state, action: PayloadAction<number>) => {
            state.booksCount = action.payload
        },
        getPageAction: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        getMinMaxPriceAction: (state, action: PayloadAction<{minPrice: number, maxPrice: number}>) => {
            state.minPrice= action.payload.minPrice;
            state.maxPrice= action.payload.maxPrice;
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
        getSelectedBookAction: (state, action: PayloadAction<Book>) => {
            state.selectedBook = action.payload
        },
        getUserRatingAction: (state, action: PayloadAction<number | undefined>) => {
            if(action.payload !== undefined) {
                state.userRating = action.payload;
            }
        },
        getCommentsAction: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload
        },
        getCartBooksAction: (state, action: PayloadAction<BooksResponse>) => {
            state.cartBooks = action.payload
        },
        changeTotalPriceAction: (state, action: PayloadAction<number>) => {
            state.totalPrice += action.payload
        },
    },
})

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

export default booksSlice.reducer