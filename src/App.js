

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Board from './pages/Board';
import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/main" Component={Main} />
          <Route path="/board" Component={Board} />
          <Route path="/faq" Component={FAQ} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;