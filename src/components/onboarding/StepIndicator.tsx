"use client"
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`w-2 h-2 rounded-full ${
            step === currentStep
              ? "bg-gradient-to-r from-pink-500 to-purple-500"
              : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;