import { Component, inject, OnInit } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { AdminService } from '../../_services/admin.service';
import { LoanService } from '../../_services/loan.service';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { TableComponent } from "../../shared/components/table/table.component";

@Component({
  selector: 'app-dashboard',
  imports: [NzCarouselModule, CommonModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  loanType: any;
  emiplans: any;
  private adminService = inject(AdminService);
  private loanService = inject(LoanService);

  ngOnInit(): void {
    this.adminService.getLoanProducts().subscribe(data=>{
      console.log(data)
      
    });
    this.emiplans = this.loanService.getEmiPlans();
  }
}
