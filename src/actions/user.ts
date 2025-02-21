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
  calendlyLink?: string; // Make it optional in TypeScript
  paymentDone?: boolean;
  remark?: string;
  customerNote?: string;
};

export async function createUser(data: User) {
  try {
    // Validate payload
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return {
        success: false,
        message: "Invalid user data provided",
        error: "VALIDATION_ERROR",
      };
    }

    // Basic validation
    if (!data.firstName || !data.lastName || !data.phone || !data.email) {
      return {
        success: false,
        message: "Required fields are missing",
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
        calendlyLink: data.calendlyLink || "https://calendly.com/default",
        investmentAmount: data.investmentAmount,
        paymentDone: data.paymentDone || false,
        remark: data.remark || null,
        customerNote: data.customerNote || null,
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

type GetUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'firstName' | 'lastName' | 'email' | 'companyName' | 'investmentAmount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  paymentStatus?: boolean;
};

export async function getUsers({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
  paymentStatus
}: GetUsersParams = {}) {
  try {
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Prepare filter conditions
    const where = {
      AND: [
        // Search condition
        search ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" as const } },
            { lastName: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { companyName: { contains: search, mode: "insensitive" as const } },
            { phone: { contains: search } }
          ]
        } : {},
        // Payment status filter
        typeof paymentStatus === 'boolean' ? { paymentDone: paymentStatus } : {}
      ]
    };

    // Get total count for pagination
    const total = await prisma.user.count({ where });

    // Get users with pagination, sorting, and filtering
    const users = await prisma.user.findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        companyName: true,
        address: true,
        investmentAmount: true,
        paymentDone: true,
        remark: true,
        customerNote: true,
        calendlyLink: true, // Include in select
        createdAt: true,
        updatedAt: true,
        // Exclude sensitive URLs from default select
        aadharFrontUrl: true,
        aadharBackUrl: true,
        panCardUrl: true,
      },
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      success: true,
      data: {
        users,
        metadata: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      },
    };
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      error: "Failed to fetch users",
      message: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}


export async function updateUserRemark(userId: string, remark: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { remark },
    });

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update remark",
    };
  }
}