"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createUser } from "@/actions/user";

// Update these imports with absolute paths
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import DocumentsStep from "@/components/onboarding/DocumentsStep";
import CalendlyStep from "@/components/onboarding/CalendlyStep";
import TermsStep from "@/components/onboarding/TermsStep";
import StepIndicator from "@/components/onboarding/StepIndicator";

// Define the user data type with calendlyLink
type UserData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  aadharFront: File | null;
  aadharBack: File | null;
  panCard: File | null;
  investmentAmount: string;
  customerNote: string;
  calendlyLink: string; // Added calendlyLink
};

// Define validation errors type
type ValidationErrors = {
  [key in keyof UserData]?: string;
};

const OnboardCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    investmentAmount: "",
    customerNote: "",
    calendlyLink: "", // Initialize calendlyLink
  });

  const [fileNames, setFileNames] = useState({
    aadharFront: "",
    aadharBack: "",
    panCard: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof UserData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload only PDF or image files",
          variant: "destructive",
        });
        return;
      }
      setUserData((prev) => ({
        ...prev,
        [field]: file,
      }));
      setFileNames((prev) => ({
        ...prev,
        [field]: file.name,
      }));
      
      // Clear error for this field
      if (errors[field as keyof UserData]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
    }
  };

  const handleCalendlyUrlChange = (url: string) => {
    setUserData(prev => ({
      ...prev,
      calendlyLink: url
    }));
    
    // Clear error if it exists
    if (errors.calendlyLink) {
      setErrors(prev => ({
        ...prev,
        calendlyLink: undefined
      }));
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.public_id;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const validatePersonalInfo = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Required fields
    if (!userData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!userData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!userData.companyName.trim()) newErrors.companyName = "Company name is required";
    
    // Email validation
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    if (!userData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(userData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    // Address validation
    if (!userData.streetAddress.trim()) newErrors.streetAddress = "Street address is required";
    if (!userData.city.trim()) newErrors.city = "City is required";
    if (!userData.state.trim()) newErrors.state = "State is required";
    if (!userData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(userData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit PIN code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDocuments = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Required files
    if (!userData.aadharFront) newErrors.aadharFront = "Aadhar front image is required";
    if (!userData.aadharBack) newErrors.aadharBack = "Aadhar back image is required";
    if (!userData.panCard) newErrors.panCard = "PAN card image is required";
    
    // Investment amount validation
    if (!userData.investmentAmount.trim()) {
      newErrors.investmentAmount = "Investment amount is required";
    } else if (isNaN(parseFloat(userData.investmentAmount)) || parseFloat(userData.investmentAmount) <= 0) {
      newErrors.investmentAmount = "Please enter a valid investment amount";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCalendly = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!userData.calendlyLink) {
      newErrors.calendlyLink = "Please schedule a consultation before proceeding";
      setErrors(newErrors);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Final validation
      if (!userData.calendlyLink) {
        toast({
          title: "Missing Appointment",
          description: "Please schedule a consultation before completing registration",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Upload files first
      const [aadharFrontUrl, aadharBackUrl, panCardUrl] = await Promise.all([
        userData.aadharFront
          ? uploadFile(userData.aadharFront)
          : Promise.resolve(""),
        userData.aadharBack
          ? uploadFile(userData.aadharBack)
          : Promise.resolve(""),
        userData.panCard ? uploadFile(userData.panCard) : Promise.resolve(""),
      ]);

      const formattedAddress = `${userData.streetAddress}, ${userData.city}, ${userData.state} - ${userData.pincode}`;

      // Server Action Call - with calendlyLink
      const result = await createUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        email: userData.email,
        companyName: userData.companyName,
        address: formattedAddress,
        aadharFrontUrl,
        aadharBackUrl,
        panCardUrl,
        calendlyLink: userData.calendlyLink, // Include calendlyLink
        paymentDone: false,
        investmentAmount: parseFloat(userData.investmentAmount || "0"),
        customerNote: userData.customerNote,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "User created successfully",
        });
        // Reset form or redirect
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create user",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    let isValid = false;
    
    // Validate current step
    if (currentStep === 1) {
      isValid = validatePersonalInfo();
    } else if (currentStep === 2) {
      isValid = validateDocuments();
    } else if (currentStep === 3) {
      isValid = validateCalendly();
    } else {
      isValid = true;
    }
    
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      // Show toast for validation errors
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepTitles = {
    1: "Personal Information",
    2: "Documents & Investment",
    3: "Schedule Consultation", // New step
    4: "Terms & Conditions",
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full bg-purple-600/30 blur-3xl"
          style={{
            top: "20%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            animation: "blob1 7s infinite ease-in-out",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
          style={{
            top: "60%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            animation: "blob2 8s infinite ease-in-out",
          }}
        />
      </div>

      <div className="relative z-10 py-8 px-4">
        <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-white">
              {stepTitles[currentStep as keyof typeof stepTitles]}
            </CardTitle>
            <StepIndicator currentStep={currentStep} totalSteps={4} />
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <PersonalInfoStep 
                userData={userData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <DocumentsStep
                userData={userData}
                fileNames={fileNames}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <CalendlyStep
                              onCalendlyUrlChange={handleCalendlyUrlChange}
                              defaultCalendlyUrl={userData.calendlyLink} onPrevious={function (): void {
                                  throw new Error("Function not implemented.");
                              } } onNext={function (): void {
                                  throw new Error("Function not implemented.");
                              } }              />
            )}
            {currentStep === 4 && (
              <TermsStep
                acceptedTerms={acceptedTerms}
                setAcceptedTerms={setAcceptedTerms}
              />
            )}

            <div className="flex justify-between space-x-4 pt-4">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 transition-colors px-8 py-6 text-sm font-normal disabled:opacity-30"
              >
                Previous
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  className="w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal"
                  disabled={currentStep === 3 && !userData.calendlyLink}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !acceptedTerms}
                  className="w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Complete"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes blob1 {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        @keyframes blob2 {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default OnboardCustomer;