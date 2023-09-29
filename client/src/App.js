import React from 'react';
import HomePage from './routes/HomePage.jsx';
import {Routes, Route} from 'react-router-dom'
import NavFooter from './NavFooter'
import Profile from './routes/Profile';
import Login from './routes/Login'
import Signup from './routes/Signup';
import FindJobPage from './routes/FindJobPage.jsx';
import JobPage from './routes/JobPage.jsx';
import Payment from './Payment.js'
function App() {
  
  return (
  <div className="main-content">
    <div className="overview-wrapper">
      <Routes>
      <Route path='/' element={<NavFooter />}>
      <Route index element={<HomePage />}/>
      <Route path='login' element= {<Login />}/>
      <Route path='signup' element= {<Signup />}/>
      <Route path='profile' element= {<Profile />}/>
      <Route path='findjob' element= {<FindJobPage />}/>
      <Route path='job' element= {<JobPage />}/>
      <Route path='payment' element= {<Payment />}/>
      </Route>
      </Routes>
    </div>
  </div>
  );
}

export default App;


