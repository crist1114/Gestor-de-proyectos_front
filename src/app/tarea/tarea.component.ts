import { Component, OnInit } from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { tarea } from './interface/tarea.interface';
import { TareaService } from './tareaService/tarea.service';
// import { Inject } from '@angular/core';
import Swal from'sweetalert2';



declare var create:any;

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  tareas!:any[];
  observacion!:string;

  constructor(public tareaService: TareaService, public router: Router) { }

 

  ngOnInit(): void {
    const idP = sessionStorage.getItem('idProyectoActual') || '';
    console.log('EL ID DEL PRYECTO ES ',idP)
    this.tareaService.getTareas(idP)
    .pipe(
        tap((tareas: any[]) =>{
          console.log('las tareas son ',tareas)
          this.tareas = tareas;
        })
    )
    .subscribe();
  }

  createF(){
     create();
  }

  modalTerminada(id:string){
    (async () => {

      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Observaciones',
        inputPlaceholder: 'Escribe tus observaciones aqui...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      
      if (text) {
        this.observacion = text;
        Swal.fire("Listo! gracias por tus observaciones")
        this.tareaService.editarTarea(id, this.observacion).subscribe(data =>{
        location.pathname = 'tarea';
      });
      }
      
      })()
      
  }

  crearTarea(){
     
     location.pathname = 'crearTarea';
  }

  getTareasProyecto(id:string){
    this.tareaService.getTareas(id).subscribe(data =>{
      // location.pathname = 'tarea';
    });
  }

  eliminarTarea(id:string){
    this.tareaService.eliminar(id).subscribe(data =>{

      window.location.reload();
    });
    
  }


}

