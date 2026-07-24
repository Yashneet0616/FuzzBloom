import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rose-50">
        <h1 className="text-3xl font-semibold text-stone-700">
          Checking authentication...
        </h1>
      </div>
    );
  }

  // Not logged in → Go to the single login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not an admin
  if (!profile || profile.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Logged in as admin
  return children;
}

export default ProtectedRoute;