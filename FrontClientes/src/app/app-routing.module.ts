import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';

const routes: Routes = [
  { path: 'mesa', component: ListaProductosComponent },
  { path: 'producto/:id', component: DetallesProductoComponent },
  { path: '', redirectTo: '/mesa', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
