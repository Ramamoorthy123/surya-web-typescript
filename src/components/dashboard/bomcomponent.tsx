import { FullscreenExitOutlined } from "@ant-design/icons";
import { Switch } from "antd";

const BomComponent = (props: any) => {
    const { setIsOpen, open } = props;
    return(
        <div className="flex gap-4 justify-between py-3 sticky top-0 z-10 bg-white items-center">
            <div onClick={() => setIsOpen(!open)} className="flex gap-4 items-center cursor-pointer text-[16px]">
                <div className="font-[600] ml-12 gradient-text">BOM Status for Project</div>
                <div className="text-[#f16253]">
                    <FullscreenExitOutlined />
                </div>
            </div>
            <div>
                <Switch defaultChecked />
            </div>
        </div>
    )
}

export default BomComponent;