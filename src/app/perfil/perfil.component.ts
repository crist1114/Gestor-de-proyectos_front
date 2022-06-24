import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userAuth!:any;
  user!:any;
  name!:string;
  username!:string;
  password!:string;
  password2!:string;

  constructor(private cookies: CookieService, public userService: UserService) {

   }

  ngOnInit(): void {
    this.userAuth = JSON.parse(this.cookies.get("usuarioSesion"));
    
    
    this.userService.getUsuarioPorCorreo(this.userAuth.username).subscribe(data=>{
        this.user = data[0];
        this.name = this.user.name;
        this.username = this.user.username;
        console.log('el user es ',this.user);
    });
  }

  actualizar (){

    const usern = { 
      id: this.user.id,
      name: this.name, 
      username: this.username, 
      password: this.password, 
      rol: this.user.id_rol
    };
    if(this.password == this.password2){
        this.userService.editarUsuario(usern).subscribe(data =>{
          console.log("respuesta ",data)
          location.pathname = 'perfil';
        });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden!',
        footer: ''
      })
    }

  }

}
