import { Button } from "../ui/button";

export const NavigationButtons = ({
    currentStep,
    acceptedTerms,
    loading,
    onNext,
    onPrevious,
    isFinalStep,
    meetingScheduled,
  }: {
    currentStep: number;
    acceptedTerms: boolean;
    loading: boolean;
    onNext: () => void;
    onPrevious: () => void;
    isFinalStep: boolean;
    meetingScheduled: boolean;
  }) => (
    <div className="flex justify-between space-x-4 pt-4">
      <Button
        onClick={onPrevious}
        disabled={currentStep === 1}
        variant="outline"
        className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 transition-colors px-8 py-6 text-sm font-normal disabled:opacity-30"
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={isFinalStep ? loading || !meetingScheduled : false}
        className="w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal disabled:opacity-50"
      >
        {isFinalStep ? (loading ? "Processing..." : "Complete") : "Next"}
      </Button>
    </div>
  );