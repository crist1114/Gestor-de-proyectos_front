import { Component, OnInit } from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { tarea } from './interface/tarea.interface';
import { TareaService } from './tareaService/tarea.service';
// import { Inject } from '@angular/core';
import Swal from'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';
import { data } from 'jquery';



declare var create:any;

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  tareas!:any[];
  observacion!:string;
  idEst!:string;
  rol!:number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public tareaService: TareaService,public usuarioService: UserService,private cookies: CookieService, public router: Router) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    const idP = sessionStorage.getItem('idProyectoActual') || '';
    const user = JSON.parse(this.cookies.get("usuarioSesion"));
    this.idEst = user.id;
    this.rol = user.id_rol;
    console.log('EL ID DEL estudiante de la sesion es ',this.idEst)

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'
      }
    };

    if(this.rol==1){
          this.tareaService.getTareasEstudiante(this.idEst)
          .pipe(
              tap((tareas: any[]) =>{
                console.log('las tareas son ',tareas)
                this.tareas = tareas;
              })
          )
          .subscribe((data =>{
            this.dtTrigger.next(null);
          }));
      }else{
        this.tareaService.getTareas(idP)
        .pipe(
            tap((tareas: any[]) =>{
              console.log('las tareas son ',tareas)
              this.tareas = tareas;
            })
        )
        .subscribe((data =>{
          this.dtTrigger.next(null);
        }));

      }
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

  modalVerDetalle(id:string){
    
    this.tareaService.getTarea(id)
    .subscribe( dataTarea =>{
      this.usuarioService.getUsuario(dataTarea[0].idUsuario)
              .subscribe(dataUsuario => {
                const ob = dataTarea[0].observaciones || 'Sin observaciones aun';
                const fin = dataTarea[0].fecha_fin || 'La tarea aun se encuentra en proceso';
                (async () => {

                  const { value: text } = await Swal.fire({
                    title: dataTarea[0].title,
                    html: '<h3><strong>Responsable:</strong> '+dataUsuario[0].name+
                    '<br><strong>Correo:</strong> '+dataUsuario[0].username+
                    '<br><strong>Finalizada el: </strong>'+fin+'</h3>'+
                    '<br><strong>Observaciones: </strong><br><br>'+ob+'<br></h3>',
                  })
                  
                  })()
              });
                }
    );
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

