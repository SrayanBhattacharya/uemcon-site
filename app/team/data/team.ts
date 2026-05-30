export interface TeamMember {
  id: string;
  name: string;
  department: string;
  image?: string;
  linkedin?: string;
  email?: string;
  role?: string;
}

export const technicalAffairs: TeamMember[] = [
  {
    id: "srayan-bhattacharya",
    name: "Srayan Bhattacharya",
    department: "Technical Affairs",
    role: "Director of Technical Affairs",
  },
  {
    id: "sayantan-das",
    name: "Sayantan Das",
    department: "Technical Affairs",
    role: "Lead Architect",
  },
];

export const teamDepartments: Record<string, TeamMember[]> = {
  "Delegate Affairs": [
    { id: "anadir-paul", name: "Anadir Paul", department: "Delegate Affairs" },
    { id: "ahamika-roy", name: "Ahamika Roy", department: "Delegate Affairs" },
    { id: "aqsa-nadeem", name: "Aqsa Nadeem", department: "Delegate Affairs" },
    { id: "pritysha-ghosh", name: "Pritysha Ghosh", department: "Delegate Affairs" },
  ],
  "External Affairs": [
    { id: "annesha-deogharia", name: "Annesha Deogharia", department: "External Affairs" },
    { id: "kaustav-sarkar", name: "Kaustav Sarkar", department: "External Affairs" },
    { id: "asmita-chatterjee", name: "Asmita Chatterjee", department: "External Affairs" },
  ],
  "Content": [
    { id: "medha-banerjee", name: "Medha Banerjee", department: "Content" },
    { id: "rushati-modak", name: "Rushati Modak", department: "Content" },
  ],
  "Logistics": [
    { id: "soumik-dutta", name: "Soumik Dutta", department: "Logistics" },
    { id: "navonil-saha", name: "Navonil Saha", department: "Logistics" },
    { id: "gourab-basu", name: "Gourab Basu", department: "Logistics" },
  ],
  "Hospitality": [
    { id: "debalina-bandyopadhyay", name: "Debalina Bandyopadhyay", department: "Hospitality" },
    { id: "misha-shrimali", name: "Misha Shrimali", department: "Hospitality" },
  ],
  "Sponsorship": [
    { id: "swastika-paul", name: "Swastika Paul", department: "Sponsorship" },
  ],
  "Social Media & Marketing": [
    { id: "mahasweta-guha-neogi", name: "Mahasweta Guha Neogi", department: "Social Media & Marketing" },
  ],
  "Finance": [
    { id: "ayan-mondal", name: "Ayan Mondal", department: "Finance" },
  ],
  "Graphics & Design": [
    { id: "esha-singh", name: "Esha Singh", department: "Graphics & Design" },
  ],
  "Photography": [
    { id: "srijit-ghosal", name: "Srijit Ghosal", department: "Photography" },
  ],
};

export const allDomains = [
  "Technical Affairs",
  "Delegate Affairs",
  "External Affairs",
  "Content",
  "Logistics",
  "Hospitality",
  "Sponsorship",
  "Social Media & Marketing",
  "Finance",
  "Graphics & Design",
  "Photography"
];
