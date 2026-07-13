import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { WhyContenso } from "@/components/landing/why-contenso"
import { Comparison } from "@/components/landing/comparison"
import { CTASection } from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <WhyContenso />
      <Comparison />
      <CTASection />
    </>
  )
}
