import st from "./App.module.css";
import HomePage from "./pages/home";
import Admin from "./pages/admin/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import Login from "./pages/Login/Login";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
