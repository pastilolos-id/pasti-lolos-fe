import IconImage from "./IconImage";
import { iconImagePath, icons } from "./iconData";

type IconProps = {
  className?: string;
  pathClassName?: string;
  name:
    | "hamburger-menu-toggle"
    | "slash-circle"
    | "bumn"
    | "abdi-negara"
    | "landing-page-bg-ellipse"
    | "cross-circle-fill"
    | "checklist-circle-fill"
    | "";
  size?: number | string;
  fill?: string | null;
  onClick?: (event: React.MouseEvent<SVGSVGElement | HTMLImageElement>) => void;
};

const Icon = ({
  className,
  pathClassName,
  name,
  size,
  fill,
  onClick,
}: IconProps) => {
  switch (name) {
    case "hamburger-menu-toggle":
    case "bumn":
    case "abdi-negara":
    case "landing-page-bg-ellipse":
    case "cross-circle-fill":
    case "checklist-circle-fill":
      return (
        <IconImage
          name={name as keyof typeof iconImagePath}
          src={iconImagePath[name as keyof typeof iconImagePath]?.src}
          alt={name}
          width={typeof size === "number" ? size : 24}
          height={typeof size === "number" ? size : 24}
          className={className}
          onClick={onClick as React.MouseEventHandler<HTMLImageElement>}
        />
      );

    case "":
      return (
        <svg
          onClick={onClick}
          onKeyDown={
            !onClick
              ? undefined
              : (e) => {
                  if (onClick && e.key === "Enter") {
                    e.preventDefault();
                    // biome-ignore lint/suspicious/noExplicitAny: false positive
                    onClick(e as any);
                  }
                }
          }
          className={`${className ? className : ""}`}
          width={size || 24}
          height={size || 24}
          viewBox="0 0 24 24"
        >
          <title>{name || "Icon"}</title>
          <path
            className={pathClassName}
            d={icons["slash-circle"]}
            fill={fill || "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );

    default:
      return (
        <svg
          onClick={onClick}
          onKeyDown={
            !onClick
              ? undefined
              : (e) => {
                  if (onClick && e.key === "Enter") {
                    e.preventDefault();
                    // biome-ignore lint/suspicious/noExplicitAny: false positive
                    onClick(e as any);
                  }
                }
          }
          className={`${className}`}
          width={size || 24}
          height={size || 24}
          viewBox="0 0 24 24"
        >
          <title>{name || "Icon"}</title>
          <path
            className={pathClassName}
            d={icons[name]}
            fill={fill || "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );
  }
};

export type { IconProps };

export default Icon;
