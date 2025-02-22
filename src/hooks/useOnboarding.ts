"use client"
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { createUser } from "@/actions/user";
import { UserData, ValidationErrors, FileNames } from '@/types/onboarding';

async function uploadFiles(formData: FormData) {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return {
      success: true,
      urls: data.urls,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to upload files',
    };
  }
}

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
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^(image\/.*|application\/pdf)$/)) {
      toast({
        title: "Invalid file type",
        description: "Please upload only PDF or image files",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUserData(prev => ({ ...prev, [field]: file }));
    setFileNames(prev => ({ ...prev, [field]: file.name }));
    
    if (errors[field as keyof UserData]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!userData.aadharFront || !userData.aadharBack || !userData.panCard) {
        throw new Error('Please upload all required documents');
      }

      // Format address
      const formattedAddress = `${userData.streetAddress}, ${userData.city}, ${userData.state} - ${userData.pincode}, ${userData.country}`;

      // Create form data for file upload
      const formData = new FormData();
      formData.append('aadharFront', userData.aadharFront);
      formData.append('aadharBack', userData.aadharBack);
      formData.append('panCard', userData.panCard);

      // Upload files first
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.success) {
        throw new Error(uploadResult.message || 'Failed to upload files');
      }

      // Create user payload matching the schema
      const userPayload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        email: userData.email,
        companyName: userData.companyName,
        address: formattedAddress,
        aadharFrontUrl: uploadResult.urls.aadharFront,
        aadharBackUrl: uploadResult.urls.aadharBack,
        panCardUrl: uploadResult.urls.panCard,
        investmentAmount: parseFloat(userData.investmentAmount),
        customerNote: userData.customerNote || undefined
      };

      const createUserResponse = await createUser(userPayload);

      if (!createUserResponse.success) {
        throw new Error(createUserResponse.message || 'Failed to create user');
      }

      toast({
        title: "Success",
        description: "Registration completed successfully",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
    handleSubmit,
  };
};