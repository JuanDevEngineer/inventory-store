import { v } from "../styles/variables";
import {
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";

export const UserDropdownData = [
  {
    text: "Mi perfil",
    icon: <v.iconUser/>,
    type: "profile",
  },
  {
    text: "Configuracion",
    icon: <v.iconSettings/>,
    type: "settings",
  },
  {
    text: "Cerrar sesión",
    icon: <v.iconSignOut/>,
    type: "signout",
  },
];

// sidebar links
export const LinksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Kardex",
    icon: <v.iconCategories />,
    to: "/kardex",
  },
  {
    label: "Reportes",
    icon: <v.iconReports />,
    to: "/reports",
  },

];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/settings",
  },

];
// themes
export const ThemesData = [
  {
    icon: "🌞",
    description: "light",

  },
  {
    icon: "🌚",
    description: "dark",

  },
];

// settings modules
export const SettingsModulesData =[
  {
    title:"Productos",
    subtitle:"registra tus productos",
    icon:"https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
    link:"/settings/products",

  },
  {
    title:"Personal",
    subtitle:"ten el control de tu personal",
    icon:"https://i.ibb.co/5vgZ0fX/hombre.png",
    link:"/settings/users",

  },

  {
    title:"Tu empresa",
    subtitle:"configura tus opciones básicas",
    icon:"https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link:"/settings/company",

  },
  {
    title:"Categoria de productos",
    subtitle:"asigna categorias a tus productos",
    icon:"https://i.ibb.co/VYbMRLZ/categoria.png",
    link:"/settings/categories",

  },
  {
    title:"Marca de productos",
    subtitle:"gestiona tus marcas",
    icon:"https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link:"/settings/brands",

  },

]
// user types
export const UserTypeData = [
  {
    description: "empleado",
    icon: "🪖",
  },
  {
    description: "administrador",
    icon: "👑",
  },
];
// document types
export const DocumentTypeData = [
  {
    description: "Dni",
    icon: "🪖",
  },
  {
    description: "Libreta electoral",
    icon: "👑",
  },
  {
    description: "Otros",
    icon: "👑",
  },
];