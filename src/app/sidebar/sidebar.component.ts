import { Component, Injectable, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { TareaService } from '../tarea/tareaService/tarea.service';
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

@Injectable({ providedIn: 'root' })
export class SidebarComponent implements OnInit {
  
  rol!:number;
  idEst!:string;
  name!:string;

  constructor(private cookies: CookieService, public tareaService: TareaService) { }

  ngOnInit(): void {
    console.log(this.cookies.get("usuarioSesion"))
    const user = JSON.parse(this.cookies.get("usuarioSesion"));
    console.log('el usuario es ',user);
    this.rol = user.id_rol;
    this.idEst = user.id;
    console.log('este es el rol ',this.rol);
    this.name = this.cookies.get("nombre").toString().replace('"', "").replace('"', "");
 
    console.log('este es nombre ',this.name);
  }

  getTareas(){

    this.tareaService.getTareasEstudiante(this.idEst).subscribe(data =>{
      
      
      location.pathname = 'tarea';
    });
  }

  cerrarSesion(){
    this.cookies.deleteAll();
    location.pathname = '';
  }
  
}
