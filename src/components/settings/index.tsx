import { useAtom } from "jotai";
import Header from "./Header";
import settingsAtoms from "../../atoms/settings/setting";
import CardComponent from "./cardcomponent";

const Index = () => {
    const [data] = useAtom(settingsAtoms);
    return (
        <div>
            <Header  data={data?.userDetails}  title={'Profile & Settings'} />
            <div className="p-8 flex gap-8">
                <CardComponent 
                    title={'Company Details'} 
                    data={data?.userDetails} 
                />
                <CardComponent 
                    title={'Key Account Manager Details'} 
                    data={data?.userDetails} 
                />
            </div>
        </div>
    )
}

export default Index;