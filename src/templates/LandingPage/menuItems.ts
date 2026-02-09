import type { menuItemType } from "@/components/NavBar/MenuListContainer";

const leftMenuItems: menuItemType[] = [
  { label: "Beranda", href: "#home" },
  { label: "Fitur", href: "#features" },
  { label: "Paket", href: "#plans" },
];

const rightMenuItems: menuItemType[] = [
  { label: "Daftar", href: "/register" },
  { label: "Masuk", href: "/login" },
];

export { leftMenuItems, rightMenuItems };
