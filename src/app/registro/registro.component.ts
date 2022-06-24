import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  selectedInfo!:string;

  correo!: string;
  nombre!: string;
  password!: string;
  rol!:string;

  constructor(public userService: UserService) {}

  register() {
    const user = { 
      name: this.nombre, 
      username: this.correo, 
      password: this.password, 
      rol: this.rol
    };
    console.log('este es el usuario ',user)
    this.userService.register(user).subscribe(data => {
      
      
      location.pathname = 'login';
    }, err => {
      
      alert('Ha ocurrido un error');
      console.log(err)
     });
  }
  ngOnInit(): void {
    this.rol='';
  }

}
