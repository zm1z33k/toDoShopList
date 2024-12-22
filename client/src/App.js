import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/navbar';
import ShoppingListOverview from './components/listsOverview/listsOverview';
import ShoppingListDetail from './components/shoppingListDetail/shoppingListDetail';
import { ShoppingListProvider } from './providers/shoppingListProvider';
import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cz' : 'en');
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <ShoppingListProvider>
        <Router>
          <Navbar />
          <button className="dark-mode" onClick={toggleDarkMode}>
            {darkMode ? '🌞' : '🌜'}
          </button>
          {/*Language toggle button nefunguje, ale snažil jsem se.*/}
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'en' ? '🍺' : '💂'}
          </button>
          <Routes>
            <Route path="/" element={<ShoppingListOverview language={language} />} />
            <Route path="/detail" element={<ShoppingListDetail language={language} />} />
          </Routes>
        </Router>
      </ShoppingListProvider>
    </div>
  );
}

export default App;