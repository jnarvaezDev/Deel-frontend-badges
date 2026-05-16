import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, User, Mail, Briefcase, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { isBlockedPublicEmail } from "@/lib/badges/email";

export interface RegistrationData {
  fullName: string;
  email: string;
  jobTitle: string;
  currentCountry: string;
}

interface RegistrationScreenProps {
  onContinue: (data: RegistrationData) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegistrationScreen({ onContinue }: RegistrationScreenProps) {
  const [form, setForm] = useState<RegistrationData>({
    fullName: "",
    email: "",
    jobTitle: "",
    currentCountry: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = {
    fullName: !form.fullName.trim() ? "Full name is required" : "",
    email: !form.email.trim()
      ? "Professional email is required"
      : !EMAIL_REGEX.test(form.email.trim())
      ? "Enter a valid email address"
      : isBlockedPublicEmail(form.email)
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
      setTouched({ fullName: true, email: true, jobTitle: true, currentCountry: true });
      return;
    }
    onContinue(form);
  };

  const fields: {
    key: keyof RegistrationData;
    label: string;
    placeholder: string;
    type: string;
    icon: typeof User;
  }[] = [
    { key: "fullName", label: "Full Name", placeholder: "Jane Doe", type: "text", icon: User },
    { key: "email", label: "Professional Email", placeholder: "jane@company.com", type: "email", icon: Mail },
    { key: "jobTitle", label: "Current Job Title", placeholder: "Head of Global Operations", type: "text", icon: Briefcase },
    { key: "currentCountry", label: "Your current country", placeholder: "United States", type: "text", icon: MapPin },
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
      </div>

      <Button
        size="lg"
        onClick={handleSubmit}
        className="w-full h-14 text-base font-semibold gap-2 rounded-xl shadow-elevated"
      >
        Continue
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
