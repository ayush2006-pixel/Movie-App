// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import SearchMovieInfo from './components/SearchMovieInfo.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<SearchMovieInfo />} />
    </Routes>
  );
};

export default App;
