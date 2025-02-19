"use client"
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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="h-64 overflow-y-auto p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
          <div className="space-y-4 text-gray-300">
            <h3 className="font-semibold">1. Introduction</h3>
            <p>
              These Terms and Conditions govern your use of our investment
              services. By proceeding, you agree to be bound by these terms.
            </p>

            <h3 className="font-semibold">2. Investment Risks</h3>
            <p>
              All investments carry risks. Past performance is not indicative of
              future results. You should carefully consider your investment
              objectives, risks, and capabilities before investing.
            </p>

            <h3 className="font-semibold">3. KYC Requirements</h3>
            <p>
              You agree to provide accurate and up-to-date documentation for
              Know Your Customer (KYC) verification. This includes your Aadhar
              card, PAN card, and other required documents.
            </p>

            <h3 className="font-semibold">4. Privacy Policy</h3>
            <p>
              We collect and process your personal information in accordance
              with our Privacy Policy. Your information will be handled securely
              and used only for legitimate business purposes.
            </p>

            <h3 className="font-semibold">5. Investment Terms</h3>
            <p>
              The minimum investment amount may vary based on the investment
              product. Returns are subject to market conditions and are not
              guaranteed.
            </p>

            <h3 className="font-semibold">6. Withdrawal Policy</h3>
            <p>
              Withdrawals are subject to applicable lock-in periods and
              processing times. Early withdrawals may incur penalties as
              specified in the investment product terms.
            </p>

            <h3 className="font-semibold">7. Communication</h3>
            <p>
              You agree to receive communications from us regarding your
              investment, including but not limited to statements, updates, and
              regulatory notices.
            </p>

            <h3 className="font-semibold">8. Governing Law</h3>
            <p>
              These terms are governed by applicable local and national laws.
              Any disputes will be resolved in accordance with these laws.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
          />
          <Label htmlFor="terms" className="text-gray-300">
            I have read and agree to the Terms and Conditions <span className="text-red-500">*</span>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TermsStep;