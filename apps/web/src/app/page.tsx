import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Checks } from "@/components/sections/Checks";
import { Cta } from "@/components/sections/Cta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Setup } from "@/components/sections/Setup";
import { Stack } from "@/components/sections/Stack";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className={styles.frame}>
        <Hero />
        <Stack />
        <HowItWorks />
        <Setup />
        <Checks />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
