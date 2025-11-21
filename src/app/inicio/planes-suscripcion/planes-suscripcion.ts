import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfigUser } from '../../servicios/config-user';
import { Auth } from '@angular/fire/auth';
declare var bootstrap: any;

@Component({
  selector: 'app-planes-suscripcion',
  standalone: false,
  templateUrl: './planes-suscripcion.html',
  styleUrl: './planes-suscripcion.css',
})
export class PlanesSuscripcion {
  @ViewChild('input_numero_tarjeta') input_numeroTarjeta!: HTMLInputElement;
  @ViewChild('input_nombre_banco') input_nombreBanco!: ElementRef;
  @ViewChild('input_tipo_tarjeta') input_tipoTarjeta!: ElementRef;
  @ViewChild('input_ccv') input_ccv!: ElementRef;
  @ViewChild('input_vencimiento') input_vencimiento!: ElementRef;

  form_compraSuscripcion = {
    vencimiento: '',
    numero_tarjeta: null,
    ccv: null,
    banco: '',
    tipo_tarjeta: '',
  };

  ngOninit() {
    console.log(this.input_numeroTarjeta.value);
  }

  coleccion: string = 'Metodos_Pago';

  constructor(private ConfigUser: ConfigUser, private Auth: Auth) {}

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

  async Guardar_Datos(membresia: string) {
    const user = this.Auth.currentUser;

    if (!user) {
      this.mostrarToast('Debes iniciar sesión para comprar una suscripción ❌', 'danger');
      return;
    }

    const fecha_inicio = new Date();
    const fecha_final = new Date();
    fecha_final.setDate(fecha_final.getDate() + 60);

    const registro_membresia = {
      uid_usuario: user.uid,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_final,
      tipo_membresia: membresia,
    };

    const response_membresia = await this.ConfigUser.Create_Coleccion(
      'Membresias',
      registro_membresia
    );

    if (response_membresia) {
      setTimeout(() => {
        this.mostrarToast('Membresía activada correctamente ✨');
      }, 50);

      this.Insertar_metodoPago();
    } else {
      this.mostrarToast('Error al activar la membresía ❌', 'danger');
    }
  }

  async Insertar_metodoPago() {
    try {
      const res = await this.ConfigUser.Create_Coleccion(
        this.coleccion,
        this.form_compraSuscripcion
      );
      console.log('Método de pago insertado:', res);
    } catch (err) {
      console.error('Error en Insertar_metodoPago:', err);
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
