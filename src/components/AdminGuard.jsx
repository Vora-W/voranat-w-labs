import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminGuard() {
  const location = useLocation();
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-brown-100 flex items-center justify-center">
        <div className="text-body-1 text-brown-400">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/admin/auth/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const isAdmin = user.role === "admin";

  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}

