import React from 'react';
import { Navigate } from 'react-router-dom';

type PublicRouteProps = {
  isAuthenticated: boolean;
  redirectPath?: string;
  children: React.ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  redirectPath = "/",
  children,
}) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
