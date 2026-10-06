import MagicBento, { type BentoCardProps } from "@/components/reactbits/MagicBento";
import { Section } from "@/components/ui/Section";
import { MockPage } from "./MockPage";
import { MockPanel } from "./MockPanel";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const CARDS: BentoCardProps[] = [
  {
    label: "Setup",
    icon: (
      <Icon>
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </Icon>
    ),
    title: "One component",
    description: "Add <OdinEye /> once at the root. No config file, no rules to choose.",
  },
  {
    label: "Production",
    icon: (
      <Icon>
        <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
      </Icon>
    ),
    title: "Nothing ships",
    description: "Render it behind a development check and your users never download it.",
  },
  {
    label: "On the page",
    icon: (
      <Icon>
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
        <circle cx="12" cy="12" r="3" />
      </Icon>
    ),
    title: "Marked on the element",
    description:
      "Every problem gets a red or amber outline on the exact element that causes it. Hover the marker to read the fix.",
    visual: <MockPage />,
  },
  {
    label: "Panel",
    icon: (
      <Icon>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </Icon>
    ),
    title: "Everything in one list",
    description:
      "The button in the corner opens every issue by category, including the ones you can't see, like a missing description.",
    visual: <MockPanel />,
  },
  {
    label: "Self-aware",
    icon: (
      <Icon>
        <path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c7 0 10 8 10 8a17.6 17.6 0 0 1-2.2 3.4M6.6 6.6C3.9 8.4 2 12 2 12s3 8 10 8a9.7 9.7 0 0 0 5.4-1.6M14.1 14.1a3 3 0 1 1-4.2-4.2M2 2l20 20" />
      </Icon>
    ),
    title: "Ignores itself",
    description: "Its own markers and panel are left out of the checks.",
  },
  {
    label: "Late content",
    icon: (
      <Icon>
        <path d="M21 12a9 9 0 1 1-2.6-6.4L21 8" />
        <path d="M21 3v5h-5" />
      </Icon>
    ),
    title: "Checks again after load",
    description: "Images that load late are measured at their real size.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Problems show up on the page, not in a report you have to go and read."
      lead="OdinEye reads the page the browser rendered, runs its checks, and draws what it finds on top. Your elements and styles are never touched."
    >
      <MagicBento
        cards={CARDS}
        textAutoHide={false}
        enableStars={false}
        enableSpotlight={false}
        enableBorderGlow={false}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect={false}
      />
    </Section>
  );
}
