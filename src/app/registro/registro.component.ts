import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent{//} implements OnInit {

  correo!: string;
  name!: string;
  password!: string;
  rol!:number;

  constructor(public userService: UserService) {}

  register() {
    const user = { name: this.name, username: this.correo, password: this.password, rol: this.rol};
    console.log('este es el rol ',this.rol)
    this.userService.register(user).subscribe(data => {
      alert('usuario registrado!');
      
      location.pathname = 'login';
    }, err => {
      
      alert('Ha ocurrido un error');
      console.log(err)
     });
  }
  // ngOnInit(): void {
  // }

}
