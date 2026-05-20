import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const admin = localStorage.getItem("admin");
  const adminToken = localStorage.getItem("adminToken");
  return (admin === "true" && adminToken) ? children : <Navigate to="/admin" />;
}
