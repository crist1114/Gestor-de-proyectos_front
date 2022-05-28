import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../proyectoService/proyecto.service';
import { TareaService } from '../tarea/tareaService/tarea.service';
import {Router} from '@angular/router';
import { tap } from 'rxjs/operators';
import { proyecto } from './interface/proyecto.interface';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit{

  proyectos!:proyecto[];

  constructor(public proyectoService: ProyectoService, public tareaService: TareaService,
     public router: Router) { }

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
      //LLAMAR A ELIMINAR LOS ALUMNOS QUE ESTEN EN ESE PROYECTO;
      window.location.reload();
    });
    
  }
  getTareas(id:string){
    sessionStorage.setItem('idProyectoActual', id);
    console.log(sessionStorage.getItem('idProyectoActual'))

    this.tareaService.getTareas(id).subscribe(data =>{
      console.log(data)
      //LLAMAR A ELIMINAR LOS ALUMNOS QUE ESTEN EN ESE PROYECTO;
      location.pathname = 'tarea';
    });
    
  }
  ngOnInit(): void {

    this.proyectoService.getProyectos()
    .pipe(
        tap((proyectos: proyecto[]) =>{
          this.proyectos = proyectos;
        })
    )
    .subscribe();
  }

}
