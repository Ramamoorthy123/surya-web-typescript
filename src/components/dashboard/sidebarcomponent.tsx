import { useState } from "react";
import BomComponent from "./bomcomponent";
import ConstructionCard from "./constructioncard";
import TrackerType from "./trackertype";
import BomModalComponent from "../shared/BomModalComponent";

const SidebarComponent = (props: any) => {
    const { data, loader, setCurrentSelection } = props;
    const { constructionList, progressList, trackerList } = data;
    const { construction } = constructionList;
    const [open, setIsOpen] = useState<boolean>(false);

    return(
        <div>
          <BomComponent setIsOpen={setIsOpen} open={open} />
          <ConstructionCard 
              title={'Construction Progress'}
              loader={loader} 
              construction={construction}
              progressList={progressList}
              setCurrentSelection={setCurrentSelection}
          />
          <TrackerType trackerList={trackerList} loader={loader} />
          <BomModalComponent 
            open={open} 
            setIsOpen={setIsOpen} 
            data={data?.bomList}
         />
        </div>
    )
}

export default SidebarComponent;
