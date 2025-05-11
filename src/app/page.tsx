import HeroSection from "@/components/homepage/heroSection"

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 justify-center items-center">
        <HeroSection
          title="Welcome to JurisEase"
          subtitle="Expert legal services tailored to your needs."
          buttonText="Log In to Your Account"
        />
      </main>
    </div>
  )
}

