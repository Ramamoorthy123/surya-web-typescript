import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Breadcrumb, Layout, theme } from 'antd';
import Headers from '../../container/root/header';
import { startCase } from "lodash";
import { decodeJWT } from "../../utils/jwt";
import { useAtom } from "jotai";
import { getUserData } from "../../atoms/settings/setting";

const { Header, Content } = Layout;

const RootLayout = () => {
  const navigate = useNavigate();
  const [, setUserDetails] = useAtom(getUserData);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const params = useLocation();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      const decoded = decodeJWT(token);
      setUserDetails(decoded);
      
      if (params.pathname === "/") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate, setUserDetails, params.pathname]);

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <Headers />
      </Header>
      <Breadcrumb className="mt-4 ml-[24px] text-[16px] font-[600]">
        <Breadcrumb.Item>Surya</Breadcrumb.Item>
        {params?.pathname?.split('/')?.length ? 
         params?.pathname?.split('/')
         .filter((item: any) => item !== '')
         .map((data: any, index: number) => {
          return <Breadcrumb.Item onClick={() => navigate(`/${data}`)} className="cursor-pointer" key={index}>{startCase(data)}</Breadcrumb.Item>;
         }) : ''}
      </Breadcrumb>
      <Content style={{ padding: '12px 24px 0 24px' }}>
        <div
          style={{
            width: "100%",
            background: colorBgContainer,
            height: "calc(100vh - 118px)",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default RootLayout;
