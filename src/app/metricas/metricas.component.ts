import { Component, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { TareaService } from '../tarea/tareaService/tarea.service';
import { Subject, tap } from 'rxjs';
import { ProyectoService } from '../proyectoService/proyecto.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit {

  tareasF!:any[];
  tareasS!:any[];
  proyectos!:any[];
  
  single!:any[];

  multi!:any[];
  
  view: [number, number] = [450, 400];
  viewP: [number, number] = [400, 300];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Proyectos';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Cantidad de tareas';

  showLegendp: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';
  
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };


  constructor(private tareaService: TareaService, private proyectoService: ProyectoService,private cookies: CookieService) {
   // Object.assign(this, { multi });
   }

   onSelectp(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {

    this.tareaService.getTareasPorEstado(2)
          .pipe(
              tap((tareas: any[]) =>{
                console.log('LAS TAREAS FINALIZADAS SON ',tareas)
                this.tareasF = tareas;
              })
          )
          .subscribe((data =>{
          }));
        this.tareaService.getTareasPorEstado(1)
        .pipe(
            tap((tareas: any[]) =>{
              this.tareasS = tareas;
               this.single = [
                        {
                          "name": "Finalizadas",
                          "value": this.tareasF.length
                        },
                        {
                          "name": "Sin Finalizar",
                          "value": this.tareasS.length
                        }
                      ];

                      //PROYECTOS
                      let multi2 : any[] = [];
                      const user = JSON.parse(this.cookies.get("usuarioSesion"));
                      this.proyectoService.getProyectosProfesor(user.id)
                      .pipe(
                        tap((proyectos: any[]) =>{
                          this.proyectos = proyectos;
                          console.log('los proyectos son ',proyectos)
                          proyectos.forEach(element =>{
                            let terminadas =0;
                            let sinTerminar =0;
                            //Recorro las tareas terminadas
                            console.log('id proyecto ',element._id)
                            console.log('las tareas finalizadas son ',this.tareasF)
                            this.tareasF.forEach(elemento => {
                              console.log('el id proyecto tarea es ',elemento.idProyecto)
                              if(elemento.idProyecto == element._id){
                                  
                                  terminadas++;
                              }
                            });
                            console.log(terminadas);
                            
                            this.tareasS.forEach(elemento => {
                              if(elemento.idProyecto == element._id){
                                  sinTerminar++;
                              }
                            });
                            console.log(sinTerminar)

                            multi2.push({
                              name: element.nombre,
                              series: [{name: 'Tareas finalizadas', value: terminadas,}, 
                              {name: 'Tareas sin finalizar', value: sinTerminar,}],
                            });
                            this.multi = multi2;
                            console.log('CONTENIDO DE MULTI DENTRO DE FOR PROYECTO', this.multi)
                          })
          
                        })
                    )
                    .subscribe((data =>{
                    }));
            })
        )
        .subscribe((data =>{
        }));

       //PROYECTOS
       

  }

}
