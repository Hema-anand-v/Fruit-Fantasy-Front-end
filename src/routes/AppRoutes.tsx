import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // import ProtectedRoute
import FruitManager from "../pages/FruitManager/FruitManager";
import UserProfile from "../pages/UserProfile/UserProfile";
import PageNotFound from "../pages/NotFound/PageNotFound";
import FruitDetail from "../components/FruitDetail/FruitDetail";
import AdvancedSearchFruit from "../components/AdvancedSearchFruit/AdvancedSearchFruit";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ErrorMessage from "../components/ErrorMessage";
import type { Fruit } from "../types/Fruit";
import RegisterForm from "../pages/Register/RegisterForm";
import LoginForm from "../pages/Login/LoginForm";

interface AppRoutesProps {
  isAdvancedSearch: boolean;
  fruits: Fruit[];
  filteredFruits: Fruit[];
  loading: boolean;
  error: string | null;
  onAddFruit: (fruit: Fruit) => void;
  onEditFruit: (fruit: Fruit) => void;
  onDeleteFruit: (id: number) => void;
  onAddToCart: (fruit: Fruit) => void;
  onToggleWishlist: (fruit: Fruit) => void;
  onClearWishlist: () => void;
  role: string;
}

export default function AppRoutes({
  isAdvancedSearch,
  filteredFruits,
  loading,
  error,
  onAddFruit,
  onEditFruit,
  onDeleteFruit,
  role,
  onAddToCart,
  onToggleWishlist,
  onClearWishlist
}: AppRoutesProps) {
  console.log("Role:", role);
  return (
    <Routes>
      {/* Login & Register */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Profile protected for both roles */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Home route with role-based views */}
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            {role === "admin" ? (
              <AdminDashboard
                fruits={filteredFruits}
                onAddFruit={onAddFruit}
                onDeleteFruit={onDeleteFruit}
              />
            ) : !isAdvancedSearch ? (
              <>
                {loading && <p>Loading fruits...</p>}
                {error ? (
                  <ErrorMessage message={error} />
                ) : (
                  <FruitManager
                    fruits={filteredFruits}
                    onAddFruit={onAddFruit}
                    onDeleteFruit={onDeleteFruit}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    role={role}
                    onClearWishlist={onClearWishlist}
                  />
                )}
              </>
            ) : (
              <AdvancedSearchFruit />
            )}
          </ProtectedRoute>
        }
      />

      {/* Fruit detail route protected for both roles */}
      <Route
        path="/fruits/:id"
        element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <FruitDetail
              onEditFruit={onEditFruit}
              onDeleteFruit={onDeleteFruit}
            />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
