import { Project, Skill, Certification, FrameworkStep } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "zomato-passport",
    title: "Zomato Passport: Global GTM Strategy",
    description: "Defined the cross-border positioning and GTM strategy for Zomato's tourist-centric discovery engine, eliminating choice fatigue through localized messaging and social proof frameworks.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=75&w=1200",
    stats: [
      { label: "AOV Growth", value: "+45%" },
      { label: "Time-to-Order", value: "-83%*" },
      { label: "Order Repeat", value: "68%" }
    ],
    tags: ["GTM STRATEGY", "MARKETPLACE", "B2C", "INTERNATIONALIZATION"],
    link: "https://docs.google.com/presentation/d/1zL_ZUK8IFkMFoA__HE3zBrIX_aOhyEG-/edit?usp=sharing&ouid=115534629277818814306&rtpof=true&sd=true"
  },
  {
    id: "insightx-gtm",
    title: "InsightX: GTM & Demand Generation",
    description: "Architected a full-funnel demand generation engine for a Capital Markets intelligence platform, driving $400K+ in CRM-attributed pipeline value over 6 months through strategic ABM.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=75&w=1200",
    stats: [
      { label: "LinkedIn Reach", value: "500K+" },
      { label: "Pipeline Value", value: "$400K+" },
      { label: "SQLs Generated", value: "20+" }
    ],
    tags: ["DEMAND GEN", "ABM", "B2B SaaS", "CAPITAL MARKETS"],
    link: "https://drive.google.com/file/d/1tjVz9CWB52k_dkOQthy7CDY3P6f_2CH9/view?usp=sharing"
  },
  {
    id: "roanuz-cricket-api",
    title: "Roanuz Sports Cricket Editor: ANTS Pitch Deck",
    description: "Led the product marketing narrative for a high-concurrency sports data API, scaling adoption to 23M+ daily calls through developer-centric positioning and technical documentation strategy.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=75&w=1200",
    stats: [
      { label: "Daily API Calls", value: "23M+" },
      { label: "Uptime Delivery", value: "99.76%" },
      { label: "Dev Activation", value: "40%" }
    ],
    tags: ["PRODUCT MARKETING", "API PRODUCT", "B2B", "SPORTS TECH"],
    link: "https://drive.google.com/file/d/180vv9Hilb95JM0i5ZUdhspjq8iEYUnCx/view?usp=drive_link"
  }
];

