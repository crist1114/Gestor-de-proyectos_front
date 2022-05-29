import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from "ngx-cookie-service";
import { usuario } from "./usuario.interface";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //produccion https://micro-users-bclbwzlakq-uc.a.run.app/api
  private apiUrl = 'https://micro-user-bclbwzlakq-uc.a.run.app/api'
  constructor(private http: HttpClient, private cookies: CookieService) { 

  }
  login(user: any):Observable<any>{
    return this.http.post(this.apiUrl+'/auth/login', user);
  }

  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl+'/user', user);
  }

  getUsuarios(): Observable<usuario[]>{
     return this.http.get<usuario[]>(this.apiUrl+'/user');
  }

  setToken(token: any) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
}