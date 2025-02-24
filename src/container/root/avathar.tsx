import { Avatar, Dropdown, Menu } from "antd";
import { useState } from "react";
import { settingsMenu } from "./constant"
import { useNavigate } from "react-router-dom";

const DropdownComponent = () => {
    const items = settingsMenu
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate()

    const handleMenuClick = (e: any) => {
        const data = items?.find((temp:any) => temp.key === e.key)
        if(e.key === "1") {
            navigate(`${data?.path}`)
        }
        console.log('Clicked menu item:', e.key);
        setOpen(false);
    };

    const handleAvatarClick = () => {
        setOpen(!open); 
    };

    const menu = (
        <Menu
            items={items}
            onClick={handleMenuClick} 
        />
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={['click']} 
            open={open} 
            onOpenChange={(flag) => setOpen(flag)} 
        >
            <Avatar
                className="text-lg cursor-pointer font-[500]"
                style={{ background: '#f16253' }}
                size="large"
                onClick={handleAvatarClick} 
            >
                {"V"}
            </Avatar>
        </Dropdown>
    );
};

export default DropdownComponent;
