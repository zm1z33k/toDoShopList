import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/navbar';
import ShoppingListOverview from './components/listsOverview/listsOverview';
import ShoppingListDetail from './components/shoppingListDetail/shoppingListDetail';
import { ShoppingListProvider } from './providers/shoppingListProvider';
import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <ShoppingListProvider>
        <Router>
          <Navbar />
          <button className="dark-mode" onClick={toggleDarkMode}>
            {darkMode ? '🌞' : '🌜'}
          </button>
          <Routes>
            <Route path="/" element={<ShoppingListOverview />} />
            <Route path="/detail" element={<ShoppingListDetail />} />
          </Routes>
        </Router>
      </ShoppingListProvider>
    </div>
  );
}

export default App;