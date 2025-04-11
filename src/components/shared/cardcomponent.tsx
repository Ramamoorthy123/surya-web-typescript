import { RightCircleOutlined } from "@ant-design/icons";
import { Card, Skeleton } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CardComponent = (props: any) => {
    const { data } = props;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); 


    const handleClick = () => {
        navigate(`${data?.path}`)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    return (
        <Card
            hoverable
            style={{ width: 330 }}
            cover={
                <div style={{ position: 'relative' }}>
                    {loading && <Skeleton.Image active style={{ width: 330, height: 150 }} />} 
                    <img
                        alt="example"
                        src={`${data?.image}`}
                        loading="lazy"
                        style={{ display: loading ? 'none' : 'block' , objectFit: "cover"}} 
                        className="rounded-t-md"
                    />
                </div>
            }
            onClick={handleClick}
        >
            <div className="flex px-2 text-lg font-[600] text-[#878787] justify-between items-center py-2">
                <div>{data?.title}</div>
                <div>{<RightCircleOutlined />}</div>
            </div>
        </Card>
    )
}

export default CardComponent;