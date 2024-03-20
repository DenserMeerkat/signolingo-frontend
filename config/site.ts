export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Signolingo",
  description: "",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
  navMenuItems: [],
  links: {
    github: {
      frontend: "https://github.com/densermeerkat/signolingo-frontend",
    },
  },
};
