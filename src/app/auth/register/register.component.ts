import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(
    public authService: AuthService,
    public store: Store<AppState>
    
    ) { }

  // la variable cagando me permite usarlo en el html de este componente
  // Me suscribo al cambio del ui para saber cuando esta cargando
  ngOnInit() {
    this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(){ //permite destruir las subscripciones cuanod el componente de destruye. 
    this.subscription.unsubscribe;
  }

  onSubmit( data: any){
    console.log( data );
    this.authService.crearUsario( data.nombre, data.email, data.password);
  }




}
