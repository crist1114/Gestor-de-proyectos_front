import { Component, OnInit } from '@angular/core';
import { crearProyectoService } from './crearProyectoService/crearProyecto.service';
import { UserService } from '../user/user.service';
import { usuario } from '../user/usuario.interface';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})

export class CrearProyectoComponent implements OnInit{

  // LOS VALORES QUE IRAN EN EL FORM
  nombre!:string;
  descripcion!:string;
  idProfesor!:string;
  //para los usuarios que se obtienen seleccionados
  usuariosSelected!:string[];
  //para saber quien es lider
  Eslider!:string;

  //para los usuarios
  usuarios!:usuario[];

  constructor(public crearProyectoService : crearProyectoService,
    public userService : UserService, private cookies: CookieService) { }//

  crearProyecto(){
    const user = JSON.parse(this.cookies.get("usuarioSesion"));
    this.idProfesor = user.id;
        const proyecto = {
            nombre: this.nombre,
            descripcion: this.descripcion,
            idProfesor: this.idProfesor
        }
        const usuariosSelected = document.querySelectorAll('input[type=checkbox]:checked');

        //para saber quien es el lider
        const lider = document.querySelectorAll('input[type=radio]:checked');
        this.Eslider = lider[0].id;
        if(document.querySelectorAll('input[id='+this.Eslider+']:checked').length<2){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hey! el lider debe ser parte del proyecto!',
              footer: ''
            })
        }

        else{
        let seleccionados = new Array();

        for(let i=0; i<usuariosSelected.length; i++){
          seleccionados.push(usuariosSelected[i].id);
        }
      
        let id_proyecto_creado = '';
    
        this.crearProyectoService.crearProyecto(proyecto).subscribe(data => {
              id_proyecto_creado = data._id;
              
        
              for(let i=0; i<seleccionados.length; i++){
        
              this.crearProyectoService.asociarProyecto(id_proyecto_creado, seleccionados[i], this.Eslider).subscribe(data => {
                  
                
                
              });
            }
        
                 location.pathname = 'proyecto';
            });
          }
    
    
  }
  // asociar(id_proyecto_creado:string){
      
//  }

  ngOnInit(): void {

    this.userService.getEstudiantes()
    .pipe(
        tap((usuarios: usuario[]) =>{
          this.usuarios = usuarios;
          console.log(this.usuarios)
        })
    )
    .subscribe();
  }
  }


