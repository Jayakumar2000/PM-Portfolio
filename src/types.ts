export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  tags: string[];
  link?: string;
}

export interface Skill {
  category: string;
  description: string;
  items: string[];
  icon: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface FrameworkStep {
  title: string;
  description: string;
  icon: string;
}
