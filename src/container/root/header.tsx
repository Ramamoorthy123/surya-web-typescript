import { Menu } from 'antd';
import { HeaderList } from './constant';
import AvatarComponent from './avathar'
import ProjectList from './projectlist';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import dashboardAtoms, { getProject } from '../../atoms/Dashboard/dashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { toLower } from 'lodash';

const Headers = () => {
    const [data] = useAtom(dashboardAtoms);
    const [, setProjectList] = useAtom(getProject);
    const navigate = useNavigate();
    const params = useLocation();
    const [active, setActive] = useState<string>('1')


    useEffect(() => {
        const init = async () => {
            try {
                await setProjectList('');
            } catch (err) {
                console.log(err);
            }
        };
    
        init();
    }, [setProjectList]);

    const handleClick = (event: any) => {
        const clickedKey = event.key; 
        const data = HeaderList?.find((item: any) => item?.key === Number(clickedKey));
        if(data) {
            navigate(`${data?.path}`)
        }
    }

    useEffect(() => {
        const data = HeaderList?.find((item: any) => toLower(item?.label) === toLower(params?.pathname?.split('/')?.[1]));
        setActive(String(data?.key))
    }, [params])

    return(
            <div className='w-full px-[24px] flex gap-8 bg-[#ffffff] items-center'>
                <div className='min-w-[175px]'>
                    <img src="/suryalogo.svg" alt="logo" style={{ width: '175px' }} />
                </div>
                <div className='w-[65vw]'>
                    <Menu
                        className='text-lg font-[600] hover:text-[#f16253]'
                        theme="light"
                        mode="horizontal"
                        selectedKeys={[active]}
                        defaultSelectedKeys={['1']}
                        items={HeaderList}
                        style={{ flex: 1, minWidth: 0 }}
                        onClick={handleClick}
                    />
                </div>
                <div className='flex gap-8 w-[calc(35wv-175px)] items-center'>
                        <ProjectList list={data?.projectList} />
                        <AvatarComponent />
                </div>
            </div>
    )
}

export default Headers;