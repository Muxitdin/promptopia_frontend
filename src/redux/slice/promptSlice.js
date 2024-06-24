import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Service from "../../config/service.js";

const initialState = {
    isLoading: false,
    prompts: [],
    prompt: null,
    isError: null,
};

const PromptSlice = createSlice({
    name: "prompt",
    initialState,
    reducers: {
        promptStart: (state) => {
            state.isLoading = true;
            state.isError = null;
        },
        promptSuccess: (state, action) => {
            state.isLoading = false;
            if (action.payload.type === "a") {
                state.prompt = action.payload.data;
            }
            else if (action.payload.type === "b") {
                state.prompts = action.payload.data;
            }
        },
        promptFailure: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
    },
});

export const { promptStart, promptSuccess, promptFailure } = PromptSlice.actions;
export default PromptSlice.reducer;

export const fetchAllPromts = () => async dispatch => {
    dispatch(promptStart());
    try {
        const { data } = await axios.get('http://localhost:5000/api/prompts');
        // console.log(data)
        dispatch(promptSuccess({type: "b", data}));
    } catch (error) {
        dispatch(promptFailure(error.message));
    }
};

export const updatePrompt = (id, obj) => async dispatch => {
    dispatch(promptStart())
    try {
        const { data } = await axios.put(`http://localhost:5000/api/prompts/update/${id}`, obj)
        return data
    } catch (error) {
        dispatch(promptFailure(error.message));
    }
}

export const deletePrompt = (id) => async dispatch => {
    dispatch(promptStart())
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/prompts/delete/${id}`)
        return data
    } catch (error) {
        dispatch(promptFailure(error.message));
    }
}