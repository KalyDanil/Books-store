import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Authorization from '../Authorization/Authorization';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainPage from '../MainPage/MainPage';
import Profile from '../Profile/Profile';
import Registration from '../Registration/Registration';

function Site() {
    return (
        <Router>
            <Header/>
            <Routes>
            <Route path="/main" element={<MainPage/>} />
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/authorization" element={<Authorization />}/>
            <Route path="/profile" element={<Profile/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
  }

  export default Site;