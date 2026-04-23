import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
   const { role } = useContext(AuthContext)!;
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  return allowedRoles.includes(role) ? children : <Navigate to="/unauthorized" replace />;
}