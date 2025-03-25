"use client";

import { SignUpPage } from "@/components/auth/SignUp";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "@/components/homepage/header";

export default function SignUp() {
  const router = useRouter();
  const handleSignUpSucess = () => {
    toast.success("Sign Up Succesful! Confirm your Emeil!");
    router.push("/login");
  };
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header logoText="Dianson Law Office" navItems={navItems} />

      <SignUpPage onSignUpSuccess={handleSignUpSucess} />
    </div>
  );
}


