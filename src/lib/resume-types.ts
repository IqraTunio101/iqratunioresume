export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  start: string;
  end: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export type TemplateId = "classic" | "modern" | "minimal";

export const uid = () => Math.random().toString(36).slice(2, 10);

export const sampleResume: ResumeData = {
  name: "Ayesha Khan",
  title: "Senior Product Designer",
  email: "ayesha.khan@email.com",
  phone: "+92 300 1234567",
  location: "Karachi, Pakistan",
  website: "ayeshakhan.design",
  summary:
    "Product designer with 8+ years of experience shipping consumer and enterprise products. I turn ambiguous problems into clear, tested interfaces, and I care deeply about the details between the big moments.",
  experience: [
    {
      id: uid(),
      role: "Senior Product Designer",
      company: "Northwind Labs",
      start: "2021",
      end: "Present",
      description:
        "Lead designer for the flagship analytics product used by 40k teams. Redesigned onboarding, lifting activation by 23%. Built and maintained the design system across web and mobile.",
    },
    {
      id: uid(),
      role: "Product Designer",
      company: "Brightline Studio",
      start: "2018",
      end: "2021",
      description:
        "Designed end-to-end flows for fintech and health clients. Ran weekly usability tests and partnered with engineers to ship accessible, high-polish UI.",
    },
    {
      id: uid(),
      role: "UI Designer",
      company: "Pixel & Co",
      start: "2016",
      end: "2018",
      description:
        "Produced marketing sites and product interfaces for early-stage startups. Introduced a component-based workflow that cut design-to-dev handoff time in half.",
    },
  ],
  education: [
    {
      id: uid(),
      degree: "BSc Computer Science",
      school: "NED University of Engineering & Technology",
      start: "2012",
      end: "2016",
    },
  ],
  skills: [
    "Product Strategy",
    "Interaction Design",
    "Design Systems",
    "Prototyping",
    "User Research",
    "Figma",
    "Accessibility",
  ],
};

export const emptyResume: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experience: [
    { id: uid(), role: "", company: "", start: "", end: "", description: "" },
  ],
  education: [{ id: uid(), degree: "", school: "", start: "", end: "" }],
  skills: [],
};
