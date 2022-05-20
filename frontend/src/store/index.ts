import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer/slicer';
import booksReducer from './reducers/bookReducer/slicer';

const store = configureStore({
    reducer: {
      user: userReducer,
      books: booksReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store