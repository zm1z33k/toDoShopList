import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import ShoppingListDetail from './components/shoppingListDetail/shoppingListDetail';
import { ShoppingListProvider } from './providers/shoppingListProvider';

function App() {
  return (
    <div className="App">
      <ShoppingListProvider>
        <Navbar/>
        <ShoppingListDetail/>
      </ShoppingListProvider>
    </div>
  );
}

export default App;
