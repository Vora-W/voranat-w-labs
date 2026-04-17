import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminLoginPage from "./pages/admin/LoginPage";
import AdminArticlesPage from "./pages/admin/ArticlesPage";
import AdminArticleCreatePage from "./pages/admin/ArticleCreatePage";
import AdminArticleEditPage from "./pages/admin/ArticleEditPage";
import AdminCategoriesPage from "./pages/admin/CategoriesPage";
import AdminCategoryCreatePage from "./pages/admin/CategoryCreatePage";
import AdminCategoryEditPage from "./pages/admin/CategoryEditPage";
import AdminProfilePage from "./pages/admin/ProfilePage";
import AdminResetPasswordPage from "./pages/admin/ResetPasswordPage";
import AdminGuard from "./components/AdminGuard";

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
            <Route path="/member/profile" element={<ProfilePage />} />
            <Route path="/admin/auth/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminGuard />}>
              <Route index element={<Navigate to="articles" replace />} />
              <Route path="articles" element={<AdminArticlesPage />} />
              <Route path="articles/create" element={<AdminArticleCreatePage />} />
              <Route path="articles/edit/:postId" element={<AdminArticleEditPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="auth/reset-password" element={<AdminResetPasswordPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="categories/create" element={<AdminCategoryCreatePage />} />
              <Route path="categories/edit/:categoryId" element={<AdminCategoryEditWrapper />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
