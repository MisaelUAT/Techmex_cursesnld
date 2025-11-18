import { Component } from '@angular/core';
import { ConfigUser } from '../../../servicios/config-user';
declare var bootstrap: any;

@Component({
  selector: 'app-metodos-pago',
  standalone: false,
  templateUrl: './metodos-pago.html',
  styleUrl: './metodos-pago.css',
})
export class MetodosPago {
  form_metodoPago = {
    numero_tarjeta: '',
    banco: '',
    tipo_tarjeta: '',
    ccv: null,
    vencimiento: '',
  };

  coleccion = 'Metodos_Pago';
  registros: any[] = [];
  proceso_agregar = false;
  proceso_editar = false;
  registro: any;

  constructor(private Crud: ConfigUser) {}

  async ngOnInit() {
    this.coleccion = 'Metodos_Pago';
    this.registros = await this.Crud.Read_Coleccion(this.coleccion);
    console.log(this.registros);
  }

  private mostrarToast(mensaje: string, tipo: 'success' | 'danger' = 'success') {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      toastEl.classList.remove('bg-success', 'bg-danger');
      toastEl.classList.add(`bg-${tipo}`);

      const toastBody = toastEl.querySelector('.toast-body');
      if (toastBody) toastBody.textContent = mensaje;

      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }

  async Guardar_Tarjeta() {
    const response = await this.Crud.Create_Coleccion(this.coleccion, this.form_metodoPago);
    if (response) {
      this.mostrarToast('Se publicó correctamente');
      this.ngOnInit();
    } else {
      this.mostrarToast('Error a la hora de guardar', 'danger');
    }
  }

  Agregar_Tarjeta() {
    this.proceso_agregar = true;
    this.proceso_editar = false;
    this.form_metodoPago = {
      numero_tarjeta: '',
      banco: '',
      tipo_tarjeta: '',
      ccv: null,
      vencimiento: '',
    };
  }

  Editar_Tarjeta(registro: any) {
    this.proceso_agregar = false;
    this.proceso_editar = true;
    this.form_metodoPago = registro;
    this.registro = registro;
  }

  async Actualizar_Tarjeta() {
    const response = await this.Crud.Update(this.coleccion, this.registro);
    if (response) {
      this.mostrarToast('¡El registro se actualizó correctamente!');
      this.ngOnInit();
    } else {
      this.mostrarToast('❌ Hubo un error al actualizar', 'danger');
    }
  }

  async Eliminar_Tarjeta(Registro: any,confirmation: boolean) {
    if (confirmation) {
      const response = await this.Crud.Delete_Coleccion(this.coleccion, Registro);
      if (response) {
        this.mostrarToast('¡El registro se eliminó correctamente!');
        this.ngOnInit();
      } else {
        this.mostrarToast('Hubo un error al eliminar', 'danger');
      }
    }
  }

}
