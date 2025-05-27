import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from '../_models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  LoanProducts= [
   {
      "LoanProductId": 1,
      "ImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6ru7ArAHzabgDOn63Nf0_OvOL5nTuaiTIg&s",
      "Title": "Home Loan",
      "Description": "Affordable home loans with flexible repayment options.",
      "MaxLoanAmount": 5000000.00
    },
    {
      "LoanProductId": 2,
      "ImageUrl": "https://5.imimg.com/data5/SELLER/Default/2022/6/EY/LQ/IC/155588651/personal-loan-500x500.jpg",
      "Title": "Personal Loan",
      "Description": "Quick personal loans for your immediate needs.",
      "MaxLoanAmount": 1000000.00
    },
    {
      "LoanProductId": 3,
      "ImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_yXd64PfmINhuOYv-NZ4zvu_Tl4fE90kunQ&s",
      "Title": "Gold Loan",
      "Description": "Instant loans against your gold assets.",
      "MaxLoanAmount": 2000000.00
    }

  ]

  constructor(private http:HttpClient) { }

  getLoanProducts():Observable<any>{
    return of(this.LoanProducts)
  }

  loginData(admin:{email:string,password:string}):Observable<Admin>{
    return this.http.post<Admin>("https://localhost:7194/api/Auth/login",admin)
  }
}
