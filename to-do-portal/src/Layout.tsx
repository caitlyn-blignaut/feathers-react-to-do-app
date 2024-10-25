import { Outlet } from "react-router-dom";
import { NavBar } from "./nav/NavBar";
import { AuthProvider } from "./auth/AuthContext";

export function Layout() {
  return (
    <AuthProvider>
      <NavBar />
      <Outlet />
    </AuthProvider>
  );
}
