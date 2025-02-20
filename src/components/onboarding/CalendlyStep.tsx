import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Check } from "lucide-react";

interface CalendlyStepProps {
  onPrevious: () => void;
  onNext: () => void;
  onCalendlyUrlChange: (url: string) => void;
  defaultCalendlyUrl?: string;
}

const CalendlyStep: React.FC<CalendlyStepProps> = ({
  onPrevious,
  onNext,
  onCalendlyUrlChange,
  defaultCalendlyUrl = "",
}) => {
  const [isAppointmentScheduled, setIsAppointmentScheduled] = useState(false);
  const [calendlyEventUrl, setCalendlyEventUrl] = useState(defaultCalendlyUrl);
  
  useEffect(() => {
    const handleCalendlyEvent = (e: any) => {
      if (e.data.event && e.data.event.indexOf("calendly") === 0) {
        if (e.data.event === "calendly.event_scheduled") {
          const eventUrl = e.data.payload?.event?.uri || "";
          if (eventUrl) {
            setCalendlyEventUrl(eventUrl);
            onCalendlyUrlChange(eventUrl);
            setIsAppointmentScheduled(true);
          }
        }
      }
    };

    window.addEventListener("message", handleCalendlyEvent);
    
    return () => {
      window.removeEventListener("message", handleCalendlyEvent);
    };
  }, [onCalendlyUrlChange]);

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 ">
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">Schedule a Consultation</h2>
          <p className="text-center text-gray-600 mt-2">
            Select a convenient time for your investment consultation
          </p>
        </div>

        {isAppointmentScheduled ? (
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-center text-green-800">
              Appointment Scheduled Successfully!
            </h3>
            <p className="text-center text-green-700 mt-2">
              Your consultation has been booked. You can proceed to the next step.
            </p>
          </div>
        ) : (
          <div className="h-[500px] mb-4">
            <InlineWidget
              url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-calendly-link"}
              styles={{
                height: '100%',
                width: '100%',
              }}
              prefill={{
                email: "",
                firstName: "",
                lastName: "",
                name: "",
              }}
            />
          </div>
        )}

        
      </CardContent>
    </Card>
  );
};

export default CalendlyStep;