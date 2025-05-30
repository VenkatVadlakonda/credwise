export interface FDType {
  fdtypeId: number;
  name: string;
  description: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  duration: number;
  isActive: boolean;
}