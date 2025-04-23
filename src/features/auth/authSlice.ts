import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "./authTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "@/src/app/store";

const initialState: AuthState = {
  token: null,
  username: null,
};

export const initializeAuth = createAsyncThunk<string | null>(
  "auth/initialize",
  async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch {
      return null;
    }
  }
);

export const logout = createAsyncThunk<void>(
  "auth/performLogout",
  async (_) => {
    await AsyncStorage.clear();
  }
);

export const saveTokenToStorage = createAsyncThunk(
  "auth/saveToken",
  async (token: string) => {
    await AsyncStorage.setItem("token", token);
  }
);

export const setCredentialsWithStorage =
  (loginResponse: LoginResponse) => (dispatch: AppDispatch) => {
    dispatch(setCredentials(loginResponse));
    dispatch(saveTokenToStorage(loginResponse.token));
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
