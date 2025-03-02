import { useState } from "react";
import { Button } from "../ui/button";

interface NavigationButtonsProps {
  currentStep: number;
  acceptedTerms: boolean;
  loading: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isFinalStep: boolean;
  meetingScheduled: boolean;
  onSubmit?: () => Promise<void>; // Make it optional
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  acceptedTerms,
  loading,
  onNext,
  onPrevious,
  isFinalStep,
  meetingScheduled,
  onSubmit,
}) => {
  const [checked, setChecked] = useState(false);

  const handleNext = async () => {
    if (isFinalStep && onSubmit) {
      await onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col space-y-4 pt-4">
      {isFinalStep && (
        <div className="bg-purple-950 text-purple-300 p-4 rounded-md border border-purple-700">
          <p className="text-sm font-medium">
            You won’t be able to schedule a meeting again. Make sure you have scheduled it before proceeding.
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <input
              type="checkbox"
              id="meeting-checkbox"
              className="w-5 h-5 cursor-pointer accent-purple-500"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="meeting-checkbox" className="text-sm cursor-pointer text-purple-400">
              I have scheduled a meeting
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-between space-x-4">
        <Button
          onClick={onPrevious}
          disabled={currentStep === 1 || loading}
          variant="outline"
          className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 transition-colors px-8 py-6 text-sm font-normal"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={(isFinalStep && !checked) || loading}
          className={`w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : isFinalStep ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
};
