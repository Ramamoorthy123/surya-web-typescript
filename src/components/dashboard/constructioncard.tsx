import { Card, Progress, Spin } from "antd";
import { useEffect, useState } from "react";
import { activityList, addProgressToActivities, calculateWeightedAverageProgress, getChildrenOnly } from "../../service/helper";
import { round } from "lodash";

const ConstructionCard = (props: any) => {
    const { loader, progressList, construction, title } = props;
    const [list, setList] = useState<any>([]);
    const [percentage, setPercentage] = useState<number>(0);

    useEffect(() => {
        if (construction) {
            const temp = activityList(construction)
            setList(addProgressToActivities(temp, progressList));
        }
    }, [construction,progressList]);

    useEffect(() => {
        if(list) {
            const data = getChildrenOnly(list)
            setPercentage(round(calculateWeightedAverageProgress(data)))
        }
    }, [list])


    return (
        <div className="py-4 construction">
             <Card
                hoverable
                style={{ width: '100%' }}
            >
                <div>
                    <div className="flex py-1 items-center justify-between">
                        <div style={{ fontSize: '18px'}} className="font-semibold">{title}</div>
                        {/* <div className="text-lg font-[700] text-[#f16253]">{percentage}%</div> */}
                    </div>
                   
                    <div>
                        {loader ?
                         <div className="flex items-center justify-center h-[200px]">
                            <Spin />
                         </div> :
                         <div>
                            <div className="flex justify-center">
                          <Progress
                              type="dashboard"
                              steps={8}
                              percent={percentage}
                              trailColor="#fff2f1"
                              strokeWidth={20}
                          />
                      </div>
                        <div>
                        {list.map((activity: any, index: number) => (
                          <div key={index}>
                            <div className="flex w-[100%] items-center gap-2">
                                <div style={{ width: "35%"}} className="text-[14px] font-[600]">{activity?.label}</div>
                                <Progress
                                  percent={activity.progress}
                                  strokeColor="#f16253"
                                  showInfo={false}
                                  style={{ width: '50%', paddingLeft: '4px'}}
                                />
                                <div className="text-[14px] font-[600]">{round(activity.progress)}%</div>
                            </div>
                            
                           {activity.children && activity.children.map((child: any, childIndex: number) => (
                              <div className="flex w-[100%] gap-2" key={childIndex} style={{ paddingLeft: '8px', marginTop: '5px' }}>
                                <div style={{ width: "35%"}}  className="text-[12px]">
                                  {child.label}
                                </div>
                                <Progress
                                  percent={child.progress}
                                  strokeColor="#f16253"
                                  showInfo={false}
                                  style={{ width: '50%'}}
                                />
                                <div className="text-[12px]">
                                    <span>{round(child.progress)}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                         </div>
                        }
                    </div>
                </div>
            </Card>
        </div>
    )

}

export default ConstructionCard;