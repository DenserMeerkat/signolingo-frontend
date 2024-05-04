const frontend = {
  url: "https://github.com/DenserMeerkat/signolingo-frontend",
  userName: "DenserMeerkat",
  repoName: "signolingo-frontend",
};

const backend = {
  url: "https://github.com/NivedhaBalamurugan/signolingo-model",
  userName: "NivedhaBalamurugan",
  repoName: "signolingo-model",
};

const request = {
  localhostURL: "http://localhost",
  deploymentURL: "",
  port: 5000,
  endpoints: {
    digit: "/predictdig",
    alphabet: "/predictalpha",
  },
};

export { frontend, backend, request };
