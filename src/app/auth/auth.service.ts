import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
    private route: Router,
    private afDB: AngularFirestore ) { }

  initAuthListner(){ //permite escuahar cuando cambia el estado del susuario
      
    this.afAuth.authState.subscribe( fUser => {
      
      console.log(fUser);



    });

  }

  crearUsario( nombre:string, email:string, password:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password) //crear el usuario y lo registra
    .then( resp =>{
      console.log (resp);

      //creo mi usuario en firebase
      const user: User = {//lo uso como interfaz
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };
      
      this.afDB.doc(`${ user.uid }/usuario`)
      .set( user )
      .then( ()=> {
        this.route.navigate(['/']);
      })


      this.route.navigate(['/']);
    })
    .catch( error => {
      console.error(error);
      Swal.fire("error en el login", error.message, "error");

    })
  }

  login( email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then( resp=>{
      console.log(resp);
      this.route.navigate(['/'])
    })
    .catch( error =>{
      console.log(error);
      Swal.fire("error en el login", error.message, "error");

    })

  }

  logout(){
    this.route.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() { // este metodo regresa el observable afAut, yb luego un booleano
    return this.afAuth.authState
    .pipe(
      map( fbuser => {
        
        if (fbuser == null){
          this.route.navigate['/login'];
        }
        
        return fbuser != null;

      })
    );
  }
}

 
