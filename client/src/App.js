import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/navbar';
import ShoppingListOverview from './components/listsOverview/listsOverview';
import ShoppingListDetail from './components/shoppingListDetail/shoppingListDetail';
import { ShoppingListProvider } from './providers/shoppingListProvider';

function App() {
  return (
    <div className="App">
      <ShoppingListProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShoppingListOverview />} />
            <Route path="/list/:id" element={<ShoppingListDetail />} />
          </Routes>
        </Router>
      </ShoppingListProvider>
    </div>
  );
}

export default App;
