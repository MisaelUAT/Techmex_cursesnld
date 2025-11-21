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
      location.reload()
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

    Validaciones_numeroTarjeta(valor_input: Event) {
    const inputElement = valor_input.target as HTMLInputElement;
    let valor = inputElement.value;

    let valorLimpio = valor.replace(/[^0-9]/g, '');

    valorLimpio = valorLimpio.slice(0, 16);

    let valorFormateado = '';

    for (let i = 0; i < valorLimpio.length; i++) {
      valorFormateado += valorLimpio[i];

      if ((i + 1) % 4 === 0 && i + 1 < valorLimpio.length) {
        valorFormateado += '-';
      }
    }
    inputElement.value = valorFormateado;
  }

  Validaciones_Numeros(event: KeyboardEvent) {
    const isDigit = /[0-9]/.test(event.key);

    const isControlKey =
      event.key === 'Backspace' ||
      event.key === 'Delete';

    if (isDigit || isControlKey) {
      return true;
    }
    return false;
  }

  Validaciones_vencimieinto(event:Event){
    const inputElement = event.target as HTMLInputElement;
    let valor = inputElement.value;

    let valorLimpio = valor.replace(/[^0-9]/g, '');

    valorLimpio = valorLimpio.slice(0, 4);

    let valorFormateado = '';
    
    if (valorLimpio.length >= 2) {
        valorFormateado = valorLimpio.slice(0, 2);
        
        valorFormateado += '/';
        
        valorFormateado += valorLimpio.slice(2);
    } else {
        valorFormateado = valorLimpio;
    }

    inputElement.value = valorFormateado

  }


}
