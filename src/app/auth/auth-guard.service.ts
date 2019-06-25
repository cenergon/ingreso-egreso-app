import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private router: Router) { }

  canActivate(){//Debe retornar un booleano , una promesa o un obserbable
  
    const autenticado = false;

    if (autenticado === false) {
      return this.router.navigate([ '/login' ]);
    }

    return false;


  }
}
