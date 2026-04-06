import type { IconProps } from "@/components/Icon";

type subMenuItems = {
  title: string;
  href: string;
  icon: IconProps["name"];
};

type menuItemsType = {
  title: string;
  href: string;
  icon: IconProps["name"];
  subMenu?: subMenuItems[];
};

const menuItems: menuItemsType[] = [
  {
    title: "Beranda",
    href: "/home",
    icon: "home",
  },
  {
    title: "Materi",
    href: "/course",
    icon: "course",
    subMenu: [
      {
        title: "BUMN",
        href: "/course/bumn",
        icon: "bumn-wrapped-text",
      },
      {
        title: "CPNS",
        href: "/course/cpns",
        icon: "abdi-negara",
      },
    ],
  },
  {
    title: "Tryout",
    href: "/tryout",
    icon: "tryout",
    subMenu: [
      {
        title: "BUMN",
        href: "/tryout/bumn",
        icon: "bumn-wrapped-text",
      },
      {
        title: "CPNS",
        href: "/tryout/cpns",
        icon: "abdi-negara",
      },
    ],
  },
  {
    title: "Pembelian",
    href: "/purchases",
    icon: "card",
  },
  {
    title: "Aktifitas",
    href: "/activities",
    icon: "activity",
  },
];

export { menuItems, type menuItemsType };
