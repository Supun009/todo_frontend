import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth_pages/Loginpage";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./protected_route/ProtectedRoute";
import AuthLayout from "./layout/AuthLayout";
import SignUpPage from "./pages/auth_pages/SignUpPage";
import NotfoundPage from "./pages/404/NotfoundPage";
import TodoPage from "./pages/homepages/TodoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        </Route> 

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<TodoPage />} />
            <Route path="*" element={<NotfoundPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
