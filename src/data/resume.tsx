import React from "react";

export interface ExperienceRole {
  title: string;
  duration: string;
}

export interface ExperienceItem {
  company: string;
  team?: string;
  location: string;
  duration?: string;
  description: string;
  icon?: string | null;
  logo?: string | null;
  roles: ExperienceRole[];
}

export interface EducationDegree {
  school: string;
  degree: string;
  detail: string;
}

export interface EducationItem {
  school: string;
  logo: string;
  duration: string;
  location?: string;
  gpa: string;
  honors: string;
  degrees: EducationDegree[];
}

export interface ResumeData {
  personal: {
    name: string;
    surname: string;
    title: string;
    company: string;
    tagline: React.ReactNode;
    avatar: string;
    linkedin: string;
  };
  traits: {
    icon: string;
    title: string;
    subtitle: string;
  }[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Rahul",
    surname: "Kooverjee",
    title: "Senior Product Manager",
    company: "Google",
    tagline: (
      <>
        Building <span className="text-white font-bold">incredible products</span> using{" "}
         at a <span className="text-white font-bold">global scale</span> (sometimes even with <span className="text-white font-bold">AI</span>!)
      </>
    ),
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQGb24CXMSz23A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732654229324?e=1769644800&v=beta&t=i9BsCx6_NKnHlJWmDT-zDWq50FWb-y-3mvyTsWwNoBY",
    linkedin: "https://www.linkedin.com/in/rahul-kooverjee",
  },
  traits: [
    {
      icon: "google",
      title: "Senior PM @ Google",
      subtitle: "Former APM",
    },
    {
      icon: "penn",
      title: "Finance + CS @ Penn",
      subtitle: "Summa Cum Laude",
    },
  ],
  experience: [
    {
      company: "Google Ad Manager",
      team: "Senior Product Manager",
      location: "New York, NY",
      duration: "2020 — Present",
      description:
        "Growing publisher monetization through new innovations (auction optimizations, addressability signals, new ways of monetizing, etc...)",
      icon: null,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
      roles: [
        {
          title: "Senior Product Manager",
          duration: "2025 — Present",
        },
        {
          title: "Product Manager II",
          duration: "2023 — 2025",
        },
        {
          title: "Product Manager I",
          duration: "2021 — 2023",
        },
        {
          title: "Associate Product Manager II",
          duration: "2020 — 2021",
        },
      ],
    },
    {
      company: "Google Doodles & Search Delight",
      team: "Associate Product Manager",
      location: "Mountain View CA",
      duration: "2019 — 2020",
      description:
        "Bringing delight to billions of users through Doodles, Easter Eggs, and other fun sparkles of joy on Google Search",
      icon: null,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
      roles: [
      ],
    },
    {
      company: "Google Search Ads",
      team: "APM Intern",
      location: "Mountain View CA",
      duration: "2018 — 2018",
      description:
        "Improving advertiser experience of our ML-powered automated Search Ad targeting",
      icon: null,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
      roles: [
      ],
    },
    {
      company: "Intro to Computer Science (CIS 110)",
      team: "Head Teaching Assistant",
      location: "Jersey City, NJ",
      duration: "2016 — 2019",
      description:
        "Course, curriculum, and TA staff management for Penn's intro CS course (~300 students / semester)",
      icon: null,
      logo: "https://sportslogohistory.com/wp-content/uploads/2022/11/penn_quakers_2004-2017_a.png",
      roles: [
        {
          title: "Head Teaching Assistant",
          duration: "2017 — 2019",
        },
        {
          title: "Teaching Assistant",
          duration: "2016 — 2017",
        },
      ],
    },
    {
      company: "Bank of America",
      team: "Summer Technology Analyst",
      location: "Jersey City, NJ",
      duration: "2017 — 2017",
      description:
        "Full stack software development in the Global Middle Office Technology group",
      icon: null,
      logo: "https://companieslogo.com/img/orig/BAC-e7995069.png?t=1720244490",
      roles: [
      ],
    },
  ],
  education: [
    {
      school: "University of Pennsylvania",
      logo: "https://sportslogohistory.com/wp-content/uploads/2022/11/penn_quakers_2004-2017_a.png",
      duration: "2015 — 2019",
      location: "Philadelphia, PA",
      gpa: "3.95 GPA",
      honors: "Summa Cum Laude",
      degrees: [
        {
          school: "Wharton",
          degree: "BS - Economics",
          detail: "Concentration in Finance",
        },
        {
          school: "School of Engineering and Applied Science",
          degree: "BAS - Computer Science",
          detail: "Minors in Math & Data Science",
        },
      ],
    },
  ],
};
