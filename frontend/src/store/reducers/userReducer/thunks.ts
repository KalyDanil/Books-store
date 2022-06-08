import { createAsyncThunk } from '@reduxjs/toolkit';
import {userSlice, initialState} from './slicer';
import { IEditPasswordReq, IEditReq, IRegistrationReq } from '../../../utils/types';
import { authorization, authorizationByToken, edit, editPassword, registration, uploadAvatar } from '../../../api/user.api';

export const {
    authorizationAction,
    refusalAction,
    avatarUploadAction,
    nameChangerAction,
} = userSlice.actions

export const authorizationRequest = createAsyncThunk
  ('users/authorization',
    async (params: {}, { dispatch, getState }) => {
      try {
        const res = await authorization(params);
        dispatch(authorizationAction(res));
        localStorage.setItem('token', res.token);
      } catch (err: any) {
        localStorage.setItem('token', 'err');
        console.log(err)
      }
    }
  );

export const authorizationByTokenRequest = createAsyncThunk
  ('users/authorization-by-token',
    async (params, { dispatch, getState }) => {
      try {
        const res = await authorizationByToken();
        console.log(res)
        if (res.toString() === 'Log in.') {
          dispatch(refusalAction());
        } else { dispatch(authorizationAction(res)); }
      } catch (err: any) {
        console.log(err)
      }

    }
  );

export const registrationRequest = createAsyncThunk
  ('users/registration',
    async (body: IRegistrationReq, { dispatch, getState }) => {
      try {
        const res = await registration(body);
        dispatch(authorizationAction(res));
        localStorage.setItem('token', res.token);
      } catch (err: any) {
        console.log(err)
        dispatch(authorizationAction(initialState));
      }

    }
  );

export const editRequest = createAsyncThunk
  ('users/edit',
    async (body: IEditReq, { dispatch, getState }) => {
      try {
        const res = await edit(body);
        if (res)
          return res
      } catch (err: any) {
        console.log(err)
        return err
      }

    }
  );

export const editPasswordRequest = createAsyncThunk
  ('users/edit-password',
    async (body: IEditPasswordReq, { dispatch, getState }) => {
      try {
        const res = await editPassword(body);
        return res
      } catch (err: any) {
        console.log(err)
        return err
      }

    }
  );

export const uploadAvatarRequest = createAsyncThunk
  ('users/upload-avatar',
    async (file: FormData, { dispatch, getState }) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          token: localStorage.getItem('token')
        }
      };
      try {
        uploadAvatar(file, config);
        return 
      } catch (err: any) {
        console.log(err)
        return err
      }

    }
  );