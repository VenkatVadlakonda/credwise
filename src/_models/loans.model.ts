
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
}

