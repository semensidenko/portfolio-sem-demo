import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      {/* Як у старому макеті: пункт «Роботи» підкреслений. */}
      <Header activeHref="#works" ctaRevealAfterId="hero-cta" />
      <main>
        <Hero ctaId="hero-cta" />
      </main>
    </>
  );
}
