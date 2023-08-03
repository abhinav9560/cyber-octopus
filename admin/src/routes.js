// Auth
import Login from "views/auth/login";
import Forgot from "views/auth/forgot";
import Reset from "views/auth/reset";

// Temp
// import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import ComingSoon from "views/comingSoon.js";

// Profile
import Profile from "views/profile/profile";
import ChangePassword from "views/profile/changepassword";

// Technology
import TechnologyList from "./views/technology/list";
import TechnologyAdd from "./views/technology/add";

// Expert
import ExpertList from "./views/experts/list";
import ExpertAdd from "./views/experts/add";

// Customer
import CustomerList from "./views/customer/list";
import CustomerAdd from "./views/customer/add";

// Template
import TemplateList from "./views/template/list";
import TemplateAdd from "./views/template/add";

// CMS
import CmsList from "./views/cms/list";
import CmsAdd from "./views/cms/add";

// FAQ
import FaqList from "./views/faq/list";
import FaqAdd from "./views/faq/add";

// Attack
import AttackList from "./views/attack/list";
import AttackAdd from "./views/attack/add";

// Law
import LawList from "./views/law/list";
import LawAdd from "./views/law/add";

// Quest
import QuestList from "./views/quest/list";
import QuestAdd from "./views/quest/add";

// Quest
import ContactList from "./views/inbox/list";
import ContactAdd from "./views/inbox/add";

import GlobalAdd from "./views/global/index";

import Dashboard from "./views/dashboard/index";
import Insights from "./views/dashboard/insights";

export const mainRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/insights",
    name: "Insights",
    component: Insights,
  },
  {
    path: "/quests",
    name: "Quests",
    component: QuestList,
  },
  {
    path: "/quests/add",
    name: "Quests",
    component: QuestAdd,
  },
  {
    path: "/quests/edit/:id",
    name: "Quests",
    component: QuestAdd,
  },
  {
    path: "/awareness",
    name: "Awareness",
    component: ComingSoon,
  },
  {
    path: "/cyber-intel",
    name: "Cyber Intel",
    icon: "nc-icon nc-circle-09",
    component: ComingSoon,
    layout: "/admin",
  },
  {
    path: "/payments",
    name: "Payments",
    component: ComingSoon,
  },
  {
    path: "/users",
    name: "Users",
    component: ComingSoon,
  },
  {
    path: "/inbox",
    name: "Inbox",
    component: ContactList,
  },
  {
    path: "/inbox/add",
    name: "Inbox",
    component: ContactAdd,
  },
  {
    path: "/inbox/edit/:id",
    name: "Inbox",
    component: ContactAdd,
  },
  {
    path: "/settings",
    name: "Settings",
    component: ComingSoon,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: ChangePassword,
  },
  {
    path: "/technology",
    name: "Technology",
    component: TechnologyList,
  },
  {
    path: "/technology/add",
    name: "Technology",
    component: TechnologyAdd,
  },
  {
    path: "/technology/edit/:id",
    name: "Technology",
    component: TechnologyAdd,
  },
  {
    path: "/expert",
    name: "Expert",
    component: ExpertList,
  },
  {
    path: "/expert/add",
    name: "Expert",
    component: ExpertAdd,
  },
  {
    path: "/expert/edit/:id",
    name: "Expert",
    component: ExpertAdd,
  },
  {
    path: "/customer",
    name: "Customer",
    component: CustomerList,
  },
  {
    path: "/customer/add",
    name: "Customer",
    component: CustomerAdd,
  },
  {
    path: "/customer/edit/:id",
    name: "Customer",
    component: CustomerAdd,
  },
  {
    path: "/template",
    name: "Template",
    component: TemplateList,
  },
  {
    path: "/template/add",
    name: "Template",
    component: TemplateAdd,
  },
  {
    path: "/template/edit/:id",
    name: "Template",
    component: TemplateAdd,
  },
  {
    path: "/cms",
    name: "CMS",
    component: CmsList,
  },
  {
    path: "/cms/add",
    name: "CMS",
    component: CmsAdd,
  },
  {
    path: "/cms/edit/:id",
    name: "CMS",
    component: CmsAdd,
  },
  {
    path: "/faq",
    name: "Faq",
    component: FaqList,
  },
  {
    path: "/faq/add",
    name: "Faq",
    component: FaqAdd,
  },
  {
    path: "/faq/edit/:id",
    name: "Faq",
    component: FaqAdd,
  },

  {
    path: "/attack",
    name: "Attack",
    component: AttackList,
  },
  {
    path: "/attack/add",
    name: "Attack",
    component: AttackAdd,
  },
  {
    path: "/attack/edit/:id",
    name: "Attack",
    component: AttackAdd,
  },
  {
    path: "/law",
    name: "Attack",
    component: LawList,
  },
  {
    path: "/law/add",
    name: "Attack",
    component: LawAdd,
  },
  {
    path: "/law/edit/:id",
    name: "Attack",
    component: LawAdd,
  },
  {
    path: "/global",
    name: "Global Setting",
    component: GlobalAdd,
  },
];

export const authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: Login,
    layout: "/Auth",
  },
  {
    path: "/forgot",
    name: "Forgot",
    icon: "nc-icon nc-chart-pie-35",
    component: Forgot,
    layout: "/Auth",
  },
  {
    path: "/reset-password/:id",
    name: "Reset Password",
    icon: "nc-icon nc-chart-pie-35",
    component: Reset,
    layout: "/Auth",
  },
];
