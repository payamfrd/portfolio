import projects from "./projects/projects";
import skills from "./skills";

const currentYear = new Date().getFullYear();
const workStartYear = 2021;

const profile = {
  name: "Mohammadmehdi Fard",
  alias: "Payam Fard",

  title: "IT Specialist & Front-End Developer",

  email: "Fard.Mohammadmehdi@gmail.com",
  phone: "+989301801747",

  github: "https://github.com/payamfrd",
  linkedin: "https://www.linkedin.com/in/mohammadmehdi-fard-a430a1222",
  whatsapp: "989301801747",

  location: "Shiraz / Asaluyeh, Iran",

  resume: "/Fard.Mohammadmehdi.pdf",

  workStartYear,
  stats: {
    projects: projects.length,

    experience: currentYear - workStartYear,

    technologies: new Set(skills.flatMap((group) => group.items)).size,
  },
};

export default profile;
