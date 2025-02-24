import { RouteObject } from "react-router-dom";
import Report from "../../../container/report/index"
import Summary from "../../../container/report/summary"


const reportRoute: RouteObject[] = [
  {
    path: "reports",
    element: <Report />,
  },
  {
    path: "reports/summary",
    element: <Summary />,
  }
];

export default reportRoute;
