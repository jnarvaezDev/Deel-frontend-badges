import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const TermsDisclaimers = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#ECECEC] text-[#111111]">
      <Header />

      <main className="mx-auto w-full max-w-[980px] px-6 py-16 md:px-10">
        <h1
          className="text-4xl font-semibold leading-tight md:text-5xl"
          style={{ fontFamily: "'Bagoss Condensed', sans-serif" }}
        >
          Borderless Leader Certification
          <br />
          Terms &amp; Disclaimer
        </h1>

        <p className="mt-8 text-xl italic" style={{ fontFamily: "'Inter', sans-serif" }}>
          Last updated: March 2026
        </p>

        <hr className="my-10 border-[#BDBDBD]" />

        <p className="text-2xl leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          The Borderless Leader Certification is a self-assessment program created by Deel. By
          completing the assessment, you agree to the following terms.
        </p>

        <hr className="my-10 border-[#BDBDBD]" />

        <div className="space-y-8 text-2xl leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          <p>
            <strong>Self-reported assessment</strong> This certification is based entirely on information
            provided by the candidate. Deel does not verify, audit, or independently confirm any
            responses submitted during the assessment.
          </p>

          <p>
            <strong>Candidate responsibility</strong> By submitting the assessment, you confirm that all
            information provided is accurate and truthful. You accept full personal responsibility for
            the validity of your responses. Providing false or misleading information may result in badge
            revocation.
          </p>

          <p>
            <strong>For recruiters and hiring managers</strong> The Borderless Leader badge is a directional
            signal of self-reported international professional experience. It is not a background check,
            employment verification, or guarantee of qualifications. Standard due diligence is
            recommended as part of any hiring process.
          </p>

          <p>
            <strong>Reassessment policy</strong> The assessment may be retaken once every six months.
          </p>

          <p>
            <strong>Limitation of liability</strong> Deel is not liable for any hiring, employment, or
            business decisions made in reliance on this certification.
          </p>

          <p>
            <strong>Data &amp; privacy</strong> Information collected during the assessment is processed in
            accordance with{" "}
            <a
              href="https://www.deel.com/legal/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Deel&apos;s Privacy Policy
            </a>
            .
          </p>
        </div>

        <hr className="my-10 border-[#BDBDBD]" />

        <p className="text-2xl italic leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          Borderless Leader is a program by Deel — the global platform for international hiring,
          payroll, and compliance.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default TermsDisclaimers;
