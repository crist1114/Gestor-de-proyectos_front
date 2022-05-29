import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";
import { proyecto } from '../proyecto/interface/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl = 'https://micro-proyectos-bclbwzlakq-uc.a.run.app/api'
  constructor(private http: HttpClient) { 

  }

  getProyectos(): Observable<proyecto[]> {
    
    return this.http.get<proyecto[]>(this.apiUrl+'/');
  }

  eliminar(id:string): Observable<any>{

    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  
//   setToken(token: any) {
//     this.cookies.set("token", token);
//   }
//   getToken() {
//     return this.cookies.get("token");
//   }
}