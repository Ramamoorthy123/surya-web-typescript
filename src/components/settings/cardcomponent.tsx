import { Card } from "antd";
import { startCase } from "lodash";
import { useEffect, useState } from "react";

const CardComponent = (props: any) => {
    const { title, data } = props;
    const { organizations } = data;
    const [value, setValue] = useState<any>({});

    useEffect(() => {
        if (organizations && organizations.length > 0) {
            let temp = { ...organizations[0] }; 
            temp.category = "contractor"; 
            setValue(temp); 
        }
    }, [organizations]);


    return (
        <Card hoverable title={title} style={{ width: 400, border: "1px solid #d1d5db" }}>
            {title === 'Company Details' ? (
                <div>
                    {Object.keys(value)?.map((item: any, index: number) => {
                        const itemValue = value[item];
                        if(['name', 'website', 'address', 'category', 'about'].includes(item)) {
                            return (
                                <div key={index} className="pb-4 flex flex-col gap-2">
                                    <div className="text-[16px] text-[#9caccb] font-[500]">{startCase(item)}</div>
                                    <div className="text-md font-[500]">
                                        {typeof itemValue === 'object' 
                                            ? JSON.stringify(itemValue) 
                                            : itemValue 
                                        }
                                    </div>
                                </div>
                            );
                        }
                        return null; 
                    })}
                </div>
            ) : (
                <div>
                    {value.kam && typeof value.kam === 'object' ? (
                        Object.keys(value.kam).map((item: any, index: number) => {
                            const itemValue = value.kam[item];
                            if(['name', 'email'].includes(item)) {
                                return (
                                    <div key={index} className="pb-4 flex flex-col gap-2">
                                        <div className="text-[16px] text-[#9caccb] font-[500]">{startCase(item)}</div>
                                        <div className="text-md font-[500]">
                                            {typeof itemValue === 'object' 
                                                ? JSON.stringify(itemValue) 
                                                : itemValue 
                                            }
                                        </div>
                                    </div>
                                );
                            }
                            return null; 
                        })
                    ) : (
                        <div>No KAM data available.</div>
                    )}
                </div>
            )}
        </Card>
    );
};

export default CardComponent;
