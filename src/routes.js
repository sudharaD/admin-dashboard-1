
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserList";
import TableList from "views/Booked";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import FavouriteCars from "./views/FavouriteCars";
import Login from "./views/Login";
import NewUser from "./views/NewUser";
import CarList from "./views/CarList";

const dashboardRoutes = [
  
  
  {
    path: "/main",
    name: "Main Screen Management",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Management",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/hotel",
    name: "Hotel Management",
    icon: "nc-icon nc-circle-09",
    component: CarList,
    layout: "/admin",
  },
  {
    path: "/vehicle",
    name: "Vehicle Management",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events Management",
    icon: "nc-icon nc-notes",
    component: FavouriteCars,
    layout: "/admin",
  },
  
  {
    path: "/travel-equipment",
    name: "Travel Equipment Rent Shop Management",
    icon: "nc-icon nc-paper-2",
    component: NewUser,
    layout: "/admin",
  },
  
  
];

export default dashboardRoutes;
