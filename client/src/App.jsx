import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './sections/pages/Home.jsx';
import ProductDetail from './sections/pages/ProductDetail.jsx';
import Login from './sections/pages/auth/Login.jsx';
import Register from './sections/pages/auth/Register.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products/:id" element={<ProductDetail/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App
