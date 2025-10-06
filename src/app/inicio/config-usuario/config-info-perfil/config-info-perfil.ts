import { Component } from '@angular/core';
import { ConfigUser } from '../../../servicios/config-user';
declare var boostrap: any;

@Component({
  selector: 'app-config-info-perfil',
  standalone: false,
  templateUrl: './config-info-perfil.html',
  styleUrl: './config-info-perfil.css'
})
export class ConfigInfoPerfil {
  form_inicio = {
    Correo: "",
    Contrasena: "",
    Nombre: "",
    Apellidos: "",
    Activo: false
  };
  coleccion = "Usuarios";
  registros: any[] = [];
  proceso_agregar = false;
  proceso_editar = false;
  registro: any;
  modalInstance: any; // 👈 Modal controlado manualmente

  constructor(private crud: ConfigUser) {}

  async ngOnInit() {
    
    this.coleccion = "Usuarios";
    this.registros = await this.crud.Read_Coleccion(this.coleccion);
    console.log(this.registros);
  }

  async Guardar_Datos() {
    this.coleccion = "Usuarios";
    const response = await this.crud.Create_Coleccion(this.coleccion, this.form_inicio);
    if (response) {
      alert("Se publicó correctamente");
      this.ngOnInit();
    } else {
      alert("Error a la hora de guardar");
    }
  }

  Agregar_Datos() {
    this.proceso_agregar = true;
    this.proceso_editar = false;
    this.form_inicio = {
      Correo: "",
      Contrasena: "",
      Nombre: "",
      Apellidos: "",
      Activo: false
    };
  }

  Editar_Informacion(registro: any) {
    this.proceso_agregar = false;
    this.proceso_editar = true;
    this.form_inicio = registro;
    this.registro = registro;
  }

  async Actualizar_Datos() {
    const response = await this.crud.Update(this.coleccion, this.registro);
    if (response) {
      alert("¡El registro se actualizó correctamente!");
      this.ngOnInit();
    } else {
      alert("Hubo un error al actualizar");
    }
  }

  async Eliminar_Datos(Registro: any) {
    if (confirm("¿Deseas eliminar este usuario?")) {
      const response = await this.crud.Delete_Coleccion(this.coleccion, Registro);
      if (response) {
        alert("¡El registro se eliminó correctamente!");
        this.ngOnInit();
      } else {
        alert("Hubo un error al eliminar");
      }
    }
  }
}
