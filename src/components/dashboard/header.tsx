import { Button, Popover, Skeleton } from 'antd';
import ConstructionProgress from './constructionprogress'
import { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Header = (props: any) => {
    const { loader, title } = props;
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>('Mechanical Progress');
    const navigate = useNavigate();
  
    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
    };

    const handleClick = (data: string) => {
        setActive(data)
        if(data === 'Logistics Progress') {
            navigate('logistics-manage')
        }
    }

    const getContent = () => {
        return (
            <div>
               {['Mechanical Progress','Logistics Progress'].map((item: string, index: number) => {
                return <div key={index} onClick={() =>handleClick(item)} className='py-1 rounded-md font-[500] cursor-pointer px-2 hover:bg-[#fff2f1] hover:text-[#f16253]'>{item}</div>
               })} 
            </div>
        )
    }
    
    return (
        <div className='flex justify-between items-center mb-4 flex-wrap gap-4' >
            <div>
                {loader ? <Skeleton.Button style={{ width: '280px' }} active={false} size={'default'} shape={'default'} block={false} /> :
                <div className='text-xl font-semibold'>Construction - {title}</div>}
            </div>
            {/* <ConstructionProgress  
                construction={construction} 
                progressList={progressList}
                partList={partList}
                loader={loader}
                currentCount={currentCount}
            /> */}
            <div className='flex gap-8'>
                <Button type='primary' className='font-[600]'>Select Blocks</Button>
                <Popover
                    content={getContent()}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement='bottom'
                >
                    <Button type="primary" className='font-[600]'>
                        <div className='flex items-center gap-4 '>
                            <div> {active}</div>
                            <div>
                              {open ? <BsChevronUp className='text-white font-[600]' /> : <BsChevronDown className='text-white font-[600]' />}
                            </div>
                        </div>
                    </Button>
                </Popover>
            </div>
        </div>
    );
};

export default Header;
