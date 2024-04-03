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
      label: "Learn",
      href: "/learn",
    },
    {
      label: "Lesson",
      href: "/lesson",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
  links: {
    github: {
      frontend: "https://github.com/densermeerkat/signolingo-frontend",
      model: "https://github.com/NivedhaBalamurugan/signolingo-model",
    },
  },
};
