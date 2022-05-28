import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";
import { tarea } from 'src/app/tarea/interface/tarea.interface';
@Injectable({
  providedIn: 'root'
})
export class crearTareaService {

  private apiUrl = 'http://localhost:3002'
  constructor(private http: HttpClient, private cookies: CookieService) { 

  }
  crearTarea(tarea: any):Observable<any>{
    
    return this.http.post(this.apiUrl+'/create', tarea);
  }


  

  

}