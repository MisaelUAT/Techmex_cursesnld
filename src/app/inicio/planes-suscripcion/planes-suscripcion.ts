import { Component } from '@angular/core';
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
  form_compraSuscripcion = {
    Vencimiento: '',
    numero_tarjeta: null,
    pin: null,
    tarjeta_banco: '',
    tipo_tarjeta: '',
  };

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
}
