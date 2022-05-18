import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer/slicer';
import booksReducer from './reducers/bookReducer/slicer';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
    reducer: {
      user: userReducer,
      books: booksReducer,
    },
    middleware: [thunkMiddleware],
  });

export type RootState = ReturnType<typeof store.getState>;
export default store