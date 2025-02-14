export interface User {
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
