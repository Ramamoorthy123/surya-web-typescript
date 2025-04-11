import { useState } from "react";
import Header from "./header";
import LayoutComponent from "./layoutcomponent";

const Index = (props: any) => {
    const { data, loader, active } = props;
    const { svgMap, projectList } = data;
    const project_id = localStorage.getItem("project_id");
    const project_name = projectList.find((item: any) => item.id === parseInt(project_id ?? "0"));
    

    return (
        <div>
            <Header 
                projectList={projectList} 
                loader={loader}
                title={active}
            />
            <LayoutComponent 
                loader={loader}
                svgMap={svgMap} 
                project_name={project_name}
                scale={Number(project_name?.svg_dimension?.web?.web_svg_initial_scale) * 2}
            />
        </div>
    )
}

export default Index;