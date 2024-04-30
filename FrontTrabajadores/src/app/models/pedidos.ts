import { Producto } from "./producto";

export class Pedidos {
  ListaProductosMesaID: number = 0;
  Cantidad: number = 0;
  Estado: string = '';
  MesaId: number = 0;
  Producto: Producto = new Producto;
}
