import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { crearTareaService } from './crearTareaService/crearTareaService';
import { usuario } from '../user/usuario.interface';
import { tap } from 'rxjs/operators';
import { ProyectoService } from '../proyectoService/proyecto.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  // LOS VALORES QUE IRAN EN EL FORM
  title!:string;
  descripcion!:string;
  idProyecto!:string;
  usuarioAsignado!:string;
  //para los usuarios
  usuarios!:any[];
  idUsuarios!:any[];
  rol!:number;

  constructor(public userService : UserService, private cookies: CookieService, public crearTareaService : crearTareaService,
    public proyectoService: ProyectoService) { 

    
    
    

  }

  crearTarea(){
    this.usuarioAsignado = document.querySelectorAll('input[type=radio]:checked')[0].id;
    
    
    const tarea = {
        title: this.title,
        description: this.descripcion,
        estado: 1,
        idProyecto: this.idProyecto,
        idUsuario: this.usuarioAsignado,
    }
    console.log('se guarda la tarea ',tarea)
    this.crearTareaService.crearTarea(tarea).subscribe(data => {
           
      location.pathname = 'tarea';
      
    });
}

  ngOnInit(): void {
    // console.log('los userp que le mando ',this.idUsuarios)
    this.idProyecto = sessionStorage.getItem('idProyectoActual') || '';
    console.log('el id del proyecto es ',this.idProyecto)
    const user = JSON.parse(this.cookies.get("usuarioSesion"));
    this.rol = user.id_rol;
    console.log('el rol del proyecto es ',this.rol)
    this.proyectoService.getEstudiantesProyecto(this.idProyecto)
    .pipe(
        tap((idusuarios: any[]) =>{
          this.idUsuarios = idusuarios;
          console.log('los usuarios_proyecto',this.idUsuarios)
          this.usu(this.idUsuarios);
        })
    )
    .subscribe();
  }

  usu(usuariosBuscar:any){
    console.log('le mando ',usuariosBuscar)
    this.userService.getEstudiantesProyecto(usuariosBuscar)
    .pipe(
        tap((estudiantesProyecto: any[]) =>{
          this.usuarios = estudiantesProyecto;
          console.log(this.usuarios)
        })
    )
    .subscribe();
  }

}
