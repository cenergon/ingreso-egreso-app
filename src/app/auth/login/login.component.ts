import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit , OnDestroy{

  cargando: boolean;
  subscription: Subscription; //esta subscricpcion me permite llamar al  unsubscribe cuando se destruya el componente


  constructor( public authService: AuthService,
               private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui=> this.cargando = ui.isLoading);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe;
  }

  onSubmit( data: any){
    console.log( data );
    this.authService.login( data.email, data.password);
  }

}
