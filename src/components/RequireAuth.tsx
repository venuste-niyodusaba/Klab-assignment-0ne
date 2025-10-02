import {  useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Notify } from "notiflix";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Notify.info("You need to log in first.", { position: "center-top" });
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
