import { PayloadAction } from '@reduxjs/toolkit';
import { IRegistrationUser } from '../../../utils/types';

export const authorizationAction = (state: IRegistrationUser, action: PayloadAction<IRegistrationUser>) => {
  state.id = action.payload.id;
  state.fullName = action.payload.fullName;
  state.email = action.payload.email;
  if (action.payload.tokenIsValid !== undefined) {
    state.tokenIsValid = action.payload.tokenIsValid;
  } else { state.tokenIsValid = true; }
  if (action.payload.avatar === null || action.payload.avatar === undefined) {
    state.avatar = 'defaultAvatar.svg';
  } else { state.avatar = action.payload.avatar; }
};

export const refusalAction = (state: IRegistrationUser) => {
  state.tokenIsValid = false;
};

export const avatarUploadAction = (state: IRegistrationUser, action: PayloadAction<string>) => {
  state.avatar = action.payload;
};

export const nameChangerAction = (state: IRegistrationUser, action: PayloadAction<string>) => {
  state.headerButton = action.payload;
};