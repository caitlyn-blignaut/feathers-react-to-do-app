import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const context = useContext(AuthContext);
  if (!context.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
