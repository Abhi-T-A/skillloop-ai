import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({
  children,
}) => {
  const location = useLocation();
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) {
    return <Loader fullScreen label="Preparing your workspace" />;
  }

  return isAuthenticated
    ? children || <Outlet />
    : (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
};

export default ProtectedRoute;
