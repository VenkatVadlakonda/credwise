import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TableComponent,
  TableColumn,
} from '../../shared/components/table/table.component';
import { UserService } from '../../_services/user.service';
import { LoanEnquiry } from '../../_models/loans.model';

@Component({
  selector: 'app-usermessage',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './usermessage.component.html',
  styleUrl: './usermessage.component.scss',
})
export class UsermessageComponent implements OnInit {
  columns: TableColumn[] = [
    { header: 'Name', field: 'name', width: '200px' },
    { header: 'Phone Number', field: 'phoneNumber', width: '150px' },
    {
      header: 'Loan Amount',
      field: 'loanAmountRequired',
      type: 'number',
      width: '150px',
    },
    { header: 'Purpose', field: 'loanPurpose', width: '200px' },
    { header: 'Created At', field: 'createdAt', type: 'date', width: '180px' },
  ];

  data: LoanEnquiry[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getLoanEnquires().subscribe(response=>{
      if (response && Array.isArray(response.data)) {
        this.data = response.data;
      }
    })
  }

  onRowClick(row: any): void {
    console.log('Selected loan enquiry:', row);
  }
}
