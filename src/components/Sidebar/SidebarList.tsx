import { AiOutlineHome } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { IoMdSwitch } from "react-icons/io";
import { BsCalendar3, BsPieChartFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp, IoIosMap } from "react-icons/io";
import { FaWpforms } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { CgMenuLeft } from "react-icons/cg";

interface IPListSidebar {
  title?: string;
  icon?: any;
  name?: string;
  color?: any;
  path?: string;
  iconClose?: any;
  iconOpen?: any;
  subNav?: any;
}

export const SidebarList: IPListSidebar[] = [
  {
    title: "Dashboard",
    icon: <AiOutlineHome />,
    color: "#0a48b3",
    name: "dashboard",
    path: "",
    iconOpen: <IoIosArrowDown />,
    iconClose: <IoIosArrowUp />,
    subNav: [
      {
        title: "DashBoard",
        name: "dashboard",
        path: "/dashboard",
      },
      {
        title: "Alternative",
        name: "alternative",
        path: "",
      },
    ],
  },
  {
    title: "Example",
    color: "#fc9c90",
    icon: <BiCopy />,
    name: "dashboard",
    path: "",
    iconOpen: <IoIosArrowDown />,
    iconClose: <IoIosArrowUp />,
    subNav: [
      {
        title: "Pricing",
        name: "pricing",
        path: "",
      },
      {
        title: "Login",
        name: "login",
        path: "",
      },
      {
        title: "Look",
        name: "look",
        path: "",
      },
      {
        title: "Timeline",
        name: "timeline",
        path: "",
      },
      {
        title: "Profile",
        name: "profile",
        path: "",
      },
    ],
  },
  {
    title: "Component",
    color: "#27cff2",
    icon: <IoMdSwitch />,
    name: "dashboard",
    path: "",
    iconOpen: <IoIosArrowDown />,
    iconClose: <IoIosArrowUp />,
    subNav: [
      {
        title: "Button",
        name: "button",
        path: "",
      },
      {
        title: "Card",
        name: "card",
        path: "",
      },
      {
        title: "Grid",
        name: "grid",
        path: "",
      },
    ],
  },
  {
    title: "Calendar",
    color: "violet",
    icon: <BsCalendar3 />,
    name: "dashboard",
    path: "",
  },
  {
    title: "Forms",
    color: "#f5365c",
    icon: <FaWpforms />,
    name: "dashboard",
    path: "",
    iconOpen: <IoIosArrowDown />,
    iconClose: <IoIosArrowUp />,
    subNav: [
      {
        title: "Elements",
        name: "element",
        path: "",
      },
      {
        title: "Components",
        name: "components",
        path: "",
      },
    ],
  },
  {
    title: "Table",
    color: "black",
    icon: <CgMenuLeft />,
    name: "dashboard",
    path: "",
  },
  {
    title: "Widget",
    color: "#f5365c",
    icon: <RiShoppingBag3Fill />,
    name: "dashboard",
    path: "",
  },
  {
    title: "Chart",
    color: "blue",
    icon: <BsPieChartFill />,
    name: "dashboard",
    path: "",
  },
  {
    title: "Map",
    color: "green",
    icon: <IoIosMap />,
    name: "dashboard",
    path: "",
    iconOpen: <IoIosArrowDown />,
    iconClose: <IoIosArrowUp />,
    subNav: [
      {
        title: "Google",
        name: "google",
        path: "",
      },
      {
        title: "Vector",
        name: "vector",
        path: "",
      },
    ],
  },
];
