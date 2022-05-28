import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { crearTareaService } from './crearTareaService/crearTareaService';
import { usuario } from '../user/usuario.interface';
import { tap } from 'rxjs/operators';

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
  usuarios!:usuario[];

  constructor(public userService : UserService, public crearTareaService : crearTareaService) { }

  crearTarea(){
    this.usuarioAsignado = document.querySelectorAll('input[type=radio]:checked')[0].id;
    this.idProyecto = sessionStorage.getItem('idProyectoActual') || '';
    
    const tarea = {
        title: this.title,
        description: this.descripcion,
        estado: 1,
        idProyecto: this.idProyecto,
        idUsuario: this.usuarioAsignado,
    }
    this.crearTareaService.crearTarea(tarea).subscribe(data => {
                  
      location.pathname = 'tarea';
      
    });
}

  ngOnInit(): void {

    this.userService.getUsuarios()
    .pipe(
        tap((usuarios: usuario[]) =>{
          this.usuarios = usuarios;
          console.log(this.usuarios)
        })
    )
    .subscribe();
  }

}
