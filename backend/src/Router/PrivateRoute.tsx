import {Navigate, Outlet} from "react-router-dom";
import {RootState} from '../store/index';
import {useDispatch, useSelector} from 'react-redux';

const PrivateRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return user.tokenIsValid? <Outlet/> : <Navigate to='/main'/>;
}
  
export default PrivateRoute;