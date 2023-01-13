import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signUp, logIn } from '../request/login-and-signup';

export const reduxSignUp = createAsyncThunk(
    'profile/reduxSignUp',
    async function (info, { rejectWithValue }) {
        try {
            const response = await signUp(info);
            if (!response.ok) {
                throw new Error('SignUp Error!');
            }

            const data = await response.json();

            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const reduxLogIn = createAsyncThunk(
    'profile/reduxLogIn',
    async function (info, { rejectWithValue }) {
        try {
            const response = await logIn(info);
            if (!response.ok) {
                throw new Error('LogIn Error!');
            }

            const data = await response.json();

            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setLoading = (state) => {
    state.status = 'loading';
    state.error = null;
};

const setToken = (state, action) => {
    state.status = 'resolved';
    state.token = action.payload.token;
    localStorage.setItem('token', action.payload.token);
};

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        token: null,
        status: null,
        error: null
    },
    reducers: {
        removeUser(state) {
            state.token = null;
            state.status = null;
            state.error = null;
            localStorage.setItem('token', '');
        }
    },
    extraReducers: {
        [reduxSignUp.pending]: setLoading,
        [reduxSignUp.fulfilled]: setToken,
        [reduxSignUp.rejected]: setError,

        [reduxLogIn.pending]: setLoading,
        [reduxLogIn.fulfilled]: setToken,
        [reduxLogIn.rejected]: setError
    }
});

export const { removeUser } = profileSlice.actions;

export default profileSlice.reducer;
