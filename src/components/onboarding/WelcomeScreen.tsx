import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const WelcomeScreen = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/95 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          style={{
            top: "30%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            animation: "blob1 7s infinite ease-in-out",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"
          style={{
            top: "70%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            animation: "blob2 8s infinite ease-in-out",
          }}
        />
      </div>

      <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 w-full m-4">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4 text-center">
            <div className="inline-block mb-8">
              <span className="text-5xl font-bold  text-white">WELCOME</span>
            </div>
            <h1 className="text-3xl text-left md:text-3xl font-bold text-white">
              Your Information is Safe & Secure with TITANTECH INVESTMENTS
            </h1>
            <p className="text-gray-300 text-left text-sm md:text-base leading-relaxed">
              At TITANTECH INVESTMENTS, we prioritise your privacy and data
              security. All information you provide, including personal details
              and documents, is encrypted and securely stored in our protected
              database. We follow strict compliance measures to ensure
              confidentiality and prevent unauthorized access.
            </p>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              onClick={onContinue}
              className="bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal w-full max-w-xs"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};