import { Pipe, PipeTransform } from '@angular/core';
import { LoanApplication } from '../_models/loans.model';

@Pipe({
  name: 'repayment',
})
export class RepaymentPipe implements PipeTransform {
  transform(value: any[], loanId: string): any[] {
    if (!loanId || loanId.trim() === '') {
      return value;
    }
    const numericLoanId = parseInt(loanId, 10);
    return value.filter((data) => data.loanApplicationId === numericLoanId || data.userId===numericLoanId);
  }
}
