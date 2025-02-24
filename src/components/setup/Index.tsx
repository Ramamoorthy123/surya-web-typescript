import { setupList } from "../constant";
import CardComponent from "../shared/cardcomponent";

const Index = () => {

    return (
        <div className="p-8">
            <div className="text-xl font-bold pb-8">
                Setup
            </div>
            <div className="flex flex-wrap gap-16">
                {setupList?.map(( item: any, index: number) => {
                    return <CardComponent key={index} data={item} />
                })}
            </div>
        </div>
       
    )
}

export default Index;