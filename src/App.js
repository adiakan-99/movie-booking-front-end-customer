import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Movies from './Movies';
import Navbar from './Navbar';
import Signup from './Signup';
import Signin from './Signin';
import MovieDetails from './MovieDetails';
import LocationAndTheatre from './LocationAndTheatre';
import ProtectedRoutes from './ProtectedRoutes';
import Home from './Home';
import SeatLayout from './SeatLayout';
import BookingHistory from './BookingHistory';
import { useSelector } from 'react-redux';

function App() {
  const [particularMovieDetail, setParticularMovieDetail] = React.useState("")
  const isLoggedIn = useSelector((result) => result.user.isLoggedIn)

  return (
    <>
      {
        isLoggedIn ?
          <Navbar />
          :
          <h2 className="prompt-text">Please sign in or sign up to start booking tickets!</h2>
      }

      <Routes>
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/movies' element={<Movies setDetails={setParticularMovieDetail} />}></Route>
          <Route path='/moviedetails' element={<MovieDetails details={particularMovieDetail} />}></Route>
          <Route path='/locationandtheatre' element={<LocationAndTheatre />}></Route>
          <Route path='/seatlayout' element={<SeatLayout />}></Route>
          <Route path='/bookings' element={<BookingHistory />}></Route>
        </Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
      </Routes>
    </>
  );
}

export default App;
