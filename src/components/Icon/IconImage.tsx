import Image, { ImageProps } from "next/image";
import { iconImagePath } from "./iconData";

export default function IconImage({
    name,
    ...props
}: ImageProps & { name: keyof typeof iconImagePath }) {
    return <Image {...props} alt={iconImagePath[name]?.alt || ""} />;
}
