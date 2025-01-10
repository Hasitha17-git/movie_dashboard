import React from 'react';
import { QueryClient,QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles} from './styles/GlobalStyles';
import { lightTheme,darkTheme } from './styles/Theme';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';
import store from './redux/store';

const queryClient = new QueryClient();
 
const App = () => {
  const [theme, setTheme] = React.useState('light');
 
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };  
  
  return (
    <Provider store={store}>
    <QueryClientProvider client = {queryClient}>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <Header toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/invalid" element={<MovieDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </QueryClientProvider>
    </Provider>
  );
};
 
export default App;