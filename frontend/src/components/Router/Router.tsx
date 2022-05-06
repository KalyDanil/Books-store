import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';
import React, { useState, useEffect } from 'react';
import Authorization from '../Authorization/Authorization';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../MainPage/MainPage';
import Profile from '../Profile/Profile';
import PrivateRoute from './PrivateRoute';
import Registration from '../Registration/Registration';
import {authorizationByTokenRequest} from '../../store/reducers/user';

function Site() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    async function getUser() {
        dispatch<any>(authorizationByTokenRequest());
    }
    
    useEffect(() => {
        getUser();
    },[]);

    if(user.loadingTokenVerify === false) {
        return null
    }

    return (
        <Router>
            <Header/>
            <Routes>
            <Route path="/main" element={<MainPage/>} />
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/authorization" element={<Authorization />}/>
            <Route path='/profile' element={<PrivateRoute/>}>
                <Route path='/profile' element={<Profile/>}/>
            </Route>
            </Routes>
            <Footer/>
        </Router>
    );
  }

  export default Site;