import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SortAndFilter = ({ sort, filter, onSortChange, onFilterChange }) => {
    const handleSortChange = (e) => {
      onSortChange(e.target.value);
    };
   
    const handleFilterChange = (e) => {
      onFilterChange(e.target.value);
    };
   
    return (
      <Container>
        <Select value={filter} onChange={handleFilterChange}>
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Adventure">Adventure</option>
          <option value="Biography">Biography</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Family">Family</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Film Noir">Film Noir</option>
          <option value="History">History</option>
          <option value="Horror">Horror</option>
          <option value="Music">Music</option>
          <option value="Musical">Musical</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Short">Short</option>
          <option value="Sport">Sport</option>
          <option value="Superhero">Superhero</option>
          <option value="Thriller">Thriller</option>
          <option value="War">War</option>
          <option value="Western">Western</option>
        </Select>
        <Select value={sort} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="releaseDate-asc">Release Date (Ascending)</option>
          <option value="releaseDate-desc">Release Date (Descending)</option>
          <option value="rating-asc">Rating (Ascending)</option>
          <option value="rating-desc">Rating (Descending)</option>
        </Select>
      </Container>
    );
  };
   
export default SortAndFilter;