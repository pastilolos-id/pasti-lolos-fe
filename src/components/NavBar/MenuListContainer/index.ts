type menuItemType = {
  label: string;
  href: string;
};

type menuListContainerType = {
  leftMenu: menuItemType[];
  rightMenu: menuItemType[];
};

export { default as MobileMenuList } from "./MobileMenuList";
export type { menuListContainerType, menuItemType };
