import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../api/index';

export interface RegistrationUser {
  id: string,
  fullName: string,
  dob: string,
  email: string,
  password: string,
  avatar: string,
  token: string,
  tokenIsValid: boolean,
  loadingTokenVerify: boolean,
}

interface User {
  id: string,
  fullName: string,
  email: string,
  avatar: string,
  token: string,
}

export const authorizationRequest = createAsyncThunk
('users/authorization',
  async (params: object, { dispatch, getState }) => {
    try {
      const res: User = await api.get('http://localhost:4000/auth/authorization', {params});
      dispatch(authorizationAction(res));
      localStorage.setItem('token', res.token);
    } catch(err: any) {
      console.log(err)
    } 
  }
);

export const authorizationByTokenRequest = createAsyncThunk
('users/authorizationByToken',
  async (params, { dispatch, getState }) => {
    try {
      const res: User = await api.get('http://localhost:4000/auth/authorizationByToken',);
      if(res.toString() === 'Log in.') {
        dispatch(refusalAction());
      } else {dispatch(authorizationAction(res));}
    } catch(err: any) {
      console.log(err)
    }
    
  }
);

export const registrationRequest = createAsyncThunk
('users/registration',
  async (body: object, { dispatch, getState }) => {
    try {
      const res: User = await api.post('http://localhost:4000/auth/registration', body);
      console.log(res)
      dispatch(authorizationAction(res));
      localStorage.setItem('token', res.token);
    } catch(err: any) {
      console.log(err) 
      dispatch(authorizationAction(initialState));
    }
    
  }
);

export const editRequest = createAsyncThunk
('users/edit',
  async (body: object, { dispatch, getState }) => {
    try {
      const res: User = await api.put('http://localhost:4000/user/edit', body);
      if(res)
      return res
    } catch(err: any) {
      console.log(err)
      return err
    }
    
  }
);

export const editPasswordRequest = createAsyncThunk
('users/editPassword',
  async (body: object, { dispatch, getState }) => {
    try {
      const res: User = await api.put('http://localhost:4000/user/editPassword', body);
      return res
    } catch(err: any) {
      console.log(err)
      return err
    }
    
  }
);

export const uploadAvatarRequest = createAsyncThunk
('users/uploadAvatar',
  async (file: object, { dispatch, getState }) => {
    const config = {
      headers : {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        token: localStorage.getItem('token')
      }
    };
    try {
      const res: object = await api.post('http://localhost:4000/user/avatarUpload', file, config);
      return res
    } catch(err: any) {
      console.log(err)
      return err
    }
    
  }
);

const initialState: RegistrationUser = {
  id: '',
  fullName: '',
  dob: '',
  email: '',
  password: '',
  avatar: '',
  token: '',
  tokenIsValid: false,
  loadingTokenVerify: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorizationAction: (state, action: PayloadAction<{id: string, fullName: string, email: string, avatar: string | null | undefined, tokenIsValid?: boolean}> ) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      if(action.payload.tokenIsValid !== undefined) {
        state.tokenIsValid = action.payload.tokenIsValid;
      } else{state.tokenIsValid = true;}
      if(action.payload.avatar === null || action.payload.avatar === undefined) {
        state.avatar = 'defaultAvatar.svg';
      } else {state.avatar = action.payload.avatar;} 
    },

    refusalAction: (state) => {
      state.tokenIsValid = false;
    },

    avatarUploadAction: (state, action: PayloadAction<string> ) => {
      state.avatar = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authorizationByTokenRequest.fulfilled, (state, action) => {
        state.loadingTokenVerify = true;
      })
  },
})

export const {authorizationAction, avatarUploadAction, refusalAction} = userSlice.actions

export default userSlice.reducer