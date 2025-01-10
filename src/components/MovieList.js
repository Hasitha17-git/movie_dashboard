import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setSort, setFilter } from '../redux/slices/movieSlice';
import { fetchMovies } from '../api/omdbApi';
import MovieCard from './MovieCard';
import SortAndFilter from './SortAndFilter';
import Pagination from './Pagination';
import Loader from './Loader';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Container = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const MovieList = () => {
  const dispatch = useDispatch();
  const { query, sort, filter } = useSelector(state => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMoviesData = async () => {
      setIsLoading(true);
      // Fetch movies based on query, current page, sort, and filter
      const data = await fetchMovies(query, currentPage, sort, filter);
      console.log('Fetched Movies:',data);
      const fetchedMovies = data.Search || [];
      console.log('Movies:',fetchedMovies);
      setTotalPages(Math.ceil((data.totalResults || 0) / 10));

      // Now, sort the fetched movies based on the selected sort criteria
      let sortedMovies = [...fetchedMovies];

      // Apply sorting if needed
      if (sort === 'year') {
        sortedMovies = sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)); // Sort by year
      } else if (sort === 'rating') {
        sortedMovies = sortedMovies.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)); // Sort by rating
      }

      // Apply filtering if needed
      if (filter) {
        console.log('Before Filtering:',sortedMovies);
        console.log(`Filtering by genre: ${filter}`);
        sortedMovies = sortedMovies.filter(movie =>{
            console.log(`Movie Genre: ${movie.Genre}`);
            const genres = movie.Genre ? movie.Genre.split(',').map(g => g.trim().toLowerCase()) : [];
            return genres.includes(filter.toLowerCase());
        });
        console.log('After Filtering:',sortedMovies);
      }

      setMovies(sortedMovies);
      setIsLoading(false);
    };

    fetchMoviesData();
  }, [query, sort, filter, currentPage]);

  const handleSortChange = (value) => {
    dispatch(setSort(value));
  };

  const handleFilterChange = (value) => {
    console.log("Selected genre:",value);
    dispatch(setFilter(value));
  };

  const handleSearchChange = (value) => {
    dispatch(setQuery(value));
    setCurrentPage(1); // Reset to first page on search
    dispatch(setFilter(''));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loader />;
  //if (error) return <p>{error}</p>;
  
  return (
    <Container>
      <SearchBar value={query} onChange={handleSearchChange} />
      <SortAndFilter
        sort={sort}
        filter={filter}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        // onSearchChange={handleSearchChange}
      />
      <Grid>
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p>No movies found!</p>
        )}
      </Grid>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </Container>
  );
};

export default MovieList;