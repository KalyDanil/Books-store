import { createSlice } from '@reduxjs/toolkit';
import { IRegistrationUser } from '../../../utils/types';
import {
    authorizationAction,
    refusalAction,
    avatarUploadAction,
    nameChangerAction,
} from './actions';
import {authorizationByTokenRequest} from './thunks'

export const initialState: IRegistrationUser = {
    id: 0,
    fullName: '',
    dob: '',
    email: '',
    password: '',
    avatar: '',
    token: '',
    tokenIsValid: false,
    loadingTokenVerify: false,
    headerButton: 'LogIn'
}
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      authorizationAction,
      refusalAction,
      avatarUploadAction,
      nameChangerAction,
    },
    extraReducers: (builder) => {
      builder
        .addCase(authorizationByTokenRequest.fulfilled, (state, action) => {
          state.loadingTokenVerify = true;
        })
    },
})
  
export default userSlice.reducer