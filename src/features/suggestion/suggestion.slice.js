import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
export const fetchSuggestion = createAsyncThunk(
  'suggestion/fetchSuggestion',
  async () => {
    const response = await fetch('http://localhost:3004/api/suggestion');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  suggestion: { imageUrl: '', caption: '' },
  loading: false,
  error: false,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true; // Task 16: Handle pending state
        state.error = false; // Reset error state
        state.suggestion = { imageUrl: '', caption: '' }; // Reset suggestion state
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        console.log('Fulfilled action payload:', action.payload);
        state.loading = false; // Task 16: Handle fulfilled state
        state.suggestion = action.payload.data;
      })
      .addCase(fetchSuggestion.rejected, (state) => {
        state.loading = false; // Task 16: Handle rejected state
        state.error = true;
      });
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
