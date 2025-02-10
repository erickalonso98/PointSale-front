import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

export const identityGuard: CanActivateFn = (route, state) => {
  var _userService = inject(UserService);
  var _router = inject(Router);
  var identity =  _userService.getIdentity();

  if(identity){
    return true;
  }else{
    _router.navigate(["/login"]);
    return false;
  }
  
};
