import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Spin, Tag } from "antd";
import { getRandomHexColor } from "../../../service/helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";

interface DataItem {
    tracker_type: string;
    id: number;
}

interface SidebarComponentProps {
    data: DataItem[]; 
    title: string;
    loader: boolean;
}

const SidebarComponent = (props: SidebarComponentProps) => {
    const { data, title, loader } = props;
    const [list, setList] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if(data?.length) {
            setList(data)
        }
    }, [data])

    return (
        <div className="w-[100%]">
            <div className="py-2 pb-4 px-4 flex gap-2 items-center text-lg font-semibold cursor-pointer">
                <div className="mt-1" onClick={() => navigate('/setup')}><ArrowLeftOutlined  /></div>
                <div>{startCase(title)}</div>
            </div>
            <div>
                {loader ? <div style={{height: "calc(100vh - 208px)"}} className="w-[100%] flex justify-center items-center"> <Spin /> </div> :
                 <div className="px-4 checklist" style={{ overflow: 'auto', height: "calc(100vh - 208px)"}}>
                        <Card 
                            hoverable
                            key={231}
                            style={{ marginBottom: "16px", background: '#4d4a4a'}}
                        >
                            <div className="flex font-[600] text-mg text-white justify-between">
                                <div>{"Manage Checklist"}</div>
                                <div><RightOutlined /></div>
                            </div>
                        </Card>
                        {list?.map((item: any, index: number) => {
                            return (
                                <Card 
                                    hoverable
                                    key={index}
                                    style={{ marginBottom: "16px"}}
                                >
                                    <div>
                                        <div 
                                            style={{ 
                                                fontWeight: 600,  
                                                maxWidth: '270px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis', }}
                                        >
                                            {item.tracker_type}
                                        </div>
                                        <div>{`Tracker ID: ${item.id}`}</div>
                                        <Tag color={getRandomHexColor()} style={{ fontWeight: 500}}>{`Add cutom Notes`}</Tag>
                                    </div>
                                </Card>
                            )
                        })}
                 </div>
                }
            </div>
           
        </div>
    );
}

export default SidebarComponent;
