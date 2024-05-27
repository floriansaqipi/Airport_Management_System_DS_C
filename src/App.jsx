// import Navbar from './Components/Navbar/Navbar'
// import Home from './Components/Home/Home'
// import Search from './Components/Search/Search'
// import Support from './Components/Support/Support'
// import Info from './Components/Info/Info'
// import Lounge from './Components/Lounge/Lounge'
// import Travelers from './Components/Travelers/Travelers'
// import Subscriber from './Components/Subscribers/Subscribe'
// import Footer from './Components/Footer/Footer'

import './main.scss'


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AirportList from './Components/Airport/AirportList';
import AirportDetail from './Components/Airport/AirportDetail';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AirportList />} />
        <Route path="/detail/:id" element={<AirportDetail />} />
      </Routes>
    </Router>
  );
};

export default App
