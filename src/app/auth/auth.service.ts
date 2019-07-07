import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import Swal from 'sweetalert2';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction, UnSetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription;
  private usuario: User;

  constructor( 
    private afAuth: AngularFireAuth,
    private route: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
    ) { }

  initAuthListner(){ //permite escuchar cuando cambia el estado del susuario
      
    this.afAuth.authState.subscribe( fUser => {
      
      console.log(fUser);
      //Aca tengo la info del usuario que se autentico
      if ( fUser ){

        this.userSubscription =  this.afDB.doc(`${ fUser.uid }/usuario`).valueChanges()
        .subscribe( (usuarioObje : any) =>{
          
          console.log(usuarioObje);
          const newUser =  new User (usuarioObje);

          console.log(newUser);
          this.store.dispatch(new SetUserAction( newUser ));
          this.usuario = newUser;

        })

      }else{

        //cancelo la subscription
        //para no tener obserbables, sin usar
        this.usuario = null;
        this.userSubscription.unsubscribe;

      }


    });

  }

  crearUsario( nombre:string, email:string, password:string){
    
    const  accion = new ActivarLoadingAction();
    this.store.dispatch( accion );

    this.afAuth.auth.createUserWithEmailAndPassword(email,password) //crear el usuario y lo registra
    .then( resp =>{
      console.log (resp);

      //creo mi usuario en firebase
      const user: User = {//lo uso como interfaz
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };
      
      //autentico
      this.afDB.doc(`${ user.uid }/usuario`)
      .set( user )
      .then( ()=> {
        this.route.navigate(['/']);
        //En este paso desactivo el login
        this.store.dispatch(new DesactivarLoadingAction());
      })


      this.route.navigate(['/']);
    })
    .catch( error => {
      console.error(error);
      Swal.fire("error en el login", error.message, "error");
    


    })
  }

  login( email:string, password:string){

    this.store.dispatch( new ActivarLoadingAction());
    

    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then( resp=>{
      console.log(resp);

      this.store.dispatch( new DesactivarLoadingAction());
      this.route.navigate(['/'])
    })
    .catch( error =>{
      console.log(error);
      this.store.dispatch( new DesactivarLoadingAction());
      Swal.fire("error en el login", error.message, "error");

    })

  }

  logout(){
    this.route.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch( new UnSetUserAction() );
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

  getUsuario(){
    return {...this.usuario};
  }
}

 
