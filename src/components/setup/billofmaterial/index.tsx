import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Checkbox, message, Popover, Table } from "antd";
import { useEffect, useState } from "react";
import { bomcolumns } from "../constant";
import { startCase } from "lodash";
import { useAtom } from "jotai";
import setupAtoms, { fetchActivityList, fetchbomdetails, getActivity, getConstructionProgressList } from "../../../atoms/setup/setup";
import { activityList, addConstructionName, addProgressToActivities } from "../../../service/helper";
import { constructBomTable } from "../../../service/shared/helper";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const defaultCheckedList = bomcolumns.map((item: any) =>  {
    if(!item.hidden) {
        return item?.key
    }
    return item
});

const Index = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [loader, setLoader] = useState<boolean>(false);
    const [colValue, setColValue] = useState<any[]>([]);
    const [, setActivity] = useAtom(fetchActivityList);
    const [, setBomDetails] = useAtom(fetchbomdetails);
    const [, setConstruction] = useAtom(getActivity);
    const [, setProgress] = useAtom(getConstructionProgressList);
    const  [data] = useAtom(setupAtoms);
    const [list, setList] = useState<any[]>([]);
    const { constructionList, progressList } = data,
    { construction } = constructionList;
    const [selected, setSelected] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [btnLoader, setBtnLoader] = useState<boolean>(false);
    const [tableHeight, setTableHeight] = useState<number>(0);
    const navigate = useNavigate()

    const calculateHeight = () => {
        const viewportHeight = window.innerHeight; 
        const offset = 308; 
        const height = viewportHeight - offset;
        setTableHeight(height);
    };

    useEffect(() => {
        calculateHeight(); 
        window.addEventListener('resize', calculateHeight); 

        return () => {
        window.removeEventListener('resize', calculateHeight); 
        };
    }, []);


    const fetchData = async () => {
        setLoader(true)
        try {
            await setBomDetails('')
            await setActivity('')
            await setConstruction('')
            await setProgress('')
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        const updatedColumns = bomcolumns.map((item: any) => {
            return {
                ...item,
                hidden: !checkedList.includes(item.key) 
            };
        });
        setColValue(updatedColumns);
      }, [checkedList])

      useEffect(() => {
        if (construction) {
            const temp = activityList(construction)
            setList(addProgressToActivities(temp, progressList));
        }
    }, [construction,progressList]);

    useEffect(() => {
        fetchData()
        if(bomcolumns?.length) {
            setColValue(bomcolumns)
        }
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(data?.bomList && data?.activityList?.construction) {
            setTableData(addConstructionName(data?.bomList, data?.activityList?.construction))
        }
    }, [data])

    const onChange = (key: string) => {
        if (checkedList.includes(key)) {
          setCheckedList(checkedList.filter((item: string) => item !== key));
        } else {
          setCheckedList([...checkedList, key]);
        }
      };

    const handleOpenChange = () => {
        setVisible(!visible)
    }  

    const getColumnsList = (data: any[]) => {
        return (
            <div className='flex flex-col p-1'>
                {data?.map((item: any, index: number) => {
                    return (
                    <div key={index} className='py-1 text-lg'>
                        <Checkbox 
                            key={index} 
                            checked={checkedList.includes(item.key)} 
                            onChange={() => onChange(item?.key)}
                        >
                            {startCase(item?.value)}
                        </Checkbox>
                    </div>)
                })}
            </div>
        )
      }

      const testingData = (value: any) => {
        return value?.map((item: any) => item?.part_name)
      }

      const handleClick = () => {
        setIsEdit(!isEdit)
      }

      const handleChange = (value: any, record: any, key: string) => {
        let tempData = { ...record };
        tempData[key] = value;
        setTableData(tableData?.map((item:any, index: number) => {
            if(tempData?.bom_id === item?.bom_id) {
                return tempData
            }
            return item
        }))
        if(selected.length) {
            const data = selected?.find((item:any) => item.bom_id === tempData?.bom_id);
            if(data) {
                const valueData = selected?.filter((item:any) => item?.bom_id !== tempData?.bom_id);
                setSelected([...valueData, tempData])
            } else {
                setSelected((prev) => [...prev, tempData])
            }
        } else {
            setSelected([tempData])
        }
      }

      const handleSave = async () => {
        setBtnLoader(true)
        const value = selected.map((item: any) => ({
            distribution: item.distribution,
            installed: item.installed,
            bom_id: item.bom_id
          }));
        try {
            const res = await axiosInstance.post(`/projects/activitymilestone`, value);
            if(res?.data) {
                await setBomDetails('')
                message.success(`${res?.data?.message}`)
            }
        } catch(error) {
            console.log(error)
            message.error("Something went wrong")
        } finally {
            setBtnLoader(false)
            setSelected([])
            setIsEdit(false)
        }
      }

    return (
        <div className="px-8 pt-8">
            <div className="flex items-center justify-between">
                <div className="flex gap-8 cursor-pointer font-semibold text-xl">
                    <div onClick={() => navigate('/setup')}><ArrowLeftOutlined /></div>
                    <div>Bill of Material</div>
                </div>
                <div className="flex gap-4 items-center">
                   {!isEdit ? <Button onClick={handleClick} className="font-[500]" type="primary">Edit</Button>
                    : <div className="flex gap-4 items-center" >
                        <Button className="font-[500]" type="primary" loading={btnLoader} onClick={handleSave}>Save</Button>
                        <Button className="font-[500]" onClick={handleClick}>Cancel</Button>
                    </div>}
                    <Popover
                        content={
                            <div style={{width: '200px'}}>
                                <div className='h-[100%] max-h-[300px] overflow-auto'>{getColumnsList(bomcolumns)}</div>
                            </div>
                        }
                        title="Columns List"
                        trigger="click"
                        open={visible}
                        onOpenChange={handleOpenChange}
                        overlayClassName="custom-popover"
                        placement="bottom"
                    >
                    <Button className="font-[500]">Columns</Button>
                </Popover>
                </div>
            </div>
            <div>
                <Table 
                    columns={constructBomTable(colValue, testingData(addConstructionName(data?.bomList, data?.activityList?.construction)), isEdit, list, handleChange)} 
                    dataSource={tableData} 
                    pagination={false}
                    scroll={{y: tableHeight}}
                    style={{ marginTop: '16px'}}
                    loading={loader}
                    rowClassName={"bom-table-row"}
                />
            </div>
        </div>
    )
}

export default Index;