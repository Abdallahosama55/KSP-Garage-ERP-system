import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultAPI from "../axiosInstance";

export const getAbsence = createAsyncThunk(
  "student/absence",
  async ({ id, pageSize }) => {
    const apiUrl = `/absence?class_id=${id}&per_page=${pageSize}`;
    if (id) {
      try {
        const res = await defaultAPI.get(apiUrl);
        return res.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw Error;
    }
    
  }
);
export const absenceSearch = createAsyncThunk(
  "student/absenceSearch",
  async ({ classId, pageSize,handle }) => {
    const apiUrl = `/absence?handle=${handle}&class_id=${classId}&per_page=${pageSize}`;
    if (classId) {
      try {
        const res = await defaultAPI.get(apiUrl);
        return res.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw Error;
    }
    
  }
);

export const getClassesMenu = createAsyncThunk(
  "student/absence/classesMenu",
  async () => {
    const apiUrl = `/select_menu/classes`;

    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAbsenceInfo = createAsyncThunk(
  "student/get/absence",
  async ({ id }) => {
    const apiUrl = `/absence/${id}`;

    try {
      const res = await defaultAPI.get(apiUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchAbsenceDataByPage = (info) => async (dispatch) => {
  const { state, pageSize } = info
  try {

    dispatch(getAbsence.pending());
    const response = await defaultAPI.get(`${state}&per_page=${pageSize}`);
    const data = response.data;

    dispatch(getAbsence.fulfilled(data));
    dispatch(setCurrentPage(state));
  } catch (error) {
    dispatch(getAbsence.rejected());
  }
};
const absenceSlice = createSlice({
  name: "absence",
  initialState: {
    absence: [],
    classes: [],
    absenceInfo: [],
    absenceLinks: {
      first: null,
      last: null,
      next: null,
      prev: null
    },
    currentPage: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAbsence.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAbsence.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.absence = action.payload;
        state.absenceLinks = action.payload.links;
        state.absenceLinks.first = action.payload.links.first;
        state.absenceLinks.last = action.payload.links.last;
        state.absenceLinks.prev = action.payload.links.prev;
        state.absenceLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(absenceSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.absence = action.payload;
        state.absenceLinks = action.payload.links;
        state.absenceLinks.first = action.payload.links.first;
        state.absenceLinks.last = action.payload.links.last;
        state.absenceLinks.prev = action.payload.links.prev;
        state.absenceLinks.next = action.payload.links.next;
        state.currentPage = action.payload.meta.current_page;
      })
      .addCase(getAbsence.rejected, (state) => {
        state.error = true;
      })
      .addCase(getClassesMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassesMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.classes = action.payload;
      })
      .addCase(getClassesMenu.rejected, (state) => {
        state.error = true;
      })
      .addCase(getAbsenceInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAbsenceInfo.fulfilled, (state) => {
        state.loading = false;
        state.absenceInfo = [];
        state.error = false;
      })
      .addCase(getAbsenceInfo.rejected, (state) => {
        state.error = true;
      })
  },
});

export const { setCurrentPage } = absenceSlice.actions;

export default absenceSlice.reducer;