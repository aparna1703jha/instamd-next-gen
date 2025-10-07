"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Card } from "@/components/Card";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate individual field
  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "username") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!isValidEmail(value)) {
        error = "Please enter a valid email address";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    return error;
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const usernameError = validateField("username", formData.username);
    const passwordError = validateField("password", formData.password);

    if (usernameError) newErrors.username = usernameError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid (for button state)
  const isFormValid = () => {
    return (
      formData.username.trim() !== "" &&
      isValidEmail(formData.username) &&
      formData.password.length >= 6 &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    // Mark all fields as touched
    setTouched({ username: true, password: true });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call mock login API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setApiError(data.error || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setApiError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field on change if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[name] = error;
        } else {
          delete newErrors[name];
        }
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate field on blur
    const error = validateField(name, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  return (
    <div className="min-h-screen gradient-bg-hero">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Side - Existing Homepage Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
              Next-Gen Healthcare Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Healthcare Made{" "}
              <span className="text-gradient">Simple</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 mb-8 leading-relaxed">
              Experience instant access to quality healthcare. Connect with certified medical professionals,
              manage appointments, and access your health records—all in one secure platform.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">24/7 Access</h3>
                  <p className="text-neutral-600 text-sm">Connect with healthcare professionals anytime, anywhere</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Secure & Private</h3>
                  <p className="text-neutral-600 text-sm">Bank-level encryption and HIPAA-compliant security</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Digital Health Records</h3>
                  <p className="text-neutral-600 text-sm">Access your complete medical history in one place</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Component */}
          <div className="w-full animate-fade-in-up lg:animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card variant="glass" padding="lg" className="max-w-md mx-auto lg:mx-0">
              {/* Logo & Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-gradient">InstaMD</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Welcome back
                </h2>
                <p className="text-neutral-600 text-sm">
                  Sign in to access your account
                </p>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {apiError && (
                  <div className="p-4 bg-danger-50 border border-danger-200 text-danger-700 rounded-lg text-sm flex items-start gap-3 animate-fade-in-down">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{apiError}</span>
                  </div>
                )}

                <Input
                  id="username"
                  label="Email"
                  name="username"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username}
                  disabled={isLoading}
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />

                <Input
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  disabled={isLoading}
                  required
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />

                {/* Forgot Password Link */}
                <div className="flex items-center justify-start">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                  loading={isLoading}
                  fullWidth
                  size="lg"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Information Section */}
              <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
                <div className="text-xs text-neutral-600 text-center space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <Link href="#" className="hover:text-primary-600 transition-colors underline">
                      Privacy Policy
                    </Link>
                    <span className="text-neutral-400">•</span>
                    <Link href="#" className="hover:text-primary-600 transition-colors underline">
                      Terms Of Use
                    </Link>
                  </div>

                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium text-neutral-700">Support:</span>
                      <a href="mailto:support@instamdinc.com" className="hover:text-primary-600 transition-colors">
                        support@instamdinc.com
                      </a>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium text-neutral-700">Phone:</span>
                      <a href="tel:+14084423495" className="hover:text-primary-600 transition-colors">
                        (408) 442-3495
                      </a>
                      <span className="text-neutral-400">M–F 6am–5pm PT</span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium text-neutral-700">Info Request:</span>
                      <a href="mailto:info@instamdinc.com" className="hover:text-primary-600 transition-colors">
                        info@instamdinc.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
