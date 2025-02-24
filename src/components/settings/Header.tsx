import { LockOutlined } from "@ant-design/icons";
import ModalComponent from "./modalcomponent";
import { useState } from "react";

const Header = (props: any) => {
    const { title, data } = props;
    const [visible, setVisible] = useState(false);
    console.log(data, 'calling')
    return (
        <div className="py-4 px-8 flex justify-between" style={{ borderBottom: "1px solid #d1d5db", borderTop: "1px solid #d1d5db"}}>
            <div className="text-xl font-[600]">{title}</div>
            <div onClick={() => setVisible(true)} className="flex items-center cursor-pointer gap-2 text-lg text-[#878787] font-[600]">
                <div><LockOutlined /></div>
                <div>Change Password</div>
            </div>
            <ModalComponent visible={visible} email={data?.email} setVisible={setVisible}/>
        </div>
    )
}

export default Header;