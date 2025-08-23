import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useSelector } from "react-redux";

import Home from './sections/pages/Home.jsx';
import ProductDetail from './sections/pages/ProductDetail.jsx';
import Login from './sections/pages/auth/Login.jsx';
import Register from './sections/pages/auth/Register.jsx';

function App() {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const {userInfo} = userLoginReducer;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products/:id" element={<ProductDetail/>} />
        <Route exact path="/login" element={userInfo ? <Navigate to="/"/> : <Login/>} />
        <Route exact path="/register" element={userInfo ? <Navigate to="/"/> : <Register/>} />
      </Routes>
    </Router>
  );
}

export default App
