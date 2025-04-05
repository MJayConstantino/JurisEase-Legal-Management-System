export default function WelcomeHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D336B] dark:text-[#8A91D9] mb-2 transition-colors duration-200">
        Welcome to{" "}
        <span className="text-[#1B1E4B] dark:text-[#A5ABEF] font-black transition-colors duration-200">
          JurisEase
        </span>
      </h1>
      <div className="h-1 w-24 bg-[#2D336B] dark:bg-[#8A91D9] mx-auto my-4 rounded-full transition-colors duration-200"></div>
      <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto transition-colors duration-200">
        Your comprehensive legal management platform designed for modern law
        practices.
      </p>
    </div>
  );
}
