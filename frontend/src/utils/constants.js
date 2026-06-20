import {
  FiHome,
  FiBook,
  FiFileText,
  FiMic,
  FiBarChart2,
  FiUser,
  FiSettings,
} from "react-icons/fi";

export const SIDEBAR_MENU = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },
  {
    name: "Study Guide",
    path: "/study-guide",
    icon: FiBook,
  },
  {
    name: "PDF Learning",
    path: "/pdf-learning",
    icon: FiFileText,
  },
  {
    name: "Mock Viva",
    path: "/mock-viva",
    icon: FiMic,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: FiBarChart2,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: FiUser,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];