import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCharacters } from '../request/get-character';
import { deleteCharacter } from '../request/delete-character';
import { postCharacter } from '../request/post-character';
import { pagesCount } from '../components/page-count';

export const fetchCharacter = createAsyncThunk(
    'characters/fetchCharacter',
    async function (info, { rejectWithValue }) {
        try {
            const response = await getCharacters(
                info.page,
                info.regExp,
                info.limit,
                info.sortMode,
                info.field
            );
            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            for (let index = 0; index < data.docs.length; index++) {
                if (!data.docs[index].image) {
                    data.docs[index].image = {
                        link: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png'
                    };
                }
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeCharacter = createAsyncThunk(
    'characters/removeCharacter',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await deleteCharacter(id);
            if (!response.ok) {
                throw new Error('Delete Server Error!');
            }
            dispatch(removeCharacterId({ id }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCharacter = createAsyncThunk(
    'characters/addCharacter',
    async function (info, { rejectWithValue, dispatch }) {
        try {
            const response = await postCharacter(info);
            if (!response.ok) {
                throw new Error('Adding Server Error!');
            }
            dispatch(addNewCharacter(info));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        list: [],
        pages: [1],
        status: null,
        error: null
    },
    reducers: {
        addNewCharacter(state, action) {
            state.list.push(action.payload);
        },
        removeCharacterId(state, action) {
            state.list = state.list.filter((character) => character._id !== action.payload.id);
        }
        // changeCharacter(state, action) {}
    },
    extraReducers: {
        [fetchCharacter.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchCharacter.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.list = action.payload.docs;
            state.pages = pagesCount(action.payload.pages);
        },
        [fetchCharacter.rejected]: setError,
        [removeCharacter.rejected]: setError,
        [addCharacter.rejected]: setError
    }
});

const { removeCharacterId, addNewCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
