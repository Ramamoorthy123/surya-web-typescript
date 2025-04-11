import { useAtom } from "jotai";
import SvgComponent from "./svgcomponent";
import dashboardAtoms, { fetchMapRender, fetchPartsAtom, fetchTrackers, getActivity, getConstructionProgressList } from "../../atoms/Dashboard/dashboard";
import { useEffect, useState } from "react";
import SidebarComponent from "./sidebarcomponent";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [data] = useAtom(dashboardAtoms);
  const [, setActivity] = useAtom(getActivity);
  const [, setProgress] = useAtom(getConstructionProgressList)
  const [, setPart] = useAtom(fetchPartsAtom);
  const [, setTrackers] = useAtom(fetchTrackers);
  const [, setMap]= useAtom(fetchMapRender)
  const [loader, setLoader] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(true);
  const [currentSelection, setCurrentSelection] = useState<string>("")

  const initialCall = async () => {
      setLoader(true)
      try {
         await setActivity('')
         await setTrackers('')
      } catch (error) {
          console.log(error)
      } finally {
          setLoader(false)
      }
  }

  const fetchCall = async() => {
    setLoader(true)
      try {
        await setMap('')
        await setProgress('')
        await setPart('')
      } catch (error) {
          console.log(error)
      } finally {
          setLoader(false)
      }
  }

  useEffect(() => {
      initialCall()
      fetchCall()
      // eslint-disable-next-line
  }, [])

  console.log(currentSelection, 'calling')
  return (
   <div className="w-[100%] relative flex gap-2">
      <div className="w-[65%] p-4" style={{ width: visible ? "65%": "100%", borderRight: "1px solid #cccbcb", height:"calc(100vh - 115px)"}}>
        <SvgComponent active={currentSelection}  data={data} loader={loader} />
      </div>
      {visible ?
      <div className="w-[35%] px-2" style={{ height:"calc(100vh - 115px)", overflow: 'auto' }}>
        <SidebarComponent
            loader={loader} 
            data={data}
            setCurrentSelection={setCurrentSelection}
        /> 
      </div> : ''}
      <div onClick={() => setVisible(!visible)} style={{ right: visible ? '32%' : 0}} className="border bg-white z-10 absolute top-2 w-[32px] border-border cursor-pointer px-2 py-1 rounded-sm">
          {visible ? <RightOutlined /> : <LeftOutlined />}
      </div>
   </div>
  );
};

export default Dashboard;