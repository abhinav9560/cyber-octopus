import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";

import TechnologyList from "views/technology/list";
import ExpertList from "views/experts/list";
import CustomerList from "views/customer/list";
import TemplateList from "views/template/list";
import CmsList from "views/cms/list";
import FaqList from "views/faq/list";
import QuestList from "views/quest/list";
import LawList from "views/law/list"

import GlobalAdd from "views/global/index";

export const sidebarRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/insights",
    name: "Insights",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/quests",
    name: "Quests",
    icon: "nc-icon nc-circle-09",
    component: QuestList,
    layout: "/admin",
  },
  {
    path: "/law",
    name: "Cyber Law",
    icon: "nc-icon nc-circle-09",
    component: LawList,
    layout: "/admin",
  },
  {
    path: "/attack",
    name: "Cyber Attacks",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  // {
  //   path: "/payments",
  //   name: "Payments",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/technology",
    name: "Technology",
    icon: "nc-icon nc-circle-09",
    component: TechnologyList,
    layout: "/admin",
  },
  {
    path: "/expert",
    name: "Expert",
    icon: "nc-icon nc-circle-09",
    component: ExpertList,
    layout: "/admin",
  },
  {
    path: "/customer",
    name: "Customer",
    icon: "nc-icon nc-circle-09",
    component: CustomerList,
    layout: "/admin",
  },
  {
    path: "/template",
    name: "Template",
    icon: "nc-icon nc-circle-09",
    component: TemplateList,
    layout: "/admin",
  },
  {
    path: "/cms",
    name: "CMS",
    icon: "nc-icon nc-circle-09",
    component: CmsList,
    layout: "/admin",
  },
  {
    path: "/faq",
    name: "FAQ",
    icon: "nc-icon nc-circle-09",
    component: FaqList,
    layout: "/admin",
  },
  {
    path: "/inbox",
    name: "Inbox",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/global",
    name: "Global Settings",
    icon: "nc-icon nc-circle-09",
    component: GlobalAdd,
    layout: "/admin",
  },
];
