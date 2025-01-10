import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from '../components/MovieList';
import { QueryClient, QueryClientProvider } from 'react-query';
 
const queryClient = new QueryClient();
 
test('renders movie list', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MovieList />
    </QueryClientProvider>
  );
 
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
});