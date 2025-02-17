"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createUser } from "@/actions/user";
import { Upload } from "lucide-react";

const OnboardCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    aadharFront: null as File | null,
    aadharBack: null as File | null,
    panCard: null as File | null,
    investmentAmount: "",
    customerNote: "",
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
    }
  };

  const uploadFile = async (file: File) => {
    // Implement your file upload logic here
    // This is a placeholder that simulates file upload
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`https://example.com/uploads/${file.name}`);
      }, 1000);
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

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

      //Server Action Call
      const result = await createUser({
        ...userData,
        address: formattedAddress,
        aadharFrontUrl,
        aadharBackUrl,
        panCardUrl,
        paymentDone: false,
        investmentAmount: parseFloat(userData.investmentAmount),
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "User created successfully",
        });
        setUserData({
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
        });
        setFileNames({
          aadharFront: "",
          aadharBack: "",
          panCard: "",
        });
        setCurrentStep(1);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-300">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-300">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            placeholder="1234567890"
            className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-gray-300">
          Company Name
        </Label>
        <Input
          id="companyName"
          name="companyName"
          value={userData.companyName}
          onChange={handleInputChange}
          placeholder="Company Ltd."
          className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-gray-300">Address Details</Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              id="streetAddress"
              name="streetAddress"
              value={userData.streetAddress}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="h-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="city"
                name="city"
                value={userData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="state"
                name="state"
                value={userData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="w-1/2">
            <Input
              id="pincode"
              name="pincode"
              value={userData.pincode}
              onChange={handleInputChange}
              placeholder="PIN Code"
              className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsAndInvestment = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aadharFront" className="text-gray-300">
            Aadhar Card (Front)
          </Label>
          <div className="relative">
            <Input
              id="aadharFront"
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "aadharFront")}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("aadharFront")?.click()}
              variant="outline"
              className="w-full bg-white/5 backdrop-blur-sm border-dashed border-white/20 text-white hover:bg-white/10 py-8"
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>{fileNames.aadharFront || "Upload Aadhar Front"}</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="aadharBack" className="text-gray-300">
            Aadhar Card (Back)
          </Label>
          <div className="relative">
            <Input
              id="aadharBack"
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "aadharBack")}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("aadharBack")?.click()}
              variant="outline"
              className="w-full bg-white/5 backdrop-blur-sm border-dashed border-white/20 text-white hover:bg-white/10 py-8"
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>{fileNames.aadharBack || "Upload Aadhar Back"}</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="panCard" className="text-gray-300">
            PAN Card
          </Label>
          <div className="relative">
            <Input
              id="panCard"
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "panCard")}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("panCard")?.click()}
              variant="outline"
              className="w-full bg-white/5 backdrop-blur-sm border-dashed border-white/20 text-white hover:bg-white/10 py-8"
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>{fileNames.panCard || "Upload PAN Card"}</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="investmentAmount" className="text-gray-300">
          Investment Amount
        </Label>
        <Input
          id="investmentAmount"
          name="investmentAmount"
          type="number"
          value={userData.investmentAmount}
          onChange={handleInputChange}
          placeholder="0.00"
          className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerNote" className="text-gray-300">
          Customer's Note
        </Label>
        <Textarea
          id="customerNote"
          name="customerNote"
          value={userData.customerNote}
          onChange={handleInputChange}
          placeholder="Tell us anything we should know about you..."
          className="h-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
        />
      </div>
    </div>
  );

  const stepTitles = {
    1: "Personal Information",
    2: "Documents & Investment",
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-3xl"
          style={{
            top: "20%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            animation: "blob1 7s infinite ease-in-out",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl"
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
            <div className="flex justify-center space-x-2">
              {[1, 2].map((step) => (
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
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderDocumentsAndInvestment()}

            <div className="flex justify-between space-x-4 pt-4">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 transition-colors px-8 py-6 text-sm font-normal disabled:opacity-30"
              >
                Previous
              </Button>
              {currentStep < 2 ? (
                <Button
                  onClick={nextStep}
                  className="w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal"
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
