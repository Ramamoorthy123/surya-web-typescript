import { RouteObject } from "react-router-dom";
import Settings from "../../../container/settings/index"

const settingRoute: RouteObject[] = [
  {
    path: "settings",
    element: <Settings />,
  }
];

export default settingRoute;
