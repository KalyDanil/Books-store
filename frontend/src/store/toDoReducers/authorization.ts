import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../api/index';

export interface RegistrationUser {
  id: string,
  fullName: string,
  dob: string,
  email: string,
  password: string,
  token: string,
  isLoggedIn: boolean,
  headerButtonIsLogIn: boolean,
  headerIsHidden: boolean
}

interface User {
  id: string,
  email: string,
  token: string,
}

export const authorizationRequest = createAsyncThunk
('users/authorization',
  async (params: object, { dispatch, getState }) => {
    try {
      const res: User = await api.get('http://localhost:4000/auth/authorization', {params});
      dispatch(authorizationAction(res));
      localStorage.setItem('token', res.token);
      return res
    } catch(err: any) {
      console.log(err)
      return err
    }
    
  }
);

export const registrationRequest = createAsyncThunk
('users/registration',
  async (body: object, { dispatch, getState }) => {
    try {
      const res: User = await api.post('http://localhost:4000/auth/registration', body);
      dispatch(authorizationAction(res));
      dispatch(isLoggedInAction(true));
      dispatch(headerMenuShowAction(false));
      localStorage.setItem('token', res.token); 
      return res
    } catch(err: any) {
      console.log(err)
      return "error"
    }
    
  }
);

const initialState: RegistrationUser = {
  id: '',
  fullName: '',
  dob: '',
  email: '',
  password: '',
  token: '',
  isLoggedIn: false,
  headerButtonIsLogIn: true,
  headerIsHidden: true
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLoggedInAction: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    headerButtonChangerAction: (state, action: PayloadAction<boolean>) => {
      state.headerButtonIsLogIn = action.payload
    },
    authorizationAction: (state, action: PayloadAction<{id: string, email: string}> ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
    },
    headerMenuShowAction: (state, action: PayloadAction<boolean>) => {
      state.headerIsHidden = action.payload
    }
  },
})

export const { isLoggedInAction, authorizationAction, headerMenuShowAction, headerButtonChangerAction} = userSlice.actions

export default userSlice.reducer