import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorization from './toDoReducers/authorization';
import { useDispatch } from 'react-redux';
import userReducer from './toDoReducers/authorization'

const store = configureStore({
    reducer: {
      user: userReducer,
    }
  });

export type RootState = ReturnType<typeof store.getState>;
export default store