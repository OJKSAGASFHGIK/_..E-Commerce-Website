import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './sections/pages/Home.jsx';
import ProductDetails from './sections/pages/ProductDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/details" element={<ProductDetails/>} />
      </Routes>
    </Router>
  );
}

export default App
