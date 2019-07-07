import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public authService : AuthService) { }

  canActivate(){//Debe retornar un booleano , una promesa o un obserbable
  
   
    return this.authService.isAuth();


  }
}
