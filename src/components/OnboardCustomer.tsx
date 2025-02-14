"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createUser } from "../../actions/user";
import { toast } from "@/hooks/use-toast";


const OnboardCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    companyName: "",
    address: "",
    aadharFrontUrl: "",
    aadharBackUrl: "",
    panCardUrl: "",
    investmentAmount: "",
    paymentDone: false,
    remark: "",
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await createUser({
        ...userData,
        investmentAmount: parseFloat(userData.investmentAmount),
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "User created successfully",
        });
        // Reset form
        setUserData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          companyName: "",
          address: "",
          aadharFrontUrl: "",
          aadharBackUrl: "",
          panCardUrl: "",
          investmentAmount: "",
          paymentDone: false,
          remark: "",
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

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                placeholder="1234567890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={userData.companyName}
              onChange={handleInputChange}
              placeholder="Company Ltd."
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="Enter full address"
              className="h-20"
            />
          </div>

          {/* Document URLs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aadharFrontUrl">Aadhar Front URL</Label>
              <Input
                id="aadharFrontUrl"
                name="aadharFrontUrl"
                value={userData.aadharFrontUrl}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadharBackUrl">Aadhar Back URL</Label>
              <Input
                id="aadharBackUrl"
                name="aadharBackUrl"
                value={userData.aadharBackUrl}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="panCardUrl">PAN Card URL</Label>
              <Input
                id="panCardUrl"
                name="panCardUrl"
                value={userData.panCardUrl}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Investment and Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investmentAmount">Investment Amount</Label>
              <Input
                id="investmentAmount"
                name="investmentAmount"
                type="number"
                value={userData.investmentAmount}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentDone">Payment Status</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="paymentDone"
                  checked={userData.paymentDone}
                  onCheckedChange={(checked) =>
                    setUserData((prev) => ({ ...prev, paymentDone: checked }))
                  }
                />
                <Label htmlFor="paymentDone">Payment Done</Label>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remark">Remarks</Label>
            <Textarea
              id="remark"
              name="remark"
              value={userData.remark}
              onChange={handleInputChange}
              placeholder="Any additional notes..."
              className="h-20"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Getting you started!" : "Get me Started"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardCustomer;
