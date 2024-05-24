import { ListaProductos } from "./lista-productos";

export class Cuenta {
  id: string = '';
  FechaCuenta: string = '';
  TotalCuenta: string = '';
  Productos: ListaProductos[] = [];
}
