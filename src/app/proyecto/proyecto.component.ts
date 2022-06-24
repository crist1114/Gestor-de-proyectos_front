import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { ProyectoService } from '../proyectoService/proyecto.service';
import { TareaService } from '../tarea/tareaService/tarea.service';
import {Router} from '@angular/router';
import { tap } from 'rxjs/operators';
import { proyecto } from './interface/proyecto.interface';
import { CookieService } from "ngx-cookie-service";
import { UserService } from '../user/user.service';
import Swal from'sweetalert2';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit, OnDestroy{

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  proyectos!:proyecto[];
  rol!:string;

  constructor(public proyectoService: ProyectoService, public tareaService: TareaService,
     public router: Router, public userService: UserService, private cookies: CookieService,) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getProyectos() {
    
    //   data => {

    //   //al hacer login vaya a pagina principal
    //   this.router.navigateByUrl('proyecto');
    //   console.log(data);
    // });
  }

  eliminarProyecto(id:string){
  
    this.proyectoService.eliminar(id).subscribe(data =>{
      console.log(data);
      //elimino tareas
      this.tareaService.eliminarPorIdProyecto(id).subscribe(data2 =>{
          window.location.reload();
      });
      
    });
    
  }
  getTareas(id:string){
    sessionStorage.setItem('idProyectoActual', id);
    console.log('el id ',sessionStorage.getItem('idProyectoActual'))

    this.tareaService.getTareas(id).subscribe(data =>{
      
      console.log('redireccionaar');
      location.pathname = 'tarea';
    });
    
  }

  verDetallesProyecto(id:string, nombre:string, descripcion:string){
    sessionStorage.setItem('idProyectoActual', id);
    console.log('el id ',sessionStorage.getItem('idProyectoActual'))

    this.proyectoService.getLiderProyecto(id).subscribe(data =>{
      
      console.log('obtener lider', data);
      this.userService.getUsuario(data.idUsuario).subscribe(data2 =>{
          
          const lider = data2[0].name;
          const correoLider = data2[0].username;
          Swal.fire({
            title: 'Nombre: '+nombre,
            html: '<h3><strong>Asignatura:</strong> '+descripcion+
            '<br><strong>Lider de proyecto:</strong> '+lider+
            '<br><strong>Correo: </strong>'+correoLider+'</h3>',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/3381/3381007.png',
            imageWidth: 280,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })

      });
      // location.pathname = 'tarea';
    });
    
  }

  ngOnInit(): void {
    const user = JSON.parse(this.cookies.get("usuarioSesion"));
    this.rol = user.id_rol;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'
      }
    };
    //METER DENTRO IF PARA MOSTRAR PROYECTOS AL ESTUDIANTE
    if(this.rol == '2'){

        this.proyectoService.getProyectosProfesor(user.id)
        .pipe(
            tap((proyectos: proyecto[]) =>{
              this.proyectos = proyectos;
              
            })
        )
        .subscribe((data =>{
          this.dtTrigger.next(null);
        }));
    }else{
      this.proyectoService.getProyectosEstudiante(user.id)
        .pipe(
            tap((proyectos: proyecto[]) =>{
              console.log('ESTOS SON LOS PROYECTOS DEL ESTUDIANTE ',proyectos);
              this.proyectos = proyectos;
              
            })
        )
        .subscribe((data =>{
          this.dtTrigger.next(null);
        }));
    }
   
  }

}
