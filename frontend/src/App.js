import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import SearchByLocation from './components/SearchByLocation';
import RestaurantDetails from './components/RestaurantDetails'; 
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Routes>
                    <Route path="/" element={<RestaurantList />} />
                    <Route path="/search-location" element={<SearchByLocation />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetails />} /> 
                   
                </Routes>
            </div>
        </Router>
    );
}

export default App;
