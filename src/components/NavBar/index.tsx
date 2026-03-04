import {
  DesktopMenuList,
  MobileMenuList,
  type menuListContainerType,
} from "./MenuListContainer";
import NavbarContainer from "./NavBarContainer";

export default async function NavBar({
  leftMenu,
  rightMenu,
}: React.ComponentPropsWithoutRef<"div"> & menuListContainerType) {
  return (
    <NavbarContainer
      desktopMenu={
        <DesktopMenuList leftMenu={leftMenu} rightMenu={rightMenu} />
      }
      /* @ts-expect-error */
      mobileMenu={<MobileMenuList leftMenu={leftMenu} rightMenu={rightMenu} />}
    />
  );
}
