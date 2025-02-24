import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  isAuthenticated: boolean;
  redirectPath?: string;
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectPath = "/login",
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
