
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
  image: string;
  title: string;
  description: string;
  maxLoanAmount: number;
  loanType: string;
  loanDetail: LoanDetail;
}
