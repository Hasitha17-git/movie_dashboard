import React from 'react';
import styled from 'styled-components';
 
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
 
const Button = styled.button`
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  background-color:rgb(67, 167, 234);
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
 
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
 
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <PaginationContainer>
    <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      Previous
    </Button>
    <span>Page {currentPage} of {totalPages} </span>
    <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
      Next
    </Button>
  </PaginationContainer>
);
 
export default Pagination;