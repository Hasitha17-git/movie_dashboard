import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
 
test('renders MovieDetails component', () => {
  render(
    <Router>
      <MovieDetails />
    </Router>
  );
  const loadingElement = screen.getByText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});