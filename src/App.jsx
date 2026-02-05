import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import AdminArticlesPage from "./pages/AdminArticlesPage";
import AdminArticleCreatePage from "./pages/AdminArticleCreatePage";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";

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
            <Route path="/admin" element={<Navigate to="/admin/articles" replace />} />
            <Route path="/admin/articles" element={<AdminArticlesPage />} />
            <Route path="/admin/articles/create" element={<AdminArticleCreatePage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
