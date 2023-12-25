import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import ShoppingList from './components/ShoppingList';
import MainBody from "./components/MainBody";
import Footer from './components/Footer';

function App() {
  const [product , setProduct] = useState([]);
  const selectedProduct = (item) => {
    setProduct([...product , item]);
  }
  return (
    <div className="App">
      <Router>
      <div className="home">
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/">
              <Home/>
              <MainBody addProduct={selectedProduct}/>
              <Footer />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/signup">
              <Signup />
              <Footer />
            </Route>
            <Route path="/list">
              <ShoppingList sendProduct={product} setsendProduct={selectedProduct}/>
              <Footer />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
