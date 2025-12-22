import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import ErrorPage from "../pages/ErrorPage";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const { role } = useRole();
  const userRole = role?.role;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!userRole) {
    return <LoadingSpinner />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <ErrorPage></ErrorPage>;
  }

  return children;
};

export default RoleRoute;
