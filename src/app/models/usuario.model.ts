export class Usuario {
  dni : number;
  nombres : string;
  apellidos : string;
  numTelefono: number;
  correo : string;
  rol : string;
  contrasena : string;

  constructor(dni : number, nombres : string, apellidos : string, numTelefono: number,
    correo: string, rol: string,contrasena: string) {
    this.dni  = dni ;
    this.nombres  = nombres ;
    this.apellidos  = apellidos ;
    this.numTelefono = numTelefono;
    this.correo  = correo ;
    this.rol  = rol ;
    this.contrasena = contrasena;
  }
}
