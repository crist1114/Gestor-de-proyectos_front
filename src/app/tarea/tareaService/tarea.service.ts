import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";
import { tarea } from '../interface/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  // private apiUrl = 'https://gestion-tareas-bclbwzlakq-uc.a.run.app'
  private apiUrl = 'https://gestion-tareas3-bclbwzlakq-uc.a.run.app'
  constructor(private http: HttpClient) { 

  }

  getTareasPorEstado(id:number){
    return this.http.get<any[]>(`${this.apiUrl}/tasks/tareasestado/${id}`);
  }

  getTareas(id:string): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrl}/tasks/${id}`);
  }

  getTarea(id:string): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrl}/task/${id}`);
  }

  getTareasEstudiante(id:string): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.apiUrl}/tasksEst/${id}`);
  }

  eliminar(id:string): Observable<any>{

    return this.http.post(`${this.apiUrl}/tasks/delete/${id}`, null);
  }

  eliminarPorIdProyecto(id:string): Observable<any>{

    return this.http.post(`${this.apiUrl}/tasks/deletePorProyecto/${id}`, null);
  }

  editarTarea(id:string, observacion:string): Observable<any>{
    console.log('la observacion es ',observacion)
    const date =  new Date();
    const fe = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    const edit = {
      id: id,
      estado: 2,
      observaciones: observacion,
      fecha_fin: fe
    }
    return this.http.post(`${this.apiUrl}/tasks/edit/`, edit);
  }
//   setToken(token: any) {
//     this.cookies.set("token", token);
//   }
//   getToken() {
//     return this.cookies.get("token");
//   }
}