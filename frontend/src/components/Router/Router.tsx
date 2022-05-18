import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import React, { useState, useEffect } from 'react';
import Authorization from '../Authorization/Authorization';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../MainPage/MainPage';
import LikedBooks from '../LikedBooks/LikedBooks';
import Profile from '../Profile/Profile';
import Cart from '../Cart/Cart';
import BookPage from '../BookPage/BookPage';
import PrivateRoute from './PrivateRoute';
import Registration from '../Registration/Registration';
import { authorizationByTokenRequest } from '../../store/reducers/userReducer/thunks';

const Site: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const getUser = async() => {
        dispatch<any>(authorizationByTokenRequest());
    }

    useEffect(() => {
        getUser();
    }, []);

    if (user.loadingTokenVerify === false) {
        return null
    }

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/liked-books" element={<LikedBooks />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/authorization" element={<Authorization />} />
                <Route path="/bookPage:id" element={<BookPage />} />
                <Route path='/profile' element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='/cart' element={<PrivateRoute />}>
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default Site;