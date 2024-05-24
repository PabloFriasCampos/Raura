import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VistaCocineroComponent } from './vista-cocinero/vista-cocinero.component';
import { VistaCamareroComponent } from './vista-camarero/vista-camarero.component';
import { VistaMesaComponent } from './vista-mesa/vista-mesa.component';
import { HeaderComponent } from './header/header.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { VistaCuentaComponent } from './vista-cuenta/vista-cuenta.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AdminTrabajadoresComponent } from './admin-trabajadores/admin-trabajadores.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VistaCocineroComponent,
    VistaCamareroComponent,
    VistaMesaComponent,
    HeaderComponent,
    VistaAdminComponent,
    VistaCuentaComponent,
    AdminProductosComponent,
    AdminTrabajadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
