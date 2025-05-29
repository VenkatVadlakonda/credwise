import { Component, inject, OnInit } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { AdminService } from '../../_services/admin.service';
import { LoanService } from '../../_services/loan.service';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { LoanProductService } from '../../_services/loan-product.service';
import { LoanType } from '../../_models/loans.model';

@Component({
  selector: 'app-dashboard',
  imports: [NzCarouselModule, CommonModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  loanType: LoanType[] = [];
  emiplans: any;

  private loanTypeService = inject(LoanProductService);
  private loanService = inject(LoanService);
currentSlide: any;

  ngOnInit(): void {
    this.loanTypeService.getAllLoanType().subscribe((response) => {
      console.log(response);
      if (response && Array.isArray(response.data)) {
        this.loanType = response.data;
      }
    });

    this.emiplans = this.loanService.getEmiPlans();
  }
}
