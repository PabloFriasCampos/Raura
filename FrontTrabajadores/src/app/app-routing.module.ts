import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VistaCocineroComponent } from './vista-cocinero/vista-cocinero.component';
import { VistaCamareroComponent } from './vista-camarero/vista-camarero.component';
import { VistaMesaComponent } from './vista-mesa/vista-mesa.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cocina', component: VistaCocineroComponent },
  { path: 'camarero', component: VistaCamareroComponent },
  { path: 'mesa/:id', component: VistaMesaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
