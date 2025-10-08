import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MyBookingPage from "./pages/MyBookingPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/my-booking" element={<MyBookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
