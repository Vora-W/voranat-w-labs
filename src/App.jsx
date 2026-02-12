import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MemberProfilePage from "./pages/MemberProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminArticlesPage from "./pages/AdminArticlesPage";
import AdminArticleCreatePage from "./pages/AdminArticleCreatePage";
import AdminArticleEditPage from "./pages/AdminArticleEditPage";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";
import AdminCategoryCreatePage from "./pages/AdminCategoryCreatePage";
import AdminCategoryEditPage from "./pages/AdminCategoryEditPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminResetPasswordPage from "./pages/AdminResetPasswordPage";
import { useAuth } from "./contexts/AuthContext";
import { MOCK_ADMIN_EMAILS } from "./mockupData/mockAuthCredentials";

function AdminGate() {
  const { user } = useAuth();
  const isAdmin = user && MOCK_ADMIN_EMAILS.includes((user.email || "").toLowerCase());
  if (isAdmin) return <Navigate to="/admin/articles" replace />;
  return <AdminLoginPage />;
}

function AdminCategoryEditWrapper() {
  const { categoryId } = useParams();
  return <AdminCategoryEditPage key={categoryId} />;
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/view/:postId" element={<ViewPostPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route
              path="/auth/reset-password"
              element={<ResetPasswordPage />}
            />
            <Route path="/member/profile" element={<MemberProfilePage />} />
            <Route path="/admin" element={<AdminGate />} />
            <Route path="/admin/auth/login" element={<AdminLoginPage />} />
            <Route path="/admin/articles" element={<AdminArticlesPage />} />
            <Route path="/admin/articles/create" element={<AdminArticleCreatePage />} />
            <Route path="/admin/articles/edit/:postId" element={<AdminArticleEditPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
            <Route path="/admin/auth/reset-password" element={<AdminResetPasswordPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/categories/create" element={<AdminCategoryCreatePage />} />
            <Route path="/admin/categories/edit/:categoryId" element={<AdminCategoryEditWrapper />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
