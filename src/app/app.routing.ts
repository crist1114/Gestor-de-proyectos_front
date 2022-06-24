import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { AppComponent } from './app.component';
import { TareaComponent } from './tarea/tarea.component';
import { MetricasComponent } from './metricas/metricas.component';
import { PerfilComponent } from './perfil/perfil.component';


const appRoutes = [
    { path: 'login', component: LoginComponent,  pathMatch: 'full'},
    { path: 'registro', component: RegistroComponent,  pathMatch: 'full'},
    { path: '', component: InicioComponent,  pathMatch: 'full'},
    { path: 'proyecto', component: ProyectoComponent,  pathMatch: 'full'},
    { path: 'crearProyecto', component: CrearProyectoComponent, pathMatch: 'full'},
    { path: 'tarea', component: TareaComponent, pathMatch: 'full'},
    { path: 'crearTarea', component: CrearTareaComponent, pathMatch: 'full'},
    { path: 'metricas', component: MetricasComponent, pathMatch: 'full'},
    { path: 'perfil', component: PerfilComponent, pathMatch: 'full'}
  ];

export const routing = RouterModule.forRoot(appRoutes);




