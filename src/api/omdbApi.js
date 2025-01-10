import axios from 'axios';
 
const API_KEY = '830d1858';
const BASE_URL = 'https://www.omdbapi.com/';
 
export const fetchMovies = async (query = '', page = 1, sortBy = '', filterBy = '') => {
    const params = {
      s: query || 'all',  // Default to 'all' if no query is provided
      page,
      apikey: API_KEY,
      ...(filterBy && { type: filterBy }),  // Filter by Genre if provided
      ...(sortBy && { sort: sortBy }), // Sort by rating or year
    };
   
    const response = await axios.get(BASE_URL, { params });
    
    return response.data;
  };
 
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(BASE_URL, {
    params: { i: id, apikey: API_KEY },
  });
  return response.data;
};
