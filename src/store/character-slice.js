import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCharacter } from '../request/get-character';
import { putCharacter } from '../request/put-character';
import { deleteCharacter } from '../request/delete-character';

export const fetchOneCharacter = createAsyncThunk(
    'character/fetchOneCharacter',
    async function (id, { rejectWithValue }) {
        try {
            const response = await getCharacter(id);
            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCharacter = createAsyncThunk(
    'character/updateCharacter',
    async function (newInfo, { rejectWithValue, dispatch }) {
        try {
            console.log(newInfo.info);
            const response = await putCharacter(newInfo.info, newInfo.info._id);
            console.log(response);
            if (!response.ok) {
                throw new Error('Updating Server Error!');
            }

            dispatch(updateThatCharacter());
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeCharacter = createAsyncThunk(
    'character/removeCharacter',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await deleteCharacter(id);
            if (!response.ok) {
                throw new Error('Delete Server Error!');
            }
            dispatch(removeCharacterId());
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const characterSlice = createSlice({
    name: 'character',
    initialState: {
        info: {
            _id: '',
            height: '',
            race: '',
            gender: '',
            birth: '',
            spouse: '',
            death: '',
            realm: '',
            image: null,
            hair: '',
            name: '',
            wikiUrl: ''
        },
        status: null,
        error: null
    },
    reducers: {
        updateThatCharacter(state, action) {
            state.info = action.payload.docs;
        },
        removeCharacterId(state) {
            state.list = {
                _id: '',
                height: '',
                race: '',
                gender: '',
                birth: '',
                spouse: '',
                death: '',
                realm: '',
                image: null,
                hair: '',
                name: '',
                wikiUrl: ''
            };
        }
    },
    extraReducers: {
        [fetchOneCharacter.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchOneCharacter.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.info = action.payload.docs;
        },

        [fetchOneCharacter.rejected]: setError,
        [updateCharacter.rejected]: setError
    }
});

const { updateThatCharacter, removeCharacterId } = characterSlice.actions;

export default characterSlice.reducer;
