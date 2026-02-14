import Link from "next/link";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Icon } from "@/components";
import { cn } from "@/lib/utils";

type AuthLeftSectionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
  googleButton: {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
  };
};

export default function AuthLeftSection({
  title,
  googleButton,
  className,
  ...props
}: AuthLeftSectionProps) {
  return (
    <div
      {...props}
      className={cn(
        "py-10 lg:py-10 px-4 md:px-20 lg:pl-10 lg:pr-25 flex flex-col justify-between gap-15 lg:gap-11",
        className,
      )}
    >
      <Link
        href="/"
        className="text-[2rem] text-center lg:text-left font-bold -tracking-widest block"
      >
        pastilolos
      </Link>

      <section className="flex flex-col gap-7">
        <h1 className="text-center text-h3 font-bold tracking-normal leading-10 flex flex-col gap-7 lg:gap-4">
          {title}
        </h1>

        <button
          type="button"
          onClick={googleButton.onClick}
          className="w-full text-neutral-6 font-bold flex items-center justify-center gap-3 py-3 bg-white rounded-full mx-auto"
        >
          <Icon name="google-fullcolor" size={32} />
          <p>{googleButton.text}</p>
        </button>
        <div className="flex items-center gap-1">
          <div className="bg-white grow h-px"></div>
          <p className="text-c1">atau menggunakan email</p>
          <div className="bg-white grow h-px"></div>
        </div>
        {props.children}
      </section>
    </div>
  );
}
