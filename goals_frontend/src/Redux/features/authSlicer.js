import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"))

const initialState  = {
    user : user ? user : null,
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : ""
}

//register
export const register = createAsyncThunk(
    "auth/regist",
    async(user , thunkAPI) => {
        try{
           return await authService.register(user) 
        }catch(error){
            const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message)
                || error.toString() || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//login
export const login = createAsyncThunk(
    "auth/login",
    async(user , thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message)
                || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//logout
export const logout = createAsyncThunk(
    "auth/logout",
    async() => {
        await authService.logout()
    }
)
export const authSlicer = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers : (builder) => {
        builder.addCase(register.pending , (state) => {
            state.isLoading = true;
        })
        builder.addCase(register.fulfilled , (state , action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(register.rejected , (state , action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload;
            state.user =null;
        })
        builder.addCase(login.pending , (state) => {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled , (state , action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(login.rejected , (state , action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload;
            state.user = null;
        })
        builder.addCase(logout.fulfilled , (state) => {
            state.user = null;
        })
    }
})

export const { reset } = authSlicer.actions;
export default authSlicer.reducer;