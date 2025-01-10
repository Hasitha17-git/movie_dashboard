import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
 
const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 5px;
`;
 
const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;
 
const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #888;
`;
 
const SearchBar = ({ value, onChange }) => (
  <SearchWrapper>
    <SearchInput
      type="text"
      placeholder="Search for movies..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <SearchIcon size={20} />
  </SearchWrapper>
);


 
export default SearchBar;