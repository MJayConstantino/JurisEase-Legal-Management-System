"use client";

import Link from "next/link";
import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { MailIcon, KeyIcon, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { signinAction } from "@/actions/users";
import { createSupabaseClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
    const errorMsg = searchParams.get("error");
    if (errorMsg) {
      setError(errorMsg);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/test/userpage");
      }
    };

    if (isClient) {
      checkSession();
    }
  }, [router, supabase.auth, isClient]);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await signinAction(formData);
    });
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setError("");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setIsGoogleLoading(false);
      }
      // No need to redirect here as Supabase OAuth will handle the redirect
    } catch (err) {
      console.error("Google login error:", err);
      setError("Failed to connect to Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 font-aileron">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#2D336B] md:text-4xl">
            Welcome back!
          </h1>
          <h2 className="text-2xl font-black tracking-tight text-[#1B1E4B] md:text-3xl">
            Dianson Law Office
          </h2>
          <p className="mt-1 text-sm text-[#2a3563]">
            Log in to access your matters, documents, and legal tools.
          </p>
        </div>

        <div className="rounded-lg bg-[#e1e5f2] p-6">
          <form action={handleSubmit}>
            <div className="mb-4">
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email"
                icon={MailIcon}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <div className="mb-6">
              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                icon={KeyIcon}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
              />
              <div className="mt-1 text-right text-sm">
                <Link
                  href="#"
                  className="font-medium text-[#2a3563] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex flex-col space-y-4">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-[#2a3563] hover:bg-[#1e2547] text-white"
              >
                Log in
              </Button>

              <Button
                onClick={handleGoogleLogin}
                type="button"
                disabled={isPending || isGoogleLoading}
                variant="outline"
                className="flex items-center justify-center gap-2 bg-white"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-[#2a3563]">Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="font-medium text-[#2a3563] hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
