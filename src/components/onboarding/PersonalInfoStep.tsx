"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: {
    [key: string]: string | undefined;
  };
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  userData,
  handleInputChange,
  errors,
}) => {
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
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
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
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
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
            onChange={handleInputChange}
            placeholder="1234567890"
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
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
            className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
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
          className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
            errors.companyName ? "border-red-500" : ""
          }`}
        />
        {errors.companyName && (
          <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-gray-300">
          Address Details <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              id="streetAddress"
              name="streetAddress"
              value={userData.streetAddress}
              onChange={handleInputChange}
              placeholder="Street Address"
              className={`h-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
                errors.streetAddress ? "border-red-500" : ""
              }`}
            />
            {errors.streetAddress && (
              <p className="text-sm text-red-500 mt-1">{errors.streetAddress}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="city"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                placeholder="City"
                className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
                  errors.city ? "border-red-500" : ""
                }`}
              />
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">{errors.city}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                id="state"
                name="state"
                value={userData.state}
                onChange={handleInputChange}
                placeholder="State"
                className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
                  errors.state ? "border-red-500" : ""
                }`}
              />
              {errors.state && (
                <p className="text-sm text-red-500 mt-1">{errors.state}</p>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <Input
              id="pincode"
              name="pincode"
              value={userData.pincode}
              onChange={handleInputChange}
              placeholder="PIN Code"
              className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
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