import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/index';
import {userSlice, initialState} from './slicer';
import { IRegistrationUser } from '../../../utils/types';

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
        const res: IRegistrationUser = await api.get('http://localhost:4000/auth/authorization', { params });
        dispatch(authorizationAction(res));
        localStorage.setItem('token', res.token);
      } catch (err: any) {
        console.log(err)
      }
    }
  );

export const authorizationByTokenRequest = createAsyncThunk
  ('users/authorization-by-token',
    async (params, { dispatch, getState }) => {
      try {
        const res: IRegistrationUser = await api.get('http://localhost:4000/auth/authorization-by-token',);
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
    async (body: {}, { dispatch, getState }) => {
      try {
        const res: IRegistrationUser = await api.post('http://localhost:4000/auth/registration', body);
        console.log(res)
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
    async (body: {}, { dispatch, getState }) => {
      try {
        const res: IRegistrationUser = await api.put('http://localhost:4000/user/edit', body);
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
    async (body: {}, { dispatch, getState }) => {
      try {
        const res: IRegistrationUser = await api.put('http://localhost:4000/user/edit-password', body);
        return res
      } catch (err: any) {
        console.log(err)
        return err
      }

    }
  );

export const uploadAvatarRequest = createAsyncThunk
  ('users/upload-avatar',
    async (file: {}, { dispatch, getState }) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          token: localStorage.getItem('token')
        }
      };
      try {
        const res: {} = await api.post('http://localhost:4000/user/avatar-upload', file, config);
        return res
      } catch (err: any) {
        console.log(err)
        return err
      }

    }
  );