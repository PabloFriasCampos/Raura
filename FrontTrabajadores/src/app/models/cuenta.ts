import { ListaProductos } from "./lista-productos";
import { Trabajador } from "./trabajador";

export class Cuenta {
  id: string = '';
  FechaCuenta: string = '';
  TotalCuenta: string = '';
  Productos: ListaProductos[] = [];
  Trabajador: Trabajador = new Trabajador;
}
