import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './sections/pages/Home.jsx';
import ProductDetail from './sections/pages/ProductDetail.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
  );
}

export default App
