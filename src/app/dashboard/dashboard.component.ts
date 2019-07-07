import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { authReducer } from '../auth/auth.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor( 
    public ingresoEgresoService: IngresoEgresoService,
    public authService: AuthService,
    public store: Store <AppState>) { } 

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
