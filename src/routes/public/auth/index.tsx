import { RouteObject } from "react-router-dom";
import PublicRoute from "../index"; // Assuming it's in this folder
import LoginPage from "../../../auth/login";
import ForgotPassword from "../../../auth/forgotpassword";
import MessageComponent from "../../../auth/forgotpassword/Message";
import ResetPassword from "../../../auth/resetpassword";
import NotFound from "../notfound"

const isAuthenticated = false; 

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <PublicRoute isAuthenticated={isAuthenticated}>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute isAuthenticated={isAuthenticated}>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password/success",
    element: (
      <PublicRoute isAuthenticated={isAuthenticated}>
        <MessageComponent />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute isAuthenticated={isAuthenticated}>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default publicRoutes;
