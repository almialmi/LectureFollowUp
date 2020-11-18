import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import { SuperuserService } from '../shared/superuser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( public superUserService : SuperuserService , public router : Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(!this.superUserService.isLogedIn()){
      this.router.navigateByUrl('/login');
      //this.router.navigateByUrl('/main');
      this.superUserService.deletToken;
      return false;
    }
    
      return true;
  }
  
}