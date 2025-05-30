import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RepaymentService } from '../../_services/repayment.service';
import { TableColumn } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoanService } from '../../_services/loan.service';

@Component({
  selector: 'app-replaymentloan',
  standalone: true,
  imports: [CommonModule, TableComponent,RouterLink],
  templateUrl: './replaymentloan.component.html',
  styleUrl: './replaymentloan.component.scss',
})
export class ReplaymentloanComponent implements OnInit {
  loanApplicationId: number = 0;
  repayments: any[] = [];
  loading = false;

  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;

  columns: TableColumn[] = [];

  constructor(
    private route: ActivatedRoute,
    private repaymentService: RepaymentService,
    private loanService: LoanService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loanApplicationId = +params['id'];
      this.fetchRepayments();
    });
    this.columns = [
      { header: 'EMI #', field: 'installmentNumber', type: 'number' },
      { header: 'Due Date', field: 'dueDate', type: 'date' },
      { header: 'Principal', field: 'principalAmount', type: 'number' },
      { header: 'Interest', field: 'interestAmount', type: 'number' },
      { header: 'Total', field: 'totalAmount', type: 'number' },
      { header: 'Status', field: 'status', type: 'text' },
      {
        header: 'Actions',
        field: 'actions',
        type: 'custom',
        customTemplate: this.actionTemplate,
      },
    ];
  }

  fetchRepayments() {
    this.loading = true;
    this.loanService.getLoanById(this.loanApplicationId).subscribe({
      next: (data) => {
        console.log('repayments', data);
        if (data && Array.isArray(data.data)) {
          this.repayments = data.data;
        }

        this.loading = false;
      },
      error: () => {
        this.repayments = [];
        this.loading = false;
      },
    });
  }

  addPenalty(repayment: any) {
    this.repaymentService.applyPenalty(repayment.repaymentId).subscribe(() => {
      this.fetchRepayments();
    });
  }
}
