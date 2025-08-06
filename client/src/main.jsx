
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProductDetails from './sections/pages/ProductDetails.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App/>}></Route>
        <Route exact path="/details" element={<ProductDetails/>}></Route>
      </Routes>
    </Router>
  </StrictMode>,
)
