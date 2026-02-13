type footerMenuType = {
  id: number;
  name: string;
  href: string;
};

const footerMenus: footerMenuType[][] = [
  [
    {
      id: 1,
      name: "Tentang Kami",
      href: "/about-us",
    },
    {
      id: 2,
      name: "Bantuan",
      href: "/help",
    },
    {
      id: 3,
      name: "Jadi Mitra",
      href: "/mitra",
    },
  ],
  [
    {
      id: 1,
      name: "Kontak Kami",
      href: "/support",
    },
    {
      id: 2,
      name: "Karir",
      href: "/career",
    },
  ],
  [
    {
      id: 1,
      name: "Instruktur",
      href: "/instructor",
    },
    {
      id: 2,
      name: "Blog",
      href: "/blog",
    },
    {
      id: 3,
      name: "Skill Coins",
      href: "/skill-coins",
    },
  ],
];

export { footerMenus };
