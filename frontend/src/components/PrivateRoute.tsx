import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  // if userInfo then show /profile else navigate back to login
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
