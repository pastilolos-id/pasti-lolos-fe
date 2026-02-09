import abdiNegaraIcon from "@/assets/icons/abdi-negara.svg";
import bumnIcon from "@/assets/icons/bumn.svg";
import checklistCircleFillIcon from "@/assets/icons/checklist-circle-fill.svg";
import crossCircleFillIcon from "@/assets/icons/cross-circle-fill.svg";
import hamburgerMenuToggleIcon from "@/assets/icons/hamburger-menu-toggle.svg";
import landingPageBgEllipse from "@/assets/icons/landing-page-bg-ellipse.svg";

type IconsType = {
  [key: string]: string;
};

const iconImagePath = {
  "hamburger-menu-toggle": {
    src: hamburgerMenuToggleIcon,
    alt: "Hamburger Menu Toggle Icon",
  },
  bumn: {
    src: bumnIcon,
    alt: "BUMN Icon",
  },
  "abdi-negara": {
    src: abdiNegaraIcon,
    alt: "Abdi Negara Icon",
  },
  "landing-page-bg-ellipse": {
    src: landingPageBgEllipse,
    alt: "Landing Page Background Ellipse",
  },
  "cross-circle-fill": {
    src: crossCircleFillIcon,
    alt: "Cross Circle Fill Icon",
  },
  "checklist-circle-fill": {
    src: checklistCircleFillIcon,
    alt: "Checklist Circle Fill Icon",
  },
};

const icons: IconsType = {
  "slash-circle":
    "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16 M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708",
};

export { icons, type IconsType, iconImagePath };
