export interface RepaymentPlanDTO {
  InstallmentNumber: number;
  DueDate: string;
  PrincipalAmount: number;
  InterestAmount: number;
  TotalAmount: number;
  RemainingBalance: number;
}
