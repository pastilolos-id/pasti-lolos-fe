import { Icon } from "@/components";
import Link from "next/link";

export default function Bottom() {
  return (
    <div className="flex flex-col md:flex-row gap-y-4 md:justify-between justify-center items-center pt-8.5 md:pt-9 pb-6 md:pb-6.5 px-10 text-white">
      <p className="text-c1 md:text-b1 font-medium">
        © 2026 Pastilolos. All Rights Reserved
      </p>
      <div className="flex">
        {/* <Icon name="linkedin-fill" size={43} /> */}
        <Link target="_blank" href="https://www.instagram.com/pastilolos.id/">
          <Icon name="instagram-fill" size={43} />
        </Link>
      </div>
    </div>
  );
}
