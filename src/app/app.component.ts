import { BarChartOutline } from '@ant-design/icons-angular/icons';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserService } from '../_services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTriggerAction } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    NzDropDownModule,
  
    
    
  ],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: [BarChartOutline],
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isCollapsed = false;
  showDot = false;
  currentUser: any = null;
  title: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const allUsers = this.userService.userDetails;

    // Option 1: Check for recently created users (e.g., today)
    const today = new Date().toISOString().split('T')[0];
    this.showDot = allUsers.some((user) => user.createdAt === today);

    // Subscribe to current user changes
    this.authService.currentUser$.subscribe((user) => {
      console.log('current:', user);
      this.currentUser = user;
    });
  }
  
  
  
    logout() {
      this.authService.logout();
      this.currentUser=null
    }
}

// {
//   isCollapsed = false;
//   showDot = false;
//   currentUser: any = null;
//   title: any;
//   firstName:any
//    private destroy$ = new Subject<void>();

//   constructor(
//     private userService: UserService,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     const allUsers = this.userService.userDetails;

//     // Option 1: Check for recently created users (e.g., today)
//     const today = new Date().toISOString().split('T')[0];
//     this.showDot = allUsers.some((user) => user.createdAt === today);

//     // Subscribe to current user changes
//     this.authService.currentUser$.subscribe((user) => {
//       console.log("current:",user)
//       this.currentUser = user;
//     });
//     this.authService.currentUser$
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(user => {
//         this.currentUser=user
//         this.updateAuthStatus();
//       });
//   }
//   updateAuthStatus(){
//     this.firstName=this.authService.getCurrentUser()?.name

//   }

//   logout() {
//     this.authService.logout();
//   }
//    ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
// }
