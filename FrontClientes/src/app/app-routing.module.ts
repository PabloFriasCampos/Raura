import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ComandasComponent } from './comandas/comandas.component';

const routes: Routes = [
  { path: 'mesa/:id', component: ListaProductosComponent },
  { path: 'carrito/:id', component: CarritoComponent },
  { path: 'producto/:id', component: DetallesProductoComponent },
  { path: 'comandas/:id', component: ComandasComponent },
  { path: '', redirectTo: '/mesa', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
