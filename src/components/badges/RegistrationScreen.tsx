import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, User, Mail, Briefcase, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { isBlockedPublicEmail, requiresProfessionalEmail } from "@/lib/badges/email";
import { countries } from "@/lib/badges/countries";
import type { EmploymentStatus } from "@/lib/badges/types";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  jobTitle: string;
  currentCountry: string;
}

interface RegistrationScreenProps {
  onContinue: (data: RegistrationData) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegistrationScreen({ onContinue }: RegistrationScreenProps) {
  const [form, setForm] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    employmentStatus: "employed",
    jobTitle: "",
    currentCountry: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = {
    firstName: !form.firstName.trim() ? "First name is required" : "",
    lastName: !form.lastName.trim() ? "Last name is required" : "",
    email: !form.email.trim()
      ? requiresProfessionalEmail(form.employmentStatus)
        ? "Professional email is required"
        : "Email is required"
      : !EMAIL_REGEX.test(form.email.trim())
      ? "Enter a valid email address"
      : requiresProfessionalEmail(form.employmentStatus) && isBlockedPublicEmail(form.email)
      ? "Please enter your professional email (personal domains are not allowed)"
      : "",
    jobTitle: !form.jobTitle.trim() ? "Job title is required" : "",
    currentCountry: !form.currentCountry.trim()
      ? "Current country is required"
      : "",
  };

  const isValid = Object.values(errors).every((e) => !e);

  const handleBlur = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleChange = (field: keyof RegistrationData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    if (!isValid) {
      setTouched({ firstName: true, lastName: true, email: true, employmentStatus: true, jobTitle: true, currentCountry: true });
      return;
    }
    onContinue(form);
  };

  const fields: {
    key: "firstName" | "lastName" | "email" | "jobTitle";
    label: string;
    placeholder: string;
    type: string;
    icon: typeof User;
  }[] = [
    { key: "firstName", label: "First Name", placeholder: "Jane", type: "text", icon: User },
    { key: "lastName", label: "Last Name", placeholder: "Doe", type: "text", icon: User },
    {
      key: "email",
      label: requiresProfessionalEmail(form.employmentStatus) ? "Professional Email" : "Email",
      placeholder: requiresProfessionalEmail(form.employmentStatus) ? "jane@company.com" : "jane@gmail.com",
      type: "email",
      icon: Mail,
    },
    { key: "jobTitle", label: "Current Job Title", placeholder: "Head of Global Operations", type: "text", icon: Briefcase },
  ];

  return (
    <div className="space-y-8 animate-fade-in py-4">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Before we begin
        </p>
        <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-navy leading-tight">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          We'll use this to personalize your badge and send your results.
        </p>
      </div>

      <div className="space-y-4">
        {fields.map(({ key, label, placeholder, type, icon: Icon }) => (
          <div key={key} className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              {label}
            </label>
            <Input
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              onBlur={() => handleBlur(key)}
              className={cn(
                "h-12 rounded-xl text-base",
                touched[key] && errors[key] && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {touched[key] && errors[key] && (
              <p className="text-xs text-destructive">{errors[key]}</p>
            )}
          </div>
        ))}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
            Employment status
          </label>
          <Select
            value={form.employmentStatus}
            onValueChange={(value: EmploymentStatus) => handleChange("employmentStatus", value)}
          >
            <SelectTrigger className="h-12 rounded-xl text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {requiresProfessionalEmail(form.employmentStatus)
              ? "Use your work email to verify professional status."
              : "You can use a personal email while unemployed."}
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            Your current country
          </label>
          <Select
            value={form.currentCountry}
            onValueChange={(value) => handleChange("currentCountry", value)}
          >
            <SelectTrigger
              onBlur={() => handleBlur("currentCountry")}
              className={cn(
                "h-12 rounded-xl text-base",
                touched.currentCountry && errors.currentCountry && "border-destructive focus:ring-destructive"
              )}
            >
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.currentCountry && errors.currentCountry && (
            <p className="text-xs text-destructive">{errors.currentCountry}</p>
          )}
        </div>
      </div>

      <Button
        size="lg"
        onClick={handleSubmit}
        className="w-full h-12 sm:h-14 min-h-[48px] sm:min-h-[52px] bg-bdg-primary hover:bg-bdg-minprimary/90 text-white border-0 text-sm sm:text-base font-semibold gap-2 rounded-xl shadow-card whitespace-nowrap"
      >
        Continue
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a
          href="/terms-disclaimers"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          Terms &amp; Disclaimers
        </a>
        .
      </p>
    </div>
  );
}
