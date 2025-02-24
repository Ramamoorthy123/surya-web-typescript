import { RouteObject } from "react-router-dom";
import Setup from "../../../container/setup";
import CPChecklist from "../../../container/setup/CP-Checklist";
import QCChecklist from "../../../container/setup/QC-Checklist";
import BillOfMaterial from "../../../container/setup/BillOfMaterial";


const setpRoute: RouteObject[] = [
    {
        path: "setup",
        element: <Setup />,
    },
    {
        path: "setup/cp-checklist",
        element: <CPChecklist />,  
    },
    {
        path: "setup/qc-checklist",
        element: <QCChecklist />,  
    },
    {
        path: "setup/bill-of-material",
        element: <BillOfMaterial />,  
    }
]

export default setpRoute;
