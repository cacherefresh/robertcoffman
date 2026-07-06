export type ScreenKind = "role" | "skills" | "about";

export interface CareerScreen {
  id: string;
  kind: ScreenKind;
  eyebrow: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  accent: string;
}

export const careerScreens: CareerScreen[] = [
  {
    id: "about",
    kind: "about",
    eyebrow: "The Oracle Chamber",
    title: "Robert Coffman",
    subtitle: "Software Engineer / Systems Architect",
    bullets: [
      "Full-stack & distributed systems engineering",
      "Defense tech, cloud migration, enterprise platforms",
      "Building at the edge of AI, cloud, and hardware",
    ],
    accent: "#f5c451",
  },
  {
    id: "dedrone-radar",
    kind: "role",
    eyebrow: "Dedrone",
    title: "Radar Integration",
    subtitle: "Counter-UAS Systems",
    bullets: [
      "Integrated radar feeds into real-time drone detection pipeline",
      "Fused multi-sensor tracking for airspace awareness",
      "Hardened data paths for high-availability field deployments",
    ],
    accent: "#4fd1ff",
  },
  {
    id: "dedrone-rf",
    kind: "role",
    eyebrow: "Dedrone",
    title: "RF Sensor Fusion",
    subtitle: "Signal Intelligence",
    bullets: [
      "Correlated RF signatures across distributed sensor arrays",
      "Built low-latency ingestion for streaming spectrum data",
      "Improved detection confidence via cross-sensor fusion",
    ],
    accent: "#4fd1ff",
  },
  {
    id: "dedrone-battlefield",
    kind: "role",
    eyebrow: "Dedrone",
    title: "Battlefield Systems",
    subtitle: "Drone Defense & AI",
    bullets: [
      "Shipped integrations for battlefield counter-drone platforms",
      "Applied AI models to classify and prioritize aerial threats",
      "Worked across radar, RF, and EO/IR sensor domains",
    ],
    accent: "#4fd1ff",
  },
  {
    id: "euler-globalization",
    kind: "role",
    eyebrow: "Euler Hermes / Allianz",
    title: "Globalization",
    subtitle: "Enterprise Platform Engineering",
    bullets: [
      "Engineered globalization layer for multi-region platform",
      "Standardized localization across enterprise services",
      "Partnered with global teams on platform architecture",
    ],
    accent: "#7c8cff",
  },
  {
    id: "euler-cloud",
    kind: "role",
    eyebrow: "Euler Hermes / Allianz",
    title: "Cloud Migration",
    subtitle: "AWS & Microservices",
    bullets: [
      "Migrated legacy enterprise systems to AWS cloud infrastructure",
      "Decomposed monoliths into resilient microservices",
      "Drove reliability and scalability across the platform",
    ],
    accent: "#7c8cff",
  },
  {
    id: "cox-automotive",
    kind: "role",
    eyebrow: "Cox Automotive",
    title: "Platform Engineering",
    subtitle: "Enterprise Software",
    bullets: [
      "Built and maintained large-scale automotive platform services",
      "Collaborated cross-functionally on core product systems",
      "Delivered features across the full stack",
    ],
    accent: "#ff9f5a",
  },
  {
    id: "no-inc",
    kind: "role",
    eyebrow: "No Inc.",
    title: "Software Engineering",
    subtitle: "Product Development",
    bullets: [
      "Contributed across backend and infrastructure systems",
      "Built tooling to support fast-moving product iteration",
      "Worked end-to-end from design through deployment",
    ],
    accent: "#ff9f5a",
  },
  {
    id: "skills-languages",
    kind: "skills",
    eyebrow: "Skills",
    title: "Languages",
    bullets: ["Java", "Python", "C++", "TypeScript"],
    accent: "#f5c451",
  },
  {
    id: "skills-frameworks",
    kind: "skills",
    eyebrow: "Skills",
    title: "Frameworks",
    bullets: ["Spring", "Microservices", "React / Next.js", "Node.js"],
    accent: "#f5c451",
  },
  {
    id: "skills-cloud",
    kind: "skills",
    eyebrow: "Skills",
    title: "Cloud & Infra",
    bullets: ["AWS", "Docker / Kubernetes", "CI/CD", "Distributed Systems"],
    accent: "#f5c451",
  },
  {
    id: "ai-defense",
    kind: "role",
    eyebrow: "Highlights",
    title: "Drone Defense & AI",
    subtitle: "Applied Intelligence",
    bullets: [
      "AI-assisted threat classification for aerial systems",
      "Real-time sensor fusion across radar, RF, and video",
      "Systems engineered for mission-critical reliability",
    ],
    accent: "#c084fc",
  },
];
