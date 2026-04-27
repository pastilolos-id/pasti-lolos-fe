import type { SVGProps } from "react";
import IconImage from "./IconImage";
import { iconImagePath, icons } from "./iconData";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  pathClassName?: string;
  name:
    | "abdi-negara"
    | "activity"
    | "analysis-fill"
    | "arrow-left-circle"
    | "bumn"
    | "bumn-wrapped-text"
    | "card"
    | "checklist-circle-fill"
    | "checklist-circle-fill-green"
    | "chevron-down-fill"
    | "course"
    | "cross-circle-fill"
    | "door"
    | "exam-multiple-choice"
    | "exam-multiple-choice-outline"
    | "eye-closed"
    | "eye-open"
    | "fluent-textbox"
    | "fluent-textbox-blue"
    | "google-fullcolor"
    | "hamburger-menu-toggle"
    | "home"
    | "instagram-fill"
    | "landing-page-bg-ellipse"
    | "linkedin-fill"
    | "lock"
    | "mail"
    | "notification"
    | "people-circle-fill"
    | "phone"
    | "phone-fill"
    | "profile-circle"
    | "slash-circle"
    | "spinner"
    | "sun"
    | "text-box-edit"
    | "text-box-edit-blue"
    | "time-outlined"
    | "tryout"
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
  ...props
}: IconProps) => {
  switch (name) {
    case "hamburger-menu-toggle":
    case "bumn":
    case "bumn-wrapped-text":
    case "abdi-negara":
    case "arrow-left-circle":
    case "landing-page-bg-ellipse":
    case "cross-circle-fill":
    case "checklist-circle-fill":
    case "checklist-circle-fill-green":
    case "fluent-textbox-blue":
    case "google-fullcolor":
    case "profile-circle":
    case "eye-closed":
    case "exam-multiple-choice-outline":
    case "text-box-edit-blue":
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

    case "time-outlined":
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
          width={size || 20}
          height={size || 20}
          viewBox="0 0 20 20"
          {...props}
        >
          <title>{name || "Icon"}</title>
          <path
            className={pathClassName}
            d={icons[name]}
            fill={fill || "#777777"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
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
          {...props}
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
          viewBox="0 0 41 41"
          {...props}
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
