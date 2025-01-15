import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  selectedMovie: null,
  query: '',
  sort: '',
  filter: '',
  movies: [],
};
 
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setSortOrder(state, action) {
      state.sort = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
 
export const { setSelectedMovie, setQuery, setSortOrder, setFilter } = movieSlice.actions;
export default movieSlice.reducer;
 