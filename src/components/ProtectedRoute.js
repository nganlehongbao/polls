import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  historyPath,
} from '../store/rootSlice';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.root)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", dispatch(historyPath({ path: location.pathname })));
      return;
    }
  }, [userInfo, navigate, dispatch, location ]);
  
  if (!userInfo) {
    return '';
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute