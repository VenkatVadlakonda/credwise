import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  LoanEnquiries=[
  {
    "Name": "Ravi Kumar",
    "PhoneNumber": "9876543210",
    "LoanAmountRequired": 500000.00,
    "LoanPurpose": "Home Renovation",
    "CreatedAt": "2025-05-23T10:30:00"
  },
  {
    "Name": "Anjali Sharma",
    "PhoneNumber": "9123456789",
    "LoanAmountRequired": 250000.00,
    "LoanPurpose": "Medical Expenses",
    "CreatedAt": "2025-05-22T15:45:00"
  },
  {
    "Name": "Suresh Mehta",
    "PhoneNumber": "9988776655",
    "LoanAmountRequired": 750000.00,
    "LoanPurpose": "Business Expansion",
    "CreatedAt": "2025-05-21T11:20:00"
  },
  {
    "Name": "Priya Desai",
    "PhoneNumber": "8899001122",
    "LoanAmountRequired": 1200000.00,
    "LoanPurpose": "New House Purchase",
    "CreatedAt": "2025-05-20T09:10:00"
  },
  {
    "Name": "Karan Patel",
    "PhoneNumber": "9011223344",
    "LoanAmountRequired": 300000.00,
    "LoanPurpose": "Education Loan",
    "CreatedAt": "2025-05-19T16:05:00"
  },
  {
    "Name": "Venkat",
    "PhoneNumber": "9011223344",
    "LoanAmountRequired": 300000.00,
    "LoanPurpose": "Education Loan",
    "CreatedAt": "2025-05-26T16:05:00"
  }
]

userDetails=[
   {
    "userId": 1,
    "email": "admin@credwise.com",
    "firstName": "System",
    "lastName": "Administrator",
    "phoneNumber": "9876543310",
    "role": "Admin",
    "isActive": true,
    "createdBy": "Admin",
    "createdAt": '2024-05-01'
  },
  {
    "userId": 2,
    "email": "sahith@gmail.com",
    "firstName": "sai",
    "lastName": "sahith",
    "phoneNumber": "6677887766",
    "role": "Admin",
    "isActive": true,
    "createdBy": "Admin",
    "createdAt": '2024-05-01'
  },
  {
    "userId": 3,
    "email": "siri@gmail.com",
    "firstName": "siri",
    "lastName": "sha",
    "phoneNumber": "7766556677",
    "role": "Customer",
    "isActive": true,
    "createdBy": "Customer",
    "createdAt": '2024-05-01'
  },
  {
    "userId": 4,
    "email": "phani@gmail.com",
    "firstName": "phani",
    "lastName": "indra",
    "phoneNumber": "9988776652",
    "role": "Customer",
    "isActive": true,
    "createdBy": "Customer",
    "createdAt": '2024-05-01'
  },
  {
    "userId": 5,
    "email": "venkat@gmail.com",
    "firstName": "ven",
    "lastName": "kat",
    "phoneNumber": "6677554488",
    "role": "Admin",
    "isActive": true,
    "createdBy": "Admin",
    "createdAt": '2024-05-01'
  },
  {
    "userId": 6,
    "email": "venkat@gmail.com",
    "firstName": "ven",
    "lastName": "kat",
    "phoneNumber": "6677554488",
    "role": "Admin",
    "isActive": true,
    "createdBy": "Admin",
    "createdAt": '2024-05-26'
  }
]



private url="https://localhost:7194/api/admin/users"


  constructor(private http:HttpClient) { }

  getUserApi():Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }

  postUserApi(user:User):Observable<User>{
    return this.http.post<User>(`${this.url}/register`,user)
  }

  getLoanEnquires(){
    return this.LoanEnquiries;
  }
  getAllUsers():Observable<any>{
    return of(this.userDetails)
  }
  getUsers(user:any):Observable<any>{
    return this.http.post<any>(this.url,user)
  }

  sendEmailPass(user:any):Observable<any>{
    return this.http.post<any>("https://localhost:7194/api/Emails/send-registration",user)
  }
 
  
  
  
}
