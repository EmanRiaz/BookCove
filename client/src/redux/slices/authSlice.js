/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout } from "../../api/authApi";

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
  status: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      localStorage.setItem("user", JSON.stringify(response)); // Save user to localStorage
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// Async thunk for register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      localStorage.setItem("user", JSON.stringify(response)); // Save user to localStorage
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return "Logout successful";
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear error state
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user"); // Clear user from localStorage
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Set user data
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set error message
      });

    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Set user data
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set error message
      });

    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null; // Clear user data
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set error message
      });
  },
});

// Export actions and reducer
export const { clearError, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
*/

import { createSlice } from '@reduxjs/toolkit';
const authSlice=createSlice({
  name:"auth",
  initialState:{isLoggedIn:false,role:"user"},
  reducers:{
    setUser(state){
      state.isLoggedIn=true;
    },
    logout(state){
      state.isLoggedIn=false;
    },
    changeRole(state,action){
      const role=action.payload;
      state.role=role;
    },
  },
});
export const authActions= authSlice.actions;
export default authSlice.reducer;

