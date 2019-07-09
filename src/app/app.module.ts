import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app.routing.modulo';
import { FormsModule } from '@angular/forms';

//NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Environment
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';


//Modulo personalizados
import { AuthModule } from './auth/auth.module';
//import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //Modulo personalizado
    AuthModule, 
   // IngresoEgresoModule,
    //FIN Modulo personalizado
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot( appReducers ), //aca me pide el reducer,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
