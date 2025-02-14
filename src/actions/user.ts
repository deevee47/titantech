"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Type for the user input
type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  address: string;
  aadharFrontUrl: string;
  aadharBackUrl: string;
  panCardUrl: string;
  investmentAmount: number;
  paymentDone?: boolean;
  remark?: string;
};

export async function createUser(data: User) {
  try {
    // Basic validation
    if (!data.firstName || !data.lastName || !data.phone || !data.email) {
      return {
        success: false,
        message: "Required fields are missing",
        error: "VALIDATION_ERROR",
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Invalid email format",
        error: "VALIDATION_ERROR",
      };
    }

    // Phone number validation (basic example - modify as per your requirements)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
      return {
        success: false,
        message: "Invalid phone number format",
        error: "VALIDATION_ERROR",
      };
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        companyName: data.companyName,
        address: data.address,
        aadharFrontUrl: data.aadharFrontUrl,
        aadharBackUrl: data.aadharBackUrl,
        panCardUrl: data.panCardUrl,
        investmentAmount: data.investmentAmount,
        paymentDone: data.paymentDone || false,
        remark: data.remark || null,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      user,
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    return {
      success: false,
      message: "Failed to create user",
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}