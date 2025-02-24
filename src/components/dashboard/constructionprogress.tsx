import { Select, Skeleton, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { activityList, addProgressToActivities, calculateWeightedAverageProgress, getChildrenOnly } from '../../service/helper';
import { round, startCase } from 'lodash';
import { useAtom } from 'jotai';
import { fetchCount } from '../../atoms/Dashboard/dashboard';

const { Option } = Select;

const ConstructionProgress = (props: any) => {
    const { construction, progressList, partList, loader, currentCount } = props;
    const [list, setList] = useState<any[]>([]);
    const [percentage, setPercentage] = useState<number>(0);
    const [selectvalue, setSelectValue] = useState<any>('all');
    const [part, setPart] = useState('');
    const [, setCount] = useAtom(fetchCount);
    const [count, setCounts] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if(percentage) {
            setCounts((currentCount?.total_part_count * (percentage / 100)))
        }
    }, [currentCount, percentage])


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

    
    const handleChange = async (value: any) => {
        if(typeof value === 'number') {
            setLoading(true)
            const data = progressList?.find((item: any) => item?.activity_id === value)?.progress;
            const temp = getChildrenOnly(list);
            const itemValue = temp.find((item: any) => item?.id === value);
            await setCount(itemValue)
            setLoading(false)
            setSelectValue(value)
            setPercentage(round(data))
            setPart(partList?.find((item: any) => item.id === itemValue?.part_id)?.part_name)
        } else if(value === 'all') {
            const data = getChildrenOnly(list)
            setPercentage(round(calculateWeightedAverageProgress(data)))
            setSelectValue(value)
            setPart('')
        } else if(value?.split('-')?.[0] === 'parent') {
            setLoading(true)
            const data = list.find((item: any) => item?.id === parseInt(value?.split('-')?.[1]));
            setSelectValue(value)
            await setCount(data)
            setLoading(false)
            setPercentage(round(calculateWeightedAverageProgress(data?.children)))
            setPart(partList?.find((item: any) => item.id === data?.part_id)?.part_name)
        } else {
            setPercentage(0)
            setSelectValue(value)
            setPart('')
        }
    };

    return (
        <div className='flex gap-8 bg-white items-center'>
            <div className='p-2 bg-[#fff2f1] border border-[#f7b5ae] rounded-md'>
                <div className='py-2 text-md font-[500] text-[#878787]'>Construction Progress</div>
                {loader || loading ? <Skeleton.Button style={{ width: '280px' }} active={false} size={'default'} shape={'default'} block={false} /> :
                <div className='flex gap-4 items-center'>
                    <div>
                        <Select
                            value={selectvalue}
                            style={{ width: 200 }}
                            onChange={handleChange}
                            className='activity-select'
                        >
                            <Option  style={{ fontWeight: 500 }} value="none">None Selected</Option>
                            <Option  style={{ fontWeight: 500 }} value="all">OverAll</Option>
                            {list.map((group, index) => (
                                <React.Fragment key={`group-${index}-${group?.id}`}>
                                    <Option 
                                    style={{ fontWeight: 500 }} 
                                    value={`parent-${group.id}`} 
                                    key={`parent-${group.value}-${index}-${group?.id}`}
                                    >
                                        {startCase(group.label)}
                                    </Option>

                                    {group.children?.map((child: any, childIndex: any) => (
                                        <Option 
                                            value={child.id} 
                                            key={`child-${child.value}-${childIndex}-${child?.id}`}
                                            style={{ paddingLeft: '24px' }}
                                        >
                                        {startCase(child.label)}
                                        </Option>
                                    ))}
                                </React.Fragment>
                            ))}

                        </Select>
                    </div>
                    <div style={{ borderLeft:"2px solid #878787" }} className='text-[#f16253] text-md px-2 w-[65px] font-[700]'>{percentage}%</div>
                </div>}
            </div>

            <div className='p-2 bg-[#fff2f1] border border-[#f7b5ae] rounded-md'>
            <div className='py-2 text-md font-[500] text-[#878787]'>Counts</div>
            {loader || loading ? <Skeleton.Button style={{ width: '230px' }} active={false} size={'default'} shape={'default'} block={false} /> :
                <div className='flex gap-4 items-center'>
                    <Tooltip title={part}>
                        <div style={{
                            maxWidth: '150px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            }} className='bg-white font-[500] px-2 py-1 rounded-md border border-[#d9d9d9] min-w-[100px] max-w-[150px]' >
                            {part ? startCase(part) : '-'}
                        </div>
                    </Tooltip>
                    <div style={{ borderLeft:"2px solid #878787" }} className='text-[#f16253] w-[125px] text-md px-2 font-[700]'>
                        { percentage && part ? `${round(count)} / ${currentCount?.total_part_count}` : '-'}
                    </div>
                </div>}
            </div>
        </div>
       
    )
}

export default ConstructionProgress;