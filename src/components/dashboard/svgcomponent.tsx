import Header from "./header";
import LayoutComponent from "./layoutcomponent";

const Index = (props: any) => {
    const { data, loader } = props;
    const { constructionList, partList, progressList, currentCount, svgMap, projectList } = data,
    { construction } = constructionList;
    const project_id = localStorage.getItem("project_id");
    const project_name = projectList.find((item: any) => item.id === parseInt(project_id ?? "0"));
    

    return (
        <div>
            <Header 
                construction={construction} 
                progressList={progressList} 
                partList={partList}
                loader={loader}
                currentCount={currentCount}
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