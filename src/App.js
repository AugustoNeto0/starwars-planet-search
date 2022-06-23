import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import HomePage from './pages/HomePage';

function App() {
  return (
    <StarWarsProvider>
      <HomePage />
    </StarWarsProvider>
  );
}

export default App;
