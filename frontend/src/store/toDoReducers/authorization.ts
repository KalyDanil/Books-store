import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../api/index';

export interface CounterState {
  id: string,
  fullName: string,
  dob: string,
  email: string,
  password: string,
  token: string,
  user: object,
  loading: string,
  error: any
}

interface User {
  id: string,
  fullName: string,
  dob: string,
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
      return "error"
    }
    
  }
);

export const registrationRequest = createAsyncThunk
('users/registration',
  async (body: object, { dispatch, getState }) => {
    try {
      const res: User = await api.post('http://localhost:4000/auth/registration', body);
      dispatch(authorizationAction(res));
      localStorage.setItem('token', res.token); 
      return res
    } catch(err: any) {
      console.log(err)
      return "error"
    }
    
  }
);

const initialState: CounterState = {
  id: '',
  fullName: '',
  dob: '',
  email: '',
  password: '',
  token: '',
  user: {},
  loading: 'idle',
  error: null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      state.fullName += action.payload
    },
    decrement: (state, action: PayloadAction<{id: string, fullName: string, dob: string, email: string, token: string}>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    incrementByAmount: (state: any, action: PayloadAction<{fullName: string, dob: string, email: string, password: string,}>) => {
      state.fullName = action.payload.fullName;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    authorizationAction: (state, action: PayloadAction<{id: string, fullName: string, dob: string, email: string}> ) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     // Вызывается прямо перед выполнением запроса
  //     .addCase(authorization.pending, (state) => {
  //       state.loading = 'loading';
  //       state.error = null;
  //     })
  //     // Вызывается в том случае если запрос успешно выполнился
  //     .addCase(authorization.fulfilled, (state, action) => {
  //       // Добавляем пользователя
  //       state.loading = 'idle';
  //       state.error = null;
  //     })
  //     // Вызывается в случае ошибки
  //     .addCase(authorization.rejected, (state, action) => {
  //       state.loading = 'failed';
  //       state.error = action.error;
  //     });
  // },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, authorizationAction } = userSlice.actions

export default userSlice.reducer