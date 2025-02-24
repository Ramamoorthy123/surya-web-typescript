import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import { groupByTrackerPrefix } from "../../service/helper";
import { round } from "lodash";

const TrackerType = (props: any) => {
    const { trackerList, loader } = props;
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        setData(groupByTrackerPrefix(trackerList))
    }, [trackerList])

    return (
        <div className="py-4 construction">
            <Card
                hoverable
                style={{ width: '100%' }}
                >
                <div>
                    <div className="flex py-2  items-center justify-between">
                        <div style={{ fontSize: '18px'}} className="font-semibold">{'Tracker Type'}</div>
                        <div style={{ fontSize: '18px'}} className="font-semibold text-[#f16253]">{'Quantities'}</div>
                    </div>
                    {loader ?
                         <div className="flex items-center justify-center h-[200px]">
                            <Spin />
                         </div> :
                    <div>
                        {data.map((activity: any, index: number) => (
                            <div key={index}>
                                <div className="flex py-2 w-[100%] items-center justify-between">
                                    <div className="text-[14px] font-[600]">{activity?.tracker_type}</div>
                                    <div className="text-[14px] text-[#f16253] font-[600]">{round(activity.count)}</div>
                                </div>
                                
                            {activity.children && activity.children.map((child: any, childIndex: number) => (
                                <div className="flex py-1 w-[100%] justify-between" key={childIndex} style={{ paddingLeft: '16px', marginTop: '5px' }}>
                                    <div   className="text-[12px]">
                                    {child.tracker_type}
                                    </div>
                                    <div className="text-[12px]">
                                        <span>{round(child.count)}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            ))}
                    </div>}
                </div>
           </Card>
        </div>
 )
}

export default TrackerType;