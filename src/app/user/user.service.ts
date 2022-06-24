import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";
import { usuario } from "./usuario.interface";
@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  private apiUrl = 'https://gestion-usuarios-bclbwzlakq-uc.a.run.app/api'
  // private apiUrl = 'http://localhost:3000/api'
  constructor(private http: HttpClient, private cookies: CookieService) { 

    
  }

  login(user: any):Observable<any>{
    return this.http.post(this.apiUrl+'/auth/login', user);
  }

  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl+'/user', user);
  }

  editarUsuario(user: any): Observable<any> {
    // this.headers.append("Content-Type" , "aplication/json");
    // this.headers.set("Authorization" , "Bearer "+this.getToken());
    let headers = new HttpHeaders({
      'Authorization' : 'Bearer '+this.getToken(),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : "*"
    });

    console.log(headers.get('Authorization'))
    return this.http.put(this.apiUrl+'/user', user, {headers: headers});
  }

  getUsuarios(): Observable<usuario[]>{
     return this.http.get<usuario[]>(this.apiUrl+'/user');
  }


  getUsuario(id:string): Observable<usuario[]>{
    return this.http.get<usuario[]>(this.apiUrl+'/user/'+id);
 }
  
   getUsuarioPorCorreo(correo:string): Observable<usuario[]>{
    return this.http.get<usuario[]>(this.apiUrl+'/user/correo/'+correo);
  }

  getEstudiantes(){
    return this.http.get<usuario[]>(this.apiUrl+'/user/estudiantes/'+1);
  }

  getEstudiantesProyecto(estudiantes:any){
    return this.http.post<any[]>(this.apiUrl+'/user/estudiantesProyecto',estudiantes);
  }

  setRol(rol: any){
    this.cookies.set("rol", rol);
  }

  getRol(){
    return this.cookies.get("rol");
  }

  setToken(token: any) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
}