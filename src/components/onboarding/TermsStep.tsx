"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsStepProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
}

const TermsStep: React.FC<TermsStepProps> = ({
  acceptedTerms,
  setAcceptedTerms,
}) => {
  return (
    <div className="flex flex-col items-start p-4 border border-gray-700 rounded-lg bg-gray-950 text-gray-300 shadow-lg">
      <div
        className="w-full h-[500px] p-6 overflow-y-auto border border-gray-800 rounded-md bg-gray-900/80 backdrop-blur-md"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#5c2ea7 #1a1a1a",
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: rgba(92, 46, 167, 0.7);
  border-radius: 50px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-button {
  display: none;
}

          `}
        </style>
        <h2 className="text-lg font-semibold text-white">
          1. Introduction
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          These Terms and Conditions govern your use of our investment services.
          By proceeding, you agree to be bound by these terms.
        </p>
        <h2 className="text-lg font-semibold text-white">
          2. Investment Risks
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          All investments carry risks. Past performance is not indicative of
          future results. You should carefully consider your investment
          objectives, risks, and capabilities before investing.
        </p>
        <h2 className="text-lg font-semibold text-white">
          3. KYC Requirements
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          You agree to provide accurate and up-to-date documentation for Know
          Your Customer (KYC) verification. This includes your Aadhar card, PAN
          card, and other required documents.
        </p>
        <h2 className="text-lg font-semibold text-white">
          4. Privacy Policy
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          We collect and process your personal information in accordance with
          our Privacy Policy. Your information will be handled securely and used
          only for legitimate business purposes.
        </p>
        <h2 className="text-lg font-semibold text-white">
          5. Investment Terms
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          The minimum investment amount may vary based on the investment
          product. Returns are subject to market conditions and are not
          guaranteed.
        </p>
        <h2 className="text-lg font-semibold text-white">
          6. Withdrawal Policy
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          Withdrawals are subject to applicable lock-in periods and processing
          times. Early withdrawals may incur penalties as specified in the
          investment product terms.
        </p>
        <h2 className="text-lg font-semibold text-white">
          7. Communication
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          You agree to receive communications from us regarding your investment,
          including but not limited to statements, updates, and regulatory
          notices.
        </p>
        <h2 className="text-lg font-semibold text-white">
          8. Governing Law
        </h2>
        <p className="mb-3 text-sm text-gray-400">
          These terms are governed by applicable local and national laws. Any
          disputes will be resolved in accordance with these laws.
        </p>
      </div>
      <div className="flex items-center mt-6">
        <Checkbox
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
        />
        <Label className="ml-3 text-sm text-gray-400">
          I have read and agree to the Terms and Conditions *
        </Label>
      </div>
    </div>
  );
};

export default TermsStep;
