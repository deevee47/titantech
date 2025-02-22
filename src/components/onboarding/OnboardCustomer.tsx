"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useOnboarding } from '@/hooks/useOnboarding';
import { validatePersonalInfo, validateDocuments } from '@/utils/validation';
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import DocumentsStep from "@/components/onboarding/DocumentsStep";
import CalendlyStep from "@/components/onboarding/CalendlyStep";
import TermsStep from "@/components/onboarding/TermsStep";
import StepIndicator from "@/components/onboarding/StepIndicator";
import { NavigationButtons } from './NavigationButtons';
import { BackgroundBlobs } from './BackgroundBlobs';
import { WelcomeScreen } from './WelcomeScreen';
import { useRouter } from 'next/navigation';

const OnboardCustomer = () => {
  const onboarding = useOnboarding();
  const [showWelcome, setShowWelcome] = useState(true);
  const router = useRouter();

  if (showWelcome) {
    return <WelcomeScreen onContinue={() => setShowWelcome(false)} />;
  }

  const {
    currentStep,
    acceptedTerms,
    loading,
    setCurrentStep,
    meetingScheduled,
    userData,
    fileNames,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    setMeetingScheduled,
    setAcceptedTerms,
  } = onboarding;

  const stepTitles = {
    1: "Personal Information",
    2: "Documents & Investment",
    3: "Terms & Conditions",
    4: "Schedule Meeting",
  };

  const handleNext = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      const errors = validatePersonalInfo(userData);
      onboarding.setErrors(errors);
      isValid = Object.keys(errors).length === 0;
    } else if (currentStep === 2) {
      const errors = validateDocuments(userData);
      onboarding.setErrors(errors);
      isValid = Object.keys(errors).length === 0;
    } else if (currentStep === 3) {
      isValid = acceptedTerms;
      if (!isValid) {
        toast({
          title: "Terms Required",
          description: "Please accept the terms and conditions before proceeding",
          variant: "destructive",
        });
      }
    } else {
      isValid = meetingScheduled;
      if (!isValid) {
        toast({
          title: "Schedule Required",
          description: "Please confirm your meeting scheduling to complete the process",
          variant: "destructive",
        });
      }
    }
    
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    await onboarding.handleSubmit();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundBlobs />
      
      <div className="relative z-10 py-8 px-4">
        <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl font-bold text-center text-white">
              {stepTitles[currentStep as keyof typeof stepTitles]}
            </CardTitle>
            <StepIndicator currentStep={currentStep} totalSteps={4} />
          </CardHeader>
          
          <CardContent className="px-6 py-3">
            {currentStep === 1 && (
              <PersonalInfoStep
                userData={userData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                errors={onboarding.errors}
              />
            )}
            {currentStep === 2 && (
              <DocumentsStep
                userData={userData}
                fileNames={fileNames}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                errors={onboarding.errors}
              />
            )}
            {currentStep === 3 && (
              <TermsStep
                acceptedTerms={acceptedTerms}
                setAcceptedTerms={setAcceptedTerms}
              />
            )}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="text-white text-center mb-4">
                  <p>Please schedule a meeting with our investment team</p>
                </div>
                <div className="calendly-container" style={{ height: '600px', overflow: 'hidden' }}>
                  <CalendlyStep onPrevious={handlePrevious} onNext={handleNext} onCalendlyUrlChange={() => {}} />
                </div>
              </div>
            )}
            
            <NavigationButtons
              currentStep={currentStep}
              acceptedTerms={acceptedTerms}
              loading={loading}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFinalStep={currentStep === 4}
              meetingScheduled={meetingScheduled}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardCustomer;
