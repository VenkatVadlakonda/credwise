import { FDType } from './../_models/fdtype.model';
import { Routes } from '@angular/router';
import { SigninComponent } from '../components/signin/signin.component';
import { SignupComponent } from '../components/signup/signup.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RepaymentsComponent } from '../components/repayments/repayments.component';
import { AdduserComponent } from '../components/adduser/adduser.component';
import { UserstatusComponent } from '../components/userstatus/userstatus.component';
import { UsermessageComponent } from '../components/usermessage/usermessage.component';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { DocumentsComponent } from '../components/documents/documents.component';
import { CreateloanComponent } from '../components/createloan/createloan.component';

import { ReplaymentloanComponent } from '../components/replaymentloan/replaymentloan.component';

import { adminGuard } from '../_auth/admin.guard';
import { LoantypesComponent } from '../components/loantypes/loantypes.component';
import { FixeddepositComponent } from '../components/fixeddeposit/fixeddeposit.component';
import { EmiplansComponent } from '../components/emiplans/emiplans.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'signin', component: SigninComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'repayment',
    component: RepaymentsComponent,
    canActivate: [adminGuard],
  },
  // {
  //   path: 'repayment/user/:userId',
  //   component: ReplaymentloanComponent,
  // },
  // {
  //   path: 'repayment/loan/:loanId',
  //   component: ReplaymentloanComponent,
  // },
  {
    path: 'repaymentemi/:id',
    component: ReplaymentloanComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'adduser',
    component: AdduserComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'userstatus',
    component: UserstatusComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'usermessage',
    component: UsermessageComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'createloan',
    component: CreateloanComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'loantype',
    component: LoantypesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'fd',
    component: FixeddepositComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'emiplan',
    component: EmiplansComponent,
    canActivate: [adminGuard],
  },

  {
    path: '**',
    component: PagenotfoundComponent,
  },
];
