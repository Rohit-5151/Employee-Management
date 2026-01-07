import { Navigate } from "react-router-dom";
import '../App.css';

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? children : <Navigate to="/" />;
}