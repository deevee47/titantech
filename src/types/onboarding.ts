// src/types/onboarding.ts
export type UserData = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    companyName: string;
    streetAddress: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    aadharFront: File | null;
    aadharBack: File | null;
    panCard: File | null;
    investmentAmount: string;
    customerNote: string;
  };
  
  export type ValidationErrors = {
    [key in keyof UserData]?: string;
  };
  
  export type FileNames = {
    aadharFront: string;
    aadharBack: string;
    panCard: string;
  };
  