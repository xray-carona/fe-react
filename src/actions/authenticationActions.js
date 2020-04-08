import { actionTypes } from './index'

export const registerUserAction = (user) => {
  return {
    type: actionTypes.REGISTER_USER,
    user
  }
};

export const loginUserAction = (user) => {
  return {
    type: actionTypes.LOGIN_USER,
    user
  }
};