export const SKILLS: Skill[] = [
  {
    category: "GTM & Product Marketing",
    description: "Orchestrating full-funnel launches and strategic positioning.",
    items: ["GTM Strategy", "Product Positioning", "Sales Enablement", "Competitive Intelligence", "Analyst Relations", "Partner Marketing"],
    icon: "Rocket"
  },
  {
    category: "Product Management",
    description: "Bridging user needs with technical roadmap execution.",
    items: ["Product Roadmap", "User Research", "Prioritization", "Stakeholder Management", "Cross-functional Influence"],
    icon: "Layers"
  },
  {
    category: "Marketing Tech & Analytics",
    description: "Leveraging data and AI to automate and optimize workflows.",
    items: ["AI-Assisted Content & Research", "LLM-Powered Workflow Automation", "Mixpanel", "GA4", "HubSpot", "Salesforce"],
    icon: "Zap"
  },
  {
    category: "Growth & Ops",
    description: "Scaling revenue through PLG-SLG motions and funnel optimization.",
    items: ["PLG-SLG Motion", "Funnel Optimization", "Process Automation", "E-commerce Growth", "Retention Strategy"],
    icon: "TrendingUp"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Mixpanel PAC", issuer: "Mixpanel", date: "Jan 2026" },
  { name: "Productboard PRC", issuer: "Productboard", date: "Jan 2026" },
  { name: "HubSpot Inbound Marketing", issuer: "HubSpot", date: "2022" },
  { name: "Intercom Chatbots & Automation", issuer: "Intercom", date: "2023" }
];

export const PMM_STRATEGIES = [
  {
    title: "Messaging Architecture",
    description: "Building high-fidelity messaging frameworks that translate technical specs into value-based narratives for specific ICPs.",
    icon: "MessageSquare"
  },
  {
    title: "GTM Execution",
    description: "Orchestrating full-funnel launches that align product, sales, and marketing for maximum market impact.",
    icon: "Rocket"
  },
  {
    title: "AI-Driven Research",
    description: "Reducing research and content production time by 60% using Claude and GPT-4 for competitive teardowns and drafting.",
    icon: "Zap"
  }
];

export const PM_FRAMEWORKS = [
  {
    title: "Impact-Driven Prioritization",
    description: "Using RICE and data-backed models to prioritize features that deliver the highest ROI to users and the business.",
    icon: "BarChart"
  },
  {
    title: "ICP & Persona Mapping",
    description: "Deep-diving into user pain points to build functional requirements that drive product-led growth and adoption.",
    icon: "Users"
  },
  {
    title: "Agile Roadmapping",
    description: "Maintaining a dynamic roadmap that balances quick wins with long-term strategic product goals.",
    icon: "Calendar"
  }
];

export const FRAMEWORK: FrameworkStep[] = [
  {
    title: "Market Intelligence",
    description: "Deep-dive research into competitor landscapes, G2, Gartner Peer Insights, and win/loss analysis to identify customer pain points.",
    icon: "Search"
  },
  {
    title: "Strategic Positioning",
    description: "Crafting unique value propositions and messaging frameworks that resonate with specific ICPs and differentiate from the market.",
    icon: "Target"
  },
  {
    title: "GTM Orchestration",
    description: "Executing multi-channel launches across PLG and SLG motions, leveraging HubSpot, Salesforce, Apollo.io, and Mutiny for personalized orchestration.",
    icon: "Rocket"
  },
  {
    title: "Enablement",
    description: "Equipping sales and partner teams with the narratives, tools, and training needed to win in competitive markets.",
    icon: "Users"
  },
  {
    title: "Growth Optimization",
    description: "Analyzing funnel performance and user activation in Mixpanel to reduce time-to-value and improve activation rates.",
    icon: "BarChart"
  }
];

export const IMPACT_STATS = [
  { label: "ARR Influenced", value: "$1M+", emoji: "💰" },
  { label: "APIs Marketed", value: "25+", emoji: "🔌" },
  { label: "Sports Product Launched", value: "3", emoji: "🚀" },
  { label: "Daily API Calls", value: "23M+", emoji: "💼" }
];

export const CONTACT_INFO = {
  email: "jayakumarm.0801@gmail.com",
  mobile: "9087059907",
  location: "Chennai, India",
  linkedin: "https://www.linkedin.com/in/jayakumarproductlead/",
  github: "https://github.com/Jayakumar2000",
  twitter: "#",
  resumeUrl: "https://drive.google.com/file/u/1/d/15axp0cfpR_S3FaWdFPFE8qkT3VCiZMrt/view?usp=drive_link"
};

export const CAREER_TIMELINE = [
  {
    year: "2019 - 2021",
    title: "Head of Events",
    company: "SRM University",
    description: "Led large-scale event management and marketing initiatives, coordinating cross-functional teams to deliver high-impact campus experiences."
  },
  {
    year: "2021",
    title: "Business Operations Executive",
    company: "MyCaptain",
    description: "Scaled lead generation and sales processes, focusing on operational efficiency and market expansion."
  },
  {
    year: "2022",
    title: "Assistant Team Lead (Business Ops)",
    company: "MyCaptain",
    description: "Promoted to lead a high-performing operations team, overseeing strategic process improvements and team performance metrics."
  },
  {
    year: "2022",
    title: "Business Development Manager",
    company: "Habitate",
    description: "Managed end-to-end business development and product growth for a SaaS community platform, driving product strategy and market acquisition."
  },
  {
    year: "2022 - Present",
    title: "Product Marketing Lead",
    company: "Roanuz",
    description: "Architecting GTM strategies for 25+ global B2B data products, influencing $1M+ in ARR and scaling user adoption through strategic positioning."
  },
  {
    year: "2025 (Freelance)",
    title: "Growth Manager",
    company: "Newgenmax",
    description: "Managed 50+ client accounts as a side engagement, scaling e-commerce businesses through Amazon PPC optimization and growth initiatives."
  }
];

export const PROFILE_IMAGE = "/jay_profile.jpeg"; 
export const STORY_IMAGE = "/jay_profile.jpeg";
