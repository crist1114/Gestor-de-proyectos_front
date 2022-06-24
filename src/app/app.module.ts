import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { DataTablesModule } from "angular-datatables";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { TareaComponent } from './tarea/tarea.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MetricasComponent } from './metricas/metricas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    HeaderComponent,
    InicioComponent,
    SidebarComponent,
    ProyectoComponent,
    CrearProyectoComponent,
    TareaComponent,
    CrearTareaComponent,
    MetricasComponent,
    PerfilComponent,
    
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule, 
    MatButtonModule,
    DataTablesModule,
    NgxChartsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
