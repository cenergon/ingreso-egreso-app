import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {


  items : IngresoEgreso[];


  constructor( private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.store.select('ingresoEgreso')
    .subscribe( ingresoEgreso => {
      console.log(ingresoEgreso.items);
     this.items = ingresoEgreso.items;
    });

  }

  borrarItems( item: IngresoEgreso){
    console.log(item);
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then( () => {
        Swal.fire("Eliminado",item.descripcion, "success");

    });
  }

  

}
