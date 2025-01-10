import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
 
test('renders Pagination component', () => {
  render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
  const previousButton = screen.getByText(/previous/i);
  const nextButton = screen.getByText(/next/i);
  const pageInfo = screen.getByText(/page 1 of 5/i);
 
  expect(previousButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(pageInfo).toBeInTheDocument();
});
 
test('calls onPageChange on button click', () => {
  const handlePageChange = jest.fn();
  render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);
 
  const nextButton = screen.getByText(/next/i);
  fireEvent.click(nextButton);
 
  expect(handlePageChange).toHaveBeenCalledWith(2);
});