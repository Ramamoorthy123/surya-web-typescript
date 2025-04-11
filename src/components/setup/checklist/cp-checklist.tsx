import { useAtom } from "jotai";
import SidebarComponent from "./sidebar";
import setupAtoms, { getcpChecklist } from "../../../atoms/setup/setup";
import { useEffect, useState } from "react";
import ChecklistForm from "./FormComponent";

const Index = () => {
    const  [data] = useAtom(setupAtoms);
    const [, setcpChecklist] = useAtom(getcpChecklist);
    const [loader, setLoader] = useState(false)

    const initialFetch = async () => {
        setLoader(true)
        try {
            await setcpChecklist('')
        } catch(error) {
            console.log(error)
        } finally {
            setLoader(false) 
        }
    }

    useEffect(() => {
        initialFetch()
    // eslint-disable-next-line
    }, [])
    console.log(loader,data, 'calling')
    return (
        <div className="flex gap-4 pb-0 p-8">
            <div className="w-[25%]">
                <SidebarComponent 
                    data={data?.cpChecklist} 
                    loader={loader} 
                    title={'cp-checklist'}
                />
            </div>
            <div style={{ borderLeft: "1px solid #e5e7eb" }} className="w-[75%] px-8">
                <ChecklistForm />
            </div>
        </div>
    )
}

export default Index;