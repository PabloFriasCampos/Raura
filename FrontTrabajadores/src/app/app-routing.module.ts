import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VistaCocineroComponent } from './vista-cocinero/vista-cocinero.component';
import { VistaCamareroComponent } from './vista-camarero/vista-camarero.component';
import { VistaMesaComponent } from './vista-mesa/vista-mesa.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { VistaCuentaComponent } from './vista-cuenta/vista-cuenta.component';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { AdminTrabajadoresComponent } from './admin-trabajadores/admin-trabajadores.component';
import { AdminNewTrabajadorComponent } from './admin-new-trabajador/admin-new-trabajador.component';
import { AdminNewProductoComponent } from './admin-new-producto/admin-new-producto.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cocina', component: VistaCocineroComponent },
  { path: 'camarero', component: VistaCamareroComponent },
  { path: 'admin', component: VistaAdminComponent },
  { path: 'adminProductos', component: AdminProductosComponent },
  { path: 'adminTrabajadores', component: AdminTrabajadoresComponent },
  { path: 'mesa/:id', component: VistaMesaComponent },
  { path: 'cuenta/:id', component: VistaCuentaComponent },
  { path: 'newTrabajador', component: AdminNewTrabajadorComponent },
  { path: 'newProducto', component: AdminNewProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
