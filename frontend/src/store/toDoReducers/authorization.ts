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
      return res
    } catch(err: any) {
      console.log(err)
      return err
    }
    
  }
);

export const authorizationByTokenRequest = createAsyncThunk
('users/authorizationByToken',
  async (params: object, { dispatch, getState }) => {
    try {
      const res: User = await api.get('http://localhost:4000/auth/authorizationByToken', {params});
      dispatch(authorizationAction(res));
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
      localStorage.setItem('token', res.token); 
      return res
    } catch(err: any) {
      console.log(err)
      return "error"
    }
    
  }
);

export const editRequest = createAsyncThunk
('users/edit',
  async (body: object, { dispatch, getState }) => {
    try {
      const res: User = await api.put('http://localhost:4000/user/edit', body);
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
  avatar: 'defaultAvatar.svg',
  token: '',
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorizationAction: (state, action: PayloadAction<{id: string, fullName: string, email: string, avatar: string}> ) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
    },

    avatarUploadAction: (state, action: PayloadAction<string> ) => {
      state.avatar = action.payload;
    },
  },
})

export const {authorizationAction, avatarUploadAction} = userSlice.actions

export default userSlice.reducer