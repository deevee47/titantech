"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createUser } from "../../actions/user";
import { toast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface ImageData {
  file: File | null;
  preview: string;
}

const OnboardCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    companyName: "",
    address: "",
    investmentAmount: "",
    paymentDone: false,
    remark: "",
  });

  const [images, setImages] = useState<{
    aadharFront: ImageData;
    aadharBack: ImageData;
    panCard: ImageData;
  }>({
    aadharFront: { file: null, preview: "" },
    aadharBack: { file: null, preview: "" },
    panCard: { file: null, preview: "" },
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

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "aadharFront" | "aadharBack" | "panCard"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prev) => ({
          ...prev,
          [type]: {
            file,
            preview: reader.result as string,
          },
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: "aadharFront" | "aadharBack" | "panCard") => {
    setImages((prev) => ({
      ...prev,
      [type]: { file: null, preview: "" },
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      
      if (images.aadharFront.file) {
        formData.append("aadharFront", images.aadharFront.file);
      }
      if (images.aadharBack.file) {
        formData.append("aadharBack", images.aadharBack.file);
      }
      if (images.panCard.file) {
        formData.append("panCard", images.panCard.file);
      }

      const result = await createUser(formData);

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
          address: "",
          investmentAmount: "",
          paymentDone: false,
          remark: "",
        });
        setImages({
          aadharFront: { file: null, preview: "" },
          aadharBack: { file: null, preview: "" },
          panCard: { file: null, preview: "" },
        });
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

  const ImageUploadSection = ({ 
    type, 
    title 
  }: { 
    type: "aadharFront" | "aadharBack" | "panCard";
    title: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-white text-lg font-medium">{title}</Label>
      <div className="border border-purple-600/40 rounded-xl p-4 bg-black/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02]">
        {images[type].preview ? (
          <div className="relative">
            <div className="w-full min-h-[200px] max-h-[400px] overflow-hidden rounded-lg shadow-inner">
              <img
                src={images[type].preview}
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>
            <button
              onClick={() => removeImage(type)}
              className="absolute top-2 right-2 p-2 bg-red-500/90 hover:bg-red-600 rounded-full text-white transition-colors shadow-lg hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="block relative cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, type)}
              className="sr-only"
            />
            <div className="w-full h-40 border-dashed border-2 border-purple-600/60 rounded-lg flex items-center justify-center bg-black/30 hover:bg-black/40 text-gray-300 transition-all duration-300 hover:border-purple-500/50 group">
              <div className="flex items-center">
                <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg group-hover:text-purple-400 transition-colors">Upload {title}</span>
              </div>
            </div>
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a2e] to-[#0f3460] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8 bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-purple-800/50 hover:shadow-purple-500/10 transition-shadow duration-300">
          <h1 className="text-3xl font-bold text-white text-center mb-8 animate-fade-in">
            Customer Onboarding
          </h1>
          
          {/* Personal Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 animate-fade-in-up delay-100">
                <Label className="text-white text-lg font-medium">First name *</Label>
                <Input
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="bg-black/20 border-0 border-b-2 border-purple-600/50 rounded-none text-gray-300 text-lg placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 pb-2 transition-colors shadow-sm hover:border-purple-400"
                />
              </div>

              <div className="space-y-2 animate-fade-in-up delay-150">
                <Label className="text-white text-lg font-medium">Last name *</Label>
                <Input
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  placeholder="Smith"
                  className="bg-black/20 border-0 border-b-2 border-purple-600/50 rounded-none text-gray-300 text-lg placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 pb-2 transition-colors shadow-sm hover:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in-up delay-200">
              <Label className="text-white text-lg font-medium">Phone number *</Label>
              <div className="flex gap-2">
                <div className="w-16">
                  <Input
                    type="text"
                    value="+91"
                    readOnly
                    className="bg-black/20 border-0 border-b-2 border-purple-600/50 rounded-none text-gray-300 text-lg focus:ring-0 pb-2 text-center transition-colors shadow-sm"
                  />
                </div>
                <Input
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  placeholder="081234 56789"
                  className="bg-black/20 border-0 border-b-2 border-purple-600/50 rounded-none text-gray-300 text-lg placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 pb-2 transition-colors shadow-sm hover:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in-up delay-250">
              <Label className="text-white text-lg font-medium">Email *</Label>
              <Input
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="bg-black/20 border-0 border-b-2 border-purple-600/50 rounded-none text-gray-300 text-lg placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 pb-2 transition-colors shadow-sm hover:border-purple-400"
              />
            </div>

            <div className="space-y-2 animate-fade-in-up delay-300">
              <Label className="text-white text-lg font-medium">Company</Label>
              <Input
                name="companyName"
                value={userData.companyName}
                onChange={handleInputChange}
                placeholder="Acme Corporation"
                className="bg-black/20 border-0 border-b-2 border-purple-600/50 rounded-none text-gray-300 text-lg placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 pb-2 transition-colors shadow-sm hover:border-purple-400"
              />
            </div>

            <div className="space-y-2 animate-fade-in-up delay-350">
              <Label className="text-white text-lg font-medium">Address</Label>
              <Textarea
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                className="bg-black/20 border border-purple-600/50 rounded-lg text-gray-300 placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 min-h-[100px] shadow-sm hover:border-purple-400"
              />
            </div>
          </div>

          {/* Document Uploads */}
          <div className="space-y-6 pt-4">
            <h2 className="text-2xl font-semibold text-white mb-4 animate-fade-in-up delay-400">
              Document Upload
            </h2>
            <ImageUploadSection type="aadharFront" title="Aadhar Front" />
            <ImageUploadSection type="aadharBack" title="Aadhar Back" />
            <ImageUploadSection type="panCard" title="PAN Card" />
          </div>

          {/* Investment and Payment */}
          <div className="space-y-6 pt-4">
            <h2 className="text-2xl font-semibold text-white mb-4 animate-fade-in-up delay-500">
              Investment Details
            </h2>
            <div className="space-y-2 animate-fade-in-up delay-550">
              <Label className="text-white text-lg font-medium">Investment Amount</Label>
              <Input
                name="investmentAmount"
                type="number"
                value={userData.investmentAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                className="bg-black/20 border-0 border-b-2 border-purple-600/50 rounded-none text-gray-300 text-lg placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 pb-2 transition-colors shadow-sm hover:border-purple-400"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-600/40 shadow-lg animate-fade-in-up delay-600">
              <Label className="text-white text-lg font-medium">Payment Status</Label>
              <Switch
                checked={userData.paymentDone}
                onCheckedChange={(checked) =>
                  setUserData((prev) => ({ ...prev, paymentDone: checked }))
                }
                className="data-[state=checked]:bg-purple-500"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2 pt-4 animate-fade-in-up delay-650">
            <Label className="text-white text-lg font-medium">Remarks</Label>
            <Textarea
              name="remark"
              value={userData.remark}
              onChange={handleInputChange}
              placeholder="Any additional notes..."
              className="bg-black/20 border border-purple-600/50 rounded-lg text-gray-300 placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 min-h-[100px] shadow-sm hover:border-purple-400"
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 mt-8 animate-fade-in-up delay-700"
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardCustomer;