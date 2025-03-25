import Header from "@/components/homepage/header";
import HeroSection from "@/components/homepage/hero-section";
import ServicesSection from "@/components/homepage/service-section";
import Footer from "@/components/homepage/footer";

export default function LandingPage() {
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const quickLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Careers", href: "#" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Facebook", href: "#" },
  ];

  const services = [
    {
      title: "Corporate Law",
      description:
        "Expert guidance on corporate structure, compliance, and transactions.",
    },
    {
      title: "Intellectual Property",
      description:
        "Protection for your innovations, trademarks, and creative works.",
    },
    {
      title: "Litigation",
      description:
        "Skilled representation in court proceedings and dispute resolution.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header logoText="Dianson Law Office" navItems={navItems} />
      <main className="flex-grow">
        <HeroSection
          title="Welcome to Dianson Law Office"
          subtitle="Expert legal services tailored to your needs"
          buttonText="Log In to Your Account"
        />
        <ServicesSection title="Our Services" services={services} />
      </main>
      <Footer
        companyName="Dianson Law Office"
        quickLinks={quickLinks}
        socialLinks={socialLinks}
      />
    </div>
  );
}
