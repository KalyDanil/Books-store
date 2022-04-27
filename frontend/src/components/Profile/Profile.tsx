import {useState} from 'react';
import {Profile} from './Profile.styled';
import {RootState} from '../../store/index';
import {useDispatch, useSelector} from 'react-redux';
import {authorizationByTokenRequest, editRequest,
     editPasswordRequest, uploadAvatarRequest, avatarUploadAction} from '../../store/reducers/user';


function ProfilePage() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [fullNameEditing, setFullNameEditing] = useState('');
    const [emailEditing, setEmailEditing] = useState('');
    const [odlPassword, setPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [newPasswordReplay, setnewPasswordReplay] = useState('');
    const [newPasswordIsMaking, setnewPasswordIsMaking] = useState(false);
    const [informationIsEditing, setinformationIsEditing] = useState(false);

    async function getUser() {
        const currentUser = {
            token: localStorage.getItem('token')
        }

        const res = await dispatch<any>(authorizationByTokenRequest(currentUser));

        if(res.payload === 'Log in.') {
            localStorage .setItem('isLoggedIn', 'false');
            localStorage .setItem('headerButton',  '');
            window.location.href = '/main';
            return
        }
        setFullName(user.fullName);
        setEmail(user.email);
    }
    
    getUser();

    async function emailInput (e:any) {
        setEmailEditing(e.target.value);
    }

    function fullNameInput(e:any) {
        setFullNameEditing(e.target.value);
    }

    function startToEditInformation() {
        setinformationIsEditing(!informationIsEditing);
        setFullNameEditing(user.fullName);
        setEmailEditing(user.email);
    }

    async function ConfirmInformationChanges() {
        const newInformation = {
            fullName: fullNameEditing,
            email: emailEditing,
            token: localStorage.getItem('token')
        }
        const res = await dispatch<any>(editRequest(newInformation));
        if(res.payload !== 'Such emails are not exist.') {
            return setinformationIsEditing(false);
        }else {alert(res.payload)}
    }

    function oldPasswordInput(e: any) {
        setPassword(e.target.value)
    }
    
    function newPasswordInput(e: any) {
        setnewPassword(e.target.value)
    }

    function newPasswordReplayInput(e: any) {
        setnewPasswordReplay(e.target.value)
    }

    function startToChangePassword() {
        setnewPasswordIsMaking(!newPasswordIsMaking);
    }

    async function ConfirmNewPassword() {
        if(newPassword !== newPasswordReplay) {
            setnewPassword('');
            setnewPasswordReplay('');
            return alert("Passwords are not the same")
        }

        const passwordBody = {
            newPassword: newPassword,
            oldPassword: odlPassword,
            token: localStorage.getItem('token')
        }
    
        const res = await dispatch<any>(editPasswordRequest(passwordBody));
        alert(res.payload);
        setnewPassword('');
        setnewPasswordReplay('');
        if(res.payload === 'Password are updated.') {
            setPassword('');
            setnewPasswordIsMaking(false);
        }
    }

    async function uploadAvatar(e: any) {
        dispatch(avatarUploadAction(e.target.files[0].name));
        let formData = new FormData();
        formData.append('image', e.target.files[0]);
        const res = await dispatch<any>(uploadAvatarRequest(formData));
    }

    return (
        <Profile newPasswordIsMaking={newPasswordIsMaking} informationIsEditing={informationIsEditing}>
            <form className='profile__avatar' encType="multipart/form-data" method="post">
                <img className='profile__avatar-default' src={'http://localhost:4000/uploads/'+user.avatar} alt='defaultAvatar'/>
                <div className="profile__avatar-loadDiv">
                    <input type="file" id="input__file" className="profile__avatar-load"  onChange={uploadAvatar} multiple/>
                    <label htmlFor="input__file">
                        <img className="profile__avatar-camera" src="./assets/image/camera.svg" alt="Выбрать файл"/>
                    </label>
                </div>
            </form>
            <div className='personalInformation'>
                <div className='personalInformation__header'>
                    <h1>Personal information</h1> 
                    <span onClick={startToEditInformation}>Change information</span>
                </div>
                <div className='personalInformation__div'>
                    <span>Your name</span>
                    <img src="./assets/image/profileYourName.svg" alt='yourName'/>
                    <input className='personalInformation__inputText' type='text' value={fullName}/>
                </div>
                <div className='personalInformation__div'>
                    <span>Your email</span>
                    <img src="./assets/image/email.svg" alt='yourEmail'/>
                    <input className='personalInformation__inputText' type='text' value={email}/>
                    <input className='personalInformation__button' type='button' value='Confirm'/>
                </div>
                <div className='personalInformationEditing__div'>
                    <span>Your name</span>
                    <img src="./assets/image/profileYourName.svg" alt='yourName'/>
                    <input className='personalInformation__inputText' type='text' onInput={fullNameInput} value={fullNameEditing}/>
                </div>
                <div className='personalInformationEditing__div'>
                    <span>Your email</span>
                    <img src="./assets/image/email.svg" alt='yourEmail'/>
                    <input className='personalInformation__inputText' type='text' onInput={emailInput} value={emailEditing}/>
                    <input className='personalInformation__button' type='button' onClick={ConfirmInformationChanges} value='Confirm'/>
                </div>
                <div className='personalInformation__passwordHeader'>
                    <h1>Password</h1> 
                    <span onClick={startToChangePassword}>Change password</span>
                </div>
                <div className='personalInformation__oldPasswordStatic'>
                    <span className='personalInformation__password-text'>Old password</span>
                    <img className='personalInformation__imgHide' src="./assets/image/hide.svg" alt='hide'/>
                    <input className='personalInformation__inputText' type='password' value='blablablablablablablabla'/>
                </div>
                <div className='personalInformation__oldPassword'>
                    <span className='personalInformation__password-text'>Old password</span>
                    <img className='personalInformation__imgHide' src="./assets/image/hide.svg" alt='hide'/>
                    <input className='personalInformation__inputText' type='password' onInput={oldPasswordInput} value={odlPassword}/>
                </div>
                <div className='personalInformation__newPassword'>   
                    <img className='personalInformation__imgHide' src="./assets/image/hide.svg" alt='hide'/>
                    <input type='password' placeholder='Password replay' onInput={newPasswordInput} value={newPassword}/>
                    <span>Enter your password</span>
                </div>
                <div className='personalInformation__newPassword'>   
                    <img className='personalInformation__imgHide' src="./assets/image/hide.svg" alt='hide'/>
                    <input type='password' placeholder='Password replay' onInput={newPasswordReplayInput} value={newPasswordReplay}/>
                    <span>Repeat your password without errors</span>
                </div>
                <input className='personalInformation__passwordButton' type='button' onClick={ConfirmNewPassword} value='Confirm'/>
            </div>
        </Profile>
        );
    }

    export default ProfilePage;