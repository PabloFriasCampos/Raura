import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  { path: 'mesa/:id', component: ListaProductosComponent },
  { path: 'carrito/:id', component: CarritoComponent },
  { path: 'producto/:id', component: DetallesProductoComponent },
  { path: '', redirectTo: '/mesa', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
