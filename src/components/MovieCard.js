import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
 
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
`;
 
const Poster = styled.img`
  width: 100%;
`;
 
const Title = styled.h3`
  font-size: 1rem;
  margin: 10px 0;
`;
 
const MovieCard = ({ movie }) => (
  <Card>
    <Link to={`/movie/${movie.imdbID}`}>
      <Poster src={movie.Poster} alt={movie.Title} />
      <Title>{movie.Title}</Title>
    </Link>
  </Card>
);
 
export default MovieCard;