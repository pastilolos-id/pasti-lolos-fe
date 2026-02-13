import Link from "next/link";
import { footerMenus } from "./footerMainData";

export default function FooterMain() {
  return (
    <div className="py-10 px-6 lg:px-10 text-white border-b border-white">
      <div className="p-6 lg:py-11 lg:pl-12 lg:pr-5 grid grid-cols-1 lg:grid-cols-5 bg-white/15 border border-white rounded-card-medium">
        <div className="mb-11 lg:mb-0 md:col-span-2">
          <h1 className="mb-6 text-[2.125rem] -tracking-widest font-bold lowercase">
            Pastilolos
          </h1>
          <p className="text-b3 md:text-b1 lg:max-w-80">
            Pastilolos adalah sebuah platform tryout online untuk BUMN & CPNS
          </p>
        </div>

        <nav className="grid grid-cols-1 md:grid-cols-3 gap-y-4 lg:col-span-3 text-sm md:text-xl font-medium">
          {footerMenus.map((footerMenu, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: false positive
            <div key={index}>
              {footerMenu.map((menu) => (
                <Link key={menu.id} href={menu.href} className="block mb-3">
                  {menu.name}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
