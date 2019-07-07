import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egresp.actions';
import { Subscription } from 'rxjs';
import { UnSetUserAction } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription : Subscription = new Subscription();

  ingresoEgresoItemsSubscription : Subscription = new Subscription();


  constructor( 
    private afDB: AngularFirestore,
    public authService: AuthService,
    public store: Store<AppState>
    
    ) { }

crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {



  const user = this.authService.getUsuario();

  return  this.afDB.doc(`${user.uid}/ingresos-egreso`)
  .collection('items').add({...ingresoEgreso});

}

//Escuho cualquier cambio de ingresos o egresos en mi db
initIngresoEgresoListener(){

  this.ingresoEgresoListenerSubscription = this.store.select('auth')
  .pipe(
    filter( auth => auth.user != null )
  )
  .subscribe( auth =>{
    console.log("tengo el uid");
    console.log(auth.user.uid);
    this.ingresoEgresoItems(auth.user.uid);
  })
}

private ingresoEgresoItems(uid: string){
  
  console.log("tengo el uid - busco item");
  console.log(uid);


  this.ingresoEgresoItemsSubscription = this.afDB.collection(`${ uid }/ingresos-egreso/items`) //path del nodo.Uso template natural
  //todo esto es po fire base , para buscar los items
  .snapshotChanges()
  .pipe(
    map( docData => 
      {
        return docData.map ( doc => {
          return {
            ...doc.payload.doc.data(),
            uid : doc.payload.doc.id
          };
        } );
      })
  )
  .subscribe( (colleccion: any []) =>{
    console.log("imprimo coleccion");
    console.log(colleccion);

    this.store.dispatch(new SetItemsAction(colleccion));

  } );

}

//Cuando cierro sesion, tengo que cancelar las subscripciones
cancelarSubscriptions(){
  this.ingresoEgresoItemsSubscription.unsubscribe();
  this.ingresoEgresoListenerSubscription.unsubscribe();
  this.store.dispatch( new UnSetUserAction());


}


borrarIngresoEgreso( uid: string){

  const user = this.authService.getUsuario();

  return this.afDB.doc(`${ user.uid }/ingresos-egreso/items/${ uid }`)
  .delete();


}


}



