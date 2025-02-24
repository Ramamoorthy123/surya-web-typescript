import { Spin } from "antd";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { progressMenu } from "./constant";
import { InfoCircleOutlined } from "@ant-design/icons";

const LayoutComponent = (props: any) => {
  const { svgMap, loader } = props;

  const adjustSvg = (svg: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svg;

    const svgElement = tempDiv.querySelector('svg');

    if (svgElement) {
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');

      if (!svgElement.hasAttribute('viewBox')) {
        const bbox = svgElement.getBBox();
        svgElement.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      }
    }

    return tempDiv.innerHTML; 
  };

  const adjustedSvgMap = adjustSvg(svgMap); 

  return (
    <div 
      className="py-4 relative flex cursor-grab justify-center items-center" 
      style={{ width: '100%', height: 'calc(100vh - 215px)', overflow: 'hidden' }} 
    >
    {loader ? <Spin /> :
      <TransformWrapper
        centerZoomedOut
        initialScale={0.5} 
        minScale={0.5}
        centerOnInit={true}
        limitToBounds={true} 
        wheel={{ step: 20 }} 
      >
        <TransformComponent 
             wrapperStyle={{ height: "100%", width: "100%" }}
        >
          <div
            className="wrapper-component w-full h-full flex justify-center items-center"
            style={{
              width: '100%', 
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: "pointer"
            }}
            dangerouslySetInnerHTML={{ __html: adjustedSvgMap }} 
          />
        </TransformComponent>
      </TransformWrapper>}
      <div className="flex absolute top-0 right-0 flex-col gap-2 p-2 rounded-md border bg-white border-border">
        {progressMenu?.map((item: any, index: number) => {
            return (<div className="w-[140px] flex gap-4 items-center" key={index}>
                <div className={`rounded-full border border-border p-2`} style={{background: `${item?.color}`}}></div>
                <div className="font-[600] text-[#878787]">{item?.label}</div>
            </div>)
        })}
      </div>
      <div className="text-[#9ca3af] font-[600] absolute bottom-4 left-[40%] bg-white">
        <span><InfoCircleOutlined /></span>
        <span className="ml-4">Double click on any block to dive in</span>
      </div>
    </div>
  );
};

export default LayoutComponent;
