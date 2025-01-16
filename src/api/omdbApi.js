import axios from 'axios';
 
const API_KEY = '830d1858';
const BASE_URL = 'https://www.omdbapi.com/';
/**
 * Fetches movies based on the given query, page, sorting, and filtering parameters.
 * 
 * @param {string} query - The search query string.
 * @param {number} page - The page number to fetch.
 * @param {string} sortBy - The sorting criteria (e.g., "year", "rating").
 * @param {string} filterBy - The filtering criteria (e.g., "genre").
 * 
 * @returns {Promise<object>} The response data from the API.
 */
 
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

/**
 * Fetches detailed information about a movie by its ID.
 * 
 * @param {string} id - The IMDb ID of the movie.
 * 
 * @returns {Promise<object>} The response data from the API.
 */
 
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(BASE_URL, {
    params: { i: id, apikey: API_KEY },
  });
  return response.data;
};
