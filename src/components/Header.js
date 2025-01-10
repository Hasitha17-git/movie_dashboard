import React from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
 
const HeaderContainer = styled.header`
  background-color:rgb(129, 102, 215);
  padding: 20px;
  text-align: center;
  color: white;
`;
 
const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;
 
// const NavLink = styled(Link)`
//   color: white;
//   text-decoration: none;
//   font-size: 1.2rem;
 
//   &:hover {
//     text-decoration: underline;
//   }
// `;

const ThemeButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color:rgb(193, 181, 109);
  color : white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;
 
const Header = ( { toggleTheme }) => (
  <HeaderContainer>
    <Title>Movie Dashboard</Title>
    <div>
        <ThemeButton onClick={toggleTheme}>Toggle Theme</ThemeButton>
    </div>
    {/* <NavLink to="/">Home</NavLink> */}
  </HeaderContainer>
);
 
export default Header;