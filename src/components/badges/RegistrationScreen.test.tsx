import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UNEMPLOYED_JOB_TITLE_FALLBACK } from "@/lib/badges/types";
import { RegistrationScreen } from "./RegistrationScreen";

vi.mock("@/components/ui/select", () => ({
  Select: ({ value, onValueChange, children }: any) => (
    <select value={value} onChange={(event) => onValueChange(event.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: any) => <>{children}</>,
  SelectValue: ({ placeholder }: any) => <option value="">{placeholder}</option>,
}));

describe("RegistrationScreen", () => {
  it("hides Current Job Title and submits fallback for unemployed users", () => {
    const onContinue = vi.fn();

    render(<RegistrationScreen onContinue={onContinue} />);

    fireEvent.change(screen.getByPlaceholderText("Jane"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText("Doe"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("jane@company.com"), { target: { value: "jane@gmail.com" } });
    fireEvent.change(screen.getAllByRole("combobox")[0], { target: { value: "unemployed" } });
    fireEvent.change(screen.getAllByRole("combobox")[1], { target: { value: "AR" } });

    expect(screen.queryByText("Current Job Title")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    expect(onContinue).toHaveBeenCalledWith(
      expect.objectContaining({
        employmentStatus: "unemployed",
        jobTitle: UNEMPLOYED_JOB_TITLE_FALLBACK,
      })
    );
  });

  it("requires a real job title after switching back to employed", () => {
    const onContinue = vi.fn();

    render(<RegistrationScreen onContinue={onContinue} />);

    fireEvent.change(screen.getAllByRole("combobox")[0], { target: { value: "unemployed" } });
    fireEvent.change(screen.getAllByRole("combobox")[0], { target: { value: "employed" } });

    expect(screen.getByText("Current Job Title")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByText("Job title is required")).toBeInTheDocument();
    expect(onContinue).not.toHaveBeenCalled();
  });
});
