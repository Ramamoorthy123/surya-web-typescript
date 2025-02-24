import React, { useEffect, useRef, useState } from 'react';
import { Input, Popover, Tooltip } from 'antd';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { getRandomHexColor } from '../../service/helper';

interface propsType {
  list: any[]
}

const ProjectList = (props: propsType) => {
  const { list } = props;
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [color, setColor] = useState('');
  const [, setActive] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); 
  const textRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const [isEllipsis, setIsEllipsis] = useState<boolean[]>([]); 
  const [current, setCurrent] = useState<any>({})

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const projectId = localStorage.getItem('project_id')
    if (list.length) {
      setFilteredData(list); 
      if(!projectId) {
        localStorage.setItem("project_id", list?.[0]?.id);
      }
    }
    if(projectId && list.length) {
      const value = list.find((item: any) => item?.id === parseInt(projectId));
      setCurrent(value)
    }
  }, [list]);

  useEffect(() => {
    const temp = getRandomHexColor();
    setColor(temp);
  }, [open]);


  useEffect(() => {
    const newEllipsisStates = filteredData.map((_, index) => {
      const element = textRefs.current[index];
      return element ? element.scrollWidth > element.offsetWidth : false;
    });
    setIsEllipsis(newEllipsisStates);
  }, [filteredData]);

  const handleClickList = (ind: number, data: any) => {
    setActive(ind);
    localStorage.setItem("project_id", data?.id);
    window.location.reload()
    hide();
  };

  const getProjectList = () => {
    return filteredData?.map((item, index) => {
      return (
        <div onClick={() => handleClickList(index, item)} key={index}>
          <Tooltip
            style={{background: "#fffff"}}
            title={isEllipsis[index] ? item?.name : ''} 
          >
            <div
              ref={(el) => (textRefs.current[index] = el)}
              className={`font-[400] cursor-pointer rounded-md mb-2 px-2 py-2 hover:bg-[#f16253] hover:font-[500] hover:text-white ${current?.id === item?.id ? "bg-[#f16253] font-[500] text-white" : ""}`}
              style={{
                maxWidth: '240px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item?.name}
            </div>
          </Tooltip>
        </div>
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setFilteredData(list);
    } else {
      const filtered = list.filter((project) =>
        project.name.toLowerCase().includes(value)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <Popover
      content={
        <div style={{width: '260px'}}>
          <div className='px-2 py-2'>
            <Input value={searchTerm} placeholder='search project...' onChange={handleChange} />
          </div>
          <div className='h-[100%] max-h-[300px] overflow-auto'>{getProjectList()}</div>
        </div>
      }
      title="Project List"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      overlayClassName="custom-popover"
      placement="bottom"
    >
      <div className='px-2 py-1 flex justify-between items-center w-[250px] rounded-lg border border-gray-300 cursor-pointer'>
        <div
          style={{
            maxWidth: "210px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className="text-black flex gap-4 items-center font-semibold"
        >
          <div className='rounded-full relative w-[32px] h-[32px]' style={{ border: `2px solid ${color}` }}>
            <span className='absolute top-[-18px] left-[11px]' style={{ color: `${color}` }}>
              {current?.name?.charAt(0)}
            </span>
          </div>
          <div className='flex flex-col gap-1' style={{ lineHeight: 1.5, maxWidth: '150px', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", }}>
            <div>{current?.name}</div>
            <div className='text-sm text-gray-400'>{current?.project_number}</div>
          </div>
        </div>
        <div>
          {open ? <BsChevronUp className='text-gray-500' /> : <BsChevronDown className='text-gray-500' />}
        </div>
      </div>
    </Popover>
  );
};

export default ProjectList;
