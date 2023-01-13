import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './characters-slice';
import characterReducer from './character-slice';
import profileSlice from './profile-slice';

export default configureStore({
    reducer: {
        characters: charactersReducer,
        character: characterReducer,
        profile: profileSlice
    }
});
