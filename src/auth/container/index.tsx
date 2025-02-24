import React, { ReactNode } from 'react';

type LoginContainerProps = {
  children: ReactNode;
};

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img src="/vectorRight.png" alt="" className="absolute top-0 left-0" />
      <img src="/vectorLeft.png" alt="" className="absolute top-0 right-0" />
      <img src="/vectorLeftBottom.png" alt="" className="absolute bottom-0 left-0" />
      <img src="/vectorRightBottom.png" alt="" className="absolute bottom-0 right-0" />
      <div className="z-10">{children}</div>
    </div>
  );
};

export default LoginContainer;
