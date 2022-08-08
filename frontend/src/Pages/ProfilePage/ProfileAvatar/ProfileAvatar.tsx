import { avatarUploadAction, uploadAvatarRequest } from '../../../store/reducers/userReducer/thunks';
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch';
import { useAppSelector } from '../../../utils/hooks/useAppSelector';
import { ProfileAvatarStyle } from './ProfileAvatar.styled';

const ProfileAvatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      dispatch(avatarUploadAction(e.target.files[0].name));
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      await dispatch(uploadAvatarRequest(formData));
      window.location.reload();
    }
  };

  return (
    <ProfileAvatarStyle encType='multipart/form-data' method='post'>
      <img className='profile__avatar-default' src={`http://localhost:4000/uploads/${user.avatar}`} alt='defaultAvatar' />
      <div className='profile__avatar-loadDiv'>
        <input type='file' id='input__file' className='profile__avatar-load' onChange={uploadAvatar} multiple />
        <label htmlFor='input__file'>
          <img className='profile__avatar-camera' src='./assets/image/camera.svg' alt='Выбрать файл' />
        </label>
      </div>
    </ProfileAvatarStyle>
  );
};

export default ProfileAvatar;
