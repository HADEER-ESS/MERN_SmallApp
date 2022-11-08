import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { goalsService } from "../services/goalsService";

//goals are protected, for that we need to get TOKEN

const initialState = {
    goals : [],
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : ''
}

//create goal
export const createGoal = createAsyncThunk(
    "goals/create",
    async(goal , thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalsService.createGoal(goal,token)
        } catch (error) {
            const message = (error.respose &&
                error.response.data &&
                error.response.data.message) || 
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }    
)
//get goals
export const getGoals = createAsyncThunk(
    "goals/get",
    async(_ , thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalsService.getGoals(token)
        } catch (error) {
            const message = (error.respose &&
                error.response.data &&
                error.response.data.message) || 
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//delete goal
export const deleteGoal = createAsyncThunk(
    "goals/delete",
    async(id , thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await goalsService.deleteGoal(id , token)  
        } catch (error) {
            const message = (error.respose &&
                error.response.data &&
                error.response.data.message) || 
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message) 
        }
    }
)
export const goalsSlicer = createSlice({
    name : "goals",
    initialState,
    reducers :{
        reset : (state) => initialState
    },
    extraReducers : (builder) => {
        builder
            .addCase(createGoal.pending , (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled , (state , action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected , (state , action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending , (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled , (state , action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected , (state , action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending , (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled , (state , action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((item)=> item._id !==action.payload.id)
            })
            .addCase(deleteGoal.rejected , (state , action) => {
                state.isError = false
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const {reset} = goalsSlicer.actions;
export default goalsSlicer.reducer;