import { Card, Progress, Spin } from "antd";
import { useEffect, useState } from "react";
import { activityList, addProgressToActivities, calculateWeightedAverageProgress, getChildrenOnly } from "../../service/helper";
import { round } from "lodash";
import { LoadingOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";

const ConstructionCard = (props: any) => {
    const { loader, progressList, construction, title, setCurrentSelection } = props;
    const [list, setList] = useState<any>([]);
    const [percentage, setPercentage] = useState<number>(0);
    const [active, setActive] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({})

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

    const handleClick = async (value: string, ind: number, label: string, data: any) => {
      if(value === active?.key && ind === active?.index) {
        setActive({})
      } else {
        setCurrentSelection(label)
        setActive({
          "key": value,
          "index": ind,
          "label": label
        })
        setLoading(true)
        try {
          if(value === "parent") {
            const res = await axiosInstance.post(`progress/get_deployed_part_for_activity_in_block?activity_id=${data?.id}&part_id=${data?.part_id}`)
            if(res) {
              setData(res.data)
              setLoading(false)
            }
          } else {
            const res = await axiosInstance.post(`progress/get_deployed_part_for_activity_in_block?activity_id=${data?.children?.[ind]?.id}&part_id=${data?.children?.[ind]?.part_id}`)
            if(res) {
              setData(res.data)
              setLoading(false)
            }
          }
         
        } catch(err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
      }
    }

    return (
        <div className="py-4 construction">
             <Card
                hoverable
                style={{ width: '100%' }}
            >
                <div>
                    <div className="flex py-1 items-center justify-between">
                        <div style={{ fontSize: '18px'}} className="font-semibold">{title}</div>
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
                              strokeColor={percentage === 100 ? "#52c41a" : "#f16253"}
                              percent={percentage}
                              trailColor="#fff2f1"
                              strokeWidth={20}
                          />
                      </div>
                        <div >
                        {list.map((activity: any, index: number) => (
                          <div key={index}>
                              <div onClick={() =>handleClick("parent", index, "", activity)} className="border mb-2 hover:shadow-md border-border rounded-md">
                                  <div className="flex w-[100%] px-2 py-2 items-center justify-between">
                                    <div className="font-[600] w-[40%]">{activity?.label}</div>
                                      <div className="flex gap-4 items-center w-[60%]">
                                        <Progress
                                          percent={activity.progress}
                                          strokeColor="#f16253"
                                          showInfo={false}
                                        />
                                        <div className="font-[600]">{round(activity.progress)}%</div>
                                  </div>
                                </div>
                                 
                                  {Object.keys(active) && active.key === "parent" && active.index === index?
                                    <div className="px-2 py-2 flex justify-end items-center">
                                      {
                                        loading ? <div><Spin indicator={<LoadingOutlined spin />} size="small" /></div> : 
                                        <div>
                                            <div><span className="font-semibold">{data?.["deployed_part_count"]?.[0]?.["deployed_count"]}</span> <span className="font-semibold text-primary">out of</span> <span className="font-semibold">{data?.total_part_count}</span></div>
                                        </div>
                                      }
                                    </div> : ""}
                              </div>
                            
                           {activity.children && activity.children.map((child: any, childIndex: number) => (
                            <div onClick={() => handleClick("children", childIndex, activity?.label, activity)} key={childIndex} className="border mb-2 hover:shadow-md border-border rounded-md">
                                <div className="flex w-[100%] px-2 py-2 items-center justify-between">
                                    <div className="w-[40%]">
                                      {child.label}
                                    </div>
                                    <div className="flex gap-4 items-center w-[60%]">
                                      <Progress
                                        percent={child.progress}
                                        strokeColor="#f16253"
                                        showInfo={false}
                                      />
                                      <div>
                                          <span>{round(child.progress)}%</span>
                                      </div>
                                    </div>
                                </div>
                                {Object.keys(active) && active.label === activity?.label && active.key === "children" && active.index === childIndex?
                                    <div className="px-2  py-2 flex justify-end items-center">
                                      {
                                        loading ? <div><Spin indicator={<LoadingOutlined spin />} size="small" /></div> : 
                                        <div>
                                            <div><span className="font-semibold">{data?.["deployed_part_count"]?.[0]?.["deployed_count"]}</span> <span className="font-semibold text-primary">out of</span> <span className="font-semibold">{data?.total_part_count}</span></div>
                                        </div>
                                      }
                                    </div> : ""}
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