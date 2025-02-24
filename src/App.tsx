import './App.scss';
import { useRoutes } from "react-router-dom";
import rootRoutes from './routes/private/root/index';
import publicRoutes from './routes/public/auth/index';
import { ConfigProvider } from 'antd';

const App = () => {
  const routing = useRoutes([
    rootRoutes,   
    ...publicRoutes, 
  ]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f16253", 
          colorSuccess: "#52c41a", 
          colorWarning: "#faad14", 
        },
      }}
    >
      {routing}
    </ConfigProvider>
  );
};

export default App;
