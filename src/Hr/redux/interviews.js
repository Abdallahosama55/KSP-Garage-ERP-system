import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from '../../axiosInstance'

export const getinterviewsData = createAsyncThunk(
    "interview/get",
    async (info) => {
        const { pageSize, id } = info;
        const apiUrl = `/admin/applicants/${id}/interviews?per_page=${pageSize}`;
        try {
            const res = await defaultAPI.get(apiUrl);
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const fetchinterviewsDataByPage = (info) => async (dispatch) => {
    const { state, pageSize, id } = info; // Add id to the destructuring
    try {
        dispatch(getinterviewsData.pending());
        const response = await defaultAPI.get(`/admin/applicants/${id}/interviews${state}&per_page=${pageSize}`);
        const data = response.data;
        dispatch(getinterviewsData.fulfilled(data));
        dispatch(setCurrentPage(state));
    } catch (error) {
        dispatch(getinterviewsData.rejected());
    }
};

export const Addinterviews = createAsyncThunk(
    "interviews/add",
    async (values, { rejectWithValue, getState }) => {
        try {
            const apiUrl = "/admin/interviews";
            const res = await defaultAPI.post(apiUrl, values);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle errors and return the error data
        }
    }
);



export const editinterviews = createAsyncThunk(
    "interviews/edit",
    async (props) => {
        try {
            const apiUrl = `/admin/interviews/${props.id}`;
            const response = await defaultAPI.put(apiUrl, props.values);
            return response.data;
        } catch (error) {
            return error
        }
    }
);


// actions/interviewActions.js
export const changeToggles = createAsyncThunk(
    "interviews/changeToggles",
    async (interviewsToUpdate) => {
      try {
        const responses = await Promise.all(
          interviewsToUpdate.map(({ id, status }) => {
            const apiUrl = `/admin/interviews/${id}?status=${status}`;
            return defaultAPI.patch(apiUrl);
          })
        );
        
        // You might want to return something meaningful based on your API response
        return responses.map((response) => response.data);
      } catch (error) {
        return error;
      }
    }
  );
  

export const deleteinterviews = createAsyncThunk(
    "interviews/delete",
    async (id, { rejectWithValue, getState }) => {
        try {
            const apiUrl = `/admin/interviews/${id}`;
            const { data } = await defaultAPI.delete(apiUrl);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle errors and return the error data
        }
    }
);

const interviewslice = createSlice({
    name: "interviews",
    initialState: {
        interviewsData: [],
        interviewsLinks: {
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
            .addCase(getinterviewsData.pending, (state) => {
                
            })
            .addCase(getinterviewsData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.interviewsData = action.payload;
                state.interviewsLinks = action.payload.links;
                state.interviewsLinks.first = action.payload.links.first;
                state.interviewsLinks.last = action.payload.links.last;
                state.interviewsLinks.prev = action.payload.links.prev;
                state.interviewsLinks.next = action.payload.links.next;
                state.currentPage = action.payload.meta.current_page;
            })
  
            .addCase(getinterviewsData.rejected, (state) => {
                state.error = true;
            })
            .addCase(changeToggles.rejected, (state, action) => {
                state.error = true;
                console.error("ChangeToggles rejected:", action.error.message);
            })
            
    }
});
export const { setCurrentPage } = interviewslice.actions;
export default interviewslice.reducer;