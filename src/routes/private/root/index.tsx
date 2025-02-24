import { RouteObject } from "react-router-dom";
import RootLayout from "../../../container/root";
import dashboardRoute from "../dashboard";
import qualityRoute from "../quality";
import PrivateRoute from "../index";
import setupRoute from "../setup"
import reportRoute from "../report";
import settingRoute from "../settings";

const isAuthenticated = true;

const rootRoutes: RouteObject = {
  path: "/", 
  element: (
    <PrivateRoute isAuthenticated={isAuthenticated}> 
      <RootLayout /> 
    </PrivateRoute>
  ),
  children: [
    dashboardRoute,
    ...qualityRoute,
    ...setupRoute, 
    ...reportRoute,
    ...settingRoute 
  ],
};

export default rootRoutes;
