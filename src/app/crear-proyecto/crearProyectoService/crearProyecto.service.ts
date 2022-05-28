import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";
import { proyecto } from 'src/app/proyecto/interface/proyecto.interface';
@Injectable({
  providedIn: 'root'
})
export class crearProyectoService {

  private apiUrl = 'http://localhost:3200/api'
  constructor(private http: HttpClient, private cookies: CookieService) { 

  }
  crearProyecto(proyecto: any):Observable<any>{
 
    return this.http.post(this.apiUrl+'/crear', proyecto);
  }


  asociarProyecto(id_proyecto:string, id_usuarios:string, lider:string): Observable<any>{
      
    console.log('el id del proyecto es ',id_proyecto);
    let l = false;
    if(lider === id_usuarios){
        l = true;
    }
      const pU = {
        id_proyecto: id_proyecto,
        id_usuario: id_usuarios,
        lider: l,
      }
      return this.http.post(this.apiUrl+'/asociar',pU);
  }

  

}