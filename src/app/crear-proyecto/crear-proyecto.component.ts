import { Component, OnInit } from '@angular/core';
import { crearProyectoService } from './crearProyectoService/crearProyecto.service';
import { UserService } from '../user/user.service';
import { usuario } from '../user/usuario.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})

export class CrearProyectoComponent implements OnInit{

  // LOS VALORES QUE IRAN EN EL FORM
  nombre!:string;
  descripcion!:string;
  //para los usuarios que se obtienen seleccionados
  usuariosSelected!:string[];
  //para saber quien es lider
  Eslider!:string;

  //para los usuarios
  usuarios!:usuario[];

  constructor(public crearProyectoService : crearProyectoService,
    public userService : UserService) { }//

  crearProyecto(){

        const proyecto = {
            nombre: this.nombre,
            descripcion: this.descripcion
        }
        const usuariosSelected = document.querySelectorAll('input[type=checkbox]:checked');
        //para saber quien es el lider
        const lider = document.querySelectorAll('input[type=radio]:checked');
        this.Eslider = lider[0].id;
        let seleccionados = new Array();
        for(let i=0; i<usuariosSelected.length; i++){
          seleccionados.push(usuariosSelected[i].id);
        }
      
        let id_proyecto_creado = '';
    
        this.crearProyectoService.crearProyecto(proyecto).subscribe(data => {
              id_proyecto_creado = data._id;
              
        
              for(let i=0; i<seleccionados.length; i++){
        
              this.crearProyectoService.asociarProyecto(id_proyecto_creado, seleccionados[i], this.Eslider).subscribe(data => {
                  
                alert('proyecto creado!');
                
              });
            }
        
                 location.pathname = 'proyecto';
            });
    
    
  }
  // asociar(id_proyecto_creado:string){
      
//  }

  ngOnInit(): void {

    this.userService.getUsuarios()
    .pipe(
        tap((usuarios: usuario[]) =>{
          this.usuarios = usuarios;
          console.log(this.usuarios)
        })
    )
    .subscribe();
  }
  }


