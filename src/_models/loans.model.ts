


export interface LoanDetail {
  interestRate: number;
  tenureMonths: number;
  processingFee: number;
  downPaymentPercentage: number;
  repaymentType: string;
  documentsRequired: string[];
}

export interface LoanProduct {
  id: number;
  loanProductId?: number;
  title: string;
  imageUrl: string;
  maxLoanAmount: number;
  loanType: string;
  description:string;
  isActive: boolean;
  interestRate: number | null;
  tenureMonths: number | null;
  processingFee: number | null;
  minSalaryRequired?: number | null;
  downPaymentPercentage?: number | null;
  goldPurityRequired?: string | null;
  repaymentType: string | null;
  loanDetail:LoanDetail
}





export interface LoanType {
  id: number;
  image: string;
  title: string;
  description: string;
  maxLoanAmount: number;
  loanType: string;
  loanDetail: LoanDetail;
}

export interface LoanEnquiry{
  enquiryId:number,
  name:string,
  phoneNumber:string,
  loanAmountRequired:number,
  loanPurpose:string,
  createdAt:string
}



export interface LoanApplication {
  loanApplicationId: number;
  status: string;
  decisionDate: string | null; // ISO format or null
  decisionReason: string | null;
  isActive: boolean;
  createdAt: string; // ISO format
  loanType: string;
  userId: number;
  gender: string;
  loanProductId: number;
  requestedAmount: number;
  requestedTenure: number; // in months
  interestRate: number; // percentage (e.g., 7.25)
}
