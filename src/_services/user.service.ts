import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { LoanEnquiry } from '../_models/loans.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 

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

  getUserApi():Observable<{success:string,data:User[],message:string}>{
    return this.http.get<{success:string,data:User[],message:string}>(this.url)
  }

  postUserApi(user:User):Observable<User>{
    return this.http.post<User>(`${this.url}/register`,user)
  }

   getLoanEnquires():Observable<{success:string,data:LoanEnquiry[],message:string}>{
    return this.http.get<{success:string,data:LoanEnquiry[],message:string}>("https://localhost:7194/api/LoanEnquiry/getallenquiry");
  }
  getAllUsers():Observable<any>{
    return of(this.userDetails)
  }
  getUsers(user:any):Observable<any>{
    return this.http.post<any>(this.url,user)
  }

  sendEmailPass(user:{email:string,password:string}):Observable<any>{
    return this.http.post<any>("https://localhost:7194/api/Emails/send-registration",user)
  }
 
  
  
  
}
