import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService)
  const router=inject(Router)

  if(auth.isLoggedIn()){
    
    return true
  }
  else{
    alert("Login to continue")
    router.navigate(['/signin'])
    return false
  }
};
