import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './components/home'
import Apply from './components/apply'
import Projects from './components/projects'
import Footer from './components/footer'
import About from './components/about'
import ReactDOM from "react-dom/client";
const App = () => {
  

  return (
      <Router>
          <div className="App">
              <Main />
          </div>
      </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';

  return (
      <>
          {!isAuthPage && <Nav />}
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
              
          </Routes>
          <Footer />
          
      </>
  );
};

export default App;
