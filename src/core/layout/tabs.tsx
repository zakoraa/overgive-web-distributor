import { ReactNode } from "react";
import {
  LayoutDashboard,
  UserPlus,
  LogOut,
  HandHeart,
  Package,
  User,
} from "lucide-react";

export type TabItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

export const tabs: TabItem[] = [
  {
    id: "assignment",
    label: "Penugasan Distribusi",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "account",
    label: "Informasi Akun",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: "logout",
    label: "Logout",
    icon: <LogOut className="h-5 w-5 text-red-500" />,
  },
];
