import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index';
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
    const aa = {
        id: 2,
        name: 'The Chronicles of Narnia',
      authorname: 'C. S. Lewis',
      description1: '“Rupi Kaur is the Writer of the Decade.” - The New Republic ',
      description2: '#1 New York Times bestseller milk and honey is a collection of poetry and prose about survival. About the experience of violence, abuse, love, loss, and femininity.',
      description3: 'The book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.',
      paperBackPrice: 20.00,
      hardCoverPrice: 20.00,
      rating: 5,
      dateofissue: '10.10.19',
      cover: 'The Chronicles of Narnia.svg',
      status: 'active',
      genre: 'Fiction',
    }
    return (
        <Router>
            <Header/>
            <Routes>
            <Route path="/main" element={<MainPage/>} />
            <Route path="/liked-books" element={<LikedBooks/>} />
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/authorization" element={<Authorization />}/>
            <Route path="/bookPage:id" element={<BookPage/>}/>
            <Route path='/profile' element={<PrivateRoute/>}>
                <Route path='/profile' element={<Profile/>}/>
            </Route>
            <Route path='/cart' element={<PrivateRoute/>}>
                <Route path="/cart" element={<Cart/>}/>
            </Route>
            </Routes>
            <Footer/>
        </Router>
    );
  }

  export default Site;