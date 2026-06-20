import {
  loginUser,
  registerUser,
} from "../api/authApi";

export const login = async (payload) => {
  return loginUser(payload);
};

export const register = async (payload) => {
  return registerUser(payload);
};
