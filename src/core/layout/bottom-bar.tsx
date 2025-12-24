"use client";

import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { LogOut, Package, User } from "lucide-react";

type BottomBarProps = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const BottomBar = ({ activeTab, setActiveTab }: BottomBarProps) => {
  const pathname = usePathname();

  const menus = [
    { href: "/", label: "Tugas", icon: Package, id: "assignment" },
    { href: "/?tab=account", label: "Akun", icon: User, id: "account" },
    { href: "#", label: "Keluar", icon: LogOut, id: "logout" },
  ];

  return (
    <nav className="bg-card-background fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 md:hidden">
      <div className="flex h-16 items-center justify-around">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = activeTab === menu.id;

          return menu.id === "logout" ? (
            <button
              key={menu.id}
              onClick={() => setActiveTab("logout")}
              className="flex flex-col items-center gap-1 text-xs text-red-500 transition-colors hover:text-red-600"
            >
              <Icon className="h-6 w-6" />
              <span>{menu.label}</span>
            </button>
          ) : (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              <Icon className="h-6 w-6" />
              <span>{menu.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomBar;
