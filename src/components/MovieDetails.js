import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchMovieDetails } from '../api/omdbApi';
import styled from 'styled-components';
import Loader from './Loader';
 
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;
 
const Poster = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
`;
 
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;
 
const Details = styled.p`
  margin: 5px 0;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const RetryButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;
 
// const MovieDetails = () => {
//   const { id } = useParams();
//   const { data, isLoading, error } = useQuery(['movieDetails', id], () =>
//     fetchMovieDetails(id)
//   );
const MovieDetails = () => {
    const { id } = useParams();
  
    const { data, error, isLoading, refetch } = useQuery(
      ['movieDetails', id],
      () => fetchMovieDetails(id),
      {
        retry: false,
        enabled: Boolean(id), // Ensure id is valid
      }
    );
 
  if (isLoading) return <Loader />;
//   if (error) return <p>Something went wrong!</p>;
  if (error || !data) {
    const isNotFound = error?.message.includes('Movie not found') || !data;
    return (
      <Container>
        <ErrorMessage>
          {isNotFound
            ? 'The movie you are looking for does not exist.'
            : 'An error occurred while fetching movie details.'}
        </ErrorMessage>
        <RetryButton onClick={refetch}>Retry</RetryButton>
      </Container>
    );
  }
 
  return (
    <Container>
      <Poster src={data.Poster} alt={data.Title} />
      <Title>{data.Title}</Title>
      <Details><strong>Year:</strong> {data.Year}</Details>
      <Details><strong>Genre:</strong> {data.Genre}</Details>
      <Details><strong>Director:</strong> {data.Director}</Details>
      <Details><strong>Actors:</strong> {data.Actors}</Details>
      <Details><strong>Plot:</strong> {data.Plot}</Details>
    </Container>
  );
};
 
export default MovieDetails;