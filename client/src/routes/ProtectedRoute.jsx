import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const account = localStorage.getItem("walletAddress");

  return account ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;