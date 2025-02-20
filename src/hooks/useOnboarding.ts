import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { createUser } from "@/actions/user";
import { UserData, ValidationErrors, FileNames } from '@/types/onboarding';

export const useOnboarding = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [meetingScheduled, setMeetingScheduled] = useState(false);
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
    country: "",
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    investmentAmount: "",
    customerNote: "",
  });
  const [fileNames, setFileNames] = useState<FileNames>({
    aadharFront: "",
    aadharBack: "",
    panCard: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
      setUserData(prev => ({ ...prev, [field]: file }));
      setFileNames(prev => ({ ...prev, [field]: file.name }));
      if (errors[field as keyof UserData]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
  };

  return {
    loading,
    currentStep,
    acceptedTerms,
    meetingScheduled,
    errors,
    userData,
    fileNames,
    setLoading,
    setCurrentStep,
    setAcceptedTerms,
    setMeetingScheduled,
    setErrors,
    setUserData,
    setFileNames,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
  };
};