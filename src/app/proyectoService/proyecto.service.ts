import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";
import { proyecto } from '../proyecto/interface/proyecto.interface';
import { proyecto_usuario } from '../proyecto/interface/proyecto_usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  
  // private apiUrl = 'https://gestion-proyectos-bclbwzlakq-uc.a.run.app/api/'
  private apiUrl = 'https://gestion-proyectos2-bclbwzlakq-uc.a.run.app/api'
  // private apiUrl = 'http://localhost:3200/api/'
  constructor(private http: HttpClient) {      

  }

  getProyectos(): Observable<proyecto[]> {
    
    return this.http.get<proyecto[]>(this.apiUrl+'/');
  }

  getProyectosProfesor(id:string): Observable<proyecto[]> {
    
    return this.http.get<proyecto[]>(`${this.apiUrl}/proyectosUsuario/${id}`);
  }

  getProyectosEstudiante(id:string): Observable<proyecto[]> {
    
    return this.http.get<proyecto[]>(`${this.apiUrl}/proyectosEstudiante/${id}`);
  }

  eliminar(id:string): Observable<any>{

    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  getEstudiantesProyecto(idProyecto:string){
    return this.http.get<any[]>(this.apiUrl+'estudiantesProyecto/'+idProyecto);
  }

  getLiderProyecto(idProyecto:string){
    return this.http.get<proyecto_usuario>(this.apiUrl+'liderProyecto/'+idProyecto);
  }
  
//   setToken(token: any) {
//     this.cookies.set("token", token);
//   }
//   getToken() {
//     return this.cookies.get("token");
//   }
}