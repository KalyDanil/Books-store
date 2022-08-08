import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

const PrivateRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  return user.tokenIsValid ? <Outlet/> : <Navigate to='/main'/>;
};

export default PrivateRoute;
