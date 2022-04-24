import {useState} from 'react';
import {Profile} from './Profile.styled';

function ProfilePage() {
    const [loggedIn, setloggedIn] = useState(true);
    const [isMakingNewPassword, setisMakingNewPassword] = useState(false);

    function changePassword() {
        setisMakingNewPassword(true);
    }

    return (
        <Profile isMakingNewPassword={isMakingNewPassword}>
            <div className='profile__avatar'>
                <img className='profifile__avatar-default' src="./assets/image/defaultAvatar.svg" alt='defaultAvatar'/>
                <img className='profifile__avatar-camera' src="./assets/image/camera.svg" alt='camera'/>
            </div>
            <div className='personalInformation'>
                <div className='personalInformation__header'>
                    <h1>Personal information</h1> 
                    <span>Change information</span>
                </div>
                <div className='personalInformation__div'>
                    <span>Your name</span>
                    <img src="./assets/image/profileYourName.svg" alt='yourName'/>
                    <input className='personalInformation__inputText' type='text'/>
                </div>
                <div className='personalInformation__div'>
                    <span>Your email</span>
                    <img src="./assets/image/email.svg" alt='yourName'/>
                    <input className='personalInformation__inputText' type='text'/>
                </div>
                <div className='personalInformation__passwordHeader'>
                    <h1>Password</h1> 
                    <span onClick={changePassword}>Change password</span>
                </div>
                <div className='personalInformation__div'>
                    <span className='personalInformation__password-text'>Old password</span>
                    <img className='personalInformation__imgHide' src="./assets/image/hide.svg" alt='hide'/>
                    <input className='personalInformation__inputText' type='password'/>
                </div>
                <div className='personalInformation__newPassword'>   
                    <img className='personalInformation__imgHide' src="./assets/image/hide.svg" alt='hide'/>
                    <input type='password' placeholder='Password replay'/>
                    <span>Enter your password</span>
                </div>
                <div className='personalInformation__newPassword'>   
                    <img className='personalInformation__imgHide' src="./assets/image/hide.svg" alt='hide'/>
                    <input type='password' placeholder='Password replay'/>
                    <span>Repeat your password without errors</span>
                </div>
                <input className='personalInformation__button' type='button' value='Confirm'/>
            </div>
        </Profile>
        );
    }

    export default ProfilePage;