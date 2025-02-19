// types/user.ts

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  investmentAmount: number;
  calendlyUrl?: string; // Added new field
  paymentDone: boolean;
  remark: string | null;
  customerNote: string | null;
  createdAt: string;
  aadharFrontUrl?: string;
  aadharBackUrl?: string;
  panCardUrl?: string;
};

export type SortField =
  | "firstName"
  | "lastName"
  | "email"
  | "companyName"
  | "investmentAmount"
  | "createdAt";

export interface EditState {
  id: string;
  value: string;
}