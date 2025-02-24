import { Button, Checkbox, Modal, Popover, Table } from 'antd';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { fetchbomdetails } from '../../atoms/Dashboard/dashboard';
import { columns } from '../dashboard/constant';
import { constructTableColumns } from '../../service/shared/helper';
import { startCase } from 'lodash';
import { DownloadOutlined } from '@ant-design/icons';


const defaultCheckedList = columns.map((item: any) =>  {
    if(!item.hidden) {
        return item?.key
    }
    return item
});

const BomModalComponent= (props: any) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { open, setIsOpen} = props;
    const [loader, setLoader] = useState<boolean>(false);
    const [, setBomList] = useAtom(fetchbomdetails);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const { data } = props;
    const [colValue, setColValue] = useState<any[]>([])

    const fetchData = async () => {
        setLoader(true)
        try {
            await setBomList('')
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
        if(columns?.length) {
            setColValue(columns)
        }
    // eslint-disable-next-line
    }, [])

    const handleOpenChange = () => {
        setVisible(!visible)
    }  
  
  
  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const updatedColumns = columns.map((item: any) => {
        return {
            ...item,
            hidden: !checkedList.includes(item.key) 
        };
    });
    setColValue(updatedColumns);
  }, [checkedList])

  const onChange = (key: string) => {
    if (checkedList.includes(key)) {
      setCheckedList(checkedList.filter((item: string) => item !== key));
    } else {
      setCheckedList([...checkedList, key]);
    }
  };

  const testingData = (value: any) => {
    return value?.map((item: any) => item?.part_name)
  }
  
  const getColumnsList = (data: any[]) => {
    return (
        <div className='flex flex-col p-1'>
            {data?.map((item: any, index: number) => {
                return (
                <div className='py-1 text-lg'>
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

 
  return (
    <div>
        <Modal 
            style={{ width: '90vw', height: '650px'}}
            title="Bill of Materials - Project" 
            open={open} 
            footer={false} 
            onCancel={handleCancel}
            className='bom-modal'
        >
            <div className='flex px-8 gap-8 justify-end'>
                <Button>
                    <div className='flex gap-2'>
                        <div><DownloadOutlined /></div>
                        <div>Download</div>
                    </div>
                </Button>
                <Popover
                    content={
                        <div style={{width: '200px'}}>
                            <div className='h-[100%] max-h-[300px] overflow-auto'>{getColumnsList(columns)}</div>
                        </div>
                    }
                    title="Columns List"
                    trigger="click"
                    open={visible}
                    onOpenChange={handleOpenChange}
                    overlayClassName="custom-popover"
                    placement="bottom"
                >
                    <Button>Columns</Button>
                </Popover>
            </div>
           
                <Table 
                    columns={constructTableColumns(colValue, testingData(data))} 
                    dataSource={data} 
                    pagination={false}
                    scroll={{ y: 100 * 5 }}
                    style={{ marginTop: '16px'}}
                    loading={loader}
                />
        </Modal>
    </div>
     
  );
};

export default BomModalComponent;