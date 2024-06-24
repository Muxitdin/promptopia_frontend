import { configureStore } from '@reduxjs/toolkit';
import promptSlice from '../slice/promptSlice.js';
import authSlice from '../slice/authSlice.js';

export const store = configureStore({
    reducer: {
        prompt: promptSlice,
        auth: authSlice,
    }
})
