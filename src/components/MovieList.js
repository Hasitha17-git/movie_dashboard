import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setSortOrder, setFilter } from '../redux/slices/movieSlice';
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
   
      const data = await fetchMovies(query,currentPage);
      const fetchedMovies = data.Search || [];
      setTotalPages(Math.ceil((data.totalResults|| 0)/10));
      console.log('Fetched Movies:',fetchedMovies);
      // Filter by genre
      const filteredMovies = filter && filter !== 'All' 
          ? fetchedMovies.filter(movie =>{ 
            const genres = movie.Genre ? movie.Genre.split(',').map(g => g.trim().toLowerCase()) : [];
            return genres.includes(filter.toLowerCase());
          })
          : fetchedMovies;
      console.log('Filtered Movies:',filteredMovies);
      // Sort by the selected criteria
      const sortedMovies = filteredMovies.sort((a, b) => {
        const [criteria, order] = sort.split('-');
        const multiplier = order === 'asc' ? 1 : -1;
   
        if (criteria === 'releaseDate') {
          return (new Date(a.Year) - new Date(b.Year)) * multiplier;
        } else if (criteria === 'rating') {
          return (parseFloat(a.imdbRating || 0) - parseFloat(b.imdbRating || 0)) * multiplier;
        }
   
        return 0;
      });
      setMovies(filteredMovies);
      setMovies(sortedMovies);
      setTotalPages(Math.ceil((data.totalResults || 0) / 10));
      setIsLoading(false);
      console.log('Sorted Movies:',sortedMovies);
    };
   
    fetchMoviesData();
  }, [query, sort, filter, currentPage]);

  const handleSortChange = (value) => {
    dispatch(setSortOrder(value));
  };

  const handleFilterChange = (value) => {
    console.log('Filter:',filter);
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

    // // Infinite scroll handler
    // const handleScroll = () => {
    //     if (
    //       window.innerHeight + document.documentElement.scrollTop >=
    //       document.documentElement.offsetHeight - 100
    //     ) {
    //       setCurrentPage((prev) => prev + 1);
    //     }
    //   };
     
    //   useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    //   }, []);

  if (isLoading) return <Loader />;
 
  
  return (
    <Container>
      <SearchBar value={query} onChange={handleSearchChange} />
      <SortAndFilter
        sort={sort}
        filter={filter}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
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