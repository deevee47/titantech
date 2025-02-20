import { UserData, ValidationErrors } from '@/types/onboarding';

export const validatePersonalInfo = (userData: UserData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!userData.firstName.trim()) errors.firstName = "First name is required";
  if (!userData.lastName.trim()) errors.lastName = "Last name is required";
  if (!userData.companyName.trim()) errors.companyName = "Company name is required";
  
  if (!userData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!userData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(userData.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }
  
  if (!userData.country) errors.country = "Country is required";
  if (!userData.streetAddress.trim()) errors.streetAddress = "Street address is required";
  if (!userData.city.trim()) errors.city = "City is required";
  if (!userData.state.trim()) errors.state = "State is required";
  
  if (!userData.pincode.trim()) {
    errors.pincode = "PIN code is required";
  } else if (!/^\d{6}$/.test(userData.pincode)) {
    errors.pincode = "Please enter a valid 6-digit PIN code";
  }
  
  return errors;
};

export const validateDocuments = (userData: UserData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!userData.aadharFront) errors.aadharFront = "Aadhar front image is required";
  if (!userData.aadharBack) errors.aadharBack = "Aadhar back image is required";
  if (!userData.panCard) errors.panCard = "PAN card image is required";
  
  if (!userData.investmentAmount.trim()) {
    errors.investmentAmount = "Investment amount is required";
  } else if (isNaN(parseFloat(userData.investmentAmount)) || parseFloat(userData.investmentAmount) <= 0) {
    errors.investmentAmount = "Please enter a valid investment amount";
  }
  
  return errors;
};