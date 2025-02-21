"use client"
import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { countries, getStatesForCountry } from "@/lib/country-state-data";

interface PersonalInfoStepProps {
  userData: {
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
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (name: string, value: string) => void;
  errors: {
    [key: string]: string | undefined;
  };
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  userData,
  handleInputChange,
  handleSelectChange,
  errors,
}) => {
  // Get available states based on selected country
  const availableStates = useMemo(() => {
    return getStatesForCountry(userData.country);
  }, [userData.country]);

  // Reset state if country changes and current state isn't valid
  React.useEffect(() => {
    if (userData.state && availableStates.length > 0 && !availableStates.includes(userData.state)) {
      handleSelectChange("state", "");
    }
  }, [userData.country, userData.state, availableStates]);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 10) { // Only allow up to 10 digits
      handleInputChange({
        ...e,
        target: {
          ...e.target,
          value,
          name: 'phone'
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-300">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-300">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handlePhoneInput}
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="1234567890"
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-gray-300">
          Company Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companyName"
          name="companyName"
          value={userData.companyName}
          onChange={handleInputChange}
          placeholder="Company Ltd."
          className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
            errors.companyName ? "border-red-500" : ""
          }`}
        />
        {errors.companyName && (
          <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-gray-300 text-2xl font-bold">
          Address Details <span className="text-red-500">*</span>
        </Label>
        
        {/* Street Address */}
        <div className="space-y-2">
          <Label htmlFor="streetAddress" className="text-gray-300">
            Street Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="streetAddress"
            name="streetAddress"
            value={userData.streetAddress}
            onChange={handleInputChange}
            placeholder="Street Address"
            className={`h-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
              errors.streetAddress ? "border-red-500" : ""
            }`}
          />
          {errors.streetAddress && (
            <p className="text-sm text-red-500 mt-1">{errors.streetAddress}</p>
          )}
        </div>

        {/* Country and State row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country" className="text-gray-300">
              Country <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={userData.country} 
              onValueChange={(value) => handleSelectChange("country", value)}
            >
              <SelectTrigger
                className={`bg-white/5 backdrop-blur-sm border-white/10 text-white focus:bg-white/5 ${
                  errors.country ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-md border-white/10 text-white max-h-64 overflow-y-auto">
                {countries.map((country) => (
                  <SelectItem key={country} value={country} className="text-white focus:bg-white/10 focus:text-white">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-red-500 mt-1">{errors.country}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state" className="text-gray-300">
              State <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={userData.state} 
              onValueChange={(value) => handleSelectChange("state", value)}
              disabled={!userData.country || availableStates.length === 0}
            >
              <SelectTrigger
                className={`bg-white/5 backdrop-blur-sm border-white/10 text-white focus:bg-white/5 ${
                  errors.state ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder={
                  !userData.country 
                    ? "Select country first" 
                    : availableStates.length === 0 
                      ? "No states available" 
                      : "Select state"
                } />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-md border-white/10 text-white max-h-64 overflow-y-auto">
                {availableStates.map((state) => (
                  <SelectItem key={state} value={state} className="text-white focus:bg-white/10 focus:text-white">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-sm text-red-500 mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        {/* City and ZIP/PIN Code row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-300">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              placeholder="City"
              className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            {errors.city && (
              <p className="text-sm text-red-500 mt-1">{errors.city}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pincode" className="text-gray-300">
              ZIP/PIN Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="pincode"
              name="pincode"
              value={userData.pincode}
              onChange={handleInputChange}
              placeholder="PIN/ZIP Code"
              className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 focus:bg-white/5 ${
                errors.pincode ? "border-red-500" : ""
              }`}
            />
            {errors.pincode && (
              <p className="text-sm text-red-500 mt-1">{errors.pincode}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;