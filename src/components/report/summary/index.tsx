import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover, Table } from "antd";
import { useEffect, useState } from "react";
import { startCase } from "lodash";
import { useAtom } from "jotai";
import { activityList, addProgressToActivities } from "../../../service/helper";
import { constructSummaryTableColumns } from "../../../service/shared/helper";
import { useNavigate } from "react-router-dom";
import reportsAtoms, { fetchSummaryList, getActivity, getConstructionProgressList } from "../../../atoms/reports/reports";

const Index = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [checkedList, setCheckedList] = useState<any[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [colValue, setColValue] = useState<any[]>([]);
    const [, setConstruction] = useAtom(getActivity);
    const [, setProgress] = useAtom(getConstructionProgressList);
    const [, setData] = useAtom(fetchSummaryList);
    const [data] = useAtom(reportsAtoms);
    const [list, setList] = useState<any[]>([]);
    const { constructionList, progressList } = data || {}; 
    const { construction } = constructionList || {}; 
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableHeight, setTableHeight] = useState<number>(0);
    const navigate = useNavigate();

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
        setLoader(true);
        try {
            await setData({ activity_type: "construction",is_summary: true})
            await setConstruction('');
            await setProgress('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (construction) {
            const temp = activityList(construction);
            const updatedList = addProgressToActivities(temp, progressList || []);
            setList(updatedList);

            const result = convertToNewFormat(updatedList);
            const defaultCheckedList = result.map((item: any) => item?.key && !item.hidden ? item.key : null).filter(Boolean); // Handle null items
            setCheckedList(defaultCheckedList);

            const updatedColumns = result.map((item: any) => {
                if (!item || !item.key) return null; 
                return {
                    ...item,
                    hidden: !defaultCheckedList.includes(item.key)
                };
            }).filter(Boolean);
            
            updatedColumns.unshift({
                key: 0,
                value: "blocks",
                hidden: false,
                parent: true
            });

            setColValue(updatedColumns);
        }
    }, [construction, progressList]); 

    useEffect(() => {
        if(data?.summaryData) {
            const value = Object.values(data?.summaryData)?.map(blockActivities => {
                const block = blockActivities[0]; 
                const result: any = {
                    block_id: block.block_id,
                    block_name: block.block_name,
                };
            
                blockActivities.forEach((activity: any) => {
                    const key = activity.activity_name.toLowerCase().replace(/\s+/g, '_'); 
                    result[key] = {
                        progress: activity.progress,
                        deployed_count: activity.deployed_count,
                        total_count: activity.total_count,
                        activity_id: activity.activity_id,
                    };
                });
            
                return result;
            });
        
            setTableData(value)
        }
    }, [data])

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []); 

    useEffect(() => {
        const updatedColumns = convertToNewFormat(list)?.map((item: any) => {
            return {
                ...item,
                hidden: !checkedList.includes(item.key) 
            };
        });
        updatedColumns.unshift({
            key: 0,
            value: "blocks",
            hidden: false,
            parent: true
        });
        setColValue(updatedColumns);
      }, [checkedList, list])

    const onChange = (key: number) => {
        setCheckedList(prevList => 
            prevList.includes(key) 
            ? prevList.filter((item: number) => item !== key) 
            : [...prevList, key]
        );
    };

    const handleOpenChange = () => {
        setVisible(!visible);
    };

    const getColumnsList = (data: any[]) => {
        return (
            <div className="flex flex-col p-1">
                {data?.map((item: any, index: number) => {
                    if (!item?.key || !item?.value) return null; 
                    return (
                        <div key={index} className="py-1 text-lg">
                            <Checkbox
                                checked={checkedList.includes(item.key)}
                                onChange={() => onChange(item.key)}
                            >
                                {startCase(item.value)}
                            </Checkbox>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleClick = () => {
        setIsEdit(!isEdit);
    };

    const convertToNewFormat = (arr: any) => {
        const result: any = [];
      
        arr.forEach((item: any) => {
          result.push({
            value: item?.label?.toLowerCase().replace(/\s+/g, '_'),
            key: item.id,
            children: ["progress", "counts"],
            hidden: false,
            parent: true,  
          });
      
          if (item.children && item.children.length > 0) {
            item.children.forEach((child: any) => {
              result.push({
                value: child?.label?.toLowerCase().replace(/\s+/g, '_'),
                key: child.id,
                children: ["progress", "counts"],
                hidden: false,
                parent: false,  
              });
            });
          }
        });
      
        return result;
      };

   console.log(checkedList,'calling')
    return (
        <div className="px-8 pt-8">
            <div className="flex items-center justify-between">
                <div className="flex gap-8 cursor-pointer font-semibold text-xl">
                    <div onClick={() => navigate('/reports')}><ArrowLeftOutlined /></div>
                    <div>Summary</div>
                </div>
                <div className="flex gap-4 items-center">
                    {!isEdit ? (
                        <Button onClick={handleClick} className="font-[500]" type="primary">Edit</Button>
                    ) : (
                        <div className="flex gap-4 items-center">
                            <Button className="font-[500]" onClick={handleClick}>Cancel</Button>
                        </div>
                    )}
                    <Popover
                        content={
                            <div style={{ width: '200px' }}>
                                <div className="h-[100%] max-h-[300px] overflow-auto">{getColumnsList(convertToNewFormat(list))}</div>
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
                    columns={constructSummaryTableColumns(colValue)}
                    dataSource={tableData}
                    pagination={false}
                    scroll={{ x: 'max-content', y: tableHeight }} 
                    style={{ marginTop: '16px' }}
                    loading={loader}
                    rowClassName="bom-table-row"
                />
            </div>
        </div>
    );
};

export default Index;
