export interface Leadership {
  organization: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export const leadership: Leadership[] = [
  {
    organization: "Association for Computing Machinery (ACM)",
    role: "President, Advisor, Committee Director, Officer, Member",
    period: "Oct 2023 – Present",
    description:
      "Oversaw a 35+ officer team executing 50+ events and led initiatives such as mavgrades.com and ACM Create.",
    achievements: [
      "Oversaw a 35+ officer team executing 50+ events and led initiatives such as mavgrades.com and ACM Create",
      "Secured $15,000+ in sponsorships and enhanced member engagement through semester-long project incubators",
    ],
  },
  {
    organization: "MOBI",
    role: "Senior Developer, Officer, Member",
    period: "Nov. 2023 – May 2025",
    description:
      "Contributed to mobile development projects and mentored junior developers in iOS and Android development.",
    achievements: [
      "Contributed to mobile development projects and mentored junior developers",
    ],
  },
  {
    organization: "Cybersecurity Club (CSEC)",
    role: "Officer, Member",
    period: "Oct 2023 – Aug 2024",
    description:
      "Organized cybersecurity workshops and competitions for students interested in information security.",
    achievements: [
      "Organized cybersecurity workshops and competitions for students interested in information security",
    ],
  },
];
