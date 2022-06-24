import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import {Router} from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {//implements OnInit {

  username!: string;
  password!: string;

  constructor(public userService: UserService, public router: Router, public sidebarCom: SidebarComponent,
    private cookies: CookieService) { 
    
  }
  login() {
    const user = {username: this.username, password: this.password};
    this.userService.login(user).subscribe( (data) => {

      //guardo el token
      this.userService.setToken(data.body);
      console.log("token ",data.body);
      //rol
      
      //al hacer login vaya a pagina principal
     
      
      
      this.cookies.set("usuarioSesion", JSON.stringify(data.usuario));
      console.log('EL ID ',data.usuario.id)
      this.userService.getUsuario(data.usuario.id).subscribe(data=>{
        
        this.cookies.set("nombre", JSON.stringify(data[0].name));
        this.router.navigateByUrl('proyecto');
      })
    },
     (err) =>{
         
          alert('Datos incorrectos!');
     }
    );
  }

  
  // ngOnInit(): void {
      
  // }

}
