import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorization from './reducers/user';
import { useDispatch } from 'react-redux';
import userReducer from './reducers/user';
import booksReducer from './reducers/books';

const store = configureStore({
    reducer: {
      user: userReducer,
      books: booksReducer,
    }
  });

export type RootState = ReturnType<typeof store.getState>;
export default store