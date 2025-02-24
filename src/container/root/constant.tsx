import { FaKey, FaRegUser, FaUser } from "react-icons/fa";
import { HiDocumentText, HiOutlineDocumentText } from "react-icons/hi2";
import { RiBillFill, RiBillLine, RiDatabase2Fill, RiDatabase2Line } from "react-icons/ri";
import { TiChartLine, TiChartLineOutline } from "react-icons/ti";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";


export const HeaderList = [
    {
        key: 1,
        label: "Dashboard",
        path: "/dashboard",
        default_icon: <TiChartLineOutline />,
        icon: <TiChartLine />
    },
    {
        key: 2,
        label: "Setup",
        path: "/setup",
        default_icon: <RiBillLine />,
        icon: <RiBillFill />
    },
    {
        key: 3,
        label: "Quality",
        path: "/quality",
        default_icon: <RiDatabase2Line />,
        icon: <RiDatabase2Fill />
    },
    {
        key: 4,
        label: "Reports",
        path: "/reports",
        default_icon: <HiOutlineDocumentText />,
        icon: <HiDocumentText />
    },
    {
        key: 5,
        label: "Staff And Plant",
        path: "/staff-pand-plant",
        default_icon: <FaRegUser />,
        icon: <FaUser />
    },
    {
        key: 7,
        label: "Access Rights",
        path: "/access-rights",
        default_icon: <FaKey />,
        icon: <FaKey />
    }
]

export const settingsMenu = [
    {
        key: '1',
        label: 'Settings',
        icon: <SettingOutlined style={{ marginTop: "5px", fontSize: '16px'}} size={18} />,
        path: '/settings'
    },
    {
        key: '2',
        label: 'Logout',
        icon: <LogoutOutlined style={{ marginTop: "5px", fontSize: '16px'}} size={18} />,
        path: '/logout'
    }
]

