import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from '../../axiosInstance'

export const getContractData = createAsyncThunk(
    "Contract/get",
    async (info) => {
        const { pageSize, id } = info;
        const apiUrl = `/admin/employees/${id}/contract?per_page=${pageSize}`;
        try {
            const res = await defaultAPI.get(apiUrl);
           
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const fetchContractDataByPage = (info) => async (dispatch) => {
    const { state, pageSize, id } = info; // Add id to the destructuring
    try {
        dispatch(getContractData.pending());
        const response = await defaultAPI.get(`/admin/employees/${id}/contract${state}&per_page=${pageSize}`);
        const data = response.data;
   
        dispatch(getContractData.fulfilled(data));
        dispatch(setCurrentPage(state));
    } catch (error) {
        dispatch(getContractData.rejected());
    }
};

  
export const AddContract = createAsyncThunk(
    "Contract/add",
    async ({ formData, id }) => {
      try {
        console.log("Values being sent to AddContract:", formData);
        console.log("Employee ID:", id);
  
        const apiUrl = `/admin/employees/${id}/contract`;
        const res = await defaultAPI.post(apiUrl, formData);
        console.log("Response from AddContract:", res.data);
  
        return res.data;
      } catch (error) {
        console.error("Error in AddContract:", error);
        return error;
      }
    }
  );
  

export const editContract = createAsyncThunk(
    "Contract/edit",
    async (props) => {
        try {
            const apiUrl = `/admin/contract/${props.id}`;
            const response = await defaultAPI.put(apiUrl, props.values);
            return response.data;
        } catch (error) {
            return error
        }
    }
);
export const deleteContract = createAsyncThunk(
    "Contract/delete",
    async (id, { rejectWithValue, getState }) => {
        try {
            const apiUrl = `/admin/contract/${id}`;
            const { data } = await defaultAPI.delete(apiUrl);
          
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle errors and return the error data
        }
    }
);

const Contractslice = createSlice({
    name: "Contract",
    initialState: {
        ContractData: [],
        ContractLinks: {
            first: null,
            last: null,
            next: null,
            prev: null
        },
        currentPage: null,
        loading: false,
        error: false,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload.meta.current_page;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContractData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContractData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.ContractData = action.payload.data;
                console.log( state.ContractData)
                state.currentPage = null;  // Since there's no pagination info, set it to null
            })
            .addCase(getContractData.rejected, (state) => {
                state.error = true;
            })
            .addCase(AddContract.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.ContractData = action.payload.data;
                console.log(state.ContractData);
                state.currentPage = null;
            })
            .addCase(AddContract.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                console.error('Error adding contract:', action.error.message);
            });
            
    }
});
export const { setCurrentPage } =Contractslice.actions;
export default Contractslice.reducer;